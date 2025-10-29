import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSafeProduct } from "@/api/get-safe-product";
import { formatCurrency } from "@/lib/utils";
import { ProductOptions } from "./product-options";

export async function ProductContent({ id }: { id: string }) {
  const product = await getSafeProduct(id);

  if (!product) {
    notFound();
  }

  const featuredImage = product.images[0] ?? product.thumbnail;
  const secondaryImages = product.images.slice(1, 4);

  return (
    <Container
      size="4"
      px={{ initial: "4", md: "6" }}
      py={{ initial: "6", md: "8" }}
    >
      <Flex direction="column" gap="6">
        <Button asChild size="2" variant="soft" color="gray">
          <Link href="/">← Back to catalogue</Link>
        </Button>

        <Grid columns={{ initial: "1", md: "2" }} gap="6" align="start">
          <Flex direction="column" gap="5">
            <Card size="4">
              <Flex direction="column" gap="4">
                <Inset clip="padding-box" side="top" pb="current">
                  <Image
                    src={featuredImage}
                    alt={product.title}
                    width={640}
                    height={480}
                    className="w-full h-80 object-contain"
                    priority
                  />
                </Inset>

                {secondaryImages.length > 0 && (
                  <Grid columns={{ initial: "2", sm: "3" }} gap="3">
                    {secondaryImages.map((image) => (
                      <Box
                        key={image}
                        overflow={"hidden"}
                        className="rounded-(--radius-3)!"
                      >
                        <Image
                          src={image}
                          alt={`${product.title} preview`}
                          width={240}
                          height={160}
                          className="w-full h-[120px] object-contain"
                        />
                      </Box>
                    ))}
                  </Grid>
                )}
              </Flex>
            </Card>

            <ProductOptions
              product={{
                id: String(product.id),
                title: product.title,
                price: product.price,
                image: product.thumbnail,
              }}
            />
          </Flex>

          <Flex direction="column" gap="5">
            <Box>
              <Flex gap="3" align="center" wrap="wrap">
                <Heading size="8">{product.title}</Heading>
                <Badge color="jade" radius="full">
                  {formatCurrency(product.price)}
                </Badge>
              </Flex>
              <Text mt="2" color="gray" size="3">
                {product.description}
              </Text>
            </Box>

            <Flex direction="column" gap="3">
              <Text size="2" color="gray">
                Rating: ⭐ {product.rating.toFixed(1)} • Stock: {product.stock}{" "}
                • Category: {product.category}
              </Text>
              <Text size="2" color="gray">
                Availability: {product.availabilityStatus ?? "Unknown"}
              </Text>
            </Flex>

            {product.tags.length > 0 && (
              <Flex gap="2" wrap="wrap">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="soft" color="gray">
                    #{tag}
                  </Badge>
                ))}
              </Flex>
            )}

            <Separator size="2" />

            <Grid columns={{ initial: "1", sm: "2" }} gap="4">
              <Box>
                <Heading size="4" mb="2">
                  Dimensions
                </Heading>
                <Text size="2" color="gray">
                  {product.dimensions.width} × {product.dimensions.height} ×{" "}
                  {product.dimensions.depth} cm
                </Text>
              </Box>

              <Box>
                <Heading size="4" mb="2">
                  Shipping & Warranty
                </Heading>
                <Text size="2" color="gray">
                  {product.shippingInformation ??
                    "Shipping details unavailable"}
                </Text>
                <Text size="2" color="gray">
                  {product.warrantyInformation ??
                    "Warranty information unavailable"}
                </Text>
              </Box>
            </Grid>

            <Box>
              <Heading size="4" mb="2">
                Return Policy
              </Heading>
              <Text size="2" color="gray">
                {product.returnPolicy ??
                  "No return policy information provided."}
              </Text>
            </Box>

            {product.reviews.length > 0 && (
              <Box>
                <Heading size="4" mb="3">
                  Recent Reviews
                </Heading>
                <Flex direction="column" gap="3">
                  {product.reviews.slice(0, 3).map((review) => (
                    <Card
                      key={`${review.reviewerEmail}-${review.date}`}
                      variant="surface"
                      size="2"
                    >
                      <Flex direction="column" gap="2">
                        <Text weight="medium">{review.reviewerName}</Text>
                        <Text size="2" color="gray">
                          ⭐ {review.rating} •{" "}
                          {new Date(review.date).toLocaleDateString()}
                        </Text>
                        <Text size="2">{review.comment}</Text>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              </Box>
            )}
          </Flex>
        </Grid>
      </Flex>
    </Container>
  );
}
