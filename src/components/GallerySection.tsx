import React, { useState } from 'react';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [selectedFilter, setSelectedFilter] = useState('সকল');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['সকল', 'ক্রীড়া', 'ক্লাসরুম', 'জাতীয় উৎসব', 'বিজ্ঞান ও মেলা', 'সাংস্কৃতিক', 'ল্যাব ও প্রযুক্তি'];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedFilter === 'সকল') return true;
    return item.category === selectedFilter;
  });

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            ফটোগ্রাফিক স্মৃতি ও ইভেন্ট
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            বিদ্যালয়ের আনন্দময় মুহূর্ত ও ফটো গ্যালারি
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            শিক্ষা, খেলাধুলা, সাংস্কৃতিক উৎসব ও জাতীয় দিবসের স্মরণীয় মুহূর্তসমূহ
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-8 h-8" />
                </div>
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={lightboxItem.imageUrl}
              alt={lightboxItem.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-5 space-y-1 bg-white">
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {lightboxItem.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 pt-1">
                {lightboxItem.title}
              </h3>
              <p className="text-xs text-slate-600">
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
