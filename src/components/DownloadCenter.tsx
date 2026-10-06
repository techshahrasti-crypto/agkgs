import React, { useState } from 'react';
import {
  FileDown,
  FileText,
  Search,
  Filter,
  Download,
  Printer,
  X,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  GraduationCap,
  FileSpreadsheet,
  BookOpen,
} from 'lucide-react';
import { DownloadItem, SchoolSettings } from '../types';
import { api } from '../services/api';

interface DownloadCenterProps {
  settings: SchoolSettings;
  downloads: DownloadItem[];
  onRefreshDownloads: () => void;
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({
  settings,
  downloads,
  onRefreshDownloads,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewDoc, setActivePreviewDoc] = useState<DownloadItem | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories = ['সকল', 'ভর্তি ফরম', 'সিলেবাস', 'ছুটির তালিকা', 'প্রসপেক্টাস'];

  const filteredDownloads = downloads.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'সকল' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadTrigger = async (doc: DownloadItem) => {
    try {
      await api.incrementDownloadCount(doc.id);
      onRefreshDownloads();
    } catch (err) {
      console.error(err);
    }

    // Set preview modal so user can immediately view and print/save as PDF
    setActivePreviewDoc(doc);
    setDownloadSuccessToast(`"${doc.title}" ডাউনলোড প্রস্তুত হয়েছে।`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4000);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200" id="downloads">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <FileDown className="w-4 h-4 text-emerald-600" />
              <span>ডাউনলোড সেন্টার (Download Center)</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              প্রয়োজনীয় ফরম, সিলেবাস ও ছুটির তালিকা
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              বিদ্যালয়ের অফিশিয়াল ভর্তি আবেদন ফরম, শ্রেণিভিত্তিক পাঠ্যক্রম ও বার্ষিক ছুটির তালিকা PDF সংস্করণে সংগ্রহ করুন
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ফরম বা সিলেবাস খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Filter Categories */}
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

        {/* Success Toast */}
        {downloadSuccessToast && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs md:text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{downloadSuccessToast}</span>
            </div>
            <button
              onClick={() => setDownloadSuccessToast(null)}
              className="text-emerald-700 hover:text-emerald-950 text-xs font-bold"
            >
              বন্ধ করুন
            </button>
          </div>
        )}

