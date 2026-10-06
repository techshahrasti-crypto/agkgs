import React, { useState } from 'react';
import { Plus, Edit, Trash2, CalendarDays, CheckCircle2, X } from 'lucide-react';
import { ClassRoutineItem } from '../../types';
import { api } from '../../services/api';

interface AdminRoutinesProps {
  routines: ClassRoutineItem[];
  onRefresh: () => void;
}

export const AdminRoutines: React.FC<AdminRoutinesProps> = ({ routines, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('সকল শ্রেণি');

  const [form, setForm] = useState({
    className: 'কেজি (KG)',
    day: 'শনিবার',
    p1: 'বাংলা (পড়া ও লেখা)',
    p2: 'ইংরেজি (Oral/Rhymes)',
    p3: 'গণিত (যোগ-বিয়োগ)',
    p4: 'ধর্ম ও নৈতিকতা',
    p5: 'সাধারণ জ্ঞান',
  });

  const classList = ['প্লে (Play)', 'নার্সারি (Nursery)', 'কেজি (KG)', '১ম শ্রেণি (Class 1)', '২য় শ্রেণি (Class 2)', '৩য় শ্রেণি (Class 3)', '৪র্থ শ্রেণি (Class 4)', '৫ম শ্রেণি (Class 5)'];
  const dayList = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার'];

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      className: classList[2],
      day: dayList[0],
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      p5: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: ClassRoutineItem) => {
    setEditingId(item.id);
    setForm({
      className: item.className,
      day: item.day,
      p1: item.periods[0] || '',
      p2: item.periods[1] || '',
      p3: item.periods[2] || '',
      p4: item.periods[3] || '',
      p5: item.periods[4] || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const periods = [form.p1, form.p2, form.p3, form.p4, form.p5].filter(Boolean);

    if (editingId) {
      await api.updateRoutine(editingId, {
        className: form.className,
        day: form.day,
        periods,
      });
    } else {
      await api.createRoutine({
        className: form.className,
        day: form.day,
        periods,
      });
    }

    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই রুটিনটি মুছে ফেলতে চান?')) {
      await api.deleteRoutine(id);
      onRefresh();
    }
  };

  const filtered = selectedClass === 'সকল শ্রেণি'
    ? routines
    : routines.filter((r) => r.className === selectedClass);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            <span>শ্রেণি রুটিন ব্যবস্থাপনা (Class Routines Management)</span>
          </h3>
          <p className="text-xs text-slate-500">
            রুটিন এন্ট্রি, এডিট এবং ডিলিট করুন। ফ্রন্টএন্ডে রুটিন স্বয়ংক্রিয়ভাবে আপডেট হবে।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 text-slate-800"
          >
            <option value="সকল শ্রেণি">সকল শ্রেণি</option>
            {classList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={handleOpenAdd}
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন রুটিন যোগ</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-800 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">শ্রেণি</th>
                <th className="py-2.5 px-3 font-semibold">বার / দিন</th>
                <th className="py-2.5 px-3 font-semibold">পিরিয়ডসমূহ (বিষয় ও সময়)</th>
                <th className="py-2.5 px-3 font-semibold text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-emerald-900">{item.className}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{item.day}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {item.periods.map((p, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                          {idx + 1}. {p}
                        </span>
                      ))}
                    </div>
                  </td>
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400">
                    কোনো রুটিন পাওয়া যায়নি। নতুন রুটিন এন্ট্রি করতে উপরের বাটনে ক্লিক করুন।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingId ? 'রুটিন তথ্য সম্পাদনা (Edit Routine)' : 'নতুন রুটিন এন্ট্রি (Add Routine)'}
              </h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শ্রেণি</label>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">বার / দিন</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                  >
                    {dayList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">১ম পিরিয়ড (৯:০০-৯:৪৫)</label>
                <input
                  type="text"
                  required
                  value={form.p1}
                  onChange={(e) => setForm({ ...form, p1: e.target.value })}
                  placeholder="যেমন: বাংলা ১ম পত্র"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">২য় পিরিয়ড (৯:৪৫-১০:৩০)</label>
                <input
                  type="text"
                  value={form.p2}
                  onChange={(e) => setForm({ ...form, p2: e.target.value })}
                  placeholder="যেমন: ইংরেজি ১ম পত্র"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">৩য় পিরিয়ড (১০:৩০-১১:১৫)</label>
                <input
                  type="text"
                  value={form.p3}
                  onChange={(e) => setForm({ ...form, p3: e.target.value })}
                  placeholder="যেমন: প্রাথমিক গণিত"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">৪র্থ পিরিয়ড (১১:১৫-১২:০০)</label>
                <input
                  type="text"
                  value={form.p4}
                  onChange={(e) => setForm({ ...form, p4: e.target.value })}
                  placeholder="যেমন: ইসলাম ও নৈতিক শিক্ষা"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">৫ম পিরিয়ড (১২:০০-১২:৪৫)</label>
                <input
                  type="text"
                  value={form.p5}
                  onChange={(e) => setForm({ ...form, p5: e.target.value })}
                  placeholder="যেমন: সাধারণ বিজ্ঞান / চিত্রাঙ্কন"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                />
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
                  <span>{editingId ? 'আপডেট সংরক্ষণ' : 'রুটিন সেভ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
