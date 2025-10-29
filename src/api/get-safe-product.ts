import { fetchProduct } from "@/lib/products";

export const getSafeProduct = async (id: string) => {
  try {
    return await fetchProduct(id);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return null;
    }

    throw error;
  }
};
