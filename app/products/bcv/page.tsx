import { ProductDetail } from '@/components/portal/product-detail';
import { products } from '@/lib/products';

export const metadata = {
  alternates: { canonical: '/products/bcv' },
  title: 'BCV 移动模型浏览器｜申请内测',
  description:
    '离线查看 3DM、GLB 与 GLTF 模型，通过属性、图层、剖切和测量开展现场核对。了解 BCV Android 内测范围和适用条件。',
};

export default function BcvPage() {
  return <ProductDetail product={products[2]} />;
}
