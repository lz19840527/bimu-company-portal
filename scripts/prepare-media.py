"""Create portal web media from preserved local production sources.

Run with a Python runtime providing Pillow and NumPy. All generated files stay
under public/media, public/images/products, and the implementation manifest.
"""
from __future__ import annotations

import concurrent.futures
import hashlib
import json
import math
import re
import shutil
import struct
import subprocess
import wave
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public/media"
IMAGES = ROOT / "public/images/products"
WORK = MEDIA / ".prepare-work"
MANIFEST = ROOT / "output/implementation/media-manifest.json"
FFMPEG = ROOT / "tmp/video-deps/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
LIMIT = 24 * 1024 * 1024
SAMPLE_RATE = 48000

PRODUCTS = {
    "bcdt": ("BCDT", 230),
    "bcdc": ("BCDC", 160),
    "bcv": ("BCV", 180),
}


def run(args: list, *, check=True):
    result = subprocess.run(list(map(str, args)), capture_output=True, text=True,
                            encoding="utf-8", errors="replace")
    if check and result.returncode:
        raise RuntimeError(result.stderr[-8000:])
    return result


def digest(path: Path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def source_info(path: Path):
    return {"path": path.relative_to(ROOT).as_posix(), "bytes": path.stat().st_size,
            "sha256": digest(path)}


def probe(path: Path):
    text = run([FFMPEG, "-hide_banner", "-i", path], check=False).stderr
    duration_match = re.search(r"Duration: (\d+):(\d+):(\d+(?:\.\d+)?)", text)
    if not duration_match:
        raise ValueError(f"Missing duration: {path}\n{text}")
    hours, minutes, seconds = map(float, duration_match.groups())
    result = {"duration_seconds": hours * 3600 + minutes * 60 + seconds}
    video = next((line for line in text.splitlines() if "Video:" in line), "")
    if video:
        match = re.search(r"(\d{3,5})x(\d{3,5})", video)
        result.update(width=int(match[1]), height=int(match[2]), video_codec="h264" if "h264" in video else video)
    audio = next((line for line in text.splitlines() if "Audio:" in line), "")
    result["audio_codec"] = "aac" if "aac" in audio else audio
    return result


def seconds(timecode: str):
    h, m, s = timecode.replace(",", ".").split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)


def subtitles(source: Path, target: Path, duration: int):
    content = source.read_text(encoding="utf-8-sig").replace("\r\n", "\n").strip()
    cues = re.findall(r"(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})", content)
    previous = 0.0
    for start, end in cues:
        a, b = seconds(start), seconds(end)
        assert 0 <= a < b <= duration and a >= previous, (source, start, end)
        previous = b
    assert cues
    converted = re.sub(r"(\d{2}:\d{2}:\d{2}),(\d{3})", r"\1.\2", content)
    target.write_text("WEBVTT\n\n" + converted + "\n", encoding="utf-8", newline="\n")
    return {"url": "/media/" + target.name, "cue_count": len(cues),
            "first_start_seconds": seconds(cues[0][0]), "last_end_seconds": previous,
            "time_range_valid": True, "source": source_info(source)}


def top_atoms(path: Path):
    atoms = []
    with path.open("rb") as stream:
        total = path.stat().st_size
        position = 0
        while position + 8 <= total:
            stream.seek(position)
            size, kind = struct.unpack(">I4s", stream.read(8))
            if size == 1:
                size = struct.unpack(">Q", stream.read(8))[0]
            elif size == 0:
                size = total - position
            assert size >= 8
            atoms.append(kind.decode("ascii"))
            position += size
    return atoms


def read_wav(path: Path):
    with wave.open(str(path), "rb") as stream:
        assert stream.getframerate() == SAMPLE_RATE and stream.getsampwidth() == 2
        return np.frombuffer(stream.readframes(stream.getnframes()), dtype="<i2").astype(np.float32).reshape(-1, stream.getnchannels()) / 32768


