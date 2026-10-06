import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { FeePayment } from '../../types';

interface AdminFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    studentName: string;
    studentId: string;
    className: string;
    rollNo: string;
    month: string;
    feeType: string;
    amount: number;
    paymentMethod: FeePayment['paymentMethod'];
    transactionId: string;
    phone: string;
    status: FeePayment['status'];
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

export const AdminFeeModal: React.FC<AdminFeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isEditing,
}) => {
  if (!isOpen) return null;

  const classList = [
    'প্লে (Play)',
    'নার্সারি (Nursery)',
    'কেজি (KG)',
    '১ম শ্রেণি (Class 1)',
    '২য় শ্রেণি (Class 2)',
    '৩য় শ্রেণি (Class 3)',
    '৪র্থ শ্রেণি (Class 4)',
    '৫ম শ্রেণি (Class 5)',
  ];

  const feeTypes = ['মাসিক বেতন', 'ভর্তি ফি', 'সেশন চার্জ', 'পরীক্ষার ফি', 'বই ও খাতা বাবদ', 'অন্যান্য ফি'];
  const methods: FeePayment['paymentMethod'][] = ['Cash', 'bKash', 'Nagad', 'Rocket', 'Bank'];

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-60 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h4 className="font-bold text-sm text-slate-900">
            {isEditing ? 'ফি রেকর্ড সম্পাদনা (Edit Fee Record)' : 'অফিস ক্যাশ / ফি সংগ্রহ এন্ট্রি'}
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থীর নাম *</label>
            <input
              type="text"
              required
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থী আইডি</label>
              <input
                type="text"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">রোল নম্বর *</label>
              <input
                type="text"
                required
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">শ্রেণি *</label>
              <select
                value={form.className}
                onChange={(e) => setForm({ ...form, className: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                {classList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ফি এর ধরন *</label>
              <select
                value={form.feeType}
                onChange={(e) => setForm({ ...form, feeType: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                {feeTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">টাকার পরিমাণ (৳) *</label>
              <input
                type="number"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold text-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মাস / বিবরণ *</label>
              <input
                type="text"
                required
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                placeholder="যেমন: মার্চ ২০২৬"
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পরিশোধের মাধ্যম</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value as any })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                {methods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ট্রানজেকশন / ক্যাশ ভাউচার ID</label>
              <input
                type="text"
                value={form.transactionId}
                onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">অভিভাবকের মোবাইল নম্বর</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">অবস্থা (Status)</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-bold"
              >
                <option value="অনুমোদিত">অনুমোদিত (Approved)</option>
                <option value="অপেক্ষমান">অপেক্ষমান (Pending)</option>
                <option value="বাতিল">বাতিল (Rejected)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs rounded cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'আপডেট সংরক্ষণ' : 'ফি রসিদ সেভ করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
