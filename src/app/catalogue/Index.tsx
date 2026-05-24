'use client';

import { useState, useMemo } from 'react';
import CatalogueItemCard, { CatalogueItemProps } from './ItemCard';


interface CatalogueClientProps {
  initialProducts: CatalogueItemProps[];
  id?: string;
}

type FilterType = 'All' | 'Raw Concrete' | 'Glazed' | 'Painted' | 'Under Rs 10,000' | 'New In';

export default function CatalogueClient({ initialProducts, id }: CatalogueClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [activeSort, setActiveSort] = useState<string>('Featured');

  // Filter products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Find sub text (short description)
      const subText = product.short_description
        ? product.short_description.replace(/<[^>]*>?/gm, '').toLowerCase()
        : '';

      // Find tag name (either from meta_data or tags list)
      const tagMeta = product.meta_data?.find(meta => meta.key === 'pc_tag');
      const tag = (tagMeta?.value ? String(tagMeta.value) : (product.tags && product.tags.length > 0 ? product.tags[0].name : '')).toLowerCase();

      const price = parseFloat(product.price);

      switch (activeFilter) {
        case 'Raw Concrete':
          return subText.includes('raw') || (subText.includes('concrete') && !subText.includes('painted') && !subText.includes('glazed'));
        case 'Glazed':
          return subText.includes('glazed') || subText.includes('ceramic');
        case 'Painted':
          return subText.includes('painted');
        case 'Under Rs 10,000':
          return !isNaN(price) && price < 10000;
        case 'New In':
          return tag.includes('new in') || tag.includes('new');
        default:
          return true;
      }
    });
  }, [initialProducts, activeFilter]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    switch (activeSort) {
      case 'Price: Low to High':
        return productsCopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'Price: High to Low':
        return productsCopy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'Newest':
        return productsCopy.sort((a, b) => b.id - a.id);
      default:
        return productsCopy; // "Featured" order is default
    }
  }, [filteredProducts, activeSort]);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="bc">Home › Shop › Tissue Holder Sculptures</div>

      {/* CATEGORY HEADER */}
      <div className="cat-header">
        <div className="cat-eyebrow">Collectibles — From the Studio</div>
        <h1>Tissue Holder Sculptures</h1>
        <p className="cat-desc">
          Everyday things made worth noticing. Each tissue holder is cast in concrete and finished by hand — designed to hold quiet presence on your desk, your bedside, wherever it lives with you. No two are identical.
        </p>
        <div className="cat-meta">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} · Made to order · Ships in 7–10 days
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-pills">
          {(['All', 'Raw Concrete', 'Glazed', 'Painted', 'Under Rs 10,000', 'New In'] as const).map((filter) => (
            <button
              key={filter}
              className={`fp-pill ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="sort-dropdown">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
          >
            <option value="Featured">Featured</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="cat-grid">
        {sortedProducts.map((product) => (
          <CatalogueItemCard key={product.id} {...product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-20 text-[#AAA49C] text-[14px]">
          No products match the selected filter.
        </div>
      )}

      {/* CATEGORY BANNER */}
      <div className="cat-banner">
        <div className="cb-label">The Process</div>
        <div className="cb-title">Formed in stone, finished in ink.</div>
        <div className="cb-desc">
          We mix and cast each sculpture in small batches of concrete. Air bubbles, surface variations, minor cracks — these aren't defects; they are the character of the material itself. Once dry, each piece is hand-glazed or painted, making it unique.
        </div>
        <div className="cb-btn-wrap">
          <a href="#" className="cb-btn">Explore the process</a>
        </div>
      </div>
    </>
  );
}
