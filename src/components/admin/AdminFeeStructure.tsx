import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileSpreadsheet, CheckCircle2, X } from 'lucide-react';
import { ClassFeeItem } from '../../types';
import { api } from '../../services/api';

interface AdminFeeStructureProps {
  feeStructure: ClassFeeItem[];
  onRefresh: () => void;
}

export const AdminFeeStructure: React.FC<AdminFeeStructureProps> = ({ feeStructure, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    className: 'কেজি (KG)',
    admission: '১,৮০০',
    monthly: '৭৫০',
    session: '১,৫০০',
    exam: '৪০০',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      className: '',
      admission: '১,৫০০',
      monthly: '৭০০',
      session: '১,২০০',
      exam: '৪০০',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: ClassFeeItem) => {
    setEditingId(item.id);
    setForm({
      className: item.className,
      admission: item.admission,
      monthly: item.monthly,
      session: item.session,
      exam: item.exam,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await api.updateFeeStructure(editingId, form);
    } else {
      await api.createFeeStructure(form);
    }
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই শ্রেণির ফি কাঠামো মুছে ফেলতে চান?')) {
      await api.deleteFeeStructure(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>শ্রেণিভিত্তিক ফি কাঠামো কনফিগারেশন (Class Fee Structure)</span>
          </h3>
          <p className="text-xs text-slate-500">
            প্রতিটি শ্রেণির ভর্তি ফি, মাসিক বেতন ও পরীক্ষার ফি এন্ট্রি, এডিট ও পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন শ্রেণির ফি যোগ</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-800 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">শ্রেণি (Class)</th>
                <th className="py-2.5 px-3 font-semibold text-center">ভর্তি ফি (টাকা)</th>
                <th className="py-2.5 px-3 font-semibold text-center">মাসিক বেতন (টাকা)</th>
                <th className="py-2.5 px-3 font-semibold text-center">সেশন চার্জ (টাকা)</th>
                <th className="py-2.5 px-3 font-semibold text-center">পরীক্ষার ফি (টাকা)</th>
                <th className="py-2.5 px-3 font-semibold text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeStructure.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-emerald-900">{item.className}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold">৳ {item.admission}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">৳ {item.monthly}</td>
                  <td className="py-2.5 px-3 text-center font-mono">৳ {item.session}</td>
                  <td className="py-2.5 px-3 text-center font-mono">৳ {item.exam}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="এডিট করুন"
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        title="ডিলিট করুন"
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {feeStructure.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    কোনো ফি কাঠামো পাওয়া যায়নি। নতুন ফি যোগ করতে উপরের বাটনে ক্লিক করুন।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingId ? 'ফি কাঠামো সম্পাদনা (Edit Fee Structure)' : 'নতুন শ্রেণির ফি এন্ট্রি (Add Fee)'}
              </h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">শ্রেণির নাম</label>
                <input
                  type="text"
                  required
                  value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}
                  placeholder="যেমন: প্লে (Play) অথবা কেজি (KG)"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি ফি (টাকা)</label>
                  <input
                    type="text"
                    required
                    value={form.admission}
                    onChange={(e) => setForm({ ...form, admission: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">মাসিক বেতন (টাকা)</label>
                  <input
                    type="text"
                    required
                    value={form.monthly}
                    onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">সেশন চার্জ (টাকা)</label>
                  <input
                    type="text"
                    required
                    value={form.session}
                    onChange={(e) => setForm({ ...form, session: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">পরীক্ষার ফি (টাকা)</label>
                  <input
                    type="text"
                    required
                    value={form.exam}
                    onChange={(e) => setForm({ ...form, exam: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs rounded"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{editingId ? 'আপডেট সংরক্ষণ' : 'সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
