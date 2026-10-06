import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { NoticeTicker } from './components/NoticeTicker';
import { AboutSection } from './components/AboutSection';
import { AcademicSection } from './components/AcademicSection';
import { NoticeSection } from './components/NoticeSection';
import { ResultSection } from './components/ResultSection';
import { AdmissionSection } from './components/AdmissionSection';
import { FeePaymentSection } from './components/FeePaymentSection';
import { TeachersSection } from './components/TeachersSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { DownloadCenter } from './components/DownloadCenter';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { api } from './services/api';
import {
  SchoolSettings,
  SchoolStats,
  Notice,
  Teacher,
  GalleryItem,
  DownloadItem,
  ClassRoutineItem,
  ClassFeeItem,
} from './types';

// Fallback initial settings while server responds
const defaultSettings: SchoolSettings = {
  schoolNameBn: 'আয়নাতলী জিনিয়াস কেজি স্কুল',
  schoolNameEn: 'Aynatali Genius KG School',
  eiin: 'রেজিঃ নং ১০৯৪৮২/চাঁদপুর',
  established: '২০০৮',
  motto: 'জ্ঞান, শৃঙ্খলা ও নৈতিকতায় আদর্শ শিশুবান্ধব শিক্ষাঙ্গন',
  address: 'আয়নাতলী বাজার সংলগ্ন, শাহরাস্তি, চাঁদপুর, বাংলাদেশ',
  phone: '০১৮১৯-৭৬৪৫৩২',
  altPhone: '০১৭১২-৩৪৫৬৭৮',
  email: 'aynatali.genius.kg@gmail.com',
  headmaster: 'মো. রফিকুল ইসলাম',
  headmasterPhone: '০১৮১৯-৭৬৪৫৩২',
  isAdmissionOpen: true,
  admissionSession: '২০২৬ শিক্ষাবর্ষ',
  tickerText:
    '★ ২০২৬ শিক্ষাবর্ষে প্লে থেকে ৫ম শ্রেণি পর্যন্ত নতুন ভর্তি চলছে! ★ ১ম সাময়িক পরীক্ষার রুটিন প্রকাশ হয়েছে। বিস্তারিত নোটিশ বোর্ডে দেখুন। ★ কম্পিউটার ও স্পোকেন ইংলিশের বিশেষ ক্লাসের ব্যবস্থা রয়েছে।',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [settings, setSettings] = useState<SchoolSettings>(defaultSettings);
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [routines, setRoutines] = useState<ClassRoutineItem[]>([]);
  const [feeStructure, setFeeStructure] = useState<ClassFeeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals
  const [selectedNoticeModal, setSelectedNoticeModal] = useState<Notice | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const fetchAppData = async () => {
    try {
      const [settingsRes, statsRes, noticesRes, teachersRes, galleryRes, dlRes, rtRes, feeRes] =
        await Promise.all([
          api.getSettings(),
          api.getStats(),
          api.getNotices(),
          api.getTeachers(),
          api.getGallery(),
          api.getDownloads(),
          api.getRoutines(),
          api.getFeeStructure(),
        ]);
      if (settingsRes) setSettings(settingsRes);
      if (statsRes) setStats(statsRes);
      if (noticesRes) setNotices(noticesRes);
      if (teachersRes) setTeachers(teachersRes);
      if (galleryRes) setGallery(galleryRes);
      if (dlRes) setDownloads(dlRes);
      if (rtRes) setRoutines(rtRes);
      if (feeRes) setFeeStructure(feeRes);
    } catch (err) {
      console.error('Initial data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Navigation Bar */}
      <Navbar
        settings={settings}
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Announcements Marquee Ticker */}
      <NoticeTicker
        tickerText={settings.tickerText}
        importantNotices={notices.filter((n) => n.isImportant)}
        onSelectNotice={(notice) => setSelectedNoticeModal(notice)}
        onViewAllNotices={() => handleNavigate('notices')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSlider
              settings={settings}
              stats={stats}
              onNavigate={handleNavigate}
            />
            <AboutSection
              settings={settings}
              onNavigateAdmission={() => handleNavigate('admission')}
            />
            <AcademicSection
              routines={routines}
              feeStructure={feeStructure}
              settings={settings}
              onNavigateFees={() => handleNavigate('fees')}
              onNavigateAdmission={() => handleNavigate('admission')}
            />
            <NoticeSection
              notices={notices}
              settings={settings}
              selectedNoticeModal={selectedNoticeModal}
              setSelectedNoticeModal={setSelectedNoticeModal}
            />
            <ResultSection settings={settings} />
            <AdmissionSection settings={settings} onAdmissionSuccess={fetchAppData} />
            <FeePaymentSection settings={settings} feeStructure={feeStructure} />
            <DownloadCenter
              settings={settings}
              downloads={downloads}
              onRefreshDownloads={fetchAppData}
            />
            <TeachersSection teachers={teachers} />
            <GallerySection galleryItems={gallery} />
            <ContactSection settings={settings} />
          </>
        )}

        {activeTab === 'about' && (
          <AboutSection
            settings={settings}
            onNavigateAdmission={() => handleNavigate('admission')}
          />
        )}

        {activeTab === 'academics' && (
          <AcademicSection
            routines={routines}
            feeStructure={feeStructure}
            settings={settings}
            onNavigateFees={() => handleNavigate('fees')}
            onNavigateAdmission={() => handleNavigate('admission')}
          />
        )}

        {activeTab === 'notices' && (
          <NoticeSection
            notices={notices}
            settings={settings}
            selectedNoticeModal={selectedNoticeModal}
            setSelectedNoticeModal={setSelectedNoticeModal}
          />
        )}

        {activeTab === 'results' && <ResultSection settings={settings} />}

        {activeTab === 'admission' && (
          <AdmissionSection settings={settings} onAdmissionSuccess={fetchAppData} />
        )}

        {activeTab === 'fees' && (
          <FeePaymentSection settings={settings} feeStructure={feeStructure} />
        )}

        {activeTab === 'downloads' && (
          <DownloadCenter
            settings={settings}
            downloads={downloads}
            onRefreshDownloads={fetchAppData}
          />
        )}

        {activeTab === 'teachers' && <TeachersSection teachers={teachers} />}

        {activeTab === 'gallery' && <GallerySection galleryItems={gallery} />}

        {activeTab === 'contact' && <ContactSection settings={settings} />}
      </main>

      {/* Institutional Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Administrative Backend Portal Modal */}
      {isAdminOpen && (
        <AdminPortal
          settings={settings}
          stats={stats}
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={fetchAppData}
          isLoggedIn={isAdminLoggedIn}
          setIsLoggedIn={setIsAdminLoggedIn}
        />
      )}
    </div>
  );
}
