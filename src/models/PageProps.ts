export interface PageProps {
    searchParams: Promise<{ id?: string, slug?: string, category?: string, page?: string }>;
}