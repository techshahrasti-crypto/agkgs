import React from 'react';
import {
  GraduationCap,
  Target,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Award,
  HeartHandshake,
  ShieldCheck,
  Quote,
} from 'lucide-react';
import { SchoolSettings } from '../types';

interface AboutSectionProps {
  settings: SchoolSettings;
  onNavigateAdmission: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onNavigateAdmission }) => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            বিদ্যালয় পরিচিতি ও ইতিহাস
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {settings.schoolNameBn} - এক নজরে
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            চাঁদপুর জেলার শাহরাস্তি উপজেলার ঐতিহ্যবাহী আয়নাতলী এলাকায় অবস্থিত এই বিদ্যাপীঠ দীর্ঘ {Number(settings.admissionSession.slice(0, 4)) - Number(settings.established)}+ বছর ধরে আলো ছড়িয়ে আসছে।
          </p>
        </div>

        {/* 2-Column: About Narrative + Headmaster's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm md:text-base space-y-4">
              <p>
                {settings.aboutNarrative || (
                  <>
                    <strong>{settings.schoolNameBn}</strong> ২০০৮ সালে প্রতিষ্ঠিত হয়ে অদ্যবধি শিশু-কিশোরদের যুগোপযোগী আধুনিক শিক্ষা এবং ধর্মীয়-নৈতিক মূল্যবোধ গঠনে এক অনন্য ভূমিকা পালন করে আসছে। প্রতিষ্ঠানটি প্লে, নার্সারি, কেজি থেকে শুরু করে ৫ম শ্রেণি পর্যন্ত জাতীয় শিক্ষাক্রমের আলোকে শিশুবান্ধব আনন্দঘন পাঠদান পরিচালনা করছে।
                  </>
                )}
              </p>
              <p>
                আমাদের মূল দর্শন হলো— মুখস্থবিদ্যার গণ্ডি পেরিয়ে প্রতিটি শিক্ষার্থীর বোধশক্তি ও মানবিক গুণাবলীর বিকাশ সাধন। প্রাক-প্রাথমিক স্তর থেকেই খেলাধুলা, ছবি আঁকা, ছড়া-গল্প ও প্র্যাকটিকাল অ্যাক্টিভিটির মাধ্যমে শিশুদের পাঠভীতি দূর করা হয়। প্রাথমিক স্তরে গণিত ও ইংরেজির মজবুত ভিত্তির পাশাপাশি আধুনিক তথ্যপ্রযুক্তি ও কম্পিউটার শিক্ষার ওপর সর্বোচ্চ গুরুত্ব প্রদান করা হয়।
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>আমাদের রূপকল্প (Vision)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {settings.visionText || 'এমন একটি আদর্শ প্রজন্ম তৈরি করা যারা প্রাতিষ্ঠানিক শিক্ষায় শ্রেষ্ঠত্ব অর্জনের পাশাপাশি সততা, দেশপ্রেম ও মানবিকতায় আলোকিত হবে।'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>আমাদের অভিলক্ষ্য (Mission)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {settings.missionText || 'শিশুদের শারীরিক, মানসিক ও বৌদ্ধিক প্রতিভার সামগ্রিক বিকাশ ঘটিয়ে আধুনিক পৃথিবীর উপযোগী সুযোগ্য নাগরিক হিসেবে গড়ে তোলা।'}
                </p>
              </div>
            </div>

            {/* Key Distinctive Features list */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900">কেন আয়নাতলী জিনিয়াস কেজি স্কুল অনন্য?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>স্নেহশীল ও প্রশিক্ষণপ্রাপ্ত অভিজ্ঞ শিক্ষক পরিষদ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>প্রতিটি শ্রেণির জন্য বিশেষ স্পোকেন ইংলিশ সেশন</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>সহিহ কুরআন শিক্ষা ও নৈতিকতার ব্যবহারিক চর্চা</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>মাসিক অভিভাবক সমাবেশ ও প্রগতি রিপোর্ট প্রদান</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>কম্পিউটার ল্যাবে প্রাথমিক তথ্যপ্রযুক্তি প্রশিক্ষণ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>বার্ষিক ক্রীড়া, কুইজ ও সাংস্কৃতিক প্রতিযোগিতা</span>
                </div>
              </div>
            </div>
          </div>

          {/* Headmaster's Speech Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-xs relative">
              <Quote className="w-10 h-10 text-emerald-200 absolute top-4 right-4" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={settings.headmasterPhotoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"}
                  alt={settings.headmaster}
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{settings.headmaster}</h3>
                  <p className="text-xs text-emerald-700 font-semibold">প্রধান শিক্ষক ও অধ্যক্ষ</p>
                  <p className="text-xs text-slate-500">{settings.schoolNameBn}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs md:text-sm text-slate-600 leading-relaxed italic border-t border-slate-200 pt-3">
                <p>
                  "{settings.headmasterMessage || 'বিসমিল্লাহির রাহমানির রাহিম। একটি শিশুর সবচেয়ে সংবেদনশীল ও গঠনমূলক বয়স হলো তার প্রাক-প্রাথমিক ও প্রাথমিক কাল। আয়নাতলী জিনিয়াস কেজি স্কুলে আমরা প্রতিটি সন্তানকে আমাদের নিজস্ব সন্তানের মতো পরম যত্নে আগলে রেখে আধুনিক ও নৈতিক শিক্ষায় গড়ে তুলি।'}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">যোগাযোগ: {settings.headmasterPhone}</span>
                <button
                  onClick={onNavigateAdmission}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  ভর্তি তথ্য দেখুন →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
