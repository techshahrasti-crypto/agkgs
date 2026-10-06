import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Teacher } from '../types';

interface TeachersSectionProps {
  teachers: Teacher[];
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ teachers }) => {
  const [filter, setFilter] = useState<string>('সকল');

  const filterCategories = [
    'সকল',
    'প্রশাসন',
    'বিজ্ঞান ও গণিত',
    'ভাষা ও সাহিত্য',
    'প্রাক-প্রাথমিক',
    'ধর্ম ও নৈতিকতা',
  ];

  const filteredTeachers = teachers.filter((t) => {
    if (filter === 'সকল') return true;
    if (filter === 'প্রশাসন') return t.designation.includes('প্রধান');
    if (filter === 'বিজ্ঞান ও গণিত') return t.subject.includes('গণিত') || t.subject.includes('বিজ্ঞান');
    if (filter === 'ভাষা ও সাহিত্য') return t.subject.includes('বাংলা') || t.subject.includes('ইংরেজি');
    if (filter === 'প্রাক-প্রাথমিক') return t.designation.includes('কেজি') || t.subject.includes('প্লে');
    if (filter === 'ধর্ম ও নৈতিকতা') return t.subject.includes('ধর্ম') || t.subject.includes('কুরআন');
    return true;
  });

  return (
    <section className="py-12 bg-white border-b border-slate-200" id="teachers">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            দক্ষ ও নিবেদিতপ্রাণ শিক্ষক পরিষদ
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            আমাদের শ্রদ্ধেয় শিক্ষক-শিক্ষিকাবৃন্দ
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            উচ্চশিক্ষিত, প্রশিক্ষণপ্রাপ্ত ও শিশুবান্ধব শিক্ষকমণ্ডলীর সার্বক্ষণিক নিবিড় পরিচর্যায় পরিচালিত
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                {/* Photo & Identity */}
                <div className="flex items-start gap-4">
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-emerald-600/80 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 uppercase">
                      {teacher.nameEn}
                    </p>
                    <div className="text-xs font-semibold text-emerald-800">
                      {teacher.designation}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    <span>যোগ্যতা: <strong>{teacher.qualification}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    <span>পাঠদান: {teacher.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-mono">{teacher.phone}</span>
                  </div>
                </div>

                {/* Quote */}
                {teacher.message && (
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded border border-slate-200/80 leading-relaxed">
                    "{teacher.message}"
                  </p>
                )}
              </div>

              <div className="px-6 py-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>যোগদান: {teacher.joiningDate}</span>
                <span className="font-mono">ID: {teacher.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
