import Product from "./Product";
import { PageProps } from "@/models/PageProps";

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <main className="min-h-screen">
      <Product slug={params.slug} />
    </main>
  );
}
