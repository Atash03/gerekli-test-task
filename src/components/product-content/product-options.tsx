"use client";

import {
  Box,
  Button,
  Dialog,
  Flex,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";

type ColorOption = {
  label: string;
  hex: string;
};

const defaultColors: ColorOption[] = [
  {
    label: "Midnight Black",
    hex: "#0D0D0D",
  },
  {
    label: "Arctic White",
    hex: "#E2E3DD",
  },
  {
    label: "Sunset Orange",
    hex: "#fd5e53",
  },
  {
    label: "Forest Green",
    hex: "#228B22",
  },
];

const defaultSizes = ["XS", "S", "M", "L", "XL"];

const toValue = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

interface ProductOptionsProps {
  product: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
  colors?: ColorOption[];
  sizes?: string[];
}

export function ProductOptions({
  product,
  colors = defaultColors,
  sizes = defaultSizes,
}: ProductOptionsProps) {
  const { addItem } = useCart();

  const sanitizedColors = useMemo(
    () =>
      colors.map((color) => ({
        label: color.label,
        value: toValue(color.label),
        hex: color.hex,
      })),
    [colors],
  );
  const sanitizedSizes = useMemo(
    () =>
      sizes.map((label) => ({
        label,
        value: toValue(label),
      })),
    [sizes],
  );

  const [selectedColor, setSelectedColor] = useState(
    sanitizedColors[0]?.value ?? "",
  );
  const [selectedSize, setSelectedSize] = useState(
    sanitizedSizes[0]?.value ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (sanitizedColors.length === 0) {
      setSelectedColor("");
      return;
    }

    setSelectedColor((current) => {
      const exists = sanitizedColors.some((option) => option.value === current);
      return exists ? current : (sanitizedColors[0]?.value ?? "");
    });
  }, [sanitizedColors]);

  useEffect(() => {
    if (sanitizedSizes.length === 0) {
      setSelectedSize("");
      return;
    }

    setSelectedSize((current) => {
      const exists = sanitizedSizes.some((option) => option.value === current);
      return exists ? current : (sanitizedSizes[0]?.value ?? "");
    });
  }, [sanitizedSizes]);

  const handleDecrease = () =>
    setQuantity((current) => Math.max(1, current - 1));
  const handleIncrease = () =>
    setQuantity((current) => Math.min(99, current + 1));

  const colorLabel =
    sanitizedColors.find((item) => item.value === selectedColor)?.label ?? "";
  const sizeLabel =
    sanitizedSizes.find((item) => item.value === selectedSize)?.label ?? "";

  const handleConfirmPurchase = () => {
    toast.success(`Purchase confirmed: ${product.title} ordered successfully`);
    setIsDialogOpen(false);
  };

  const handleAddToCart = () => {
    const colorOption = sanitizedColors.find(
      (option) => option.value === selectedColor,
    );
    const sizeOption = sanitizedSizes.find(
      (option) => option.value === selectedSize,
    );

    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      color: colorOption
        ? {
            label: colorOption.label,
            value: colorOption.value,
            hex: colorOption.hex,
          }
        : undefined,
      size: sizeOption
        ? {
            label: sizeOption.label,
            value: sizeOption.value,
          }
        : undefined,
    });

    setQuantity(1);
  };

  return (
    <Flex direction="column" gap="4">
      <Flex direction={"column"}>
        <Text size="2" weight="medium">
          Color
        </Text>
        <SegmentedControl.Root
          value={selectedColor}
          onValueChange={setSelectedColor}
        >
          {sanitizedColors.map(({ value, hex }) => (
            <SegmentedControl.Item key={value} value={value}>
              <Flex align="center" gap="2">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: hex }}
                />
                {/* {label} */}
              </Flex>
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
        {colorLabel && (
          <Text size="1" color="gray" mt="2">
            Selected: {colorLabel}
          </Text>
        )}
      </Flex>

      <Flex direction={"column"}>
        <Text size="2" weight="medium">
          Size
        </Text>
        <SegmentedControl.Root
          value={selectedSize}
          onValueChange={setSelectedSize}
        >
          {sanitizedSizes.map(({ value, label }) => (
            <SegmentedControl.Item key={value} value={value}>
              {label}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
        {sizeLabel && (
          <Text size="1" color="gray" mt="2">
            Selected: {sizeLabel}
          </Text>
        )}
      </Flex>

      <Box>
        <Text size="2" weight="medium">
          Quantity
        </Text>
        <Flex align="center" gap="3" mt="2">
          <Button
            size="2"
            variant="soft"
            color="gray"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </Button>
          <Text aria-live="polite" aria-atomic="true" weight="medium">
            {quantity}
          </Text>
          <Button
            size="2"
            variant="soft"
            color="gray"
            onClick={handleIncrease}
            disabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </Flex>
        <Text size="1" color="gray" mt="1">
          Maximum 99 items per order
        </Text>
      </Box>

      <Flex gap="3" wrap="wrap">
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger>
            <Button size="3" variant="solid" color="jade">
              Buy now
            </Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="420px">
            <Dialog.Title>Do you want to purchase</Dialog.Title>
            <Dialog.Description size="2" color="gray">
              Review the order details before continuing.
            </Dialog.Description>

            <Flex mt="4" direction="column" gap="3">
              <Flex gap="3" align="center">
                {product.image ? (
                  <Box className="h-16 w-16 overflow-hidden rounded-md border border-border">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </Box>
                ) : null}

                <Flex direction="column" gap="1">
                  <Text weight="medium">{product.title}</Text>
                  <Text size="2" color="gray">
                    {formatCurrency(product.price)}
                  </Text>
                </Flex>
              </Flex>

              <Box>
                <Text size="2" weight="medium">
                  Selection
                </Text>
                <Text size="1" color="gray">
                  Color: {colorLabel || "N/A"}
                </Text>
                <Text size="1" color="gray">
                  Size: {sizeLabel || "N/A"}
                </Text>
                <Text size="1" color="gray">
                  Quantity: {quantity}
                </Text>
              </Box>
            </Flex>

            <Flex gap="3" justify="end" mt="4">
              <Button
                variant="soft"
                color="gray"
                onClick={() => setIsDialogOpen(false)}
              >
                No
              </Button>
              <Button onClick={handleConfirmPurchase}>Yes</Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
        <Button size="3" variant="soft" color="gray" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Flex>
    </Flex>
  );
}
