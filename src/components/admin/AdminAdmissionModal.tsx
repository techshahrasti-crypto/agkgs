import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { AdmissionApplication } from '../../types';

interface AdminAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    studentNameBn: string;
    studentNameEn: string;
    gender: AdmissionApplication['gender'];
    dateOfBirth: string;
    birthRegNo: string;
    bloodGroup: string;
    className: string;
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    phone: string;
    address: string;
    status: AdmissionApplication['status'];
    remarks: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

export const AdminAdmissionModal: React.FC<AdminAdmissionModalProps> = ({
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

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-60 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h4 className="font-bold text-sm text-slate-900">
            {isEditing ? 'ভর্তি আবেদন তথ্য সম্পাদনা (Edit Admission)' : 'অফিস কাউন্টার থেকে নতুন ভর্তি এন্ট্রি'}
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থীর নাম (বাংলা) *</label>
              <input
                type="text"
                required
                value={form.studentNameBn}
                onChange={(e) => setForm({ ...form, studentNameBn: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name (English)</label>
              <input
                type="text"
                value={form.studentNameEn}
                onChange={(e) => setForm({ ...form, studentNameEn: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি শ্রেণি *</label>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">লিঙ্গ</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              >
                <option value="পুরুষ">পুরুষ</option>
                <option value="নারী">নারী</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">রক্তের গ্রুপ</label>
              <input
                type="text"
                value={form.bloodGroup}
                onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                placeholder="A+, B+, O+..."
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পিতার নাম *</label>
              <input
                type="text"
                required
                value={form.fatherName}
                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মাতার নাম *</label>
              <input
                type="text"
                required
                value={form.motherName}
                onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">আবেদন অবস্থা (Status)</label>
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">ঠিকানা</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">অফিস মন্তব্য (Remarks)</label>
            <input
              type="text"
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
              placeholder="যাচাই সম্পন্ন / প্রয়োজনীয় নথিপত্র প্রাপ্ত..."
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
            />
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
              <span>{isEditing ? 'আপডেট সংরক্ষণ' : 'ভর্তি এন্ট্রি সেভ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
