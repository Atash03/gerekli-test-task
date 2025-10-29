import { Badge, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

const PAGE_SIZE = 10;

function ProductItem({ product }: { product: Product }) {
  return (
    <Card key={product.id} size="3" variant="classic">
      <Flex direction="column" gap="4" height="100%">
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-[220px] object-contain"
            priority={product.id <= PAGE_SIZE}
          />
        </Inset>

        <Flex direction="column" gap="2" justify={"between"} flexGrow={"1"}>
          <Flex direction="column" gap="2">
            <Flex align="center" justify="between" wrap="wrap" gap="2">
              <Heading size="5">{product.title}</Heading>
              <Badge color="teal" variant="soft">
                {formatCurrency(product.price)}
              </Badge>
            </Flex>
            <Text size="2" color="gray">
              {product.description}
            </Text>
          </Flex>

          <Flex align="center" justify="between">
            <Text size="2" color="gray">
              ⭐ {product.rating.toFixed(1)} • Stock: {product.stock}
            </Text>
            <Link href={`/product/${product.id}`}>
              <Text size="2" weight="medium" color="violet">
                View details →
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default ProductItem;
