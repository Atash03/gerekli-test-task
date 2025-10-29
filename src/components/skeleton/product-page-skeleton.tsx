import {
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Separator,
  Skeleton,
} from "@radix-ui/themes";

const secondaryImageSkeletonKeys = [
  "secondary-image-skeleton-1",
  "secondary-image-skeleton-2",
  "secondary-image-skeleton-3",
];

const reviewSkeletonKeys = [
  "review-skeleton-1",
  "review-skeleton-2",
  "review-skeleton-3",
];

const tagSkeletonKeys = ["tag-skeleton-1", "tag-skeleton-2", "tag-skeleton-3"];

export const ProductPageSkeleton = () => (
  <Container
    size="4"
    px={{ initial: "4", md: "6" }}
    py={{ initial: "6", md: "8" }}
  >
    <Flex direction="column" gap="6">
      <Skeleton loading width="160px" height="36px" />

      <Grid columns={{ initial: "1", md: "2" }} gap="6" align="start">
        <Card size="4">
          <Flex direction="column" gap="4">
            <Skeleton loading width="100%" height="320px" />

            <Grid columns={{ initial: "2", sm: "3" }} gap="3">
              {secondaryImageSkeletonKeys.map((key) => (
                <Skeleton
                  key={key}
                  loading
                  width="100%"
                  height="120px"
                  className="rounded-(--radius-3)!"
                />
              ))}
            </Grid>
          </Flex>
        </Card>

        <Flex direction="column" gap="5">
          <Box>
            <Skeleton loading width="60%" height="40px" />
            <Skeleton loading width="90%" height="20px" mt={"2"} />
          </Box>

          <Flex direction="column" gap="3">
            <Skeleton loading width="80%" height="18px" />
            <Skeleton loading width="70%" height="18px" />
            <Skeleton loading width="60%" height="18px" />
          </Flex>

          <Flex gap="2" wrap="wrap">
            {tagSkeletonKeys.map((key) => (
              <Skeleton
                key={key}
                loading
                width="72px"
                height="26px"
                className="rounded-(--radius-full)!"
              />
            ))}
          </Flex>

          <Separator size="2" />

          <Grid columns={{ initial: "1", sm: "2" }} gap="4">
            <Box>
              <Skeleton loading width="140px" height="24px" />
              <Skeleton loading width="100%" height="18px" mt={"2"} />
            </Box>
            <Box>
              <Skeleton loading width="180px" height="24px" />
              <Skeleton loading width="100%" height="18px" mt={"2"} />
              <Skeleton loading width="80%" height="18px" mt={"2"} />
            </Box>
          </Grid>

          <Box>
            <Skeleton loading width="150px" height="24px" />
            <Skeleton loading width="100%" height="18px" mt={"2"} />
          </Box>

          <Box>
            <Skeleton loading width="160px" height="24px" />
            <Flex direction="column" gap="3" mt={"3"}>
              {reviewSkeletonKeys.map((key) => (
                <Card key={key} variant="surface" size="2">
                  <Flex direction="column" gap="2">
                    <Skeleton loading width="40%" height="18px" />
                    <Skeleton loading width="60%" height="16px" />
                    <Skeleton loading width="90%" height="16px" />
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </Flex>
  </Container>
);
