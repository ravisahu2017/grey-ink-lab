import Product from "./Product";

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <main className="min-h-screen">
      <Product id={params.id} />
    </main>
  );
}
