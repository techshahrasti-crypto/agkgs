import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { GalleryItem } from '../../types';
import { api } from '../../services/api';

interface AdminGalleryProps {
  gallery: GalleryItem[];
  onRefresh: () => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ gallery, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'ক্যাম্পাস',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
    caption: '',
  });

  const categories = ['ক্যাম্পাস', 'ক্লাসরুম', 'ক্রীড়া ও সংস্কৃতি', 'পুরস্কার বিতরণী', 'অন্যান্য'];

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      category: 'ক্যাম্পাস',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
      caption: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      caption: item.caption,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.updateGalleryItem(editingId, form);
    } else {
      await api.createGalleryItem(form);
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই ছবিটি মুছে ফেলতে চান?')) {
      await api.deleteGalleryItem(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <span>ফটো গ্যালারি নিয়ন্ত্রণ (Photo Gallery Management)</span>
          </h3>
          <p className="text-xs text-slate-500">
            বিদ্যালয়ের বিভিন্ন ইভেন্ট ও ক্যাম্পাস ফটোগ্যালারি এন্ট্রি, এডিট এবং ডিলিট করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ছবি যোগ করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.caption}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>ছবি ভিউ</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    title="এডিট করুন"
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="ডিলিট করুন"
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
          কোনো ছবি পাওয়া যায়নি। নতুন ছবি যোগ করতে উপরের বাটনে ক্লিক করুন।
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingId ? 'ছবি তথ্য সম্পাদনা (Edit Photo)' : 'নতুন ছবি এন্ট্রি (Add Photo)'}
              </h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ছবির শিরোনাম (Title)</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="যেমন: বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ছবির লিংক (Image URL)</label>
                <input
                  type="url"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাপশন / বিবরণ (Caption)</label>
                <textarea
                  rows={2}
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="ছবি সম্পর্কে সংক্ষিপ্ত মন্তব্য..."
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs rounded cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{editingId ? 'আপডেট সংরক্ষণ' : 'ছবি যোগ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
