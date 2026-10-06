import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { SchoolSettings } from '../types';
import { api } from '../services/api';

interface ContactSectionProps {
  settings: SchoolSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.senderName || !formData.phone || !formData.message) {
      setErrorMessage('নাম, মোবাইল নম্বর এবং বার্তার বিবরণ প্রদান করা আবশ্যক।');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.sendMessage(formData);
      setIsSuccess(true);
      setFormData({
        senderName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage('বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200" id="contact">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            যোগাযোগ ও অনুসন্ধান
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            ভর্তি সংক্রান্ত তথ্য, পরামর্শ বা যে কোনো জিজ্ঞাসায় আমাদের সাথে সরাসরি যোগাযোগ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
                বিদ্যালয় কার্যালয় ও যোগাযোগের ঠিকানা
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">ঠিকানা:</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">হটলাইন ও ভর্তি তথ্য:</strong>
                    <div className="font-mono">{settings.phone}</div>
                    <div className="font-mono text-slate-500">{settings.altPhone} (বিকল্প)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">ই-মেইল:</strong>
                    <span>{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">অফিস সময়সূচি:</strong>
                    <span>শনিবার হতে বৃহস্পতিবার: সকাল ৮:৩০ - দুপুর ২:০০</span>
                    <span className="block text-rose-600 font-semibold mt-0.5">
                      (শুক্রবার ও সরকারি ছুটির দিনে বন্ধ)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location guidance box */}
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-950">
              <strong className="block font-semibold">আগমনের দিকনির্দেশনা:</strong>
              <p>
                শাহরাস্তি উপজেলা সদর অথবা মেহের স্টেশন হতে অটো/সিএনজি যোগে আয়নাতলী বাজার সংলগ্ন বিদ্যালয় ক্যাম্পাসে সহজে পৌঁছানো যায়।
              </p>
            </div>
          </div>

          {/* Interactive Message / Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-4">
            <div className="space-y-1 pb-2 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>অভিভাবকের মতামত ও বার্তা প্রেরণ</span>
              </h3>
              <p className="text-xs text-slate-500">
                আপনার বার্তাটি সরাসরি প্রধান শিক্ষক ও প্রশাসনিক ড্যাশবোর্ডে পৌঁছে যাবে
              </p>
            </div>

            {isSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs md:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। অতিশীঘ্রই যোগাযোগ করা হবে।</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="মো. কবির হোসেন"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর *
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
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    বিষয় / ক্যাটাগরি *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: প্লে শ্রেণির ভর্তি তথ্য"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার বিস্তারিত বার্তা বা মতামত *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="আপনার বক্তব্য বা জিজ্ঞাসা এখানে লিখুন..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
