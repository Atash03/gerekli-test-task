import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import { ProductsContent } from "@/components/products/products-content";
import { ProductsListSkeleton } from "@/components/skeleton/products-list-skeleton";

interface HomePageProps {
  searchParams: Promise<{ page?: string }> | { page?: string };
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const pageParam = resolvedSearchParams?.page;
  const parsedPage = Number.parseInt(
    Array.isArray(pageParam) ? (pageParam[0] ?? "1") : (pageParam ?? "1"),
    10,
  );

  const currentPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  return (
    <main>
      <Container
        size="4"
        px={{ initial: "4", md: "6" }}
        py={{ initial: "6", md: "8" }}
      >
        <Flex direction="column" gap="5">
          <Box>
            <Heading size="8" mb="2">
              DummyJSON Catalogue
            </Heading>
            <Text size="4" color="gray">
              Browse a curated list of products pulled directly from the
              DummyJSON API.
            </Text>
          </Box>

          <Suspense fallback={<ProductsListSkeleton />}>
            <ProductsContent currentPage={currentPage} />
          </Suspense>
        </Flex>
      </Container>
    </main>
  );
}
