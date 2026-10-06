import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Shirt,
  CalendarDays,
  CheckCircle,
  FileSpreadsheet,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ClassRoutineItem, ClassFeeItem, SchoolSettings } from '../types';

interface AcademicSectionProps {
  routines?: ClassRoutineItem[];
  feeStructure?: ClassFeeItem[];
  settings?: SchoolSettings;
  onNavigateFees?: () => void;
  onNavigateAdmission?: () => void;
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({
  routines: propRoutines,
  feeStructure: propFees,
  settings,
  onNavigateFees,
  onNavigateAdmission,
}) => {
  const fallbackRoutines: Record<string, Array<{ day: string; periods: string[] }>> = {
    'কেজি (KG)': [
      { day: 'শনিবার', periods: ['বাংলা (হাতের লেখা)', 'ইংরেজি (Oral/Rhymes)', 'গণিত (যোগ-বিয়োগ)', 'ধর্ম ও নৈতিকতা'] },
      { day: 'রবিবার', periods: ['ইংরেজি (Alphabet & Words)', 'গণিত (সংখ্যা গণনা)', 'বাংলা (পড়া ও লেখা)', 'সাধারণ জ্ঞান'] },
      { day: 'সোমবার', periods: ['বাংলা (যুক্তবর্ণ পরিচিতি)', 'ইংরেজি (Spoken Words)', 'গণিত (নামতা চর্চা)', 'অঙ্কন ও খেলাধুলা'] },
      { day: 'মঙ্গলবার', periods: ['ইংরেজি (Reading Practice)', 'গণিত (সমস্যা সমাধান)', 'বাংলা (ছড়া ও গল্প)', 'সহিহ কুরআন শিক্ষা'] },
      { day: 'বুধবার', periods: ['বাংলা (মৌখিক ও লিখিত)', 'ইংরেজি (Spelling)', 'গণিত (ওয়ার্কশিট)', 'সাধারণ জ্ঞান কুইজ'] },
      { day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক মূল্যায়ন পরীক্ষা', 'হাতের কাজ ও চিত্রাঙ্কন', 'নৈতিক গল্প সেশন', 'ছুটি'] },
    ],
    '১ম শ্রেণি (Class 1)': [
      { day: 'শনিবার', periods: ['বাংলা ১ম পত্র', 'ইংরেজি ১ম পত্র', 'প্রাথমিক গণিত', 'ইসলাম ও নৈতিক শিক্ষা', 'ড্রয়িং'] },
      { day: 'রবিবার', periods: ['ইংরেজি ১ম পত্র', 'প্রাথমিক গণিত', 'বাংলা ২য় পত্র', 'পরিবেশ ও বিজ্ঞান', 'হস্তলিপি'] },
      { day: 'সোমবার', periods: ['প্রাথমিক গণিত', 'বাংলা ব্যাকরণ', 'ইংরেজি গ্রামার', 'ধর্ম ও নৈতিকতা', 'কম্পিউটার বেসিক'] },
      { day: 'মঙ্গলবার', periods: ['বাংলা ১ম পত্র', 'ইংরেজি রিডিং', 'প্রাথমিক গণিত', 'সাধারণ জ্ঞান', 'খেলাধুলা'] },
      { day: 'বুধবার', periods: ['ইংরেজি ২য় পত্র', 'প্রাথমিক বিজ্ঞান', 'গণিত সমস্যা', 'বাংলা পাঠ', 'নৈতিকতা চর্চা'] },
      { day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক ক্লাস টেস্ট', 'স্পোকেন ইংলিশ', 'হাতের কাজ', 'পুরস্কার ও নীতিবাক্য', 'ছুটি'] },
    ],
    '৫ম শ্রেণি (Class 5)': [
      { day: 'শনিবার', periods: ['বাংলা (বোর্ড প্রস্তুতি)', 'ইংরেজি ১ম ও গ্রামার', 'উচ্চতর গণিত চর্চা', 'প্রাথমিক বিজ্ঞান', 'ধর্মীয় শিক্ষা'] },
      { day: 'রবিবার', periods: ['প্রাথমিক গণিত (মডেল টেস্ট)', 'ইংরেজি স্পোকেন ও লিখিত', 'বাংলাদেশ ও বিশ্বপরিচয়', 'বাংলা ব্যাকরণ', 'বিজ্ঞান ল্যাব'] },
      { day: 'সোমবার', periods: ['ইংরেজি (Question Solve)', 'বাংলা (রচনাবলী ও ভাবার্থ)', 'গণিত (জ্যামিতি ও সমাধান)', 'বিজ্ঞান প্রশ্নব্যাংক', 'কম্পিউটার'] },
      { day: 'মঙ্গলবার', periods: ['প্রাথমিক গণিত টেস্ট', 'ইংরেজি ২য় পত্র', 'বাংলাদেশ ও বিশ্বপরিচয়', 'ইসলাম ও নৈতিক শিক্ষা', 'কুইজ'] },
      { day: 'বুধবার', periods: ['বাংলা ১ম ও ২য়', 'ইংরেজি রিভিশন', 'গণিত রিভিশন', 'সাধারণ বিজ্ঞান প্রস্তুতি', 'সহশিক্ষা'] },
      { day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক পূর্ণাঙ্গ মডেল টেস্ট', 'উত্তরপত্র মূল্যায়ন', 'পরামর্শ সভা', 'ছুটি'] },
    ],
  };

  // Build dynamic routine dictionary if propRoutines provided
  const routineDict: Record<string, Array<{ day: string; periods: string[] }>> = {};
  if (propRoutines && propRoutines.length > 0) {
    propRoutines.forEach((item) => {
      if (!routineDict[item.className]) {
        routineDict[item.className] = [];
      }
      routineDict[item.className].push({
        day: item.day,
        periods: item.periods,
      });
    });
  }

  const activeRoutines = Object.keys(routineDict).length > 0 ? routineDict : fallbackRoutines;
  const routineClasses = Object.keys(activeRoutines);

  const [selectedRoutineClass, setSelectedRoutineClass] = useState<string>(
    routineClasses[0] || 'কেজি (KG)'
  );

  const classesInfo = [
    {
      name: 'প্লে শ্রেণি (Play Group)',
      age: 'বয়স ৩+ বছর',
      focus: 'আনন্দময় ও ভয়হীন পরিবেশে শিক্ষা',
      features: [
        'খেলার ছলে বাংলা ও ইংরেজি বর্ণমালা পরিচয়',
        'মজার মজার ছড়া, গল্প ও সুরের মাধ্যমে শিখন',
        'রং চেনানো ও সহজ ছবি আঁকা',
        'আদব-কায়দা ও পরিষ্কার-পরিচ্ছন্নতা অভ্যাস',
      ],
      tag: 'প্রাক-প্রাথমিক',
    },
    {
      name: 'নার্সারি শ্রেণি (Nursery)',
      age: 'বয়স ৪+ বছর',
      focus: 'শব্দ গঠন ও সংখ্যা ধারণা',
      features: [
        'সহজ শব্দ গঠন ও হাতের লেখার প্রাথমিক প্রশিক্ষণ',
        '১ থেকে ১০০ এবং 1 to 100 পর্যন্ত গণনা ও লেখা',
        'প্রাথমিক আরবি বর্ণমালা ও ক্যালিমা শিক্ষা',
        'সাধারণ জ্ঞান ও চারপাশের পরিবেশ পর্যবেক্ষণ',
      ],
      tag: 'প্রাক-প্রাথমিক',
    },
    {
      name: 'কেজি শ্রেণি (Kindergarten)',
      age: 'বয়স ৫+ বছর',
      focus: 'প্রাথমিক স্তরে প্রবেশের মজবুত প্রস্তুতি',
      features: [
        'বাক্য তৈরি, রিডিং পড়া ও যুক্তবর্ণ পরিচিতি',
        'সহজ যোগ, বিয়োগ ও নামতা মুখস্থকরণ',
        'দৈনন্দিন ব্যবহৃত ইংরেজি বাক্যাংশ (Spoken English)',
        'সাধারণ ড্রয়িং ও মানসিক দক্ষতা বৃদ্ধি',
      ],
      tag: 'কেজি শাখা',
    },
    {
      name: '১ম থেকে ৫ম শ্রেণি (Primary Section)',
      age: 'বয়স ৬+ থেকে ১০+ বছর',
      focus: 'জাতীয় পাঠ্যক্রম ও যুগোপযোগী দক্ষতা',
      features: [
        'NCTB অনুমোদিত মূল পাঠ্যপুস্তকের গভীর অনুধাবন',
        'ইংরেজি ও গণিতে বিশেষ যত্ন ও আলাদা ওয়ার্কশিট',
        'ডিজিটাল কম্পিউটার ল্যাবে তথ্যপ্রযুক্তি প্রশিক্ষণ',
        'নৈতিক চরিত্র গঠন ও মেধা যাচাই পরীক্ষা',
      ],
      tag: 'প্রাথমিক শাখা',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200" id="academics">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            শিক্ষাক্রম ও শ্রেণি কার্যক্রম
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            শ্রেণিভিত্তিক পাঠ্যক্রম ও পাঠদান পদ্ধতি
          </h2>
          <p className="text-sm text-slate-600">
            বয়সোপযোগী পাঠ্যসূচি এবং আধুনিক শিক্ষণ পদ্ধতির মেলবন্ধনে প্রতিটি শ্রেণির পাঠদান পরিচালিত হয়
          </p>
        </div>

        {/* 4 Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classesInfo.map((cls, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">{cls.tag}</span>
                  <span className="text-slate-500">{cls.age}</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">{cls.name}</h3>
                  <p className="text-xs text-amber-700 font-medium mt-0.5">{cls.focus}</p>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-2">
                  {cls.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 leading-tight">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200 text-center">
                {onNavigateAdmission ? (
                  <button
                    onClick={onNavigateAdmission}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>অনলাইনে ভর্তি ফরম পূরণ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 font-medium">ভর্তি ফরম উন্মুক্ত রয়েছে</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Routine Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                <span>দৈনন্দিন ক্লাস রুটিন (Class Schedule)</span>
              </div>
              <p className="text-xs text-slate-500">
                শ্রেণি নির্বাচন করে সাপ্তাহিক ক্লাসের পিরিয়ড ও সময়সূচি দেখুন (ব্যাকএন্ড থেকে স্বয়ংক্রিয়ভাবে নিয়ন্ত্রিত)
              </p>
            </div>

            {/* Routine Class selector buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg">
              {routineClasses.map((cName) => (
                <button
                  key={cName}
                  onClick={() => setSelectedRoutineClass(cName)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    selectedRoutineClass === cName
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cName}
                </button>
              ))}
            </div>
          </div>

          {/* Routine Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white border-b border-emerald-800">
                  <th className="py-2.5 px-3 font-semibold rounded-tl-lg">দিন / বার</th>
                  <th className="py-2.5 px-3 font-semibold">১ম পিরিয়ড (৯:০০-৯:৪৫)</th>
                  <th className="py-2.5 px-3 font-semibold">২য় পিরিয়ড (৯:৪৫-১০:৩০)</th>
                  <th className="py-2.5 px-3 font-semibold">৩য় পিরিয়ড (১০:৩০-১১:১৫)</th>
                  <th className="py-2.5 px-3 font-semibold">৪র্থ পিরিয়ড (১১:১৫-১২:০০)</th>
                  <th className="py-2.5 px-3 font-semibold rounded-tr-lg">৫ম পিরিয়ড (১২:০০-১২:৪৫)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {(activeRoutines[selectedRoutineClass] || []).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-emerald-900 bg-slate-50/50">
                      {row.day}
                    </td>
                    {row.periods.map((p, pIdx) => (
                      <td key={pIdx} className="py-2.5 px-3">
                        <span className="font-medium text-slate-800">{p}</span>
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 5 - row.periods.length) }).map((_, fIdx) => (
                      <td key={`empty-${fIdx}`} className="py-2.5 px-3 text-slate-400 italic">
                        টিফিন / প্রস্তুতি
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-slate-500 text-right">
            * প্রতিদিন সকাল ৮:৪৫ মিনিটে অ্যাসেম্বলি ও জাতীয় সঙ্গীত শুরু হয়।
          </div>
        </div>

        {/* Dynamic Class Fee Overview if available */}
        {propFees && propFees.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>শ্রেণিভিত্তিক ফি কাঠামো (Fee Chart)</span>
                </div>
                <p className="text-xs text-slate-500">
                  প্লে থেকে ৫ম শ্রেণি পর্যন্ত নির্ধারিত স্বচ্ছ ফি তালিকা
                </p>
              </div>

              {onNavigateFees && (
                <button
                  onClick={onNavigateFees}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
                >
                  <span>অনলাইনে ফি পরিশোধ ও যাচাই</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-emerald-900 text-white">
                    <th className="py-2.5 px-3 font-semibold">শ্রেণি (Class)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">ভর্তি ফি (টাকা)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">মাসিক বেতন (টাকা)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">সেশন চার্জ (টাকা)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">পরীক্ষার ফি (টাকা)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {propFees.map((f, fIdx) => (
                    <tr key={f.id || fIdx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-emerald-900">{f.className}</td>
                      <td className="py-2.5 px-3 text-center font-mono">৳ {f.admission}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">৳ {f.monthly}</td>
                      <td className="py-2.5 px-3 text-center font-mono">৳ {f.session}</td>
                      <td className="py-2.5 px-3 text-center font-mono">৳ {f.exam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2 Cards: School Timing & Dress Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timing Card */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>বিদ্যালয়ের সময়সূচি (School Timings)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium">অ্যাসেম্বলি ও শপথ পাঠ:</span>
                <span className="font-semibold text-slate-900">
                  {settings?.timingAssembly || 'সকাল ৮:৪৫ - ৯:০০'}
                </span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium">প্রাক-প্রাথমিক (প্লে ও নার্সারি):</span>
                <span className="font-semibold text-slate-900">
                  {settings?.timingPrePrimary || 'সকাল ৯:০০ - বেলা ১১:৪৫'}
                </span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-medium">কেজি ও প্রাথমিক শাখা (১ম - ৫ম):</span>
                <span className="font-semibold text-slate-900">
                  {settings?.timingPrimary || 'সকাল ৯:০০ - দুপুর ১:৩০'}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">অফিস কার্যক্রম ও অভিভাবক সাক্ষাৎ:</span>
                <span className="font-semibold text-emerald-700">
                  {settings?.timingOffice || 'সকাল ৮:৩০ - দুপুর ২:০০'}
                </span>
              </li>
            </ul>
          </div>

          {/* Dress Code Card */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Shirt className="w-5 h-5 text-emerald-600" />
              <span>পোশাকের নিয়মাবলী (Dress Code)</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 bg-white border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-0.5">ছাত্রদের পোশাক:</strong>
                সাদা শার্ট, নেভি ব্লু প্যান্ট, সাদা মোজা, কালো জুতো এবং স্কুলের নির্ধারিত আইডি কার্ড ও মনোগ্রাম সম্বলিত টাই।
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-0.5">ছাত্রীদের পোশাক:</strong>
                নেভি ব্লু ফ্রক/কুর্তি, সাদা পায়জামা/লেগিংস, সাদা ওড়না/স্কার্ফ, সাদা মোজা, কালো জুতো এবং নির্ধারিত ব্যাজ।
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
