'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Mail, MapPin, Phone } from 'lucide-react';
const intents = [
  ['project', '工程项目合作'],
  ['demo', '产品演示'],
  ['trial', 'BCV 内测申请'],
  ['access', 'BCDC 开通咨询'],
  ['support', '技术支持'],
];
export default function ContactComposer() {
  const [intent, setIntent] = useState('project'),
    [product, setProduct] = useState(''),
    [name, setName] = useState(''),
    [company, setCompany] = useState(''),
    [reply, setReply] = useState(''),
    [message, setMessage] = useState(''),
    [copiedBody, setCopiedBody] = useState<string | null>(null),
    [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const i = p.get('intent');
    if (i && intents.some(([v]) => v === i)) setIntent(i);
    const productQuery = p.get('product');
    if (productQuery && ['BCDT', 'BCDC', 'BCV'].includes(productQuery))
      setProduct(productQuery);
    else if (i === 'trial') setProduct('BCV');
    else if (i === 'access') setProduct('BCDC');
  }, []);
  const kind = intents.find(([v]) => v === intent)?.[1] || '项目咨询';
  const body = `咨询类型：${kind}\n意向产品：${product || '请协助推荐'}\n称呼：${name || '未填写'}\n公司或项目：${company || '未填写'}\n回复方式：${reply || '请直接回复本邮件'}\n\n需求说明：\n${message}\n`;
  function submit(e: FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:lizhe@bim-u.com?subject=${encodeURIComponent(`彼慕智造｜${kind}${product ? ' · ' + product : ''}`)}&body=${encodeURIComponent(body)}`;
  }
  const copied = copiedBody === body;
  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopiedBody(body);
      setCopyError(false);
    } catch {
      setCopiedBody(null);
      setCopyError(true);
    }
  }
  return (
    <section className="section container contact-layout">
      <aside className="contact-sidebar">
        <p className="eyebrow">江苏彼慕智造建筑科技有限公司</p>
        <h2>
          工程技术合作
          <br />
          产品演示与支持
        </h2>
        <a className="contact-method" href="tel:13913665616">
          <Phone size={21} />
          <span>
            <small>业务咨询</small>
            <strong>139 1366 5616</strong>
          </span>
          <ArrowUpRight size={18} />
        </a>
        <a className="contact-method" href="mailto:lizhe@bim-u.com">
          <Mail size={21} />
          <span>
            <small>电子邮箱</small>
            <strong>lizhe@bim-u.com</strong>
          </span>
          <ArrowUpRight size={18} />
        </a>
        <div className="contact-method">
          <MapPin size={21} />
          <span>
            <small>公司地址</small>
            <p>
              南京市中山东路 532-1 号<br />
              中山坊产业园 C 栋 201
            </p>
          </span>
        </div>
        <p className="contact-hint">
          如需产品安装包、项目访问权限或已有账号帮助，请选择“技术支持”，说明产品和使用环境。
        </p>
      </aside>
      <form
        className="contact-form"
        onChangeCapture={() => setCopyError(false)}
        onSubmit={submit}
      >
        <p className="eyebrow">START A CONVERSATION</p>
        <h2>整理你的需求</h2>
        <p className="form-intro">
          填写后在邮件应用中继续，由你确认发送。也可以直接拨打电话或复制需求内容。
        </p>
        <div className="form-row">
          <label htmlFor="contact-intent">
            咨询类型
            <select
              id="contact-intent"
              value={intent}
              onChange={(e) => {
                setIntent(e.target.value);
                setCopiedBody(null);
              }}
            >
              {intents.map(([v, t]) => (
                <option key={v} value={v}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="contact-product">
            意向产品
            <select
              id="contact-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">请协助推荐 / 工程服务</option>
              <option>BCDT</option>
              <option>BCDC</option>
              <option>BCV</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label htmlFor="contact-name">
            你的称呼
            <input
              id="contact-name"
              value={name}
              autoComplete="name"
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              placeholder="如何称呼你"
            />
          </label>
          <label htmlFor="contact-company">
            公司或项目
            <input
              id="contact-company"
              value={company}
              autoComplete="organization"
              maxLength={160}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="公司名称或项目简称"
            />
          </label>
        </div>
        <label htmlFor="contact-reply">
          回复方式
          <input
            id="contact-reply"
            value={reply}
            maxLength={160}
            onChange={(e) => setReply(e.target.value)}
            placeholder="邮箱或电话，也可直接通过来信回复"
          />
        </label>
        <label htmlFor="contact-message">
          需求说明 <span className="required-label">必填</span>
          <textarea
            id="contact-message"
            value={message}
            required
            minLength={8}
            maxLength={2000}
            rows={6}
            onChange={(e) => {
              setMessage(e.target.value);
              setCopiedBody(null);
            }}
            placeholder="例如：项目所处阶段、材料类型、需要解决的问题，或希望了解的产品功能。"
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="button">
            在邮件中继续
            <ArrowUpRight size={18} />
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={copy}
            disabled={!message.trim()}
          >
            <Copy size={16} />
            {copied ? '已复制需求' : '复制需求内容'}
          </button>
        </div>
        <p className="form-note">
          此页面不上传模型和项目文件，填写内容仅用于生成邮件草稿。请勿填写账号密码。
        </p>
        {copyError && (
          <div className="copy-fallback">
            <p role="status">
              自动复制未成功，请选中下方内容手动复制，或使用邮件按钮。
            </p>
            <label htmlFor="copy-body">
              邮件正文
              <textarea
                id="copy-body"
                readOnly
                value={body}
                onFocus={(e) => e.currentTarget.select()}
              />
            </label>
          </div>
        )}
        {copied && (
          <p className="copy-status" role="status">
            需求已复制，可粘贴到你的邮件或沟通工具中。
          </p>
        )}
      </form>
    </section>
  );
}
