import productController from "@/controllers/productController";
import Catalogue from "./Index";

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  let products = [];
  try {
    const response = await productController.getProducts();
    if (response && response.success && Array.isArray(response.data)) {
      products = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch products from WooCommerce:", error);
  }

  return (
    <main className="min-h-screen">
      <Catalogue initialProducts={products} id={params.id} />
    </main>
  );
}