def company_audio_and_credit():
    voice_path = ROOT / "video-production/v5/audio/narration-normalized.wav"
    music_path = ROOT / "video-production/products/BCDT/audio/music-original.wav"
    voice = read_wav(voice_path)
    music = read_wav(music_path)
    samples = 200 * SAMPLE_RATE
    assert len(voice) == samples and len(music) >= samples
    music = music[:samples].copy()
    source_rms = float(np.sqrt(np.mean(music.astype(np.float64) ** 2)))
    music_gain = 10 ** (-29 / 20) / source_rms
    music *= music_gain
    timeline = np.arange(samples, dtype=np.float32) / SAMPLE_RATE
    fades = np.minimum(timeline / 1.8, 1) * np.clip((200 - timeline) / 3, 0, 1)
    music *= fades[:, None]
    mixed = voice + music
    master_gain = min(1.0, 0.90 / float(np.max(np.abs(mixed))))
    mixed *= master_gain
    audio_path = WORK / "company-original-mix.wav"
    with wave.open(str(audio_path), "wb") as stream:
        stream.setnchannels(2)
        stream.setsampwidth(2)
        stream.setframerate(SAMPLE_RATE)
        stream.writeframes(np.round(mixed * 32767).astype("<i2").tobytes())

    # Same dimensions, position, background and end fade as the v6 credit patch.
    credit = Image.new("RGB", (820, 114), "#071d29")
    draw = ImageDraw.Draw(credit)
    font_path = "C:/Windows/Fonts/msyh.ttc"
    for y, label, size in [
        (9, "原创配乐：Precision Lines", 19),
        (43, "彼慕智造产品演示原创合成器乐", 18),
        (75, "固定音量混音 · 保留原版解说", 18),
    ]:
        draw.text((14, y), label, font=ImageFont.truetype(font_path, size), fill="#91aeba")
    credit_path = WORK / "company-original-credit.png"
    credit.save(credit_path)
    return audio_path, credit_path, {
        "narration_source": source_info(voice_path),
        "music_source": source_info(music_path),
        "music_title": "Precision Lines",
        "music_provenance": "Original synthesized instrumental generated by video-production/products/build.py; no third-party recording.",
        "music_range_seconds": [0, 200],
        "music_static_gain": music_gain,
        "fixed_master_gain": master_gain,
        "narration_ducking": False,
        "fade_in_seconds": 1.8,
        "fade_out_seconds": 3,
        "pcm_peak_dbfs": 20 * math.log10(float(np.max(np.abs(mixed)))),
        "credit_patch": {"source_pixels": [76, 844, 820, 114], "enabled_from_seconds": 190,
                         "fade_out_start_seconds": 199.166667, "fade_out_duration_seconds": 0.833333,
                         "reference": "video-production/v6/build_v6.py"},
    }


def encoding_options():
    return ["-c:v", "libx264", "-preset", "medium", "-crf", "23",
            "-maxrate", "740k", "-bufsize", "1480k", "-pix_fmt", "yuv420p",
            "-profile:v", "high", "-level", "3.1", "-threads", "2",
            "-c:a", "aac", "-b:a", "96k", "-ar", SAMPLE_RATE, "-ac", "2",
            "-map_metadata", "-1", "-movflags", "+faststart"]


def build_one(key, title, duration, source, srt, company=None):
    print(f"Encoding {key}: {duration}s", flush=True)
    target = MEDIA / f"{key}.mp4"
    args = [FFMPEG, "-hide_banner", "-y", "-v", "error", "-i", source]
    if company:
        audio_path, credit_path, audio_notes = company
        args += ["-i", audio_path, "-loop", "1", "-framerate", "30", "-i", credit_path,
                 "-filter_complex_threads", "2", "-filter_complex",
                 "[2:v]format=rgb24,fade=t=out:st=199.166667:d=0.833333:color=0x071d29[p];"
                 "[0:v][p]overlay=x=76:y=844:enable='gte(t,190)',scale=1280:720:flags=lanczos,setsar=1[v]",
                 "-map", "[v]", "-map", "1:a:0"]
    else:
        audio_notes = {"mode": "Original soundtrack preserved; AAC re-encode only", "original_score": True}
        args += ["-map", "0:v:0", "-map", "0:a:0", "-vf", "scale=1280:720:flags=lanczos,setsar=1"]
    args += encoding_options() + ["-t", duration, "-metadata", f"title={title}", "-metadata",
                                  "comment=Portal web edition; original synthesized music; no narration ducking.", target]
    run(args)
    info = probe(target)
    assert abs(info["duration_seconds"] - duration) <= .05
    assert (info["width"], info["height"]) == (1280, 720)
    assert info["video_codec"] == "h264" and info["audio_codec"] == "aac"
    assert target.stat().st_size < LIMIT
    atoms = top_atoms(target)
    assert atoms.index("moov") < atoms.index("mdat")
    run([FFMPEG, "-v", "error", "-i", target, "-f", "null", "-"])
    audio_check = run([FFMPEG, "-hide_banner", "-i", target, "-vn", "-af", "volumedetect", "-f", "null", "-"]).stderr
    audio_notes["encoded_peak_dbfs"] = float(re.search(r"max_volume: ([\-\d.]+) dB", audio_check)[1])
    audio_notes["encoded_mean_dbfs"] = float(re.search(r"mean_volume: ([\-\d.]+) dB", audio_check)[1])
    assert audio_notes["encoded_peak_dbfs"] < 0
    poster_name = "company-poster.jpg" if key == "company-film" else key.replace("-demo", "-poster") + ".jpg"
    poster = MEDIA / poster_name
    run([FFMPEG, "-y", "-v", "error", "-ss", "2.5", "-i", target,
         "-frames:v", "1", "-q:v", "2", poster])
    subtitle_info = subtitles(srt, MEDIA / f"{key}.vtt", duration)
    result = {
        "id": key, "url": "/media/" + target.name, "title": title,
        "source": source_info(source), "bytes": target.stat().st_size,
        "sha256": digest(target), **info, "faststart": True,
        "full_decode_passed": True, "under_24_mib": True,
        "video_transforms": ["Resize full frame to 1280x720 with Lanczos", "H264 yuv420p CRF23 constrained to 740kbps", "Preserve source duration and frame cadence"],
        "audio": audio_notes, "poster": {"url": "/media/" + poster.name, "timestamp_seconds": 2.5,
                                          "width": 1280, "height": 720},
        "subtitles": subtitle_info,
        "recording_context": "2026-09-06 production materials; historical demo, not current release acceptance",
    }
    print(f"Verified {key}: {target.stat().st_size / 1048576:.2f} MiB, {subtitle_info['cue_count']} cues", flush=True)
    return result


