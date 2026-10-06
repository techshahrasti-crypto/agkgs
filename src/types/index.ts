export interface SchoolSettings {
  schoolNameBn: string;
  schoolNameEn: string;
  eiin: string;
  established: string;
  motto: string;
  address: string;
  phone: string;
  altPhone: string;
  email: string;
  headmaster: string;
  headmasterPhone: string;
  headmasterPhotoUrl?: string;
  headmasterMessage?: string;
  aboutNarrative?: string;
  visionText?: string;
  missionText?: string;
  timingAssembly?: string;
  timingPrePrimary?: string;
  timingPrimary?: string;
  timingOffice?: string;
  isAdmissionOpen: boolean;
  admissionSession: string;
  tickerText: string;
  totalStudentsCount?: string;
  totalTeachersCount?: string;
  passRatePercentage?: string;
}

export interface ClassRoutineItem {
  id: string;
  className: string;
  day: string;
  periods: string[];
}

export interface ClassFeeItem {
  id: string;
  className: string;
  admission: string;
  monthly: string;
  session: string;
  exam: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'ভর্তি' | 'পরীক্ষা' | 'ছুটি' | 'ইভেন্ট' | 'ফি' | 'সাধারণ';
  date: string;
  isImportant: boolean;
  content: string;
  attachment?: string | null;
}

export interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  qualification: string;
  subject: string;
  phone: string;
  email: string;
  joiningDate: string;
  photoUrl: string;
  message?: string;
}

export interface AdmissionApplication {
  id: string;
  studentNameBn: string;
  studentNameEn: string;
  gender: 'পুরুষ' | 'নারী' | 'অন্যান্য';
  dateOfBirth: string;
  birthRegNo: string;
  bloodGroup: string;
  className: string;
  previousSchool?: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  phone: string;
  emergencyPhone?: string;
  address: string;
  applicationDate: string;
  status: 'অপেক্ষমান' | 'অনুমোদিত' | 'বাতিল';
  remarks?: string;
}

export interface MarkItem {
  subject: string;
  fullMarks: number;
  obtainedMarks: number;
  grade: string;
  gpa: number;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  studentNameBn: string;
  studentNameEn: string;
  rollNo: string;
  className: string;
  examTerm: string;
  academicYear: string;
  marks: MarkItem[];
  totalObtained: number;
  totalFull: number;
  percentage: string;
  overallGrade: string;
  gpa: number;
  position: string;
  remarks: string;
}

export interface FeePayment {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  rollNo: string;
  month: string;
  feeType: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash';
  transactionId: string;
  phone: string;
  date: string;
  status: 'অনুমোদিত' | 'অপেক্ষমান' | 'বাতিল';
}

export interface ContactMessage {
  id: string;
  senderName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalAdmissions: number;
  pendingAdmissions: number;
  totalNotices: number;
  totalResults: number;
  totalFeeCollected: number;
  unreadMessages: number;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'ভর্তি ফরম' | 'সিলেবাস' | 'ছুটির তালিকা' | 'প্রসপেক্টাস' | 'অন্যান্য';
  fileType: string;
  fileSize: string;
  publishDate: string;
  description: string;
  downloadCount: number;
  contentPreview?: {
    subtitle?: string;
    sections?: Array<{ heading: string; details: string[] | string }>;
  };
}
