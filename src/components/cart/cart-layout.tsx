"use client";

import { Flex, Button as RadixButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface CartLayoutProps {
  children: ReactNode;
}

export function CartLayout({ children }: CartLayoutProps) {
  const { items, totalQuantity, totalAmount, removeItem, clear } = useCart();
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    setOpen(false);
    clear();
    toast.success(`Purchase confirmed, ordered successfully`);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Flex direction="column" className="min-h-screen bg-background">
        <header className="border-b border-border">
          <Flex
            align="center"
            justify="between"
            className="mx-auto w-full max-w-6xl px-4 py-4"
          >
            <Link href="/" className="font-semibold text-lg">
              Dummy Products
            </Link>
            <SheetTrigger asChild>
              <RadixButton size="2" variant="solid" color="violet">
                Cart{totalQuantity > 0 ? ` (${totalQuantity})` : ""}
              </RadixButton>
            </SheetTrigger>
          </Flex>
        </header>

        <main className="flex-1 w-full">{children}</main>
      </Flex>

      <SheetContent side="right" className="sm:max-w-lg p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review the products you have added to your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              className="h-full gap-2 p-8 text-center"
            >
              <Text size="3" weight="medium">
                Your cart is empty
              </Text>
              <Text size="2" color="gray">
                Browse the catalogue and add some products.
              </Text>
            </Flex>
          ) : (
            <div className="p-4 flex flex-col gap-4">
              {items.map((item) => (
                <Card key={item.id} className="p-0">
                  <div className="p-4 gap-4 flex flex-col md:flex-row items-start">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="h-full w-full md:w-[30%] object-contain rounded-md"
                      />
                    ) : null}

                    <div className="flex-1 flex flex-col justify-between gap-2">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-4">
                        <span>{item.title}</span>
                        <span>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <Badge variant={"secondary"}>
                          Qty: {item.quantity}
                        </Badge>
                        {item.size ? (
                          <Badge variant={"secondary"}>
                            Size: {item.size.label}
                          </Badge>
                        ) : null}
                        {item.color ? (
                          <Badge variant={"secondary"}>
                            Color: {item.color.label}
                          </Badge>
                        ) : null}
                      </div>

                      <Button
                        onClick={() => removeItem(item.id)}
                        className="self-start"
                        variant={"destructive"}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-border">
          {items.length === 0 ? null : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Subtotal</span>
                <span className="font-bold text-lg">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="bg-violet-500 hover:bg-violet-700"
                color="green"
              >
                Checkout
              </Button>

              <Button variant={"secondary"} onClick={clear}>
                Clear cart
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
