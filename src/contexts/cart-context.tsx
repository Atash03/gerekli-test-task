"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface CartVariant {
  label: string;
  value: string;
  hex?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  color?: CartVariant;
  size?: CartVariant;
}

export interface AddCartItemInput {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  color?: CartVariant;
  size?: CartVariant;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: AddCartItemInput) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalQuantity: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const createLineItemId = (item: AddCartItemInput) =>
  [
    item.productId,
    item.color?.value ?? "colorless",
    item.size?.value ?? "sizeless",
  ].join("::");

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: AddCartItemInput) => {
    const id = createLineItemId(item);
    setItems((previous) => {
      const existing = previous.find((line) => line.id === id);
      if (existing) {
        return previous.map((line) =>
          line.id === id
            ? {
                ...line,
                quantity: Math.min(99, line.quantity + item.quantity),
              }
            : line,
        );
      }

      return [...previous, { ...item, id }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((previous) => previous.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const { totalQuantity, totalAmount } = useMemo(() => {
    return items.reduce(
      (accumulator, line) => {
        return {
          totalQuantity: accumulator.totalQuantity + line.quantity,
          totalAmount: accumulator.totalAmount + line.price * line.quantity,
        };
      },
      { totalQuantity: 0, totalAmount: 0 },
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clear,
      totalQuantity,
      totalAmount,
    }),
    [items, addItem, removeItem, clear, totalQuantity, totalAmount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
