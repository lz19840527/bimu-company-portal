import { ProductDetail } from '@/components/portal/product-detail';
import { products } from '@/lib/products';

export const metadata = {
  alternates: { canonical: '/products/bcdc' },
  title: 'BCDC 工程数据中心',
  description:
    '围绕项目组织材料、文件、知识和项目信息。了解 BCDC 料单复核、版本查询与资料组织方式，申请开通或了解演示。',
};

export default function BcdcPage() {
  return <ProductDetail product={products[1]} />;
}