        {/* Downloads Grid */}
        {filteredDownloads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6 text-slate-500 text-sm">
            কোনো ফাইল পাওয়া যায়নি। অন্য কোনো কি-ওয়ার্ড দিয়ে অনুসন্ধান করুন।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDownloads.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top file meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {doc.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {doc.fileType}
                      </span>
                      <span>·</span>
                      <span>{doc.fileSize}</span>
                    </div>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center flex-shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        onClick={() => setActivePreviewDoc(doc)}
                        className="font-bold text-sm md:text-base text-slate-900 group-hover:text-emerald-800 transition-colors cursor-pointer leading-snug"
                      >
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions & Metadata */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    <span>{doc.downloadCount} বার ডাউনলোড</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActivePreviewDoc(doc)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="ডকুমেন্ট প্রিভিউ ও বিবরণ"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>প্রিভিউ</span>
                    </button>

                    <button
                      onClick={() => handleDownloadTrigger(doc)}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-md font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                      title="সরাসরি ডাউনলোড ও প্রিন্ট"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>ডাউনলোড</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DOCUMENT PREVIEW & PDF PRINT MODAL */}
      {activePreviewDoc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between no-print border-b border-emerald-900">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  অফিসিয়াল PDF ডকুমেন্ট প্রিভিউ ({activePreviewDoc.category})
                </span>
              </div>
              <button
                onClick={() => setActivePreviewDoc(null)}
                className="p-1 hover:bg-emerald-800 rounded-md text-emerald-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Printable Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 print-area bg-white text-slate-900">
              {/* Formal Letterhead */}
              <div className="border-b-2 border-emerald-950 pb-4 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-emerald-950">
                  <GraduationCap className="w-8 h-8 text-emerald-800" />
                  <h3 className="text-2xl font-bold">{settings.schoolNameBn}</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium">{settings.schoolNameEn}</p>
                <p className="text-xs text-slate-500">
                  {settings.address} | হটলাইন: {settings.phone}
                </p>
                <div className="inline-block mt-2 px-4 py-1 bg-emerald-900 text-amber-300 font-bold text-xs uppercase rounded">
                  {activePreviewDoc.contentPreview?.subtitle || activePreviewDoc.title}
                </div>
              </div>

              {/* Document Meta Row */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
                <div>
                  <span className="text-slate-500">নথি আইডি: </span>
                  <span className="font-mono font-bold text-emerald-900">{activePreviewDoc.id}</span>
                </div>
                <div>
                  <span className="text-slate-500">প্রকাশকাল: </span>
                  <span>{activePreviewDoc.publishDate}</span>
                </div>
                <div>
                  <span className="text-slate-500">ফরম্যাট ও সাইজ: </span>
                  <span className="font-bold text-rose-800">
                    {activePreviewDoc.fileType} ({activePreviewDoc.fileSize})
                  </span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                  {activePreviewDoc.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {activePreviewDoc.description}
                </p>
              </div>

              {/* Document Type Specific Content */}
              {/* IF ADMISSION FORM */}
              {activePreviewDoc.category === 'ভর্তি ফরম' && (
                <div className="space-y-4 border border-slate-300 rounded-lg p-4 bg-slate-50/50 text-xs">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 text-sm">
                        শিক্ষার্থীর অফলাইন আবেদন ফরম (হাতে পূরণের জন্য)
                      </span>
                      <p className="text-[11px] text-slate-500">
                        * এই ফরমটি প্রিন্ট করে নীল বা কালো কালির বলপয়েন্ট কলম দিয়ে স্পষ্টাক্ষরে পূরণ করুন।
                      </p>
                    </div>
                    <div className="w-24 h-28 border-2 border-dashed border-slate-400 rounded flex items-center justify-center text-center text-slate-400 text-[10px] p-1">
                      শিক্ষার্থীর পাসপোর্ট সাইজের ছবি লাগান
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-800">
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">১. শিক্ষার্থীর পূর্ণ নাম (বাংলায়):</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">Name (In English Block Letters):</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">২. ভর্তির কাঙ্ক্ষিত শ্রেণি:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৩. জন্ম তারিখ ও রক্তের গ্রুপ:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৪. ডিজিটাল জন্ম নিবন্ধন নম্বর:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৫. পূর্ববর্তী বিদ্যালয় (যদি থাকে):</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৬. পিতার নাম ও পেশা:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৭. মাতার নাম ও পেশা:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="col-span-2 border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৮. বর্তমান ও স্থায়ী ঠিকানা:</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">৯. সচল মোবাইল নম্বর (SMS এর জন্য):</span>
                      <div className="h-5"></div>
                    </div>
                    <div className="border-b border-slate-300 pb-1">
                      <span className="text-slate-500 block">১০. জরুরি যোগাযোগের নম্বর:</span>
                      <div className="h-5"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sections from metadata if available */}
              {activePreviewDoc.contentPreview?.sections?.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-2 border-t border-slate-200 pt-3 text-xs md:text-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                    <span>{sec.heading}</span>
                  </h4>
                  {Array.isArray(sec.details) ? (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2 text-xs">
                      {sec.details.map((item, iIdx) => (
                        <li key={iIdx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-700 text-xs leading-relaxed">{sec.details}</p>
                  )}
                </div>
              ))}

              {/* Official Seal and Signature */}
              <div className="pt-10 flex justify-between items-end text-xs text-slate-700">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <div>অভিভাবক / আবেদনকারী</div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-800/40 flex items-center justify-center text-[10px] text-emerald-900/60 uppercase font-bold text-center leading-tight mx-auto mb-1">
                    বিদ্যালয়ের সিলমোহর
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-emerald-950 font-bold text-sm italic font-serif">
                    {settings.headmaster}
                  </div>
                  <div className="w-36 border-b border-emerald-950 mb-1"></div>
                  <div className="font-bold text-slate-900">প্রধান শিক্ষক ও অধ্যক্ষ</div>
                  <div className="text-slate-500">{settings.schoolNameBn}</div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between no-print">
              <span className="text-xs text-slate-500 hidden sm:inline">
                প্রিন্ট বোতামে চাপ দিলে ব্রাউজারের প্রিন্ট ডায়ালগ থেকে সরাসরি PDF হিসেবে সংরক্ষণ করতে পারবেন।
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrintDocument}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>PDF প্রিন্ট / সেভ করুন</span>
                </button>
                <button
                  onClick={() => setActivePreviewDoc(null)}
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
