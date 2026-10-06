import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  Printer,
  X,
  AlertCircle,
  Tag,
  GraduationCap,
} from 'lucide-react';
import { Notice, SchoolSettings } from '../types';

interface NoticeSectionProps {
  notices: Notice[];
  settings: SchoolSettings;
  selectedNoticeModal: Notice | null;
  setSelectedNoticeModal: (notice: Notice | null) => void;
}

export const NoticeSection: React.FC<NoticeSectionProps> = ({
  notices,
  settings,
  selectedNoticeModal,
  setSelectedNoticeModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['সকল', 'ভর্তি', 'পরীক্ষা', 'ছুটি', 'ইভেন্ট', 'ফি', 'সাধারণ'];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      selectedCategory === 'সকল' || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePrintNotice = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200" id="notices">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              বিজ্ঞপ্তি ও ঘোষণা
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              বিদ্যালয় নোটিশ বোর্ড
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              পরীক্ষা, ভর্তি, ছুটি ও দৈনন্দিন প্রাতিষ্ঠানিক সকল নোটিশ নিয়মিত হালনাগাদ করা হয়
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নোটিশ খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notice List */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-6 text-slate-500 text-sm">
            কোনো নোটিশ পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড বা ক্যাটাগরি দিয়ে চেষ্টা করুন।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-emerald-800">{notice.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{notice.date}</span>
                      </span>
                    </div>

                    {notice.isImportant && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        জরুরি
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedNoticeModal(notice)}
                    className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {notice.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                {/* Footer buttons */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {notice.id}
                  </span>

                  <button
                    onClick={() => setSelectedNoticeModal(notice)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>বিস্তারিত পড়ুন</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail & Print Modal */}
      {selectedNoticeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">নোটিশের পূর্ণাঙ্গ বিবরণ</span>
              </div>
              <button
                onClick={() => setSelectedNoticeModal(null)}
                className="p-1 hover:bg-emerald-800 rounded-md text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Area */}
            <div className="p-6 overflow-y-auto space-y-6 print-area">
              {/* Official Memo Letterhead */}
              <div className="border-b-2 border-emerald-900 pb-4 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-emerald-900">
                  <GraduationCap className="w-8 h-8 text-emerald-800" />
                  <h3 className="text-xl font-bold">{settings.schoolNameBn}</h3>
                </div>
                <p className="text-xs text-slate-600">{settings.schoolNameEn}</p>
                <p className="text-xs text-slate-500">
                  {settings.address} | হটলাইন: {settings.phone}
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 bg-slate-100 text-slate-800 font-bold text-xs uppercase rounded">
                  অফিসিয়াল বিজ্ঞপ্তি পত্র
                </div>
              </div>

              {/* Meta details */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-3">
                <div>
                  <span className="font-semibold">স্মারক নং: </span>
                  <span className="font-mono">AGKGS/{selectedNoticeModal.id}/{selectedNoticeModal.date.slice(0, 4)}</span>
                </div>
                <div>
                  <span className="font-semibold">প্রকাশের তারিখ: </span>
                  <span>{selectedNoticeModal.date}</span>
                </div>
                <div>
                  <span className="font-semibold">বিষয় ক্যাটাগরি: </span>
                  <span className="font-bold text-emerald-800">{selectedNoticeModal.category}</span>
                </div>
              </div>

              {/* Notice Title */}
              <div className="space-y-2">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  {selectedNoticeModal.title}
                </h2>
                {selectedNoticeModal.isImportant && (
                  <div className="text-xs font-semibold text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                    জরুরি নোটিশ: এই নির্দেশিকাটি সংশ্লিষ্ট সকল অভিভাবক, শিক্ষক ও শিক্ষার্থীদের যত্নসহকারে অনুসরণের অনুরোধ করা হচ্ছে।
                  </div>
                )}
              </div>

              {/* Notice Body */}
              <div className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4">
                <p>{selectedNoticeModal.content}</p>
                <p>
                  বিশেষ প্রয়োজনে প্রধান শিক্ষকের কার্যালয় অথবা অফিস চলাকালীন হটলাইনে ({settings.phone}) যোগাযোগ করার জন্য অনুরোধ জানানো হলো।
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-10 flex justify-between items-end text-xs text-slate-700">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <div>অফিস সহকারী</div>
                  <div className="text-slate-400">{settings.schoolNameBn}</div>
                </div>

                <div className="text-center">
                  <div className="text-emerald-900 font-bold text-sm italic font-serif">
                    {settings.headmaster}
                  </div>
                  <div className="w-36 border-b border-emerald-900 mb-1"></div>
                  <div className="font-bold">প্রধান শিক্ষক</div>
                  <div className="text-slate-500">{settings.schoolNameBn}</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between no-print">
              <span className="text-xs text-slate-500">
                মুদ্রণের জন্য প্রিন্ট বোতামে চাপ দিন
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintNotice}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট / ডাউনলোড</span>
                </button>
                <button
                  onClick={() => setSelectedNoticeModal(null)}
                  className="px-4 py-2 bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