def product_images():
    specs = [
        ("bcdt", "video-production/v3/captures/bcdt-glass.jpg", [1210, 249, 2520, 965], 1280),
        ("bcdc", "video-production/products/captures/bcdc-workspace.png", [505, 100, 2055, 1020], 1280),
        ("bcv", "video-production/v3/captures/bcv-section.png", None, 720),
    ]
    records = []
    for key, source_name, crop, max_width in specs:
        source = ROOT / source_name
        with Image.open(source) as opened:
            picture = opened.convert("RGB")
        original_size = picture.size
        if crop:
            picture = picture.crop(crop)
        if picture.width > max_width:
            picture = picture.resize((max_width, round(picture.height * max_width / picture.width)), Image.Resampling.LANCZOS)
        target = IMAGES / f"{key}-ui.jpg"
        picture.save(target, quality=90, optimize=True, progressive=True)
        records.append({"id": key, "url": f"/images/products/{target.name}",
                        "source": source_info(source), "source_dimensions": original_size,
                        "crop_source_pixels": crop, "width": picture.width, "height": picture.height,
                        "bytes": target.stat().st_size, "sha256": digest(target),
                        "transforms": "Crop to actual product interface when specified, proportional downscale, JPEG only; no UI or data alterations",
                        "visual_review": "Source reviewed: no telephone, email address, credential, browser address bar or local development path in selected region",
                        "recording_context": "Historical 2026-09-06 product demonstration interface"})
    return records


def main():
    for directory in [MEDIA, IMAGES, WORK, MANIFEST.parent]:
        directory.mkdir(parents=True, exist_ok=True)
    images = product_images()
    company = company_audio_and_credit()
    jobs = [(f"{key}-demo", f"{name} 产品功能演示", duration,
             ROOT / f"output/video/产品独立演示/{name}-产品功能演示-{duration}秒.mp4",
             ROOT / f"output/video/产品独立演示/{name}-中文字幕.srt", None)
            for key, (name, duration) in PRODUCTS.items()]
    jobs.append(("company-film", "彼慕智造公司宣传片 · 原创配乐门户版", 200,
                 ROOT / "output/video/v6/彼慕智造-公司宣传片-200秒-钢琴配乐版.mp4",
                 ROOT / "output/video/v6/彼慕智造-200秒-流程功能版-中文字幕.srt", company))
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        videos = list(pool.map(lambda args: build_one(*args), jobs))
    manifest = {"created_at": datetime.now(timezone.utc).isoformat(),
                "script": "scripts/prepare-media.py", "source_files_preserved": True,
                "maximum_asset_bytes": LIMIT, "videos": videos, "product_images": images,
                "notes": ["Company soundtrack and closing music credit replaced with existing original score; narration and other visuals preserved.",
                          "Video and images illustrate recorded historical versions; publication status requires separate product validation.",
                          "Original videos contain embedded Chinese subtitles; supplied WebVTT should not be enabled by default to avoid duplicate captions."]}
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # Only remove this script's verified, isolated staging directory.
    assert WORK.resolve().parent == MEDIA.resolve() and WORK.name == ".prepare-work"
    shutil.rmtree(WORK)
    print(f"Manifest saved: {MANIFEST}", flush=True)


if __name__ == "__main__":
    main()
