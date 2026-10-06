import React from 'react';
import {
  GraduationCap,
  UserPlus,
  Award,
  Calendar,
  CreditCard,
  CheckCircle2,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { SchoolSettings, SchoolStats } from '../types';

interface HeroSliderProps {
  settings: SchoolSettings;
  stats: SchoolStats | null;
  onNavigate: (tab: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ settings, stats, onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-12 md:py-20 no-print">
      {/* Background Subtle Overlay Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Hero Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-700/80 px-3 py-1 rounded text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.admissionSession} ভর্তির আবেদন গ্রহণ চলছে</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                স্বাগতম{' '}
                <span className="text-amber-400 block sm:inline">
                  {settings.schoolNameBn}
                </span>
                -এ
              </h1>
              <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-2xl">
                শিশুর সুপ্ত প্রতিভার বিকাশ, ধর্মীয় ও নৈতিক মূল্যবোধের সমন্বয়ে আনন্দঘন শিশুবান্ধব শিক্ষাদানে আমরা অঙ্গীকারাবদ্ধ। আধুনিক মাল্টিমিডিয়া ক্লাসরুম ও দক্ষ শিক্ষকদের নিবিড় পরিচর্যা।
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('admission')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm md:text-base"
              >
                <UserPlus className="w-5 h-5" />
                <span>অনলাইন ভর্তি আবেদন</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('results')}
                className="px-5 py-3 bg-emerald-800/90 hover:bg-emerald-700 text-white font-semibold rounded-lg border border-emerald-600 shadow-sm transition-all flex items-center gap-2 cursor-pointer text-sm md:text-base"
              >
                <Award className="w-5 h-5 text-amber-400" />
                <span>ফলাফল অনুসন্ধান</span>
              </button>

              <button
                onClick={() => onNavigate('downloads')}
                className="px-4 py-3 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-semibold rounded-lg border border-emerald-700/80 transition-all flex items-center gap-2 cursor-pointer text-sm md:text-base"
              >
                <FileText className="w-5 h-5 text-amber-300" />
                <span>ডাউনলোড সেন্টার</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-3 text-emerald-200 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                বিদ্যালয় পরিচিতি →
              </button>
            </div>

            {/* Quick Highlights */}
            <div className="pt-4 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-emerald-100">
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>অভিজ্ঞ শিক্ষক পরিষদ</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>আইসিটি ও স্পোকেন ল্যাব</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>সহিহ কুরআন ও নৈতিক শিক্ষা</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>সিসিটিভি নিয়ন্ত্রিত ক্যাম্পাস</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Quick Actions */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur text-slate-800 rounded-xl p-5 shadow-xl border border-emerald-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-emerald-700" />
                  <span className="font-bold text-slate-800 text-base">দ্রুত সেবা সমূহ (Quick Portal)</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  অনলাইন সেবা
                </span>
              </div>

              {/* 4 Feature Action Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => onNavigate('admission')}
                  className="p-3 bg-emerald-50/70 hover:bg-emerald-100/80 rounded-lg border border-emerald-100 cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm text-slate-900">ভর্তি আবেদন</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">নতুন শিক্ষার্থীর অনলাইনে ভর্তি ফরম পূরণ</p>
                </div>

                <div
                  onClick={() => onNavigate('results')}
                  className="p-3 bg-amber-50/70 hover:bg-amber-100/80 rounded-lg border border-amber-100 cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-8 h-8 rounded-md bg-amber-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm text-slate-900">ফলাফল দেখুন</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">রোল বা আইডি দিয়ে ডিজিটাল মার্কশিট</p>
                </div>

                <div
                  onClick={() => onNavigate('notices')}
                  className="p-3 bg-sky-50/70 hover:bg-sky-100/80 rounded-lg border border-sky-100 cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-8 h-8 rounded-md bg-sky-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm text-slate-900">নোটিশ ও রুটিন</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">পরীক্ষার সময়সূচি ও জরুরি ঘোষণা</p>
                </div>

                <div
                  onClick={() => onNavigate('fees')}
                  className="p-3 bg-indigo-50/70 hover:bg-indigo-100/80 rounded-lg border border-indigo-100 cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm text-slate-900">বেতন ও ফি</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">বিকাশ/নগদ ফি পরিশোধ ও মানি রসিদ</p>
                </div>
              </div>

              {/* Statistical counters */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 text-center">
                <div>
                  <div className="text-lg font-bold text-emerald-800">
                    {stats ? `${stats.totalStudents}+` : '৩৮৫+'}
                  </div>
                  <div className="text-[11px] text-slate-500">মোট শিক্ষার্থী</div>
                </div>
                <div className="border-x border-slate-100">
                  <div className="text-lg font-bold text-emerald-800">
                    {stats ? `${stats.totalTeachers}` : '১২'} জন
                  </div>
                  <div className="text-[11px] text-slate-500">শিক্ষক-কর্মকর্তা</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-600">১০০%</div>
                  <div className="text-[11px] text-slate-500">পাসের হার</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
