import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Printer,
  Search,
  GraduationCap,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Receipt,
} from 'lucide-react';
import { FeePayment, SchoolSettings, ClassFeeItem } from '../types';
import { api } from '../services/api';

interface FeePaymentSectionProps {
  settings: SchoolSettings;
  feeStructure?: ClassFeeItem[];
}

export const FeePaymentSection: React.FC<FeePaymentSectionProps> = ({ settings, feeStructure: propFees }) => {
  const [activeTab, setActiveTab] = useState<'pay' | 'verify' | 'structure'>('pay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<FeePayment | null>(null);
  const [formError, setFormError] = useState('');

  const defaultFeeStructure = [
    { id: '1', className: 'প্লে (Play)', admission: '১,৫০০', monthly: '৬৫০', session: '১,২০০', exam: '৩৫০' },
    { id: '2', className: 'নার্সারি (Nursery)', admission: '১,৫০০', monthly: '৭০০', session: '১,২০০', exam: '৩৫০' },
    { id: '3', className: 'কেজি (KG)', admission: '১,৮০০', monthly: '৭৫০', session: '১,৫০০', exam: '৪০০' },
    { id: '4', className: '১ম শ্রেণি (Class 1)', admission: '২,০০০', monthly: '৮০০', session: '১,৫০০', exam: '৪৫০' },
    { id: '5', className: '২য় শ্রেণি (Class 2)', admission: '২,০০০', monthly: '৮৫০', session: '১,৫০০', exam: '৪৫০' },
    { id: '6', className: '৩য় শ্রেণি (Class 3)', admission: '২,২০০', monthly: '৯০০', session: '১,৮০০', exam: '৫০০' },
    { id: '7', className: '৪র্থ শ্রেণি (Class 4)', admission: '২,২০০', monthly: '৯৫০', session: '১,৮০০', exam: '৫০০' },
    { id: '8', className: '৫ম শ্রেণি (Class 5)', admission: '২,৫০০', monthly: '১,০০০', session: '২,০০০', exam: '৬০০' },
  ];

  const feeStructure = propFees && propFees.length > 0 ? propFees : defaultFeeStructure;

  // Form State
  const [paymentForm, setPaymentForm] = useState({
    studentName: '',
    studentId: 'STU-',
    className: 'কেজি (KG)',
    rollNo: '',
    month: 'মার্চ ২০২৬',
    feeType: 'মাসিক বেতন',
    amount: 750,
    paymentMethod: 'bKash' as const,
    transactionId: '',
    phone: '',
  });

  // Verification state
  const [verifyTrxId, setVerifyTrxId] = useState('');
  const [verifyResult, setVerifyResult] = useState<FeePayment | null>(null);
  const [verifyError, setVerifyError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!paymentForm.studentName || !paymentForm.rollNo) {
      setFormError('শিক্ষার্থীর নাম ও রোল নম্বর উল্লেখ করুন।');
      return;
    }

    if (!paymentForm.transactionId || paymentForm.transactionId.length < 5) {
      setFormError('সঠিক বিকাশ/নগদ ট্রানজেকশন আইডি (TrxID) প্রদান করুন।');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.submitFeePayment(paymentForm);
      setSubmittedReceipt(res);
    } catch (err) {
      setFormError('পেমেন্ট এন্ট্রি জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyTrxId.trim()) return;

    setIsVerifying(true);
    setVerifyError('');
    setVerifyResult(null);

    try {
      const res = await api.verifyPayment(verifyTrxId);
      if (res.success && res.payment) {
        setVerifyResult(res.payment);
      } else {
        setVerifyError(res.message || 'কোনো পেমেন্ট রেকর্ড মেলেনি।');
      }
    } catch (err) {
      setVerifyError('সার্ভারে যোগাযোগ করা যায়নি।');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200" id="fees">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 no-print">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            বেতন ও ফি পরিশোধ
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            অনলাইন ফি প্রদান ও ডিজিটাল রসিদ
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
            বিকাশ অথবা নগদে ফি পরিশোধের পর ট্রানজেকশন তথ্য দিয়ে তাৎক্ষণিক মানি রসিদ (Money Receipt) ডাউনলোড করুন
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center no-print">
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('pay');
                setSubmittedReceipt(null);
              }}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'pay'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ফি পরিশোধ ও রসিদ তৈরি
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'structure'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              শ্রেণিভিত্তিক ফি চার্ট
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'verify'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              রসিদ যাচাই / ট্র্যাকিং
            </button>
          </div>
        </div>

        {/* PAY TAB */}
        {activeTab === 'pay' && (
          <div>
            {!submittedReceipt ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Payment instructions */}
                <div className="md:col-span-5 bg-emerald-900 text-white rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                    <Smartphone className="w-5 h-5" />
                    <span>ফি পাঠানোর নিয়মাবলী</span>
                  </div>

                  <p className="text-xs text-emerald-100 leading-relaxed">
                    আপনার বিকাশ বা নগদ অ্যাপ থেকে নিচের নম্বরে <strong>Send Money</strong> অথবা <strong>Payment</strong> করুন।
                  </p>

                  <div className="bg-emerald-950/80 p-4 rounded-lg border border-emerald-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">বিকাশ পার্সোনাল:</span>
                      <strong className="text-amber-300 font-mono text-sm">{settings.phone}</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">নগদ একাউন্ট:</span>
                      <strong className="text-amber-300 font-mono text-sm">{settings.altPhone}</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-emerald-800/80 pt-1.5">
                      <span className="text-slate-300">রেফারেন্স:</span>
                      <span className="text-slate-200">শিক্ষার্থীর নাম/রোল</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-emerald-200">
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">১.</span>
                      <span>টাকা পাঠানো সম্পন্ন হলে প্রাপ্ত TrxID টি কপি করুন।</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">২.</span>
                      <span>ডানপাশের ফর্মে TrxID ও শিক্ষার্থীর তথ্য দিয়ে জমা দিন।</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">৩.</span>
                      <span>সাথে সাথে অফিসিয়াল প্রিন্টেবল মানি রসিদ পেয়ে যাবেন।</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-slate-900 text-base pb-2 border-b border-slate-200">
                    ফি পরিশোধের বিবরণ এন্ট্রি করুন
                  </h3>

                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          শিক্ষার্থীর নাম *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="আরিয়ান আহমেদ"
                          value={paymentForm.studentName}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, studentName: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          শ্রেণি *
                        </label>
                        <select
                          value={paymentForm.className}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, className: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          {feeStructure.map((f) => (
                            <option key={f.className} value={f.className}>
                              {f.className}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          রোল নম্বর *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: ১"
                          value={paymentForm.rollNo}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, rollNo: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          পরিশোধের মাস
                        </label>
                        <input
                          type="text"
                          placeholder="মার্চ ২০২৬"
                          value={paymentForm.month}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, month: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ফি এর ধরন
                        </label>
                        <select
                          value={paymentForm.feeType}
                          onChange={(e) =>
                            setPaymentForm({ ...paymentForm, feeType: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          <option value="মাসিক বেতন">মাসিক বেতন</option>
                          <option value="ভর্তি ফি">ভর্তি ফি</option>
                          <option value="পরীক্ষা ফি">১ম সাময়িক পরীক্ষা ফি</option>
                          <option value="সেশন চার্জ">বার্ষিক সেশন চার্জ</option>
                          <option value="আইসিটি ও বিবিধ">কম্পিউটার ও বিবিধ ফি</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          টাকার পরিমাণ (৳) *
                        </label>
                        <input
                          type="number"
                          required
                          value={paymentForm.amount}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              amount: Number(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          পেমেন্ট মাধ্যম *
                        </label>
                        <select
                          value={paymentForm.paymentMethod}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              paymentMethod: e.target.value as any,
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          <option value="bKash">bKash (বিকাশ)</option>
                          <option value="Nagad">Nagad (নগদ)</option>
                          <option value="Rocket">Rocket (রকেট)</option>
                          <option value="Cash">অফিস কাউন্টার (ক্যাশ)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ট্রানজেকশন আইডি (TrxID) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: BK9A7X5Q2R"
                          value={paymentForm.transactionId}
                          onChange={(e) =>
                            setPaymentForm({
                              ...paymentForm,
                              transactionId: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        প্রেরকের মোবাইল নম্বর (যে নম্বর থেকে টাকা পাঠানো হয়েছে)
                      </label>
                      <input
                        type="tel"
                        placeholder="০১৮১৯-XXXXXX"
                        value={paymentForm.phone}
                        onChange={(e) =>
                          setPaymentForm({ ...paymentForm, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Receipt className="w-4 h-4" />
                        <span>{isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'রসিদ সংগ্রহ করুন'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* Printable Money Receipt */
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between no-print">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-900 text-sm">
                      পেমেন্ট সফলভাবে এন্ট্রি হয়েছে! রসিদ প্রিন্ট করুন।
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrintReceipt}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      <span>রসিদ প্রিন্ট</span>
                    </button>
                    <button
                      onClick={() => setSubmittedReceipt(null)}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs cursor-pointer"
                    >
                      নতুন পেমেন্ট
                    </button>
                  </div>
                </div>

                {/* The Formal Money Receipt */}
                <div className="bg-white border-2 border-slate-800 rounded-xl p-8 shadow-sm space-y-6 max-w-2xl mx-auto print-area">
                  <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
                    <div className="flex items-center justify-center gap-2 text-emerald-900">
                      <GraduationCap className="w-7 h-7 text-emerald-800" />
                      <h3 className="text-xl font-bold">{settings.schoolNameBn}</h3>
                    </div>
                    <p className="text-xs text-slate-600">{settings.address}</p>
                    <div className="inline-block px-3 py-0.5 bg-slate-800 text-white font-bold text-xs rounded uppercase">
                      টাকা প্রাপ্তির ডিজিটাল মানি রসিদ (Money Receipt)
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-slate-500">রসিদ নং: </span>
                      <strong className="font-mono text-emerald-900">{submittedReceipt.id}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">তারিখ: </span>
                      <strong>{submittedReceipt.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">স্ট্যাটাস: </span>
                      <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {submittedReceipt.status}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                      <div className="font-bold text-slate-900 text-sm">
                        {submittedReceipt.studentName}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">শ্রেণি ও রোল:</span>
                      <div className="font-semibold text-slate-900">
                        {submittedReceipt.className} (রোল: {submittedReceipt.rollNo})
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">ফি এর বিবরণ:</span>
                      <div className="font-semibold">{submittedReceipt.feeType} ({submittedReceipt.month})</div>
                    </div>
                    <div>
                      <span className="text-slate-500">পেমেন্ট মেথড:</span>
                      <div className="font-semibold">{submittedReceipt.paymentMethod}</div>
                    </div>
                    <div className="col-span-2 p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
                      <div>
                        <span className="text-slate-500 block text-[11px]">ট্রানজেকশন আইডি (TrxID):</span>
                        <strong className="font-mono text-emerald-900 text-sm">
                          {submittedReceipt.transactionId}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[11px]">পরিশোধিত অংক:</span>
                        <span className="text-lg font-black text-emerald-900">
                          ৳ {submittedReceipt.amount}/-
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between items-end text-xs text-slate-700">
                    <div className="text-center">
                      <div className="w-24 border-b border-slate-400 mb-1"></div>
                      <div>জমা প্রদানকারী</div>
                    </div>
                    <div className="text-center">
                      <div className="w-28 border-b border-slate-400 mb-1"></div>
                      <div className="font-bold">হিসাবরক্ষক / ক্যাশিয়ার</div>
                      <div className="text-[10px] text-slate-400">{settings.schoolNameBn}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STRUCTURE TAB */}
        {activeTab === 'structure' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              {settings.admissionSession} শ্রেণিভিত্তিক ফি কাঠামো
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="py-2.5 px-3">শ্রেণি</th>
                    <th className="py-2.5 px-3 text-center">নতুন ভর্তি ফি</th>
                    <th className="py-2.5 px-3 text-center">মাসিক বেতন</th>
                    <th className="py-2.5 px-3 text-center">বার্ষিক সেশন চার্জ</th>
                    <th className="py-2.5 px-3 text-center">সাময়িক পরীক্ষা ফি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {feeStructure.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{row.className}</td>
                      <td className="py-2.5 px-3 text-center">৳ {row.admission}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-800">
                        ৳ {row.monthly}
                      </td>
                      <td className="py-2.5 px-3 text-center">৳ {row.session}</td>
                      <td className="py-2.5 px-3 text-center">৳ {row.exam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500">
              * সহোদর ভাই/বোন একই বিদ্যালয়ে অধ্যয়ন করলে মাসিক বেতনে বিশেষ ছাড় সুবিধা রয়েছে।
            </p>
          </div>
        )}

        {/* VERIFY TAB */}
        {activeTab === 'verify' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-xl mx-auto space-y-4">
            <h3 className="font-bold text-slate-900 text-center text-base">
              ট্রানজেকশন আইডি বা রসিদ নম্বর দিয়ে যাচাই করুন
            </h3>

            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                placeholder="যেমন: BK9A7X5Q2R অথবা TRX-101"
                value={verifyTrxId}
                onChange={(e) => setVerifyTrxId(e.target.value)}
                className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>যাচাই</span>
              </button>
            </form>

            {verifyError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs text-center">
                {verifyError}
              </div>
            )}

            {verifyResult && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-900">{verifyResult.studentName}</h4>
                    <span className="text-xs text-slate-500">
                      শ্রেণি: {verifyResult.className} | রোল: {verifyResult.rollNo}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {verifyResult.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>ফি: {verifyResult.feeType} ({verifyResult.month})</span>
                  <span className="font-bold text-emerald-900">৳ {verifyResult.amount}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>TrxID: {verifyResult.transactionId}</span>
                  <span>তারিখ: {verifyResult.date}</span>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setSubmittedReceipt(verifyResult);
                      setActiveTab('pay');
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>মানি রসিদ দেখুন ও প্রিন্ট করুন</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
