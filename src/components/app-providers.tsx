"use client";

import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { CartProvider } from "@/contexts/cart-context";
import { CartLayout } from "./cart/cart-layout";
import { Toaster } from "./ui/sonner";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Theme accentColor="violet" grayColor="slate" radius="large" scaling="95%">
      <CartProvider>
        <CartLayout>
          {children}
          <Toaster position="top-right" />
        </CartLayout>
      </CartProvider>
    </Theme>
  );
}
