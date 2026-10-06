import React, { useState } from 'react';
import {
  Award,
  Search,
  Printer,
  GraduationCap,
  AlertCircle,
  FileText,
  CheckCircle,
  User,
} from 'lucide-react';
import { ResultRecord, SchoolSettings } from '../types';
import { api } from '../services/api';

interface ResultSectionProps {
  settings: SchoolSettings;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ settings }) => {
  const [academicYear, setAcademicYear] = useState('২০২৫');
  const [examTerm, setExamTerm] = useState('বার্ষিক পরীক্ষা');
  const [className, setClassName] = useState('কেজি (KG)');
  const [rollNo, setRollNo] = useState('১');
  const [studentId, setStudentId] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [resultRecord, setResultRecord] = useState<ResultRecord | null>(null);

  const availableClasses = [
    'কেজি (KG)',
    '১ম শ্রেণি (Class 1)',
    '২য় শ্রেণি (Class 2)',
    '৩য় শ্রেণি (Class 3)',
    '৪র্থ শ্রেণি (Class 4)',
    '৫ম শ্রেণি (Class 5)',
    'প্লে (Play)',
    'নার্সারি (Nursery)',
  ];

  const examTerms = ['১ম সাময়িক পরীক্ষা', '২য় সাময়িক পরীক্ষা', 'বার্ষিক পরীক্ষা'];
  const years = ['২০২৬', '২০২৫'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearched(true);
    setResultRecord(null);

    try {
      const records = await api.searchResults({
        year: academicYear,
        term: examTerm,
        className,
        rollNo: rollNo.trim(),
        studentId: studentId.trim(),
      });

      if (records && records.length > 0) {
        setResultRecord(records[0]);
      } else {
        setResultRecord(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200" id="results">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 no-print">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            ডিজিটাল পরীক্ষা ফলাফল ও মার্কশিট
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            অনলাইন রেজাল্ট ও গ্রেডশিট অনুসন্ধান
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
            শিক্ষাবর্ষ, পরীক্ষার নাম, শ্রেণি এবং রোল নম্বর দিয়ে শিক্ষার্থীর পূর্ণাঙ্গ মার্কশিট দেখুন ও প্রিন্ট করুন
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm no-print">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  শিক্ষাবর্ষ (Year)
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  পরীক্ষার নাম (Exam Term)
                </label>
                <select
                  value={examTerm}
                  onChange={(e) => setExamTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {examTerms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  শ্রেণি (Class)
                </label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {availableClasses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  রোল নম্বর (Roll No)
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ১ অথবা ২"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                (টিপস: ডেমো রেজাল্ট দেখার জন্য শিক্ষাবর্ষ ২০২৫, বার্ষিক পরীক্ষা, শ্রেণি কেজি এবং রোল ১ বা ২ দিন)
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? 'খোঁজা হচ্ছে...' : 'রেজাল্ট দেখুন'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Search Result Display */}
        {searched && !resultRecord && !isLoading && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 no-print">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">কোনো ফলাফল পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              প্রদত্ত শিক্ষাবর্ষ, পরীক্ষা, শ্রেণি ({className}) বা রোল ({rollNo})-এর জন্য এখনও ফলাফল প্রকাশ করা হয়নি অথবা এন্ট্রি মেলেনি।
            </p>
          </div>
        )}

        {/* Printable Marksheet */}
        {resultRecord && (
          <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl no-print">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-emerald-950 text-sm">
                  ফলাফল প্রস্তুত! নিচে বিস্তারিত মার্কশিট দেখুন।
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>মার্কশিট প্রিন্ট / ডাউনলোড</span>
              </button>
            </div>

            {/* Official Marksheet Document */}
            <div className="bg-white border-2 border-emerald-900 rounded-xl p-6 md:p-10 shadow-sm space-y-6 print-area">
              {/* Header Letterhead */}
              <div className="text-center border-b-2 border-emerald-900 pb-4 space-y-1">
                <div className="flex items-center justify-center gap-2 text-emerald-900">
                  <GraduationCap className="w-8 h-8 text-emerald-800" />
                  <h3 className="text-2xl font-bold">{settings.schoolNameBn}</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium">{settings.schoolNameEn}</p>
                <p className="text-xs text-slate-500">
                  {settings.address} | {settings.eiin}
                </p>
                <div className="inline-block mt-1 px-4 py-1 bg-emerald-900 text-amber-300 font-bold text-xs uppercase rounded">
                  একাডেমিক ট্রান্সক্রিপ্ট / মার্কশিট (Academic Transcript)
                </div>
              </div>

              {/* Student and Exam Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">শিক্ষার্থীর নাম:</span>
                  <strong className="text-slate-900 text-sm block">
                    {resultRecord.studentNameBn}
                  </strong>
                  <span className="text-slate-400 uppercase text-[11px]">
                    {resultRecord.studentNameEn}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">শ্রেণি ও রোল:</span>
                  <strong className="text-slate-900 text-sm block">
                    {resultRecord.className}
                  </strong>
                  <span className="text-slate-600 font-semibold">
                    রোল নং: {resultRecord.rollNo}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block">পরীক্ষার নাম:</span>
                  <strong className="text-slate-900 text-sm block">
                    {resultRecord.examTerm}
                  </strong>
                  <span className="text-slate-600">শিক্ষাবর্ষ: {resultRecord.academicYear}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">শিক্ষার্থী আইডি:</span>
                  <strong className="text-slate-900 font-mono text-sm block">
                    {resultRecord.studentId}
                  </strong>
                  <span className="text-emerald-700 font-bold">
                    মেধা স্থান: {resultRecord.position}
                  </span>
                </div>
              </div>

              {/* Marks Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 text-center font-bold">
                      <th className="border border-slate-300 py-2.5 px-3 w-12">ক্র.</th>
                      <th className="border border-slate-300 py-2.5 px-3 text-left">বিষয়ের নাম</th>
                      <th className="border border-slate-300 py-2.5 px-3 w-20">পূর্ণমান</th>
                      <th className="border border-slate-300 py-2.5 px-3 w-24">প্রাপ্ত নম্বর</th>
                      <th className="border border-slate-300 py-2.5 px-3 w-20">লেটার গ্রেড</th>
                      <th className="border border-slate-300 py-2.5 px-3 w-24">গ্রেড পয়েন্ট (GP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {resultRecord.marks.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 py-2 px-3 text-center text-slate-500">
                          {idx + 1}
                        </td>
                        <td className="border border-slate-300 py-2 px-3 font-semibold text-slate-900">
                          {m.subject}
                        </td>
                        <td className="border border-slate-300 py-2 px-3 text-center">{m.fullMarks}</td>
                        <td className="border border-slate-300 py-2 px-3 text-center font-bold text-slate-900">
                          {m.obtainedMarks}
                        </td>
                        <td className="border border-slate-300 py-2 px-3 text-center font-bold text-emerald-800">
                          {m.grade}
                        </td>
                        <td className="border border-slate-300 py-2 px-3 text-center font-semibold">
                          {m.gpa.toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    {/* Summary row */}
                    <tr className="bg-slate-100 font-bold text-slate-900">
                      <td colSpan={2} className="border border-slate-300 py-2.5 px-3 text-right">
                        মোট সর্বমোট (Grand Total):
                      </td>
                      <td className="border border-slate-300 py-2.5 px-3 text-center">
                        {resultRecord.totalFull}
                      </td>
                      <td className="border border-slate-300 py-2.5 px-3 text-center text-emerald-900 font-extrabold">
                        {resultRecord.totalObtained}
                      </td>
                      <td className="border border-slate-300 py-2.5 px-3 text-center text-emerald-800">
                        {resultRecord.overallGrade}
                      </td>
                      <td className="border border-slate-300 py-2.5 px-3 text-center text-emerald-900 font-extrabold">
                        GPA: {resultRecord.gpa.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Remarks and Grading System Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
                {/* Remarks */}
                <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900">শিক্ষকের মূল্যায়ন ও মন্তব্য:</span>
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "{resultRecord.remarks}"
                  </p>
                  <div className="pt-2 text-slate-600 flex justify-between border-t border-emerald-100">
                    <span>প্রাপ্তির শতকরা হার: <strong>{resultRecord.percentage}</strong></span>
                    <span>ফলাফল: <strong className="text-emerald-800">উত্তীর্ণ (Passed)</strong></span>
                  </div>
                </div>

                {/* Grading Scale Legend */}
                <div className="border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 space-y-1 bg-white">
                  <strong className="block text-slate-800 font-semibold pb-1 border-b border-slate-100">
                    গ্রেডিং স্কেল নির্দেশিকা:
                  </strong>
                  <div className="grid grid-cols-4 gap-1 text-center pt-1">
                    <span className="p-1 bg-slate-50 rounded">৮০-১০০ (A+ : ৫.০)</span>
                    <span className="p-1 bg-slate-50 rounded">৭০-৭৯ (A : ৪.০)</span>
                    <span className="p-1 bg-slate-50 rounded">৬০-৬৯ (A- : ৩.৫)</span>
                    <span className="p-1 bg-slate-50 rounded">৫০-৫৯ (B : ৩.০)</span>
                    <span className="p-1 bg-slate-50 rounded">৪০-৪৯ (C : ২.০)</span>
                    <span className="p-1 bg-slate-50 rounded">৩৩-৩৯ (D : ১.০)</span>
                    <span className="p-1 bg-slate-50 rounded">০-৩২ (F : ০.০)</span>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-12 flex justify-between items-end text-xs text-slate-700">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <div>শ্রেণি শিক্ষক</div>
                </div>

                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <div>পরীক্ষা নিয়ন্ত্রক</div>
                </div>

                <div className="text-center">
                  <div className="text-emerald-900 font-bold text-sm italic font-serif">
                    {settings.headmaster}
                  </div>
                  <div className="w-36 border-b border-emerald-900 mb-1"></div>
                  <div className="font-bold text-slate-900">প্রধান শিক্ষক ও অধ্যক্ষ</div>
                  <div className="text-slate-400">{settings.schoolNameBn}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
