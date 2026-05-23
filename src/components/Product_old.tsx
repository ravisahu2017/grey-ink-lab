import Link from 'next/link';

interface ProductImage {
  src: string;
  alt?: string;
}

interface ProductTag {
  name: string;
}

interface ProductMetadata {
  key: string;
  value: any;
}

export interface ProductProps {
  id: number;
  name: string;
  slug: string;
  price: string;
  short_description: string;
  images: ProductImage[];
  tags: ProductTag[];
  description?: string;
  meta_data?: ProductMetadata[];
  className?: string;
}

export default function ProductCard({
  name,
  slug,
  price,
  short_description,
  images,
  tags,
  meta_data,
  className = "",
}: ProductProps) {
  // Strip HTML tags from short_description
  const subText = short_description 
    ? short_description.replace(/<[^>]*>?/gm, '').trim() 
    : '';

  // Decode HTML entities (e.g. &amp; to &)
  const decodedSubText = subText
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  // Format price (e.g. Rs 9,600)
  const numericPrice = parseFloat(price);
  const formattedPrice = isNaN(numericPrice) 
    ? price 
    : `Rs ${numericPrice.toLocaleString('en-IN')}`;

  // Find craft from meta_data
  const craftMeta = meta_data?.find(meta => meta.key === 'pc_craft');
  const craft = craftMeta ? String(craftMeta.value) : 'Made to order';

  // Find tag from meta_data or fallback to tags list
  const tagMeta = meta_data?.find(meta => meta.key === 'pc_tag');
  const tag = tagMeta?.value ? String(tagMeta.value) : (tags && tags.length > 0 ? tags[0].name : '');

  const imageUrl = images && images.length > 0 ? images[0].src : '/placeholder.jpg';
  const imageAlt = images && images.length > 0 ? (images[0].alt || name) : name;

  return (
    <Link href={`/product/${slug}`} className={`pc block ${className}`}>
      <div className="pc-img relative aspect-[3/4] overflow-hidden bg-var(--off) mb-3">
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="w-full h-full object-cover transition-transform duration-750 ease-out hover:scale-106"
          loading="lazy" 
        />
        <div className="pc-ov absolute inset-0 bg-black/18 opacity-0 hover:opacity-100 transition-opacity duration-350 flex items-end p-5">
          <div className="pc-ov-btn text-[8.5px] tracking-[0.25em] uppercase text-[#F5F0E8] border border-[#F5F0E8]/55 py-2 px-5">
            Quick View
          </div>
        </div>
        {tag && (
          <div className="pc-tag absolute top-3.5 left-3.5 text-[8px] font-light tracking-[0.2em] uppercase py-1 px-2.5 bg-[#1C1A17] text-[#F5F0E8]">
            {tag}
          </div>
        )}
      </div>
      <div className="pc-name font-serif text-[19px] font-light text-[#1C1A17] tracking-[0.02em] mb-1">
        {name}
      </div>
      <div className="pc-sub text-[10px] font-light tracking-[0.14em] uppercase text-[#AAA49C] mb-2.5">
        {decodedSubText}
      </div>
      <div className="pc-bottom flex justify-between items-baseline">
        <span className="pc-price text-[14px] font-light text-[#1C1A17]">
          {formattedPrice}
        </span>
        {craft && (
          <span className="pc-craft text-[9px] font-light tracking-[0.14em] uppercase text-[#AAA49C]">
            {craft}
          </span>
        )}
      </div>
    </Link>
  );
}
