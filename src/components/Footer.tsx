import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { SchoolSettings } from '../types';

interface FooterProps {
  settings: SchoolSettings;
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 no-print">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-amber-400 text-amber-400 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {settings.schoolNameBn}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {settings.schoolNameEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {settings.motto}। প্রাক-প্রাথমিক ও প্রাথমিক স্তরে আধুনিক, শিশুবান্ধব এবং নৈতিক মূল্যবোধসম্পন্ন মানসম্মত শিক্ষার এক নির্ভরযোগ্য বিদ্যাপীঠ।
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div>
                <span>রেজিস্ট্রেশন নম্বর: </span>
                <span className="text-amber-400 font-mono font-semibold">{settings.eiin}</span>
              </div>
              <div>
                <span>প্রতিষ্ঠাকাল: </span>
                <span className="text-slate-300">{settings.established} ইং</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('admission')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>অনলাইন ভর্তি আবেদন ({settings.admissionSession})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>পরীক্ষার ফলাফল ও মার্কশিট অনুসন্ধান</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>বিদ্যালয় নোটিশ বোর্ড</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academics')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>শ্রেণিভিত্তিক রুটিন ও সিলেবাস</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fees')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>অনলাইন ফি ও মানি রসিদ যাচাই</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('downloads')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>ডাউনলোড সেন্টার (ভর্তি ফরম, সিলেবাস ও ছুটির তালিকা)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teachers')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>শিক্ষকমণ্ডলীর তালিকা</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              যোগাযোগের ঠিকানা
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-mono text-slate-200">
                  {settings.phone} / {settings.altPhone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>শনিবার হতে বৃহস্পতিবার: সকাল ৮:৩০ - দুপুর ২:০০</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>প্রশাসনিক ম্যানেজমেন্ট কনসোল</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} {settings.schoolNameBn}। সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>শাহরাস্তি, চাঁদপুর</span>
            <span>·</span>
            <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত পাঠ্যক্রম</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
