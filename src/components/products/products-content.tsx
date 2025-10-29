import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchProducts } from "@/lib/products";
import ProductItem from "./product-item";

const PAGE_SIZE = 10;

const buildPageHref = (page: number) => (page <= 1 ? "/" : `/?page=${page}`);

export async function ProductsContent({
  currentPage,
}: {
  currentPage: number;
}) {
  const skip = (currentPage - 1) * PAGE_SIZE;

  const { products, total } = await fetchProducts({
    limit: PAGE_SIZE,
    skip,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (currentPage > totalPages) {
    redirect(buildPageHref(totalPages));
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  if (products.length === 0) {
    return (
      <>
        <Card variant="surface">
          <Text size="3" color="gray">
            No products found for this page.
          </Text>
        </Card>
        <Flex align="center" justify="between" wrap="wrap" gap="3" mt={"5"}>
          <Button variant="soft" color="gray" disabled>
            ← Previous
          </Button>
          <Text size="2" color="gray">
            Page {currentPage} of {totalPages}
          </Text>
          <Button variant="soft" color="gray" disabled>
            Next →
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Grid gap="5" columns={{ initial: "1", sm: "2", md: "3" }} width="100%">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>

      <Flex align="center" justify="between" wrap="wrap" gap="3" mt={"5"}>
        <Button asChild disabled={isPrevDisabled}>
          <Link href={buildPageHref(prevPage)}>← Previous</Link>
        </Button>

        <Text size="2" color="gray">
          Page {currentPage} of {totalPages}
        </Text>

        <Button asChild disabled={isNextDisabled}>
          <Link href={buildPageHref(nextPage)}>Next →</Link>
        </Button>
      </Flex>
    </>
  );
}
