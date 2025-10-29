import type { Metadata } from "next";
import { Suspense } from "react";
import { getSafeProduct } from "@/api/get-safe-product";
import { ProductContent } from "@/components/product-content/product-content";
import { ProductPageSkeleton } from "@/components/skeleton/product-page-skeleton";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await Promise.resolve(params);
  const product = await getSafeProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Dummy Products",
    };
  }

  return {
    title: `${product.title} | Dummy Products`,
    description: product.description,
  };
}

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await Promise.resolve(params);

  return (
    <main>
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductContent id={id} />
      </Suspense>
    </main>
  );
}
