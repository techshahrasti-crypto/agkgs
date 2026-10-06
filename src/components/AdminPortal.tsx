import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Bell,
  Award,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Printer,
  Edit,
  Eye,
  Key,
  Lock,
  Sparkles,
  RefreshCw,
  FileDown,
  CalendarDays,
  FileSpreadsheet,
  Image as ImageIcon,
} from 'lucide-react';
import {
  SchoolSettings,
  SchoolStats,
  Notice,
  Teacher,
  AdmissionApplication,
  ResultRecord,
  FeePayment,
  ContactMessage,
  DownloadItem,
  ClassRoutineItem,
  ClassFeeItem,
  GalleryItem,
} from '../types';
import { api } from '../services/api';
import { AdminRoutines } from './admin/AdminRoutines';
import { AdminFeeStructure } from './admin/AdminFeeStructure';
import { AdminGallery } from './admin/AdminGallery';
import { AdminAdmissionModal } from './admin/AdminAdmissionModal';
import { AdminFeeModal } from './admin/AdminFeeModal';

interface AdminPortalProps {
  settings: SchoolSettings;
  stats: SchoolStats | null;
  onClose: () => void;
  onRefreshData: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  settings,
  stats,
  onClose,
  onRefreshData,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    | 'overview'
    | 'admissions'
    | 'notices'
    | 'results'
    | 'teachers'
    | 'fees'
    | 'feeStructure'
    | 'routines'
    | 'downloads'
    | 'gallery'
    | 'messages'
    | 'settings'
  >('overview');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('geniuskg2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [fees, setFees] = useState<FeePayment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [routines, setRoutines] = useState<ClassRoutineItem[]>([]);
  const [feeStructure, setFeeStructure] = useState<ClassFeeItem[]>([]);

  // Modals & Editing states
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'সাধারণ' as Notice['category'],
    content: '',
    isImportant: false,
    date: new Date().toISOString().split('T')[0],
  });

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    nameEn: '',
    designation: 'সহকারী শিক্ষক',
    qualification: 'বি.এ, বি.এড',
    subject: 'সাধারণ',
    phone: '০১৮১৯-XXXXXX',
    email: 'teacher@aynataligenius.edu.bd',
    joiningDate: '২০২৬-০১-০১',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    message: '',
  });

  const [showResultModal, setShowResultModal] = useState(false);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);
  const [resultForm, setResultForm] = useState({
    studentId: 'STU-1006',
    studentNameBn: '',
    studentNameEn: '',
    rollNo: '',
    className: 'কেজি (KG)',
    examTerm: 'বার্ষিক পরীক্ষা',
    academicYear: '২০২৬',
    bangla: 85,
    english: 85,
    math: 90,
    science: 45,
    religion: 48,
    remarks: 'ভালো ফলাফল। শুভকামনা রইল।',
  });

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [editingDownloadId, setEditingDownloadId] = useState<string | null>(null);
  const [downloadForm, setDownloadForm] = useState({
    title: '',
    category: 'ভর্তি ফরম' as DownloadItem['category'],
    description: '',
    fileType: 'PDF',
    fileSize: '১.২ মেগাবাইট',
    instructions: '',
  });

  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [editingAdmissionId, setEditingAdmissionId] = useState<string | null>(null);
  const [admissionForm, setAdmissionForm] = useState({
    studentNameBn: '',
    studentNameEn: '',
    gender: 'পুরুষ' as AdmissionApplication['gender'],
    dateOfBirth: '2020-01-01',
    birthRegNo: '',
    bloodGroup: 'B+',
    className: 'কেজি (KG)',
    fatherName: '',
    fatherOccupation: 'ব্যবসায়ী',
    motherName: '',
    motherOccupation: 'গৃহিণী',
    phone: '০১৮১৯-XXXXXX',
    address: 'শাহরাস্তি, চাঁদপুর',
    status: 'অনুমোদিত' as AdmissionApplication['status'],
    remarks: '',
  });

  const [showFeeModal, setShowFeeModal] = useState(false);
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [feeForm, setFeeForm] = useState({
    studentName: '',
    studentId: 'STU-1001',
    className: 'কেজি (KG)',
    rollNo: '০১',
    month: 'মার্চ ২০২৬',
    feeType: 'মাসিক বেতন',
    amount: 750,
    paymentMethod: 'Cash' as FeePayment['paymentMethod'],
    transactionId: 'CASH-' + Math.floor(1000 + Math.random() * 9000),
    phone: '০১৮১৯-XXXXXX',
    status: 'অনুমোদিত' as FeePayment['status'],
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load all data on mount or when logged in
  const loadData = async () => {
    try {
      const [admRes, notRes, resRes, tchRes, feeRes, msgRes, dlRes, galRes, rtRes, feeStructRes] = await Promise.all([
        api.getAdmissions(),
        api.getNotices(),
        api.getResults(),
        api.getTeachers(),
        api.getFeeRecords(),
        api.getMessages(),
        api.getDownloads(),
        api.getGallery(),
        api.getRoutines(),
        api.getFeeStructure(),
      ]);
      setAdmissions(admRes || []);
      setNotices(notRes || []);
      setResults(resRes || []);
      setTeachers(tchRes || []);
      setFees(feeRes || []);
      setMessages(msgRes || []);
      setDownloads(dlRes || []);
      setGallery(galRes || []);
      setRoutines(rtRes || []);
      setFeeStructure(feeStructRes || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await api.loginAdmin({
        username: loginUsername,
        password: loginPassword,
      });

      if (res.success) {
        setIsLoggedIn(true);
      } else {
        setLoginError(res.message || 'লগইন ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      setLoginError('সার্ভারে যোগাযোগ করা যায়নি।');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginUsername('admin');
    setLoginPassword('geniuskg2026');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Admission Actions
  const handleSaveAdmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAdmissionId) {
      await api.updateAdmission(editingAdmissionId, admissionForm);
    } else {
      await api.submitAdmission(admissionForm);
    }
    setShowAdmissionModal(false);
    setEditingAdmissionId(null);
    loadData();
    onRefreshData();
  };

  const handleUpdateAdmissionStatus = async (
    id: string,
    status: AdmissionApplication['status']
  ) => {
    await api.updateAdmissionStatus(id, status);
    loadData();
    onRefreshData();
  };

  const handleDeleteAdmission = async (id: string) => {
    if (confirm('আপনি কি এই ভর্তি আবেদনটি মুছে ফেলতে চান?')) {
      await api.deleteAdmission(id);
      loadData();
      onRefreshData();
    }
  };

  // Notice Actions
  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNoticeId) {
      await api.updateNotice(editingNoticeId, noticeForm);
    } else {
      await api.createNotice({
        ...noticeForm,
        date: noticeForm.date || new Date().toISOString().split('T')[0],
      });
    }
    setShowNoticeModal(false);
    setEditingNoticeId(null);
    setNoticeForm({ title: '', category: 'সাধারণ', content: '', isImportant: false, date: new Date().toISOString().split('T')[0] });
    loadData();
    onRefreshData();
  };

  const handleDeleteNotice = async (id: string) => {
    if (confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) {
      await api.deleteNotice(id);
      loadData();
      onRefreshData();
    }
  };

  // Teacher Actions
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacherId) {
      await api.updateTeacher(editingTeacherId, teacherForm);
    } else {
      await api.createTeacher(teacherForm);
    }
    setShowTeacherModal(false);
    setEditingTeacherId(null);
    loadData();
    onRefreshData();
  };

  const handleDeleteTeacher = async (id: string) => {
    if (confirm('আপনি কি এই শিক্ষকের প্রোফাইল মুছে ফেলতে চান?')) {
      await api.deleteTeacher(id);
      loadData();
      onRefreshData();
    }
  };

  // Result Actions
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalObtained =
      Number(resultForm.bangla) +
      Number(resultForm.english) +
      Number(resultForm.math) +
      Number(resultForm.science) +
      Number(resultForm.religion);

    const full = 400;
    const gpa = totalObtained >= 320 ? 5.0 : totalObtained >= 280 ? 4.0 : 3.5;
    const grade = totalObtained >= 320 ? 'A+' : totalObtained >= 280 ? 'A' : 'A-';

    const payload = {
      studentId: resultForm.studentId,
      studentNameBn: resultForm.studentNameBn,
      studentNameEn: resultForm.studentNameEn,
      rollNo: resultForm.rollNo,
      className: resultForm.className,
      examTerm: resultForm.examTerm,
      academicYear: resultForm.academicYear,
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: Number(resultForm.bangla), grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: Number(resultForm.english), grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: Number(resultForm.math), grade: 'A+', gpa: 5.0 },
        { subject: 'সাধারণ জ্ঞান / বিজ্ঞান', fullMarks: 50, obtainedMarks: Number(resultForm.science), grade: 'A', gpa: 4.5 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 50, obtainedMarks: Number(resultForm.religion), grade: 'A+', gpa: 5.0 },
      ],
      totalObtained,
      totalFull: full,
      percentage: `${((totalObtained / full) * 100).toFixed(1)}%`,
      overallGrade: grade,
      gpa,
      position: 'মেধাক্রম ১',
      remarks: resultForm.remarks,
    };

    if (editingResultId) {
      await api.updateResult(editingResultId, payload);
    } else {
      await api.createResult(payload);
    }

    setShowResultModal(false);
    setEditingResultId(null);
    loadData();
    onRefreshData();
  };

  const handleDeleteResult = async (id: string) => {
    if (confirm('আপনি কি এই রেজাল্ট রেকর্ডটি মুছে ফেলতে চান?')) {
      await api.deleteResult(id);
      loadData();
      onRefreshData();
    }
  };

  // Fee Payment Actions
  const handleSaveFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeeId) {
      await api.updateFeeRecord(editingFeeId, feeForm);
    } else {
      await api.submitFeePayment(feeForm);
    }
    setShowFeeModal(false);
    setEditingFeeId(null);
    loadData();
    onRefreshData();
  };

  const handleDeleteFee = async (id: string) => {
    if (confirm('আপনি কি এই ফি রেকর্ডটি মুছে ফেলতে চান?')) {
      await api.deleteFeeRecord(id);
      loadData();
      onRefreshData();
    }
  };

  // Messages Actions
  const handleMarkMessageRead = async (id: string) => {
    await api.markMessageRead(id);
    loadData();
    onRefreshData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('আপনি কি এই বার্তাটি মুছে ফেলতে চান?')) {
      await api.deleteMessage(id);
      loadData();
      onRefreshData();
    }
  };

  // Download Actions
  const handleSaveDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: downloadForm.title,
      category: downloadForm.category,
      description: downloadForm.description,
      fileType: downloadForm.fileType,
      fileSize: downloadForm.fileSize,
      contentPreview: {
        subtitle: downloadForm.title,
        sections: downloadForm.instructions
          ? [
              {
                heading: 'নির্দেশনা ও বিবরণ',
                details: downloadForm.instructions.split('\n').filter(Boolean),
              },
            ]
          : undefined,
      },
    };

    if (editingDownloadId) {
      await api.updateDownload(editingDownloadId, payload);
    } else {
      await api.createDownload(payload);
    }

    setShowDownloadModal(false);
    setEditingDownloadId(null);
    setDownloadForm({
      title: '',
      category: 'ভর্তি ফরম',
      description: '',
      fileType: 'PDF',
      fileSize: '১.২ মেগাবাইট',
      instructions: '',
    });
    loadData();
    onRefreshData();
  };

  const handleDeleteDownload = async (id: string) => {
    if (confirm('আপনি কি এই ডাউনলোড ফাইলটি মুছে ফেলতে চান?')) {
      await api.deleteDownload(id);
      loadData();
      onRefreshData();
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
    onRefreshData();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto no-print">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {settings.schoolNameBn} - প্রশাসনিক নিয়ন্ত্রণ কক্ষ (Admin Portal)
              </h2>
              <p className="text-xs text-emerald-300">
                ডায়নামিক ব্যাকএন্ড ম্যানেজমেন্ট সিস্টেম
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-rose-900/70 hover:bg-rose-800 text-rose-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-300 hover:text-white cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">প্রশাসনিক লগইন</h3>
              <p className="text-xs text-slate-500">
                শুধুমাত্র অনুমোদিত প্রধান শিক্ষক ও বিদ্যালয়ের কর্মকর্তাদের জন্য
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ইউজারনেম (Username)
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  পাসওয়ার্ড (Password)
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'যাচাই হচ্ছে...' : 'লগইন করুন'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 text-center space-y-2">
              <span className="text-xs text-slate-500 block">
                টেস্টিংয়ের সুবিধার জন্য ১-ক্লিক ডেমো লগইন:
              </span>
              <button
                onClick={handleQuickDemoLogin}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>ডেমো অ্যাডমিন হিসেবে প্রবেশ করুন (1-Click Login)</span>
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-slate-100 border-r border-slate-200 p-3 space-y-1 flex-shrink-0 overflow-y-auto">
              {[
                { id: 'overview', label: 'ওভারভিউ', icon: ShieldCheck, badge: null },
                { id: 'admissions', label: 'ভর্তি আবেদন', icon: UserCheck, badge: admissions.filter(a => a.status === 'অপেক্ষমান').length },
                { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, badge: notices.length },
                { id: 'results', label: 'ফলাফল ও মার্কশিট', icon: Award, badge: results.length },
                { id: 'teachers', label: 'শিক্ষক তালিকা', icon: Users, badge: teachers.length },
                { id: 'fees', label: 'ফি ও পেমেন্ট', icon: CreditCard, badge: fees.length },
                { id: 'feeStructure', label: 'ফি চার্ট কনফিগ', icon: FileSpreadsheet, badge: feeStructure.length },
                { id: 'routines', label: 'ক্লাস রুটিন', icon: CalendarDays, badge: routines.length },
                { id: 'downloads', label: 'ডাউনলোড সেন্টার', icon: FileDown, badge: downloads.length },
                { id: 'gallery', label: 'ফটো গ্যালারি', icon: ImageIcon, badge: gallery.length },
                { id: 'messages', label: 'অভিভাবক বার্তা', icon: MessageSquare, badge: messages.filter(m => !m.isRead).length },
                { id: 'settings', label: 'স্কুল সেটিংস', icon: Settings, badge: null },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeAdminTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAdminTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== null && tab.badge > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">
              {/* OVERVIEW TAB */}
              {activeAdminTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      বিদ্যালয় সামগ্রিক প্রবৃদ্ধি ও পরিসংখ্যান
                    </h3>
                    <p className="text-xs text-slate-500">
                      লাইভ ডাটাবেজ থেকে স্বয়ংক্রিয়ভাবে আপডেট হওয়া তথ্য
                    </p>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500">মোট ভর্তি আবেদন</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1">
                        {admissions.length} টি
                      </div>
                      <span className="text-[11px] text-amber-700 font-semibold">
                        {admissions.filter((a) => a.status === 'অপেক্ষমান').length} টি অপেক্ষমান
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500">সক্রিয় নোটিশ</span>
                      <div className="text-2xl font-bold text-emerald-800 mt-1">
                        {notices.length} টি
                      </div>
                      <span className="text-[11px] text-slate-500">সর্বশেষ আপডেট আজ</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500">নিবন্ধিত শিক্ষক</span>
                      <div className="text-2xl font-bold text-slate-900 mt-1">
                        {teachers.length} জন
                      </div>
                      <span className="text-[11px] text-slate-500">সকল শাখায় কর্মরত</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-500">সংগৃহীত মোট ফি</span>
                      <div className="text-2xl font-bold text-emerald-800 mt-1">
                        ৳{' '}
                        {fees
                          .filter((f) => f.status === 'অনুমোদিত')
                          .reduce((sum, f) => sum + f.amount, 0)}
                      </div>
                      <span className="text-[11px] text-slate-500">বিকাশ ও নগদ মিলিয়ে</span>
                    </div>
                  </div>

                  {/* Recent Admissions quick table */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <h4 className="font-bold text-sm text-slate-900">
                        সর্বশেষ ৫টি ভর্তি আবেদন
                      </h4>
                      <button
                        onClick={() => setActiveAdminTab('admissions')}
                        className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        সকল আবেদন দেখুন →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-600">
                          <tr>
                            <th className="py-2 px-3">আইডি</th>
                            <th className="py-2 px-3">শিক্ষার্থী</th>
                            <th className="py-2 px-3">শ্রেণি</th>
                            <th className="py-2 px-3">মোবাইল</th>
                            <th className="py-2 px-3">স্ট্যাটাস</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {admissions.slice(0, 5).map((a) => (
                            <tr key={a.id}>
                              <td className="py-2 px-3 font-mono text-emerald-800 font-semibold">{a.id}</td>
                              <td className="py-2 px-3 font-bold">{a.studentNameBn}</td>
                              <td className="py-2 px-3">{a.className}</td>
                              <td className="py-2 px-3 font-mono">{a.phone}</td>
                              <td className="py-2 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    a.status === 'অনুমোদিত'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : a.status === 'বাতিল'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {a.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ADMISSIONS TAB */}
              {activeAdminTab === 'admissions' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        অনলাইন ভর্তি আবেদন তালিকা ({admissions.length} টি)
                      </h3>
                      <p className="text-xs text-slate-500">
                        আবেদনকারীর তথ্য যাচাই করে অনুমোদন বা বাতিল করুন
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingAdmissionId(null);
                          setAdmissionForm({
                            studentNameBn: '',
                            studentNameEn: '',
                            gender: 'পুরুষ',
                            dateOfBirth: '2020-01-01',
                            birthRegNo: '',
                            bloodGroup: 'B+',
                            className: 'কেজি (KG)',
                            fatherName: '',
                            fatherOccupation: 'ব্যবসায়ী',
                            motherName: '',
                            motherOccupation: 'গৃহিণী',
                            phone: '০১৮১৯-XXXXXX',
                            address: 'শাহরাস্তি, চাঁদপুর',
                            status: 'অনুমোদিত',
                            remarks: '',
                          });
                          setShowAdmissionModal(true);
                        }}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>নতুন ভর্তি এন্ট্রি</span>
                      </button>
                      <button
                        onClick={loadData}
                        className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-50"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>রিফ্রেশ</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-emerald-950 text-white">
                          <tr>
                            <th className="py-2.5 px-3">ট্র্যাকিং আইডি</th>
                            <th className="py-2.5 px-3">শিক্ষার্থীর নাম</th>
                            <th className="py-2.5 px-3">শ্রেণি</th>
                            <th className="py-2.5 px-3">পিতার নাম</th>
                            <th className="py-2.5 px-3">মোবাইল নম্বর</th>
                            <th className="py-2.5 px-3">তারিখ</th>
                            <th className="py-2.5 px-3">অবস্থা</th>
                            <th className="py-2.5 px-3 text-right">কার্যক্রম</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {admissions.map((adm) => (
                            <tr key={adm.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{adm.id}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">
                                {adm.studentNameBn}
                                <span className="block text-[10px] text-slate-400 uppercase font-mono">
                                  {adm.studentNameEn}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-bold text-slate-700">{adm.className}</td>
                              <td className="py-2.5 px-3">{adm.fatherName}</td>
                              <td className="py-2.5 px-3 font-mono">{adm.phone}</td>
                              <td className="py-2.5 px-3 text-slate-500">{adm.applicationDate}</td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                    adm.status === 'অনুমোদিত'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : adm.status === 'বাতিল'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {adm.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {adm.status !== 'অনুমোদিত' && (
                                    <button
                                      onClick={() => handleUpdateAdmissionStatus(adm.id, 'অনুমোদিত')}
                                      className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      অনুমোদন
                                    </button>
                                  )}
                                  {adm.status !== 'বাতিল' && (
                                    <button
                                      onClick={() => handleUpdateAdmissionStatus(adm.id, 'বাতিল')}
                                      className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      বাতিল
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      setEditingAdmissionId(adm.id);
                                      setAdmissionForm({
                                        studentNameBn: adm.studentNameBn,
                                        studentNameEn: adm.studentNameEn,
                                        gender: adm.gender,
                                        dateOfBirth: adm.dateOfBirth,
                                        birthRegNo: adm.birthRegNo,
                                        bloodGroup: adm.bloodGroup,
                                        className: adm.className,
                                        fatherName: adm.fatherName,
                                        fatherOccupation: adm.fatherOccupation,
                                        motherName: adm.motherName,
                                        motherOccupation: adm.motherOccupation,
                                        phone: adm.phone,
                                        address: adm.address,
                                        status: adm.status,
                                        remarks: adm.remarks || '',
                                      });
                                      setShowAdmissionModal(true);
                                    }}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                                    title="সম্পাদনা করুন"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAdmission(adm.id)}
                                    className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTICES TAB */}
              {activeAdminTab === 'notices' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        নোটিশ বোর্ড পরিচালনা ({notices.length} টি)
                      </h3>
                      <p className="text-xs text-slate-500">
                        নতুন নোটিশ যোগ করুন, হালনাগাদ করুন বা মুছে ফেলুন
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingNoticeId(null);
                        setNoticeForm({
                          title: '',
                          category: 'সাধারণ',
                          content: '',
                          isImportant: false,
                          date: new Date().toISOString().split('T')[0],
                        });
                        setShowNoticeModal(true);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন নোটিশ তৈরি</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notices.map((n) => (
                      <div
                        key={n.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-bold text-emerald-800">[{n.category}]</span>
                            <span>{n.date}</span>
                            {n.isImportant && (
                              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold text-[10px]">
                                জরুরি
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{n.content}</p>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingNoticeId(n.id);
                              setNoticeForm({
                                title: n.title,
                                category: n.category,
                                content: n.content,
                                isImportant: n.isImportant,
                                date: n.date,
                              });
                              setShowNoticeModal(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(n.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESULTS TAB */}
              {activeAdminTab === 'results' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ফলাফল ও মার্কশিট এন্ট্রি ({results.length} টি)
                      </h3>
                      <p className="text-xs text-slate-500">
                        পরীক্ষার নম্বর এন্ট্রি করুন এবং শিক্ষার্থীদের ফলাফল প্রকাশ করুন
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingResultId(null);
                        setResultForm({
                          studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
                          studentNameBn: '',
                          studentNameEn: '',
                          rollNo: '',
                          className: 'কেজি (KG)',
                          examTerm: 'বার্ষিক পরীক্ষা',
                          academicYear: '২০২৬',
                          bangla: 85,
                          english: 85,
                          math: 90,
                          science: 45,
                          religion: 48,
                          remarks: 'ভালো ফলাফল। শুভকামনা রইল।',
                        });
                        setShowResultModal(true);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন ফলাফল এন্ট্রি</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            <th className="py-2.5 px-3">শিক্ষার্থী</th>
                            <th className="py-2.5 px-3">শ্রেণি ও রোল</th>
                            <th className="py-2.5 px-3">পরীক্ষা</th>
                            <th className="py-2.5 px-3">মোট প্রাপ্ত</th>
                            <th className="py-2.5 px-3">গ্রেড</th>
                            <th className="py-2.5 px-3">GPA</th>
                            <th className="py-2.5 px-3 text-right">কার্যক্রম</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {results.map((r) => (
                            <tr key={r.id}>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">
                                {r.studentNameBn}
                                <span className="block text-[10px] text-slate-400 font-mono">
                                  {r.studentId}
                                </span>
                              </td>
                              <td className="py-2.5 px-3">
                                {r.className} (রোল: {r.rollNo})
                              </td>
                              <td className="py-2.5 px-3">{r.examTerm} ({r.academicYear})</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-900">
                                {r.totalObtained} / {r.totalFull}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-emerald-800">{r.overallGrade}</td>
                              <td className="py-2.5 px-3 font-bold">{r.gpa.toFixed(2)}</td>
                              <td className="py-2.5 px-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingResultId(r.id);
                                      const banglaMark = r.marks.find(m => m.subject.includes('বাংলা'))?.obtainedMarks || 80;
                                      const englishMark = r.marks.find(m => m.subject.includes('ইংরেজি'))?.obtainedMarks || 80;
                                      const mathMark = r.marks.find(m => m.subject.includes('গণিত'))?.obtainedMarks || 85;
                                      const sciMark = r.marks.find(m => m.subject.includes('বিজ্ঞান'))?.obtainedMarks || 40;
                                      const relMark = r.marks.find(m => m.subject.includes('ধর্ম'))?.obtainedMarks || 45;
                                      setResultForm({
                                        studentId: r.studentId,
                                        studentNameBn: r.studentNameBn,
                                        studentNameEn: r.studentNameEn,
                                        rollNo: r.rollNo,
                                        className: r.className,
                                        examTerm: r.examTerm,
                                        academicYear: r.academicYear,
                                        bangla: banglaMark,
                                        english: englishMark,
                                        math: mathMark,
                                        science: sciMark,
                                        religion: relMark,
                                        remarks: r.remarks || 'ভালো ফলাফল।',
                                      });
                                      setShowResultModal(true);
                                    }}
                                    title="সম্পাদনা করুন"
                                    className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteResult(r.id)}
                                    title="মুছে ফেলুন"
                                    className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TEACHERS TAB */}
              {activeAdminTab === 'teachers' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        শিক্ষক তালিকা ব্যবস্থাপনা ({teachers.length} জন)
                      </h3>
                      <p className="text-xs text-slate-500">
                        নতুন শিক্ষক নিয়োগ এন্ট্রি ও প্রোফাইল হালনাগাদ
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingTeacherId(null);
                        setTeacherForm({
                          name: '',
                          nameEn: '',
                          designation: 'সহকারী শিক্ষক',
                          qualification: 'বি.এ, বি.এড',
                          subject: 'সাধারণ',
                          phone: '০১৮১৯-XXXXXX',
                          email: 'teacher@aynataligenius.edu.bd',
                          joiningDate: '২০২৬-০১-০১',
                          photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
                          message: '',
                        });
                        setShowTeacherModal(true);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন শিক্ষক যোগ করুন</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teachers.map((t) => (
                      <div
                        key={t.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={t.photoUrl}
                            alt={t.name}
                            className="w-12 h-12 rounded-full object-cover border border-emerald-600"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                            <span className="text-xs font-semibold text-emerald-800 block">
                              {t.designation}
                            </span>
                            <span className="text-xs text-slate-500 block">
                              বিষয়: {t.subject} | ফোন: {t.phone}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingTeacherId(t.id);
                              setTeacherForm({
                                name: t.name,
                                nameEn: t.nameEn,
                                designation: t.designation,
                                qualification: t.qualification,
                                subject: t.subject,
                                phone: t.phone,
                                email: t.email,
                                joiningDate: t.joiningDate,
                                photoUrl: t.photoUrl,
                                message: t.message || '',
                              });
                              setShowTeacherModal(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="text-rose-600 hover:bg-rose-50 p-1.5 rounded cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEES TAB */}
              {activeAdminTab === 'fees' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ফি আদায় ও পেমেন্ট হিসেব ({fees.length} টি)
                      </h3>
                      <p className="text-xs text-slate-500">
                        বিকাশ, নগদ ও অফিস কাউন্টার থেকে সংগৃহীত ফি রেকর্ড
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingFeeId(null);
                        setFeeForm({
                          studentName: '',
                          studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
                          className: 'কেজি (KG)',
                          rollNo: '০১',
                          month: 'মার্চ ২০২৬',
                          feeType: 'মাসিক বেতন',
                          amount: 750,
                          paymentMethod: 'Cash',
                          transactionId: 'CASH-' + Math.floor(1000 + Math.random() * 9000),
                          phone: '০১৮১৯-XXXXXX',
                          status: 'অনুমোদিত',
                        });
                        setShowFeeModal(true);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>নতুন ফি আদায় এন্ট্রি</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-emerald-950 text-white">
                          <tr>
                            <th className="py-2.5 px-3">রসিদ আইডি</th>
                            <th className="py-2.5 px-3">শিক্ষার্থী</th>
                            <th className="py-2.5 px-3">শ্রেণি ও রোল</th>
                            <th className="py-2.5 px-3">ফি এর ধরন</th>
                            <th className="py-2.5 px-3">পরিমাণ</th>
                            <th className="py-2.5 px-3">পদ্ধতি ও TrxID</th>
                            <th className="py-2.5 px-3">অবস্থা</th>
                            <th className="py-2.5 px-3 text-right">কার্যক্রম</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {fees.map((f) => (
                            <tr key={f.id} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{f.id}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{f.studentName}</td>
                              <td className="py-2.5 px-3">
                                {f.className} (রোল: {f.rollNo})
                              </td>
                              <td className="py-2.5 px-3">{f.feeType} ({f.month})</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-900">৳ {f.amount}</td>
                              <td className="py-2.5 px-3">
                                <span className="font-semibold">{f.paymentMethod}</span>
                                <span className="block font-mono text-[10px] text-slate-500">
                                  {f.transactionId}
                                </span>
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                    f.status === 'অনুমোদিত'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : f.status === 'বাতিল'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {f.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingFeeId(f.id);
                                      setFeeForm({
                                        studentName: f.studentName,
                                        studentId: f.studentId,
                                        className: f.className,
                                        rollNo: f.rollNo,
                                        month: f.month,
                                        feeType: f.feeType,
                                        amount: f.amount,
                                        paymentMethod: f.paymentMethod,
                                        transactionId: f.transactionId,
                                        phone: f.phone,
                                        status: f.status,
                                      });
                                      setShowFeeModal(true);
                                    }}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                                    title="সম্পাদনা করুন"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFee(f.id)}
                                    className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* DOWNLOADS TAB */}
              {activeAdminTab === 'downloads' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        ডাউনলোড সেন্টার ফাইল ব্যবস্থাপনা ({downloads.length} টি)
                      </h3>
                      <p className="text-xs text-slate-500">
                        ভর্তি ফরম, পাঠ্যক্রম, ছুটির তালিকা ও নির্দেশিকা আপলোড বা অপসারণ করুন
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingDownloadId(null);
                        setDownloadForm({
                          title: '',
                          category: 'ভর্তি ফরম',
                          description: '',
                          fileType: 'PDF',
                          fileSize: '১.২ মেগাবাইট',
                          instructions: '',
                        });
                        setShowDownloadModal(true);
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন ফাইল যোগ করুন</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {downloads.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4 hover:border-emerald-200 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {doc.category}
                            </span>
                            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[10px]">
                              {doc.fileType} ({doc.fileSize})
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500">{doc.publishDate}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-emerald-700 font-semibold">{doc.downloadCount} বার ডাউনলোড</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{doc.description}</p>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingDownloadId(doc.id);
                              const instructionsText = doc.contentPreview?.sections
                                ? doc.contentPreview.sections.flatMap(s => Array.isArray(s.details) ? s.details : [s.details]).join('\n')
                                : '';
                              setDownloadForm({
                                title: doc.title,
                                category: doc.category,
                                description: doc.description,
                                fileType: doc.fileType,
                                fileSize: doc.fileSize,
                                instructions: instructionsText,
                              });
                              setShowDownloadModal(true);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDownload(doc.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEE STRUCTURE CONFIG TAB */}
              {activeAdminTab === 'feeStructure' && (
                <AdminFeeStructure feeStructure={feeStructure} onRefresh={loadData} />
              )}

              {/* ROUTINES CONFIG TAB */}
              {activeAdminTab === 'routines' && (
                <AdminRoutines routines={routines} onRefresh={loadData} />
              )}

              {/* GALLERY MANAGEMENT TAB */}
              {activeAdminTab === 'gallery' && (
                <AdminGallery gallery={gallery} onRefresh={loadData} />
              )}

              {/* MESSAGES TAB */}
              {activeAdminTab === 'messages' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      অভিভাবক বার্তা ও মতামত ({messages.length} টি)
                    </h3>
                    <p className="text-xs text-slate-500">
                      যোগাযোগ ফর্মের মাধ্যমে পাঠানো অভিভাবকদের বার্তা
                    </p>
                  </div>

                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-4 rounded-xl border transition-all ${
                          m.isRead
                            ? 'bg-white border-slate-200'
                            : 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{m.senderName}</h4>
                              <span className="text-xs font-mono text-slate-500">({m.phone})</span>
                              {!m.isRead && (
                                <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">
                                  নতুন বার্তা
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold text-emerald-800 mt-1">
                              বিষয়: {m.subject}
                            </div>
                            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                              {m.message}
                            </p>
                            <span className="text-[11px] text-slate-400 mt-2 block">
                              তারিখ: {m.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {!m.isRead && (
                              <button
                                onClick={() => handleMarkMessageRead(m.id)}
                                className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs cursor-pointer"
                              >
                                পড়া হয়েছে
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
                        কোনো বার্তা নেই।
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeAdminTab === 'settings' && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">বিদ্যালয় সেটিংস হালনাগাদ</h3>
                    <p className="text-xs text-slate-500">
                      স্কুলের ফোন নম্বর, হেডমাস্টারের নাম, স্ক্রলিং নোটিশ ও ভর্তি স্ট্যাটাস পরিবর্তন করুন
                    </p>
                  </div>

                  {settingsSaved && (
                    <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold">
                      সেটিংস সফলভাবে সংরক্ষিত হয়েছে!
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          বিদ্যালয়ের নাম (বাংলা)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.schoolNameBn}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, schoolNameBn: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          School Name (English)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.schoolNameEn}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, schoolNameEn: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          হটলাইন ফোন নম্বর
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          বিকাশ/নগদ ফি নম্বর
                        </label>
                        <input
                          type="text"
                          value={settingsForm.altPhone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, altPhone: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          প্রধান শিক্ষকের নাম
                        </label>
                        <input
                          type="text"
                          value={settingsForm.headmaster}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, headmaster: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ভর্তি সেশন
                        </label>
                        <input
                          type="text"
                          value={settingsForm.admissionSession}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              admissionSession: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        স্ক্রলিং নোটিশ টেক্সট (Marquee Ticker)
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.tickerText}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, tickerText: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                      >
                        সেটিংস সংরক্ষণ করুন
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CREATE NOTICE MODAL */}
      {showNoticeModal && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">
                {editingNoticeId ? 'নোটিশ তথ্য সম্পাদনা (Edit Notice)' : 'নতুন নোটিশ তৈরি'}
              </h4>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  নোটিশের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: পবিত্র রমজান উপলক্ষে শ্রেণি কার্যক্রমের সময়সূচি"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={noticeForm.category}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, category: e.target.value as any })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="ভর্তি">ভর্তি</option>
                  <option value="পরীক্ষা">পরীক্ষা</option>
                  <option value="ছুটি">ছুটি</option>
                  <option value="ইভেন্ট">ইভেন্ট</option>
                  <option value="ফি">ফি</option>
                  <option value="সাধারণ">সাধারণ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিস্তারিত নোটিশ বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="isImp"
                  checked={noticeForm.isImportant}
                  onChange={(e) =>
                    setNoticeForm({ ...noticeForm, isImportant: e.target.checked })
                  }
                  className="rounded text-emerald-700"
                />
                <label htmlFor="isImp" className="text-xs text-slate-700 cursor-pointer">
                  জরুরি নোটিশ হিসেবে মার্ক করুন
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {editingNoticeId ? 'আপডেট সংরক্ষণ করুন' : 'নোটিশ প্রকাশ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEACHER MODAL */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">
                {editingTeacherId ? 'শিক্ষক প্রোফাইল সম্পাদনা (Edit Teacher)' : 'নতুন শিক্ষক এন্ট্রি'}
              </h4>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Name (English)
                  </label>
                  <input
                    type="text"
                    value={teacherForm.nameEn}
                    onChange={(e) => setTeacherForm({ ...teacherForm, nameEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পদবি *
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherForm.designation}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, designation: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পাঠদানের বিষয় *
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    value={teacherForm.qualification}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, qualification: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    value={teacherForm.phone}
                    onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  শিক্ষকের বাণী / মতামত
                </label>
                <input
                  type="text"
                  value={teacherForm.message}
                  onChange={(e) => setTeacherForm({ ...teacherForm, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTeacherModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {editingTeacherId ? 'আপডেট সংরক্ষণ করুন' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE RESULT MODAL */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">
                {editingResultId ? 'ফলাফল তথ্য সম্পাদনা (Edit Result)' : 'নতুন পরীক্ষার ফলাফল এন্ট্রি'}
              </h4>
              <button
                onClick={() => setShowResultModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষার্থীর নাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={resultForm.studentNameBn}
                    onChange={(e) =>
                      setResultForm({ ...resultForm, studentNameBn: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Name (English)
                  </label>
                  <input
                    type="text"
                    value={resultForm.studentNameEn}
                    onChange={(e) =>
                      setResultForm({ ...resultForm, studentNameEn: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শ্রেণি *
                  </label>
                  <select
                    value={resultForm.className}
                    onChange={(e) =>
                      setResultForm({ ...resultForm, className: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="কেজি (KG)">কেজি (KG)</option>
                    <option value="১ম শ্রেণি (Class 1)">১ম শ্রেণি (Class 1)</option>
                    <option value="২য় শ্রেণি (Class 2)">২য় শ্রেণি (Class 2)</option>
                    <option value="৩য় শ্রেণি (Class 3)">৩য় শ্রেণি (Class 3)</option>
                    <option value="৪র্থ শ্রেণি (Class 4)">৪র্থ শ্রেণি (Class 4)</option>
                    <option value="৫ম শ্রেণি (Class 5)">৫ম শ্রেণি (Class 5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    রোল নম্বর *
                  </label>
                  <input
                    type="text"
                    required
                    value={resultForm.rollNo}
                    onChange={(e) => setResultForm({ ...resultForm, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Subject Marks */}
              <div className="pt-2 border-t border-slate-200">
                <span className="block text-xs font-bold text-slate-800 mb-2">
                  বিষয়ভিত্তিক প্রাপ্ত নম্বর (Marks):
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-600">বাংলা (১০০)</label>
                    <input
                      type="number"
                      value={resultForm.bangla}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, bangla: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600">ইংরেজি (১০০)</label>
                    <input
                      type="number"
                      value={resultForm.english}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, english: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600">গণিত (১০০)</label>
                    <input
                      type="number"
                      value={resultForm.math}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, math: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600">বিজ্ঞান (৫০)</label>
                    <input
                      type="number"
                      value={resultForm.science}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, science: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600">ধর্ম (৫০)</label>
                    <input
                      type="number"
                      value={resultForm.religion}
                      onChange={(e) =>
                        setResultForm({ ...resultForm, religion: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResultModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {editingResultId ? 'আপডেট সংরক্ষণ করুন' : 'ফলাফল প্রকাশ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">
                {editingDownloadId ? 'ডাউনলোড ফাইল সম্পাদনা (Edit File)' : 'নতুন ডাউনলোড ফাইল যোগ করুন'}
              </h4>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDownload} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ফাইলের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: কেজি শ্রেণির সংশোধিত সিলেবাস ২০২৬"
                  value={downloadForm.title}
                  onChange={(e) =>
                    setDownloadForm({ ...downloadForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={downloadForm.category}
                    onChange={(e) =>
                      setDownloadForm({
                        ...downloadForm,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="ভর্তি ফরম">ভর্তি ফরম</option>
                    <option value="সিলেবাস">সিলেবাস</option>
                    <option value="ছুটির তালিকা">ছুটির তালিকা</option>
                    <option value="প্রসপেক্টাস">প্রসপেক্টাস</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ফাইলের সাইজ
                  </label>
                  <input
                    type="text"
                    value={downloadForm.fileSize}
                    onChange={(e) =>
                      setDownloadForm({ ...downloadForm, fileSize: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  সংক্ষিপ্ত বিবরণ *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="ফাইলের প্রয়োজনীয় বিষয়বস্তুর বিবরণ..."
                  value={downloadForm.description}
                  onChange={(e) =>
                    setDownloadForm({ ...downloadForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  নির্দেশনা বা সিলেবাস পয়েন্ট (প্রতি লাইনে ১টি পয়েন্ট)
                </label>
                <textarea
                  rows={3}
                  placeholder="যেমন:&#10;১. স্পষ্টাক্ষরে পূরণ করুন&#10;২. ছবি সংযুক্ত করুন"
                  value={downloadForm.instructions}
                  onChange={(e) =>
                    setDownloadForm({ ...downloadForm, instructions: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {editingDownloadId ? 'আপডেট সংরক্ষণ করুন' : 'ফাইল যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMISSION APPLICATION MODAL */}
      <AdminAdmissionModal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        onSubmit={handleSaveAdmission}
        form={admissionForm}
        setForm={setAdmissionForm}
        isEditing={Boolean(editingAdmissionId)}
      />

      {/* FEE RECORD MODAL */}
      <AdminFeeModal
        isOpen={showFeeModal}
        onClose={() => setShowFeeModal(false)}
        onSubmit={handleSaveFee}
        form={feeForm}
        setForm={setFeeForm}
        isEditing={Boolean(editingFeeId)}
      />
    </div>
  );
};
