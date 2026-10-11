import { ProductDetail } from '@/components/portal/product-detail';
import { products } from '@/lib/products';

export const metadata = {
  alternates: { canonical: '/products/bcdt' },
  title: 'BCDT 幕墙设计工具',
  description:
    '在 Rhino 中组织项目、构件库、材料专业与加工资料。了解 BCDT 的典型流程、输入输出和适用条件，预约产品演示。',
};

export default function BcdtPage() {
  return <ProductDetail product={products[0]} />;
}
