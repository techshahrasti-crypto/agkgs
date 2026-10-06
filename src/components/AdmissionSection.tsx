import React, { useState } from 'react';
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Search,
  GraduationCap,
  Sparkles,
  X,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { AdmissionApplication, SchoolSettings } from '../types';
import { api } from '../services/api';

interface AdmissionSectionProps {
  settings: SchoolSettings;
  onAdmissionSuccess?: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  settings,
  onAdmissionSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    studentNameBn: '',
    studentNameEn: '',
    gender: 'পুরুষ' as const,
    dateOfBirth: '',
    birthRegNo: '',
    bloodGroup: 'জানা নেই',
    className: 'কেজি (KG)',
    previousSchool: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    phone: '',
    emergencyPhone: '',
    address: 'আয়নাতলী, শাহরাস্তি, চাঁদপুর',
  });

  const [formError, setFormError] = useState('');

  // Tracking Search
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState<AdmissionApplication | null>(null);
  const [trackingNotFound, setTrackingNotFound] = useState(false);
  const [isTrackingSearching, setIsTrackingSearching] = useState(false);

  const availableClasses = [
    'প্লে (Play)',
    'নার্সারি (Nursery)',
    'কেজি (KG)',
    '১ম শ্রেণি (Class 1)',
    '২য় শ্রেণি (Class 2)',
    '৩য় শ্রেণি (Class 3)',
    '৪র্থ শ্রেণি (Class 4)',
    '৫ম শ্রেণি (Class 5)',
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'জানা নেই'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.studentNameBn || !formData.studentNameEn) {
      setFormError('শিক্ষার্থীর বাংলা ও ইংরেজি উভয় নাম পূরণ করা বাধ্যতামূলক।');
      return;
    }

    if (!formData.phone || formData.phone.length < 11) {
      setFormError('সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    if (!formData.fatherName || !formData.motherName) {
      setFormError('পিতা ও মাতার নাম প্রদান করুন।');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.submitAdmission(formData);
      setSubmittedApp(res);
      if (onAdmissionSuccess) onAdmissionSuccess();
    } catch (err) {
      setFormError('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;

    setIsTrackingSearching(true);
    setTrackingNotFound(false);
    setTrackingResult(null);

    try {
      const all = await api.getAdmissions();
      const q = trackingQuery.trim().toLowerCase();
      const match = all.find(
        (a) =>
          a.id.toLowerCase() === q ||
          a.phone.replace(/[^0-9]/g, '') === q.replace(/[^0-9]/g, '') ||
          a.birthRegNo === q
      );

      if (match) {
        setTrackingResult(match);
      } else {
        setTrackingNotFound(true);
      }
    } catch (err) {
      setTrackingNotFound(true);
    } finally {
      setIsTrackingSearching(false);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200" id="admission">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-300 px-3 py-1 rounded text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{settings.admissionSession} নতুন ভর্তি কার্যক্রম চলছে</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            অনলাইন ভর্তি ও আবেদন ট্র্যাকিং
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto">
            সহজেই ঘরে বসে আপনার সন্তানের ভর্তির আবেদন ফরম পূরণ করুন এবং প্রিন্ট কপি সংগ্রহ করুন
          </p>
        </div>

        {/* Tab switcher: Apply vs Track */}
        <div className="flex justify-center no-print">
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('apply');
                setSubmittedApp(null);
              }}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'apply'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" />
                <span>নতুন ভর্তি ফরম পূরণ</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                <span>আবেদন অনুসন্ধান / ট্র্যাকিং</span>
              </span>
            </button>
          </div>
        </div>

        {/* APPLY TAB */}
        {activeTab === 'apply' && (
          <div>
            {!submittedApp ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs md:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Student Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                        ১
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        শিক্ষার্থীর তথ্য (Student Information)
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          শিক্ষার্থীর পূর্ণ নাম (বাংলায়) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: আরিয়ান আহমেদ তাসিন"
                          value={formData.studentNameBn}
                          onChange={(e) =>
                            setFormData({ ...formData, studentNameBn: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          শিক্ষার্থীর পূর্ণ নাম (ইংরেজি ক্যাপিটাল অক্ষরে) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ARIAN AHMED TASIN"
                          value={formData.studentNameEn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              studentNameEn: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ভর্তির কাঙ্ক্ষিত শ্রেণি *
                        </label>
                        <select
                          value={formData.className}
                          onChange={(e) =>
                            setFormData({ ...formData, className: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          {availableClasses.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          লিঙ্গ (Gender) *
                        </label>
                        <div className="flex items-center gap-4 py-2">
                          {['পুরুষ', 'নারী'].map((g) => (
                            <label key={g} className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={formData.gender === g}
                                onChange={() =>
                                  setFormData({ ...formData, gender: g as any })
                                }
                                className="text-emerald-700 focus:ring-emerald-600"
                              />
                              <span>{g === 'পুরুষ' ? 'ছাত্র (Male)' : 'ছাত্রী (Female)'}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          জন্ম তারিখ *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            setFormData({ ...formData, dateOfBirth: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          অনলাইন জন্ম নিবন্ধন নম্বর (১৭ ডিজিট)
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: ২০২০১২৩৪৫৬৭৮৯০১২৩"
                          value={formData.birthRegNo}
                          onChange={(e) =>
                            setFormData({ ...formData, birthRegNo: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          রক্তের গ্রুপ (Blood Group)
                        </label>
                        <select
                          value={formData.bloodGroup}
                          onChange={(e) =>
                            setFormData({ ...formData, bloodGroup: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          {bloodGroups.map((bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          পূর্ববর্তী বিদ্যালয়ের নাম (যদি থাকে)
                        </label>
                        <input
                          type="text"
                          placeholder="পূর্বে যে প্রতিষ্ঠানে পড়ত"
                          value={formData.previousSchool}
                          onChange={(e) =>
                            setFormData({ ...formData, previousSchool: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Guardian Information */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                        ২
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        অভিভাবকের তথ্য (Guardian Information)
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          পিতার নাম *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="মো. জামাল হোসেন"
                          value={formData.fatherName}
                          onChange={(e) =>
                            setFormData({ ...formData, fatherName: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          পিতার পেশা
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: ব্যবসায়ী / চাকরিজীবী / প্রবাসী"
                          value={formData.fatherOccupation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fatherOccupation: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          মাতার নাম *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="তাহমিনা বেগম"
                          value={formData.motherName}
                          onChange={(e) =>
                            setFormData({ ...formData, motherName: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          মাতার পেশা
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: গৃহিণী / শিক্ষিকা"
                          value={formData.motherOccupation}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              motherOccupation: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          সচল মোবাইল নম্বর (SMS পাওয়ার জন্য) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="০১৮১৯-XXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          জরুরি যোগাযোগের ফোন নম্বর
                        </label>
                        <input
                          type="tel"
                          placeholder="বিকল্প নম্বর"
                          value={formData.emergencyPhone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emergencyPhone: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Address */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
                        ৩
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        বর্তমান ঠিকানা ও অঙ্গীকারনামা
                      </h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        পূর্ণ ঠিকানা (গ্রাম, ডাকঘর, উপজেলা ও জেলা) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong>অঙ্গীকারনামা:</strong> আমি এই মর্মে প্রত্যয়ন করছি যে, উপরিউক্ত সকল তথ্য সত্য ও নির্ভুল। ভবিষ্যতে কোনো তথ্য অসত্য প্রমাণিত হলে আবেদন বাতিল বলে গণ্য হবে।
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isSubmitting ? 'জমা হচ্ছে...' : 'আবেদনপত্র জমা দিন'}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Printable Voucher / Slip */
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between no-print">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm md:text-base">
                        অভিনন্দন! আপনার আবেদন সফলভাবে গৃহীত হয়েছে।
                      </h4>
                      <p className="text-xs text-emerald-800">
                        আপনার ট্র্যাকিং আইডি:{' '}
                        <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-900">
                          {submittedApp.id}
                        </strong>{' '}
                        (এটি সংরক্ষণ করুন)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintSlip}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      <span>ভাউচার প্রিন্ট করুন</span>
                    </button>
                    <button
                      onClick={() => setSubmittedApp(null)}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg cursor-pointer"
                    >
                      নতুন আবেদন
                    </button>
                  </div>
                </div>

                {/* Print area */}
                <div className="bg-white border-2 border-emerald-800 rounded-xl p-8 shadow-sm space-y-6 print-area">
                  {/* Official Letterhead */}
                  <div className="text-center border-b-2 border-emerald-900 pb-4 space-y-1">
                    <div className="flex items-center justify-center gap-2 text-emerald-900">
                      <GraduationCap className="w-8 h-8 text-emerald-800" />
                      <h3 className="text-xl font-bold">{settings.schoolNameBn}</h3>
                    </div>
                    <p className="text-xs text-slate-600">{settings.schoolNameEn}</p>
                    <p className="text-xs text-slate-500">
                      {settings.address} | হটলাইন: {settings.phone}
                    </p>
                    <div className="inline-block mt-1 px-4 py-1 bg-emerald-900 text-white font-bold text-xs uppercase rounded">
                      ভর্তি আবেদন স্লিপ / প্রবেশপত্র স্বীকারোক্তি ({settings.admissionSession})
                    </div>
                  </div>

                  {/* Tracking ID & Barcode placeholder */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
                    <div>
                      <span className="text-slate-500">আবেদন ট্র্যাকিং নম্বর: </span>
                      <strong className="font-mono text-emerald-800 text-sm">
                        {submittedApp.id}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">আবেদনের তারিখ: </span>
                      <strong className="text-slate-800">{submittedApp.applicationDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">আবেদনের অবস্থা: </span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {submittedApp.status}
                      </span>
                    </div>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-800">
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">শিক্ষার্থীর নাম (বাংলা):</span>
                      <div className="font-semibold text-slate-900">{submittedApp.studentNameBn}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">Name (English):</span>
                      <div className="font-semibold uppercase text-slate-900">{submittedApp.studentNameEn}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">ভর্তির শ্রেণি:</span>
                      <div className="font-bold text-emerald-800">{submittedApp.className}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">লিঙ্গ ও রক্তের গ্রুপ:</span>
                      <div className="font-semibold">{submittedApp.gender} · {submittedApp.bloodGroup}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">জন্ম তারিখ:</span>
                      <div className="font-semibold">{submittedApp.dateOfBirth}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">জন্ম নিবন্ধন নম্বর:</span>
                      <div className="font-mono">{submittedApp.birthRegNo || 'প্রযোজ্য নয়'}</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">পিতার নাম ও পেশা:</span>
                      <div className="font-semibold">{submittedApp.fatherName} ({submittedApp.fatherOccupation || 'ব্যবসায়ী'})</div>
                    </div>
                    <div className="border-b border-slate-100 pb-1">
                      <span className="text-slate-500">মাতার নাম ও পেশা:</span>
                      <div className="font-semibold">{submittedApp.motherName} ({submittedApp.motherOccupation || 'গৃহিণী'})</div>
                    </div>
                    <div className="col-span-2 border-b border-slate-100 pb-1">
                      <span className="text-slate-500">যোগাযোগের মোবাইল নম্বর:</span>
                      <div className="font-semibold font-mono text-slate-900">{submittedApp.phone}</div>
                    </div>
                    <div className="col-span-2 border-b border-slate-100 pb-1">
                      <span className="text-slate-500">ঠিকানা:</span>
                      <div className="text-slate-800">{submittedApp.address}</div>
                    </div>
                  </div>

                  {/* Documents Instructions */}
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                    <strong className="text-slate-900 block">ভর্তি পরীক্ষার দিন সঙ্গে আনতে হবে:</strong>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      <li>এই আবেদন স্লিপের ১ কপি প্রিন্ট কপি</li>
                      <li>শিক্ষার্থীর ২ কপি পাসপোর্ট সাইজের রঙিন ছবি</li>
                      <li>ডিজিটাল জন্ম নিবন্ধন সনদের ফটোকপি</li>
                      <li>অভিভাবকের জাতীয় পরিচয়পত্রের (NID) ফটোকপি</li>
                    </ul>
                  </div>

                  {/* Signatures */}
                  <div className="pt-12 flex justify-between items-end text-xs text-slate-700">
                    <div className="text-center">
                      <div className="w-32 border-b border-slate-400 mb-1"></div>
                      <div>অভিভাবকের স্বাক্ষর</div>
                    </div>

                    <div className="text-center">
                      <div className="w-32 border-b border-emerald-900 mb-1"></div>
                      <div className="font-bold text-emerald-900">ভর্তি সমন্বয়ক / প্রধান শিক্ষক</div>
                      <div className="text-slate-500">{settings.schoolNameBn}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TRACK TAB */}
        {activeTab === 'track' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
            <div className="max-w-xl mx-auto space-y-4">
              <h3 className="font-bold text-slate-900 text-center text-base">
                আবেদনের ট্র্যাকিং আইডি অথবা মোবাইল নম্বর দিয়ে খুঁজুন
              </h3>

              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="যেমন: ADM-2026-101 অথবা মোবাইল নম্বর"
                  value={trackingQuery}
                  onChange={(e) => setTrackingQuery(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  disabled={isTrackingSearching}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  <span>অনুসন্ধান</span>
                </button>
              </form>

              {trackingNotFound && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs md:text-sm text-center">
                  প্রদত্ত আইডি বা মোবাইল নম্বরে কোনো ভর্তি আবেদন পাওয়া যায়নি। নম্বরটি সঠিক কিনা যাচাই করুন।
                </div>
              )}

              {trackingResult && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {trackingResult.studentNameBn}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        আইডি: {trackingResult.id}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded ${
                        trackingResult.status === 'অনুমোদিত'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : trackingResult.status === 'বাতিল'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400">শ্রেণি: </span>
                      <strong className="text-slate-900">{trackingResult.className}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">তারিখ: </span>
                      <span>{trackingResult.applicationDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">পিতা: </span>
                      <span>{trackingResult.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">ফোন: </span>
                      <span className="font-mono">{trackingResult.phone}</span>
                    </div>
                  </div>

                  {trackingResult.remarks && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                      <strong>প্রশাসনিক মন্তব্য:</strong> {trackingResult.remarks}
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setSubmittedApp(trackingResult);
                        setActiveTab('apply');
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>পূর্ণাঙ্গ ভাউচার দেখুন ও প্রিন্ট করুন</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
