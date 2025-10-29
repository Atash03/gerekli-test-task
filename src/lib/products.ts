const API_BASE_URL = "https://dummyjson.com/products";

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews: ProductReview[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 404) {
    throw new Error("NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return (await response.json()) as T;
}

export interface FetchProductsOptions {
  limit?: number;
  skip?: number;
}

export async function fetchProducts(
  options: FetchProductsOptions = {},
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (typeof options.limit === "number") {
    params.set("limit", String(options.limit));
  }

  if (typeof options.skip === "number") {
    params.set("skip", String(options.skip));
  }

  const url = params.size > 0 ? `${API_BASE_URL}?${params}` : API_BASE_URL;

  const response = await fetch(url, {
    // Revalidate every 5 minute
    next: { revalidate: 60 * 5 },
  });

  return handleResponse<ProductsResponse>(response);
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    next: { revalidate: 60 * 5 },
  });

  return handleResponse<Product>(response);
}
