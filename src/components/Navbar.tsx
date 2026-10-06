import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  GraduationCap,
  FileText,
  Award,
  CreditCard,
  ShieldCheck,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { SchoolSettings } from '../types';

interface NavbarProps {
  settings: SchoolSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeTab,
  setActiveTab,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'প্রচ্ছদ' },
    { id: 'about', label: 'পরিচিতি' },
    { id: 'academics', label: 'শ্রেণি ও পাঠ্যক্রম' },
    { id: 'notices', label: 'নোটিশ বোর্ড' },
    { id: 'teachers', label: 'শিক্ষকবৃন্দ' },
    { id: 'results', label: 'ফলাফল' },
    { id: 'admission', label: 'অনলাইন ভর্তি' },
    { id: 'fees', label: 'ফি ও পেমেন্ট' },
    { id: 'downloads', label: 'ডাউনলোড' },
    { id: 'gallery', label: 'গ্যালারি' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40 no-print">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>হটলাইন: {settings.phone}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.email}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>শাহরাস্তি, চাঁদপুর</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping"></span>
              {settings.admissionSession} ভর্তি চলছে
            </span>

            <button
              onClick={onOpenAdmin}
              className="text-xs font-medium text-emerald-200 hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-emerald-800/80 cursor-pointer"
              title="বিদ্যালয় প্রশাসনিক ব্যবস্থাপনা প্যানেল"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAdminLoggedIn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'প্রশাসন লগইন'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Branding */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* School Logo & Title */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-800 text-amber-400 flex items-center justify-center shadow-md border-2 border-amber-400 flex-shrink-0 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7 md:w-8 md:h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-emerald-950 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                {settings.schoolNameBn}
              </h1>
            </div>
            <p className="text-xs md:text-sm font-medium text-slate-600 tracking-wide mt-0.5">
              {settings.schoolNameEn}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
              <span>স্থাপিত: {settings.established}</span>
              <span>·</span>
              <span>{settings.eiin}</span>
            </div>
          </div>
        </div>

        {/* Quick Action Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleNavClick('admission')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow"
          >
            <UserCheck className="w-4 h-4 text-amber-300" />
            <span>ভর্তি আবেদন</span>
          </button>
          <button
            onClick={() => handleNavClick('results')}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>অনলাইন ফলাফল</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="টগল মেনু"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-900 text-slate-200 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2.5 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-amber-400 text-amber-300 bg-slate-800/80'
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-amber-400 font-medium py-2 hidden xl:block">
            {settings.motto}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-slate-100 border-t border-slate-800 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-800 text-amber-300 font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-3 text-left rounded-md bg-slate-800 text-amber-300 text-sm font-medium flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'প্রশাসনিক লগইন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
