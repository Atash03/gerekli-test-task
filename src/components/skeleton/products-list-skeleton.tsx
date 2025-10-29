import { Card, Flex, Grid, Skeleton } from "@radix-ui/themes";

const skeletonCardCount = 6;
const skeletonCardKeys = Array.from(
  { length: skeletonCardCount },
  (_, index) => `product-skeleton-${index}`,
);

export const ProductsListSkeleton = () => (
  <>
    <Grid gap="5" columns={{ initial: "1", sm: "2", md: "3" }} width="100%">
      {skeletonCardKeys.map((key) => (
        <Card key={key} size="3" variant="classic">
          <Flex direction="column" gap="4">
            <Skeleton loading width="100%" height="220px" />

            <Flex direction="column" gap="2">
              <Skeleton loading width="60%" height="24px" />
              <Skeleton loading width="100%" height="16px" />
              <Skeleton loading width="80%" height="16px" />
            </Flex>

            <Flex align="center" justify="between">
              <Skeleton loading width="45%" height="20px" />
              <Skeleton loading width="35%" height="20px" />
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>

    <Flex
      align="center"
      justify="between"
      wrap="wrap"
      gap="3"
      style={{ marginTop: "var(--space-5)" }}
    >
      <Skeleton loading width="120px" height="36px" />
      <Skeleton loading width="160px" height="20px" />
      <Skeleton loading width="120px" height="36px" />
    </Flex>
  </>
);
