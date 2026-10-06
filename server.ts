import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'school-data.json');

// Initial seed data with authentic details for Aynatali Genius KG School, Shahrasti, Chandpur
const initialSeedData = {
  settings: {
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
    headmasterPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    headmasterMessage: 'বিসমিল্লাহির রাহমানির রাহিম। একটি শিশুর সবচেয়ে সংবেদনশীল ও গঠনমূলক বয়স হলো তার প্রাক-প্রাথমিক ও প্রাথমিক কাল। আয়নাতলী জিনিয়াস কেজি স্কুলে আমরা প্রতিটি সন্তানকে আমাদের নিজস্ব সন্তানের মতো পরম যত্নে আগলে রেখে আধুনিক ও নৈতিক শিক্ষায় গড়ে তুলি।',
    aboutNarrative: 'আয়নাতলী জিনিয়াস কেজি স্কুল ২০০৮ সালে প্রতিষ্ঠিত হয়ে অদ্যবধি শিশু-কিশোরদের যুগোপযোগী আধুনিক শিক্ষা এবং ধর্মীয়-নৈতিক মূল্যবোধ গঠনে এক অনন্য ভূমিকা পালন করে আসছে। প্রতিষ্ঠানটি প্লে, নার্সারি, কেজি থেকে শুরু করে ৫ম শ্রেণি পর্যন্ত জাতীয় শিক্ষাক্রমের আলোকে শিশুবান্ধব আনন্দঘন পাঠদান পরিচালনা করছে।',
    visionText: 'এমন একটি আদর্শ প্রজন্ম তৈরি করা যারা প্রাতিষ্ঠানিক শিক্ষায় শ্রেষ্ঠত্ব অর্জনের পাশাপাশি সততা, দেশপ্রেম ও মানবিকতায় আলোকিত হবে।',
    missionText: 'শিশুদের শারীরিক, মানসিক ও বৌদ্ধিক প্রতিভার সামগ্রিক বিকাশ ঘটিয়ে আধুনিক পৃথিবীর উপযোগী সুযোগ্য নাগরিক হিসেবে গড়ে তোলা।',
    timingAssembly: 'সকাল ৮:৪৫ - ৯:০০',
    timingPrePrimary: 'সকাল ৯:০০ - বেলা ১১:৪৫',
    timingPrimary: 'সকাল ৯:০০ - দুপুর ১:৩০',
    timingOffice: 'সকাল ৮:৩০ - দুপুর ২:০০',
    isAdmissionOpen: true,
    admissionSession: '২০২৬ শিক্ষাবর্ষ',
    tickerText: '★ ২০২৬ শিক্ষাবর্ষে প্লে থেকে ৫ম শ্রেণি পর্যন্ত নতুন ভর্তি চলছে! ★ ১ম সাময়িক পরীক্ষার রুটিন প্রকাশ হয়েছে। বিস্তারিত নোটিশ বোর্ডে দেখুন। ★ কম্পিউটার ও স্পোকেন ইংলিশের বিশেষ ক্লাসের ব্যবস্থা রয়েছে।',
    totalStudentsCount: '৩৮৫+',
    totalTeachersCount: '১২',
    passRatePercentage: '১০০%',
  },
  notices: [
    {
      id: 'not-01',
      title: '২০২৬ শিক্ষাবর্ষে প্লে থেকে ৫ম শ্রেণিতে নতুন ভর্তির বিজ্ঞপ্তি',
      category: 'ভর্তি',
      date: '২০২৬-০৩-১৫',
      isImportant: true,
      content: 'আয়নাতলী জিনিয়াস কেজি স্কুলে ২০২৬ শিক্ষাবর্ষের জন্য প্লে, নার্সারি, কেজি ও ১ম থেকে ৫ম শ্রেণিতে সীমিত আসনে ভর্তি কার্যক্রম পুরোদমে চলছে। আগ্রহী অভিভাবকগণ অনলাইন অথবা স্কুল অফিস থেকে ভর্তি ফরম সংগ্রহ করে আগামী ৩০ মার্চের মধ্যে জমা দেওয়ার জন্য অনুরোধ করা যাচ্ছে।',
      attachment: 'Admission_Form_2026.pdf',
    },
    {
      id: 'not-02',
      title: '১ম সাময়িক পরীক্ষা ২০২৬-এর সংশোধিত রুটিন ও প্রবেশপত্র বিতরণ',
      category: 'পরীক্ষা',
      date: '২০২৬-০৩-২০',
      isImportant: true,
      content: 'সকল শিক্ষক, শিক্ষার্থী ও অভিভাবকদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ২৫ এপ্রিল ২০২৬ থেকে ১ম সাময়িক পরীক্ষা শুরু হতে যাচ্ছে। সংশ্লিষ্ট শিক্ষার্থীদের আগামী ১৫ এপ্রিলের মধ্যে অফিস থেকে প্রবেশপত্র (Admit Card) সংগ্রহ করতে হবে।',
      attachment: '1st_Term_Exam_Routine_2026.pdf',
    },
    {
      id: 'not-03',
      title: 'পবিত্র ঈদুল ফিতর ও বাংলা নববর্ষ উপলক্ষে স্কুল ছুটির নোটিশ',
      category: 'ছুটি',
      date: '২০২৬-০৩-২৫',
      isImportant: false,
      content: 'পবিত্র ঈদুল ফিতর এবং বাংলা নববর্ষ ১৪৩৩ উপলক্ষে আগামী ১ এপ্রিল থেকে ১৪ এপ্রিল পর্যন্ত বিদ্যালয়ের সকল শ্রেণি কার্যক্রম বন্ধ থাকবে। ১৫ এপ্রিল রোজ বুধবার যথারীতি ক্লাস শুরু হবে।',
      attachment: null,
    },
    {
      id: 'not-04',
      title: 'বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা এবং পুরস্কার বিতরণী অনুষ্ঠান',
      category: 'ইভেন্ট',
      date: '২০২৬-০৩-১০',
      isImportant: false,
      content: 'আগামী ৫ মে ২০২৬ রোজ মঙ্গলবার বিদ্যালয় প্রাঙ্গণে অনুষ্ঠিত হতে যাচ্ছে ঐতিহ্যবাহী বার্ষিক ক্রীড়া, কুইজ ও সাংস্কৃতিক প্রতিযোগিতা। শিক্ষার্থীদের স্ব স্ব শ্রেণি শিক্ষকের কাছে নাম এন্ট্রি করার নির্দেশ দেওয়া হচ্ছে।',
      attachment: 'Sports_Events_List.pdf',
    },
    {
      id: 'not-05',
      title: 'অভিভাবক সমাবেশ ও ত্রৈমাসিক প্রগতি পর্যালোচনা সভা',
      category: 'সাধারণ',
      date: '২০২৬-০২-২৮',
      isImportant: false,
      content: 'শিক্ষার্থীদের পড়াশোনার মানোন্নয়ন ও নিয়মানুবর্তিতা বৃদ্ধির লক্ষ্যে আগামী শনিবার সকাল ১০:০০ ঘটিকায় অভিভাবক সমাবেশের আয়োজন করা হয়েছে। সকল অভিভাবকের উপস্থিতি একান্ত কাম্য।',
      attachment: null,
    },
    {
      id: 'not-06',
      title: 'চলতি মাসের বেতন ও বকেয়া ফি পরিশোধের তাগিদপত্র',
      category: 'ফি',
      date: '২০২৬-০৩-০৫',
      isImportant: false,
      content: 'সম্মানিত অভিভাবকবৃন্দের সদয় অবগতির জন্য জানানো যাচ্ছে যে, চলতি মাসের ১০ তারিখের মধ্যে শিক্ষার্থীদের মাসিক বেতন অফিস কাউন্টারে অথবা অনলাইন বিকাশ/নগদে পরিশোধের অনুরোধ করা হচ্ছে।',
      attachment: null,
    },
  ],
  teachers: [
    {
      id: 'tch-01',
      name: 'মো. রফিকুল ইসলাম',
      nameEn: 'Md. Rafiqul Islam',
      designation: 'প্রধান শিক্ষক',
      qualification: 'এম.এ (ইংরেজি), বি.এড',
      subject: 'ইংরেজি ও প্রশাসন',
      phone: '০১৮১৯-৭৬৪৫৩২',
      email: 'headmaster@aynataligenius.edu.bd',
      joiningDate: '২০০৮-০১-১০',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      message: 'আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকের জ্ঞান নয়, প্রতিটি শিশুর ভেতরে সুপ্ত প্রতিভার বিকাশ এবং নৈতিক চরিত্রের বীজ বপন করা।',
    },
    {
      id: 'tch-02',
      name: 'মোসাম্মৎ নাসরিন আক্তার',
      nameEn: 'Most. Nasrin Akter',
      designation: 'সহকারী প্রধান শিক্ষক',
      qualification: 'বি.এ (অনার্স), এম.এ, বি.এড',
      subject: 'বাংলা সাহিত্য ও ব্যাকরণ',
      phone: '০১৭৫২-৯৮৪৬২১',
      email: 'nasrin@aynataligenius.edu.bd',
      joiningDate: '২০১০-০৩-১৫',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      message: 'মাতৃভাষার সঠিক চর্চা ও ভালোবাসাই শিশুকে সত্যিকারের আলোকিত মানুষ হিসেবে গড়ে তোলে।',
    },
    {
      id: 'tch-03',
      name: 'মো. তানভীর আহমেদ',
      nameEn: 'Md. Tanvir Ahmed',
      designation: 'সিনিয়র শিক্ষক (বিজ্ঞান ও গণিত)',
      qualification: 'বি.এসসি (অনার্স), পদার্থবিজ্ঞান',
      subject: 'গণিত ও প্রাথমিক বিজ্ঞান',
      phone: '০১৯১১-২২৩৩৪৪',
      email: 'tanvir@aynataligenius.edu.bd',
      joiningDate: '২০১৪-০৭-০১',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      message: 'গণিত ও বিজ্ঞান ভয় নয়, বরং আনন্দের সাথে বাস্তব উদাহরণের মাধ্যমে শিখাই আমাদের বিশেষত্ব।',
    },
    {
      id: 'tch-04',
      name: 'সাদিয়া আফরিন',
      nameEn: 'Sadia Afrin',
      designation: 'সহকারী শিক্ষিকা (ইংরেজি)',
      qualification: 'বি.এ (ইংরেজি সাহিত্য), পিজিডি',
      subject: 'ইংরেজি স্পোকেন ও গ্রামার',
      phone: '০১৬৭৮-৫৫৬৬৭৭',
      email: 'sadia@aynataligenius.edu.bd',
      joiningDate: '২০১৮-০১-১৫',
      photoUrl: 'https://images.unsplash.com/photo-1580894732483-3330689b9e59?w=400&auto=format&fit=crop&q=80',
      message: 'ছোট থেকেই আন্তর্জাতিক ভাষা ইংরেজির ভয় দূর করে সাবলীল যোগাযোগের দক্ষতা তৈরি করছি।',
    },
    {
      id: 'tch-05',
      name: 'হাফেজ মাওলানা মো. আব্দুল্লাহ',
      nameEn: 'Hafez Mawlana Md. Abdullah',
      designation: 'ধর্মীয় শিক্ষক',
      qualification: 'দাওরায়ে হাদিস, কামিল',
      subject: 'ইসলাম ও নৈতিক শিক্ষা, সহিহ কুরআন শিক্ষা',
      phone: '০১৮১৫-৮৮৭৭৬৬',
      email: 'abdullah@aynataligenius.edu.bd',
      joiningDate: '২০১৬-০২-০১',
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      message: 'নৈতিকতা ও ধর্মীয় মূল্যবোধের সমন্বয় ছাড়া প্রকৃত শিক্ষা অসম্ভব।',
    },
    {
      id: 'tch-06',
      name: 'তাসলিমা সুলতানা',
      nameEn: 'Taslima Sultana',
      designation: 'সহকারী শিক্ষিকা (কেজি ও প্রাক-প্রাথমিক)',
      qualification: 'বি.এস.এস, চাইল্ড সাইকোলজি ট্রেনিংপ্রাপ্ত',
      subject: 'প্লে, নার্সারি ও সাধারণ জ্ঞান',
      phone: '০১৭২৮-১১২২৩৩',
      email: 'taslima@aynataligenius.edu.bd',
      joiningDate: '২০২০-০১-০৫',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      message: 'খেলার ছলে আদর-স্নেহ দিয়ে শিশুদের বিদ্যালয়ের দ্বিতীয় বাড়ির মতো আপন করে তোলা আমাদের ব্রত।',
    },
  ],
  admissions: [
    {
      id: 'ADM-2026-101',
      studentNameBn: 'আরিয়ান আহমেদ তাসিন',
      studentNameEn: 'Arian Ahmed Tasin',
      gender: 'পুরুষ',
      dateOfBirth: '২০২০-০২-১২',
      birthRegNo: '২০২০০৩১২৯৫৪০০১২৩৪',
      bloodGroup: 'B+',
      className: 'কেজি (KG)',
      previousSchool: 'আয়নাতলী গ্রাম্য মক্তব',
      fatherName: 'মো. জামাল হোসেন',
      fatherOccupation: 'ব্যবসায়ী',
      motherName: 'তাহমিনা বেগম',
      motherOccupation: 'গৃহিণী',
      phone: '০১৮১৮-৪৫৬৭৮৯',
      emergencyPhone: '০১৭৯৯-১১২২৩৩',
      address: 'গ্রাম: আয়নাতলী, ডাকঘর: আয়নাতলী, উপজেলা: শাহরাস্তি, জেলা: চাঁদপুর',
      applicationDate: '২০২৬-০৩-১০',
      status: 'অনুমোদিত',
      remarks: 'ভর্তি পরীক্ষা ও মৌখিক সাক্ষাৎকারে উত্তীর্ণ।',
    },
    {
      id: 'ADM-2026-102',
      studentNameBn: 'জান্নাতুল ফেরদৌস স্নেহা',
      studentNameEn: 'Jannatul Ferdous Sneha',
      gender: 'নারী',
      dateOfBirth: '২০১৯-০৮-২২',
      birthRegNo: '২০১৯০৩১২৯৫৪০০৭৮৯১',
      bloodGroup: 'O+',
      className: '১ম শ্রেণি (Class 1)',
      previousSchool: 'আয়নাতলী জিনিয়াস কেজি স্কুল (কেজি শাখা)',
      fatherName: 'মো. কামরুল ইসলাম',
      fatherOccupation: 'প্রবাসী',
      motherName: 'রেহানা পারভীন',
      motherOccupation: 'শিক্ষিকা',
      phone: '০১৯২০-৩৩৪৪৫৫',
      emergencyPhone: '০১৮১১-৭৭৮৮৯৯',
      address: 'গ্রাম: সোনাপুর, শাহরাস্তি, চাঁদপুর',
      applicationDate: '২০২৬-০৩-১১',
      status: 'অনুমোদিত',
      remarks: 'মেধা তালিকায় শীর্ষস্থান অধিকারী।',
    },
    {
      id: 'ADM-2026-103',
      studentNameBn: 'তাহমিদ হাসান রাফি',
      studentNameEn: 'Tahmid Hasan Rafi',
      gender: 'পুরুষ',
      dateOfBirth: '২০২১-০৫-১৪',
      birthRegNo: '২০২১০৩১২৯৫৪০০৫৪৩২',
      bloodGroup: 'A+',
      className: 'প্লে (Play)',
      previousSchool: 'প্রথম শিক্ষা',
      fatherName: 'মো. মজিবুর রহমান',
      fatherOccupation: 'কৃষি উদ্যোক্তা',
      motherName: 'শামসুন্নাহার',
      motherOccupation: 'গৃহিণী',
      phone: '০১৭৩১-৬৬৭৭৮৮',
      emergencyPhone: '০১৬২৪-৫৫৮৮৯৯',
      address: 'গ্রাম: আয়নাতলী পূর্বপাড়া, শাহরাস্তি, চাঁদপুর',
      applicationDate: '২০২৬-০৩-১২',
      status: 'অপেক্ষমান',
      remarks: 'কাগজপত্র যাচাই চলছে।',
    },
  ],
  results: [
    {
      id: 'RES-01',
      studentId: 'STU-1001',
      studentNameBn: 'আরিয়ান আহমেদ তাসিন',
      studentNameEn: 'Arian Ahmed Tasin',
      rollNo: '১',
      className: 'কেজি (KG)',
      examTerm: 'বার্ষিক পরীক্ষা',
      academicYear: '২০২৫',
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: 94, grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: 91, grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: 98, grade: 'A+', gpa: 5.0 },
        { subject: 'সাধারণ জ্ঞান ও অঙ্কন', fullMarks: 50, obtainedMarks: 48, grade: 'A+', gpa: 5.0 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 50, obtainedMarks: 49, grade: 'A+', gpa: 5.0 },
      ],
      totalObtained: 380,
      totalFull: 400,
      percentage: '95.0%',
      overallGrade: 'A+',
      gpa: 5.0,
      position: '১ম স্থান',
      remarks: 'অসাধারণ মেধা ও চমৎকার হস্তাক্ষর। অভিনন্দন!',
    },
    {
      id: 'RES-02',
      studentId: 'STU-1002',
      studentNameBn: 'জান্নাতুল ফেরদৌস স্নেহা',
      studentNameEn: 'Jannatul Ferdous Sneha',
      rollNo: '২',
      className: 'কেজি (KG)',
      examTerm: 'বার্ষিক পরীক্ষা',
      academicYear: '২০২৫',
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: 90, grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: 88, grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: 95, grade: 'A+', gpa: 5.0 },
        { subject: 'সাধারণ জ্ঞান ও অঙ্কন', fullMarks: 50, obtainedMarks: 47, grade: 'A+', gpa: 5.0 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 50, obtainedMarks: 48, grade: 'A+', gpa: 5.0 },
      ],
      totalObtained: 368,
      totalFull: 400,
      percentage: '92.0%',
      overallGrade: 'A+',
      gpa: 5.0,
      position: '২য় স্থান',
      remarks: 'খুবই মনোযোগী ও শান্ত স্বভাবের ছাত্রী। ধারাবাহিকতা বজায় রাখো।',
    },
    {
      id: 'RES-03',
      studentId: 'STU-1003',
      studentNameBn: 'ফারহান সাদিক',
      studentNameEn: 'Farhan Sadik',
      rollNo: '১',
      className: '১ম শ্রেণি (Class 1)',
      examTerm: 'বার্ষিক পরীক্ষা',
      academicYear: '২০২৫',
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: 86, grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: 89, grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: 92, grade: 'A+', gpa: 5.0 },
        { subject: 'পরিবেশ ও বিজ্ঞান', fullMarks: 50, obtainedMarks: 45, grade: 'A+', gpa: 5.0 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 50, obtainedMarks: 47, grade: 'A+', gpa: 5.0 },
      ],
      totalObtained: 359,
      totalFull: 400,
      percentage: '89.75%',
      overallGrade: 'A+',
      gpa: 5.0,
      position: '১ম স্থান',
      remarks: 'চমৎকার ফলাফল। পরবর্তী শ্রেণিতে আরো ভালো করার শুভকামনা।',
    },
    {
      id: 'RES-04',
      studentId: 'STU-1004',
      studentNameBn: 'নুসরাত জাহান মিম',
      studentNameEn: 'Nusrat Jahan Mim',
      rollNo: '২',
      className: '১ম শ্রেণি (Class 1)',
      examTerm: 'বার্ষিক পরীক্ষা',
      academicYear: '২০২৫',
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: 82, grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: 80, grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: 85, grade: 'A+', gpa: 5.0 },
        { subject: 'পরিবেশ ও বিজ্ঞান', fullMarks: 50, obtainedMarks: 44, grade: 'A', gpa: 4.0 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 50, obtainedMarks: 46, grade: 'A+', gpa: 5.0 },
      ],
      totalObtained: 337,
      totalFull: 400,
      percentage: '84.25%',
      overallGrade: 'A+',
      gpa: 4.8,
      position: '২য় স্থান',
      remarks: 'ভালো ফলাফল হয়েছে। গণিত ও বিজ্ঞানে আরো চর্চা আবশ্যক।',
    },
    {
      id: 'RES-05',
      studentId: 'STU-1005',
      studentNameBn: 'সোহাগ হোসেন',
      studentNameEn: 'Sohag Hossain',
      rollNo: '১',
      className: '৫ম শ্রেণি (Class 5)',
      examTerm: 'বার্ষিক পরীক্ষা',
      academicYear: '২০২৫',
      marks: [
        { subject: 'বাংলা', fullMarks: 100, obtainedMarks: 91, grade: 'A+', gpa: 5.0 },
        { subject: 'ইংরেজি', fullMarks: 100, obtainedMarks: 88, grade: 'A+', gpa: 5.0 },
        { subject: 'গণিত', fullMarks: 100, obtainedMarks: 96, grade: 'A+', gpa: 5.0 },
        { subject: 'প্রাথমিক বিজ্ঞান', fullMarks: 100, obtainedMarks: 90, grade: 'A+', gpa: 5.0 },
        { subject: 'বাংলাদেশ ও বিশ্বপরিচয়', fullMarks: 100, obtainedMarks: 87, grade: 'A+', gpa: 5.0 },
        { subject: 'ধর্ম ও নৈতিক শিক্ষা', fullMarks: 100, obtainedMarks: 94, grade: 'A+', gpa: 5.0 },
      ],
      totalObtained: 546,
      totalFull: 600,
      percentage: '91.0%',
      overallGrade: 'A+',
      gpa: 5.0,
      position: '১ম স্থান',
      remarks: 'গর্ব করার মতো চমৎকার ফলাফল। বৃত্তি পাওয়ার উজ্জ্বল সম্ভাবনা।',
    },
  ],
  feeRecords: [
    {
      id: 'TRX-101',
      studentName: 'আরিয়ান আহমেদ তাসিন',
      studentId: 'STU-1001',
      className: 'কেজি (KG)',
      rollNo: '১',
      month: 'মার্চ ২০২৬',
      feeType: 'মাসিক বেতন ও আইসিটি চার্জ',
      amount: 850,
      paymentMethod: 'bKash',
      transactionId: 'BK9A7X5Q2R',
      phone: '০১৮১৮-৪৫৬৭৮৯',
      date: '২০২৬-০৩-০২',
      status: 'অনুমোদিত',
    },
    {
      id: 'TRX-102',
      studentName: 'জান্নাতুল ফেরদৌস স্নেহা',
      studentId: 'STU-1002',
      className: 'কেজি (KG)',
      rollNo: '২',
      month: 'মার্চ ২০২৬',
      feeType: 'মাসিক বেতন',
      amount: 750,
      paymentMethod: 'Nagad',
      transactionId: 'NG4B8K9L1P',
      phone: '০১৯২০-৩৩৪৪৫৫',
      date: '২০২৬-০৩-০৪',
      status: 'অনুমোদিত',
    },
  ],
  messages: [
    {
      id: 'MSG-01',
      senderName: 'মো. কবির হোসেন',
      phone: '০১৮১২-৯৯৮৮৭৭',
      email: 'kabir.hossain@gmail.com',
      subject: 'প্লে শ্রেণির বই ও পোশাক সংক্রান্ত তথ্য',
      message: 'আসসালামু আলাইকুম। প্লে শ্রেণির নতুন সিলেবাস ও স্কুল ড্রেসের কাপড় কোথা থেকে সংগ্রহ করতে হবে জানালে উপকৃত হব।',
      date: '২০২৬-০৩-১২',
      isRead: false,
    },
    {
      id: 'MSG-02',
      senderName: 'নাসরিন সুলতানা',
      phone: '০১৭২৩-৪৪০৩৯২',
      email: 'nasrin.s@gmail.com',
      subject: 'স্কুল ভ্যান / যাতায়াত ব্যবস্থা',
      message: 'শাহরাস্তি বাজার এলাকা থেকে কি কোনো স্কুল ভ্যান চলাচলের সুবিধা আছে? মাসিক চার্জ কত পড়বে?',
      date: '২০২৬-০৩-১৪',
      isRead: true,
    },
  ],
  gallery: [
    {
      id: 'gal-01',
      title: 'বার্ষিক ক্রীড়া ও পুরস্কার বিতরণী উৎসব',
      category: 'ক্রীড়া',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
      caption: 'শিক্ষার্থীদের নিয়ে অনুষ্ঠিত ১০০ মিটার দৌড় ও বিস্কুট দৌড় প্রতিযোগিতা',
    },
    {
      id: 'gal-02',
      title: 'আনন্দঘন পরিবেশে প্রাক-প্রাথমিক ক্লাসরুম',
      category: 'ক্লাসরুম',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
      caption: 'খেলার ছলে বর্ণমালা ও ছড়া শিখছে আমাদের প্লে শ্রেণির ছোট্ট সোনামণিরা',
    },
    {
      id: 'gal-03',
      title: 'স্বাধীনতা ও জাতীয় দিবস উদযাপন',
      category: 'জাতীয় উৎসব',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
      caption: 'জাতীয় পতাকা উত্তোলন ও জাতীয় সঙ্গীত পরিবেশনের মাধ্যমে অনুষ্ঠানের সূচনা',
    },
    {
      id: 'gal-04',
      title: 'শিশুবিজ্ঞান মেলা ও সৃজনশীল প্রজেক্ট প্রদর্শনী',
      category: 'বিজ্ঞান ও মেলা',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
      caption: '৪র্থ ও ৫ম শ্রেণির শিক্ষার্থীদের তৈরি সৌরজগত ও পরিবেশ মডেল প্রদর্শনী',
    },
    {
      id: 'gal-05',
      title: 'পুরস্কার বিজয়ী মেধাবী শিক্ষার্থীদের সম্মাননা',
      category: 'সাংস্কৃতিক',
      imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80',
      caption: 'মেধাবীদের হাতে প্রধান অতিথি তুলে দিচ্ছেন সম্মাননা স্মারক ও বই',
    },
    {
      id: 'gal-06',
      title: 'কম্পিউটার ও ডিজিটাল শিক্ষা ল্যাব',
      category: 'ল্যাব ও প্রযুক্তি',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      caption: 'প্রাথমিক স্তরেই আধুনিক আইসিটি ও কম্পিউটার বেসিক প্রশিক্ষণ',
    },
  ],
  downloads: [
    {
      id: 'doc-01',
      title: '২০২৬ শিক্ষাবর্ষের নতুন ভর্তি আবেদন ফরম (Printable Form)',
      category: 'ভর্তি ফরম',
      fileType: 'PDF',
      fileSize: '১.২ মেগাবাইট',
      publishDate: '২০২৬-০৩-০১',
      description: 'প্লে থেকে ৫ম শ্রেণি পর্যন্ত নতুন শিক্ষার্থীর অফলাইন ভর্তির জন্য পূর্ণাঙ্গ অফিসিয়াল আবেদন ফরম। প্রিন্ট করে হাতে পূরণ করা যাবে।',
      downloadCount: 342,
      contentPreview: {
        subtitle: 'অফিসিয়াল ভর্তি আবেদন ফরম (অফলাইন সংস্করণ)',
        sections: [
          {
            heading: 'ফরম পূরণ সংক্রান্ত নির্দেশাবলী',
            details: [
              'স্পষ্টাক্ষরে বাংলা ও ইংরেজি ক্যাপিটাল লেটারে পূরণ করতে হবে।',
              'শিক্ষার্থীর ২ কপি পাসপোর্ট সাইজের সত্যায়িত রঙিন ছবি ফরমের নির্ধারিত স্থানে যুক্ত করতে হবে।',
              'অনলাইন জন্ম নিবন্ধন সনদের ফটোকপি এবং পিতা/মাতার জাতীয় পরিচয়পত্রের কপি সংযুক্ত করা বাধ্যতামূলক।',
              'অফিস কাউন্টারে সকাল ৯:০০ থেকে দুপুর ১:০০ ঘটিকার মধ্যে জমা দিয়ে প্রবেশপত্র সংগ্রহ করতে হবে।',
            ],
          },
          {
            heading: 'প্রয়োজনীয় সংযুক্তি তালিকা',
            details: [
              '১. শিক্ষার্থীর অনলাইন ডিজিটাল জন্ম নিবন্ধন সনদ (১৭ ডিজিট)',
              '২. পিতা ও মাতার এনআইডি (NID) ফটোকপি',
              '৩. পূর্ববর্তী বিদ্যালয়ের ছাড়পত্র বা মূল্যায়ন পত্র (যদি প্রযোজ্য হয়)',
              '৪. রক্তের গ্রুপ পরীক্ষার রিপোর্ট কপি',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-02',
      title: 'ছাড়পত্র (TC) ও চারিত্রিক প্রশংসাপত্রের আবেদন ফরম',
      category: 'ভর্তি ফরম',
      fileType: 'PDF',
      fileSize: '৮৫০ কিলোবাইট',
      publishDate: '২০২৬-০২-১৫',
      description: 'অন্যত্র বদলি বা উচ্চতর শ্রেণিতে ভর্তির ক্ষেত্রে প্রধান শিক্ষক বরাবর ছাড়পত্র ও প্রশংসাপত্র পাওয়ার অফিসিয়াল আবেদনপত্র।',
      downloadCount: 128,
      contentPreview: {
        subtitle: 'ছাড়পত্র / ট্রান্সফার সার্টিফিকেট (TC) আবেদনপত্র',
        sections: [
          {
            heading: 'আবেদন নিয়মাবলী',
            details: [
              'সকল প্রকার মাসিক বেতন ও বকেয়া ফি পরিশোধের ক্লিয়ারেন্স স্লিপ সংযুক্ত করতে হবে।',
              'লাইব্রেরি বা স্পোর্টস সামগ্রী কোনো বকেয়া থাকলে তা ফেরত প্রদান করতে হবে।',
              'আবেদনের ৩ কার্যদিবসের মধ্যে অফিস থেকে ছাড়পত্র প্রদান করা হবে।',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-03',
      title: 'প্লে ও নার্সারি শ্রেণি বার্ষিক পাঠ্যপরিকল্পনা ও সিলেবাস ২০২৬',
      category: 'সিলেবাস',
      fileType: 'PDF',
      fileSize: '২.১ মেগাবাইট',
      publishDate: '২০২৬-০১-১০',
      description: 'প্রাক-প্রাথমিক স্তরের বর্ণমালা, ছড়া, ছবি আঁকা, মৌখিক ও ব্যবহারিক শিখন ফলের পূর্ণাঙ্গ বিষয়ভিত্তিক সিলেবাস ও টার্ম বিভাজন।',
      downloadCount: 485,
      contentPreview: {
        subtitle: 'প্রাক-প্রাথমিক পাঠ্যপরিকল্পনা ও সিলেবাস',
        sections: [
          {
            heading: 'সিলেবাসের বিষয়বস্তু সংক্ষেপ',
            details: [
              'বাংলা: স্বরবর্ণ ও ব্যঞ্জনবর্ণ চেনা ও সুন্দর হস্তলিপি, ছড়া আবৃত্তি ও ছবির সাথে শব্দ মেলানো।',
              'ইংরেজি: ক্যাপিটাল ও স্মল লেটার পরিচয়, সহজ শব্দ ও Rhymes, Spoken Expressions।',
              'গণিত: ১-৫০ এবং 1-50 গণনা, সংখ্যা লেখা, ছবি গুনে সংখ্যা বসানো ও সহজ বস্তুর তুলনা।',
              'ধর্ম ও সাধারণ জ্ঞান: আরবি হরফ পরিচয়, দোয়া ও আদব, চারপাশের পরিবেশ ও পশুপাখির নাম।',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-04',
      title: 'কেজি (KG) শ্রেণির পূর্ণাঙ্গ সিলেবাস ও বইয়ের তালিকা ২০২৬',
      category: 'সিলেবাস',
      fileType: 'PDF',
      fileSize: '২.৪ মেগাবাইট',
      publishDate: '২০২৬-০১-১২',
      description: 'কেজি শ্রেণির বাংলা, ইংরেজি, গণিত, বিজ্ঞান ও আরবি বিষয়ের বিস্তারিত সিলেবাস, নির্ধারিত পাঠ্যবই ও খাতার পরিমাপ তালিকা।',
      downloadCount: 520,
      contentPreview: {
        subtitle: 'কেজি শাখা বার্ষিক শিক্ষাক্রম ও পাঠ্যসূচি',
        sections: [
          {
            heading: '১ম সাময়িক ও বার্ষিক পরীক্ষার অধ্যায় বণ্টন',
            details: [
              'বাংলা: শব্দ তৈরি, বাক্য গঠন, কারচিহ্ন ব্যবহার, যুক্তবর্ণ পরিচিতি ও সহজ অনুচ্ছেদ।',
              'ইংরেজি: Word making, spelling, make sentence, everyday conversations, short poems।',
              'গণিত: ১-১০০ গণনা, জোড়-বিজোড় সংখ্যা, সহজ যোগ ও বিয়োগ, নামতা ১ থেকে ৫ পর্যন্ত।',
              'আরবি ও সাধারণ জ্ঞান: কালেমা, ছোট ছোট সূরা, নামাজ ও ওযুর নিয়ম, বাংলাদেশের জাতীয় বিষয়াবলী।',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-05',
      title: '১ম থেকে ৫ম শ্রেণি বার্ষিক শিক্ষাক্রম ও মানবণ্টন ২০২৬',
      category: 'সিলেবাস',
      fileType: 'PDF',
      fileSize: '৩.০ মেগাবাইট',
      publishDate: '২০২৬-০১-১৫',
      description: 'জাতীয় পাঠ্যক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত প্রাথমিক শাখার প্রতিটি শ্রেণির বিষয়ভিত্তিক পূর্ণাঙ্গ সিলেবাস ও পরীক্ষার মানবণ্টন।',
      downloadCount: 672,
      contentPreview: {
        subtitle: 'প্রাথমিক শাখা বিষয়ভিত্তিক মানবণ্টন ও পাঠ্যসূচি',
        sections: [
          {
            heading: 'পরীক্ষার মানবণ্টন নির্দেশিকা',
            details: [
              'বাংলা (১০০ নম্বর): বহুনির্বাচনী/সংক্ষিপ্ত প্রশ্ন ৩০, অনুচ্ছেদ ২০, ব্যাকরণ ২৫, রচনা ও ভাবসম্প্রসারণ ২৫।',
              'ইংরেজি (১০০ নম্বর): Seen/Unseen Passage ৪০, Grammar ৩০, Guided Writing ৩০।',
              'গণিত (১০০ নম্বর): যোগ্যতাভিত্তিক সংক্ষিপ্ত প্রশ্ন ২৪, সমস্যা সমাধান ৬০, জ্যামিতি ১৬।',
              'প্রাথমিক বিজ্ঞান ও সমাজ (১০০ নম্বর): বর্ণনামূলক প্রশ্ন ৭০, সংক্ষিপ্ত প্রশ্ন ৩০।',
              'ইসলাম ও নৈতিক শিক্ষা (১০০ নম্বর): তিলাওয়াত ও আমল ২০, লিখিত পরীক্ষা ৮০।',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-06',
      title: '২০২৬ শিক্ষাবর্ষের সরকারি ও প্রাতিষ্ঠানিক বাৎসরিক ছুটির তালিকা',
      category: 'ছুটির তালিকা',
      fileType: 'PDF',
      fileSize: '১.৫ মেগাবাইট',
      publishDate: '২০২৬-০১-০১',
      description: '২০২৬ সালের সকল জাতীয় দিবস, ধর্মীয় উৎসব, গ্রীষ্মকালীন ও শীতকালীন অবকাশের পূর্ণাঙ্গ ছুটির দিনপঞ্জি।',
      downloadCount: 890,
      contentPreview: {
        subtitle: 'বাৎসরিক ছুটির তালিকা ও দিবস উদযাপনের দিনপঞ্জি',
        sections: [
          {
            heading: 'প্রধান প্রধান ছুটির বিবরণ',
            details: [
              'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস: ২১ ফেব্রুয়ারি (১ দিন - জাতীয় অনুষ্ঠান)',
              'পবিত্র শবে বরাত ও আন্তর্জাতিক নারী দিবস: ৮ মার্চ (১ দিন)',
              'স্বাধীনতা ও জাতীয় দিবস: ২৬ মার্চ (১ দিন - জাতীয় পতাকা উত্তোলন)',
              'পবিত্র ঈদুল ফিতর ও বাংলা নববর্ষ: ৩০ মার্চ হতে ১৩ এপ্রিল (১৫ দিন)',
              'মে দিবস ও বুদ্ধ পূর্ণিমা: ১ ও ১২ মে (২ দিন)',
              'পবিত্র ঈদুল আযহা ও গ্রীষ্মকালীন ছুটি: ৫ জুন হতে ১৯ জুন (১৫ দিন)',
              'পবিত্র আশুরা ও জন্মাষ্টমী: ১৭ জুলাই ও ২৬ আগস্ট (২ দিন)',
              'পবিত্র ঈদে মিলাদুন্নবী (সা.): ৪ সেপ্টেম্বর (১ দিন)',
              'দুর্গাপূজা ও ফাতেহা-ই-ইয়াজদাহম: ২০ অক্টোবর হতে ২৪ অক্টোবর (৫ দিন)',
              'বিজয় দিবস ও শীতকালীন অবকাশ: ১৬ ডিসেম্বর হতে ৩১ ডিসেম্বর (১৬ দিন)',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-07',
      title: 'পরীক্ষা বর্ষপঞ্জি ও একাডেমিক ক্যালেন্ডার ২০২৬',
      category: 'ছুটির তালিকা',
      fileType: 'PDF',
      fileSize: '১.১ মেগাবাইট',
      publishDate: '২০২৬-০১-০৫',
      description: '১ম সাময়িক, ২য় সাময়িক, প্রাক-নির্বাচনী ও বার্ষিক পরীক্ষার নির্ধারিত তারিখ, প্রবেশপত্র বিতরণ এবং রেজাল্ট প্রকাশের দিনপঞ্জি।',
      downloadCount: 412,
      contentPreview: {
        subtitle: 'একাডেমিক মূল্যায়ন ও পরীক্ষা বর্ষপঞ্জি',
        sections: [
          {
            heading: 'পরীক্ষার সম্ভাব্য সময়সূচি',
            details: [
              '১ম সাময়িক পরীক্ষা: ২৫ এপ্রিল হতে ১০ মে ২০২৬ (ফলাফল প্রকাশ: ২৫ মে)',
              '২য় সাময়িক পরীক্ষা: ১০ আগস্ট হতে ২৪ আগস্ট ২০২৬ (ফলাফল প্রকাশ: ৫ সেপ্টেম্বর)',
              'বার্ষিক পরীক্ষা: ২৫ নভেম্বর হতে ১০ ডিসেম্বর ২০২৬ (ফলাফল প্রকাশ: ২৪ ডিসেম্বর)',
              'মাসিক ক্লাস টেস্ট: প্রতি মাসের শেষ সপ্তাহের শেষ দুই দিন',
            ],
          },
        ],
      },
    },
    {
      id: 'doc-08',
      title: 'বিদ্যালয় পরিচিতি ও তথ্যাবলী প্রসপেক্টাস ২০২৬ (Prospectus)',
      category: 'প্রসপেক্টাস',
      fileType: 'PDF',
      fileSize: '৪.২ মেগাবাইট',
      publishDate: '২০২৬-০১-০১',
      description: 'আয়নাতলী জিনিয়াস কেজি স্কুলের অবকাঠামো, শিক্ষকবৃন্দ, পাঠদান দর্শন, ফি চার্ট ও নিয়মাবলী সম্বলিত রঙিন ব্রোশার।',
      downloadCount: 780,
      contentPreview: {
        subtitle: 'প্রাতিষ্ঠানিক তথ্য নির্দেশিকা ও প্রসপেক্টাস',
        sections: [
          {
            heading: 'বিদ্যালয়টির অনন্য বৈশিষ্ট্য',
            details: [
              'আধুনিক শিশুবান্ধব খেলার ছলে আনন্দের সাথে শিক্ষা দান।',
              'নৈসর্গিক মনোরম পরিবেশে নিজস্ব ভবন ও প্রশস্ত খেলার মাঠ।',
              'অভিজ্ঞ, স্নেহশীল ও প্রশিক্ষণপ্রাপ্ত শিক্ষকমণ্ডলী।',
              'প্রতিটি ক্লাসের জন্য আলাদা স্পোকেন ইংলিশ ও হস্তলিপি পরিচর্যা।',
              'সার্বক্ষণিক নিরাপদ সুপেয় পানি ও সিসিটিভি ক্যামেরা পর্যবেক্ষণ।',
            ],
          },
        ],
      },
    },
  ],
  feeStructure: [
    { id: 'fee-01', className: 'প্লে (Play)', admission: '১,৫০০', monthly: '৬৫০', session: '১,২০০', exam: '৩৫০' },
    { id: 'fee-02', className: 'নার্সারি (Nursery)', admission: '১,৫০০', monthly: '৭০০', session: '১,২০০', exam: '৩৫০' },
    { id: 'fee-03', className: 'কেজি (KG)', admission: '১,৮০০', monthly: '৭৫০', session: '১,৫০০', exam: '৪০০' },
    { id: 'fee-04', className: '১ম শ্রেণি (Class 1)', admission: '২,০০০', monthly: '৮০০', session: '১,৫০০', exam: '৪৫০' },
    { id: 'fee-05', className: '২য় শ্রেণি (Class 2)', admission: '২,০০০', monthly: '৮৫০', session: '১,৫০০', exam: '৪৫০' },
    { id: 'fee-06', className: '৩য় শ্রেণি (Class 3)', admission: '২,২০০', monthly: '৯০০', session: '১,৮০০', exam: '৫০০' },
    { id: 'fee-07', className: '৪র্থ শ্রেণি (Class 4)', admission: '২,২০০', monthly: '৯৫০', session: '১,৮০০', exam: '৫০০' },
    { id: 'fee-08', className: '৫ম শ্রেণি (Class 5)', admission: '২,৫০০', monthly: '১,০০০', session: '২,০০০', exam: '৬০০' },
  ],
  routines: [
    { id: 'rt-01', className: 'কেজি (KG)', day: 'শনিবার', periods: ['বাংলা (হাতের লেখা)', 'ইংরেজি (Oral/Rhymes)', 'গণিত (যোগ-বিয়োগ)', 'ধর্ম ও নৈতিকতা'] },
    { id: 'rt-02', className: 'কেজি (KG)', day: 'রবিবার', periods: ['ইংরেজি (Alphabet & Words)', 'গণিত (সংখ্যা গণনা)', 'বাংলা (পড়া ও লেখা)', 'সাধারণ জ্ঞান'] },
    { id: 'rt-03', className: 'কেজি (KG)', day: 'সোমবার', periods: ['বাংলা (যুক্তবর্ণ পরিচিতি)', 'ইংরেজি (Spoken Words)', 'গণিত (নামতা চর্চা)', 'অঙ্কন ও খেলাধুলা'] },
    { id: 'rt-04', className: 'কেজি (KG)', day: 'মঙ্গলবার', periods: ['ইংরেজি (Reading Practice)', 'গণিত (সমস্যা সমাধান)', 'বাংলা (ছড়া ও গল্প)', 'সহিহ কুরআন শিক্ষা'] },
    { id: 'rt-05', className: 'কেজি (KG)', day: 'বুধবার', periods: ['বাংলা (মৌখিক ও লিখিত)', 'ইংরেজি (Spelling)', 'গণিত (ওয়ার্কশিট)', 'সাধারণ জ্ঞান কুইজ'] },
    { id: 'rt-06', className: 'কেজি (KG)', day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক মূল্যায়ন পরীক্ষা', 'হাতের কাজ ও চিত্রাঙ্কন', 'নৈতিক গল্প সেশন', 'ছুটি'] },
    { id: 'rt-07', className: '১ম শ্রেণি (Class 1)', day: 'শনিবার', periods: ['বাংলা ১ম পত্র', 'ইংরেজি ১ম পত্র', 'প্রাথমিক গণিত', 'ইসলাম ও নৈতিক শিক্ষা', 'ড্রয়িং'] },
    { id: 'rt-08', className: '১ম শ্রেণি (Class 1)', day: 'রবিবার', periods: ['ইংরেজি ১ম পত্র', 'প্রাথমিক গণিত', 'বাংলা ২য় পত্র', 'পরিবেশ ও বিজ্ঞান', 'হস্তলিপি'] },
    { id: 'rt-09', className: '১ম শ্রেণি (Class 1)', day: 'সোমবার', periods: ['প্রাথমিক গণিত', 'বাংলা ব্যাকরণ', 'ইংরেজি গ্রামার', 'ধর্ম ও নৈতিকতা', 'কম্পিউটার বেসিক'] },
    { id: 'rt-10', className: '১ম শ্রেণি (Class 1)', day: 'মঙ্গলবার', periods: ['বাংলা ১ম পত্র', 'ইংরেজি রিডিং', 'প্রাথমিক গণিত', 'সাধারণ জ্ঞান', 'খেলাধুলা'] },
    { id: 'rt-11', className: '১ম শ্রেণি (Class 1)', day: 'বুধবার', periods: ['ইংরেজি ২য় পত্র', 'প্রাথমিক বিজ্ঞান', 'গণিত সমস্যা', 'বাংলা পাঠ', 'নৈতিকতা চর্চা'] },
    { id: 'rt-12', className: '১ম শ্রেণি (Class 1)', day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক ক্লাস টেস্ট', 'স্পোকেন ইংলিশ', 'হাতের কাজ', 'পুরস্কার ও নীতিবাক্য', 'ছুটি'] },
    { id: 'rt-13', className: '৫ম শ্রেণি (Class 5)', day: 'শনিবার', periods: ['বাংলা (বোর্ড প্রস্তুতি)', 'ইংরেজি ১ম ও গ্রামার', 'উচ্চতর গণিত চর্চা', 'প্রাথমিক বিজ্ঞান', 'ধর্মীয় শিক্ষা'] },
    { id: 'rt-14', className: '৫ম শ্রেণি (Class 5)', day: 'রবিবার', periods: ['প্রাথমিক গণিত (মডেল টেস্ট)', 'ইংরেজি স্পোকেন ও লিখিত', 'বাংলাদেশ ও বিশ্বপরিচয়', 'বাংলা ব্যাকরণ', 'বিজ্ঞান ল্যাব'] },
    { id: 'rt-15', className: '৫ম শ্রেণি (Class 5)', day: 'সোমবার', periods: ['ইংরেজি (Question Solve)', 'বাংলা (রচনাবলী ও ভাবার্থ)', 'গণিত (জ্যামিতি ও সমাধান)', 'বিজ্ঞান প্রশ্নব্যাংক', 'কম্পিউটার'] },
    { id: 'rt-16', className: '৫ম শ্রেণি (Class 5)', day: 'মঙ্গলবার', periods: ['প্রাথমিক গণিত টেস্ট', 'ইংরেজি ২য় পত্র', 'বাংলাদেশ ও বিশ্বপরিচয়', 'ইসলাম ও নৈতিক শিক্ষা', 'কুইজ'] },
    { id: 'rt-17', className: '৫ম শ্রেণি (Class 5)', day: 'বুধবার', periods: ['বাংলা ১ম ও ২য়', 'ইংরেজি রিভিশন', 'গণিত রিভিশন', 'সাধারণ বিজ্ঞান প্রস্তুতি', 'সহশিক্ষা'] },
    { id: 'rt-18', className: '৫ম শ্রেণি (Class 5)', day: 'বৃহস্পতিবার', periods: ['সাপ্তাহিক পূর্ণাঙ্গ মডেল টেস্ট', 'উত্তরপত্র মূল্যায়ন', 'পরামর্শ সভা', 'ছুটি'] },
  ],
};

// Helper to ensure data directory and file exist
function getDbData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeedData, null, 2), 'utf-8');
      return initialSeedData;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    let changed = false;

    if (!parsed.downloads) {
      parsed.downloads = initialSeedData.downloads;
      changed = true;
    }
    if (!parsed.feeStructure) {
      parsed.feeStructure = initialSeedData.feeStructure;
      changed = true;
    }
    if (!parsed.routines) {
      parsed.routines = initialSeedData.routines;
      changed = true;
    }
    // Merge new settings keys if missing
    if (parsed.settings) {
      parsed.settings = { ...initialSeedData.settings, ...parsed.settings };
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error reading DB data, using in-memory seed:', err);
    return initialSeedData;
  }
}

function saveDbData(data: typeof initialSeedData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving DB data:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Health check & Overview stats
  app.get('/api/stats', (req, res) => {
    const db = getDbData();
    res.json({
      success: true,
      stats: {
        totalStudents: 385,
        totalTeachers: db.teachers.length,
        totalAdmissions: db.admissions.length,
        pendingAdmissions: db.admissions.filter((a: any) => a.status === 'অপেক্ষমান').length,
        totalNotices: db.notices.length,
        totalResults: db.results.length,
        totalFeeCollected: db.feeRecords
          .filter((f: any) => f.status === 'অনুমোদিত')
          .reduce((sum: number, f: any) => sum + (Number(f.amount) || 0), 0),
        unreadMessages: db.messages.filter((m: any) => !m.isRead).length,
      },
    });
  });

  // Settings
  app.get('/api/settings', (req, res) => {
    const db = getDbData();
    res.json({ success: true, settings: db.settings });
  });

  app.post('/api/settings', (req, res) => {
    const db = getDbData();
    db.settings = { ...db.settings, ...req.body };
    saveDbData(db);
    res.json({ success: true, settings: db.settings });
  });

  // Notices
  app.get('/api/notices', (req, res) => {
    const db = getDbData();
    res.json({ success: true, notices: db.notices });
  });

  app.post('/api/notices', (req, res) => {
    const db = getDbData();
    const newNotice = {
      id: `not-${Date.now().toString().slice(-5)}`,
      date: new Date().toISOString().split('T')[0],
      isImportant: false,
      attachment: null,
      ...req.body,
    };
    db.notices.unshift(newNotice);
    saveDbData(db);
    res.json({ success: true, notice: newNotice });
  });

  app.put('/api/notices/:id', (req, res) => {
    const db = getDbData();
    const index = db.notices.findIndex((n: any) => n.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    db.notices[index] = { ...db.notices[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, notice: db.notices[index] });
  });

  app.delete('/api/notices/:id', (req, res) => {
    const db = getDbData();
    db.notices = db.notices.filter((n: any) => n.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Notice deleted successfully' });
  });

  // Teachers
  app.get('/api/teachers', (req, res) => {
    const db = getDbData();
    res.json({ success: true, teachers: db.teachers });
  });

  app.post('/api/teachers', (req, res) => {
    const db = getDbData();
    const newTeacher = {
      id: `tch-${Date.now().toString().slice(-4)}`,
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      ...req.body,
    };
    db.teachers.push(newTeacher);
    saveDbData(db);
    res.json({ success: true, teacher: newTeacher });
  });

  app.put('/api/teachers/:id', (req, res) => {
    const db = getDbData();
    const index = db.teachers.findIndex((t: any) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    db.teachers[index] = { ...db.teachers[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, teacher: db.teachers[index] });
  });

  app.delete('/api/teachers/:id', (req, res) => {
    const db = getDbData();
    db.teachers = db.teachers.filter((t: any) => t.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Teacher deleted successfully' });
  });

  // Admissions
  app.get('/api/admissions', (req, res) => {
    const db = getDbData();
    res.json({ success: true, admissions: db.admissions });
  });

  app.post('/api/admissions', (req, res) => {
    const db = getDbData();
    const newAdmission = {
      id: `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'অপেক্ষমান',
      remarks: 'অনলাইন আবেদন গৃহীত হয়েছে। যাচাই প্রক্রিয়াধীন।',
      ...req.body,
    };
    db.admissions.unshift(newAdmission);
    saveDbData(db);
    res.json({ success: true, admission: newAdmission });
  });

  app.patch('/api/admissions/:id/status', (req, res) => {
    const db = getDbData();
    const index = db.admissions.findIndex((a: any) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Admission application not found' });
    }
    const { status, remarks } = req.body;
    if (status) db.admissions[index].status = status;
    if (remarks !== undefined) db.admissions[index].remarks = remarks;
    saveDbData(db);
    res.json({ success: true, admission: db.admissions[index] });
  });

  app.put('/api/admissions/:id', (req, res) => {
    const db = getDbData();
    const index = db.admissions.findIndex((a: any) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Admission application not found' });
    }
    db.admissions[index] = { ...db.admissions[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, admission: db.admissions[index] });
  });

  app.delete('/api/admissions/:id', (req, res) => {
    const db = getDbData();
    db.admissions = db.admissions.filter((a: any) => a.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Admission application deleted' });
  });

  // Results
  app.get('/api/results', (req, res) => {
    const db = getDbData();
    res.json({ success: true, results: db.results });
  });

  app.get('/api/results/search', (req, res) => {
    const db = getDbData();
    const { year, term, className, rollNo, studentId } = req.query;

    const matched = db.results.filter((r: any) => {
      let match = true;
      if (year && r.academicYear !== year) match = false;
      if (term && r.examTerm !== term) match = false;
      if (className && !r.className.includes(String(className))) match = false;
      if (rollNo && String(r.rollNo) !== String(rollNo)) match = false;
      if (studentId && r.studentId.toLowerCase() !== String(studentId).toLowerCase()) match = false;
      return match;
    });

    res.json({ success: true, results: matched });
  });

  app.post('/api/results', (req, res) => {
    const db = getDbData();
    const newResult = {
      id: `RES-${Date.now().toString().slice(-5)}`,
      ...req.body,
    };
    db.results.push(newResult);
    saveDbData(db);
    res.json({ success: true, result: newResult });
  });

  app.put('/api/results/:id', (req, res) => {
    const db = getDbData();
    const index = db.results.findIndex((r: any) => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    db.results[index] = { ...db.results[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, result: db.results[index] });
  });

  app.delete('/api/results/:id', (req, res) => {
    const db = getDbData();
    db.results = db.results.filter((r: any) => r.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Result deleted' });
  });

  // Fee payments
  app.get('/api/fees/records', (req, res) => {
    const db = getDbData();
    res.json({ success: true, fees: db.feeRecords });
  });

  app.post('/api/fees/pay', (req, res) => {
    const db = getDbData();
    const newTrx = {
      id: `TRX-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'অনুমোদিত', // Auto-approving for demo simplicity
      ...req.body,
    };
    db.feeRecords.unshift(newTrx);
    saveDbData(db);
    res.json({ success: true, payment: newTrx });
  });

  app.put('/api/fees/records/:id', (req, res) => {
    const db = getDbData();
    const index = db.feeRecords.findIndex((f: any) => f.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Fee record not found' });
    }
    db.feeRecords[index] = { ...db.feeRecords[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, payment: db.feeRecords[index] });
  });

  app.delete('/api/fees/records/:id', (req, res) => {
    const db = getDbData();
    db.feeRecords = db.feeRecords.filter((f: any) => f.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Fee record deleted' });
  });

  app.get('/api/fees/verify/:trxId', (req, res) => {
    const db = getDbData();
    const trxId = req.params.trxId.trim().toUpperCase();
    const found = db.feeRecords.find((f: any) => f.transactionId?.toUpperCase() === trxId || f.id.toUpperCase() === trxId);
    if (found) {
      res.json({ success: true, payment: found });
    } else {
      res.status(404).json({ success: false, message: 'ট্রানজেকশন বা রসিদ আইডিটি পাওয়া যায়নি।' });
    }
  });

  // Contact Messages
  app.get('/api/messages', (req, res) => {
    const db = getDbData();
    res.json({ success: true, messages: db.messages });
  });

  app.post('/api/messages', (req, res) => {
    const db = getDbData();
    const newMsg = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false,
      ...req.body,
    };
    db.messages.unshift(newMsg);
    saveDbData(db);
    res.json({ success: true, message: newMsg });
  });

  app.patch('/api/messages/:id/read', (req, res) => {
    const db = getDbData();
    const index = db.messages.findIndex((m: any) => m.id === req.params.id);
    if (index !== -1) {
      db.messages[index].isRead = true;
      saveDbData(db);
    }
    res.json({ success: true });
  });

  app.delete('/api/messages/:id', (req, res) => {
    const db = getDbData();
    db.messages = db.messages.filter((m: any) => m.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Message deleted' });
  });

  // Gallery
  app.get('/api/gallery', (req, res) => {
    const db = getDbData();
    res.json({ success: true, gallery: db.gallery });
  });

  app.post('/api/gallery', (req, res) => {
    const db = getDbData();
    const newItem = {
      id: `gal-${Date.now().toString().slice(-4)}`,
      ...req.body,
    };
    db.gallery.unshift(newItem);
    saveDbData(db);
    res.json({ success: true, item: newItem });
  });

  app.put('/api/gallery/:id', (req, res) => {
    const db = getDbData();
    const index = db.gallery.findIndex((g: any) => g.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    db.gallery[index] = { ...db.gallery[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, item: db.gallery[index] });
  });

  app.delete('/api/gallery/:id', (req, res) => {
    const db = getDbData();
    db.gallery = db.gallery.filter((g: any) => g.id !== req.params.id);
    saveDbData(db);
    res.json({ success: true, message: 'Gallery item deleted' });
  });

  // Download Center
  app.get('/api/downloads', (req, res) => {
    const db = getDbData();
    res.json({ success: true, downloads: db.downloads || [] });
  });

  app.post('/api/downloads', (req, res) => {
    const db = getDbData();
    if (!db.downloads) db.downloads = [];
    const newDoc = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      publishDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      fileType: 'PDF',
      fileSize: '১.৫ মেগাবাইট',
      ...req.body,
    };
    db.downloads.unshift(newDoc);
    saveDbData(db);
    res.json({ success: true, download: newDoc });
  });

  app.put('/api/downloads/:id', (req, res) => {
    const db = getDbData();
    if (!db.downloads) db.downloads = [];
    const index = db.downloads.findIndex((d: any) => d.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Download item not found' });
    }
    db.downloads[index] = { ...db.downloads[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, download: db.downloads[index] });
  });

  app.delete('/api/downloads/:id', (req, res) => {
    const db = getDbData();
    if (db.downloads) {
      db.downloads = db.downloads.filter((d: any) => d.id !== req.params.id);
      saveDbData(db);
    }
    res.json({ success: true, message: 'Download item deleted' });
  });

  app.patch('/api/downloads/:id/increment', (req, res) => {
    const db = getDbData();
    if (db.downloads) {
      const doc = db.downloads.find((d: any) => d.id === req.params.id);
      if (doc) {
        doc.downloadCount = (doc.downloadCount || 0) + 1;
        saveDbData(db);
        return res.json({ success: true, downloadCount: doc.downloadCount });
      }
    }
    res.json({ success: true });
  });

  // Class Fee Structure CRUD
  app.get('/api/fee-structure', (req, res) => {
    const db = getDbData();
    res.json({ success: true, feeStructure: db.feeStructure || [] });
  });

  app.post('/api/fee-structure', (req, res) => {
    const db = getDbData();
    if (!db.feeStructure) db.feeStructure = [];
    const newFee = {
      id: `fee-${Date.now().toString().slice(-4)}`,
      ...req.body,
    };
    db.feeStructure.push(newFee);
    saveDbData(db);
    res.json({ success: true, feeItem: newFee });
  });

  app.put('/api/fee-structure/:id', (req, res) => {
    const db = getDbData();
    if (!db.feeStructure) db.feeStructure = [];
    const index = db.feeStructure.findIndex((f: any) => f.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Fee structure item not found' });
    }
    db.feeStructure[index] = { ...db.feeStructure[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, feeItem: db.feeStructure[index] });
  });

  app.delete('/api/fee-structure/:id', (req, res) => {
    const db = getDbData();
    if (db.feeStructure) {
      db.feeStructure = db.feeStructure.filter((f: any) => f.id !== req.params.id);
      saveDbData(db);
    }
    res.json({ success: true, message: 'Fee structure item deleted' });
  });

  // Class Routines CRUD
  app.get('/api/routines', (req, res) => {
    const db = getDbData();
    res.json({ success: true, routines: db.routines || [] });
  });

  app.post('/api/routines', (req, res) => {
    const db = getDbData();
    if (!db.routines) db.routines = [];
    const newRoutine = {
      id: `rt-${Date.now().toString().slice(-4)}`,
      ...req.body,
    };
    db.routines.push(newRoutine);
    saveDbData(db);
    res.json({ success: true, routine: newRoutine });
  });

  app.put('/api/routines/:id', (req, res) => {
    const db = getDbData();
    if (!db.routines) db.routines = [];
    const index = db.routines.findIndex((r: any) => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Routine item not found' });
    }
    db.routines[index] = { ...db.routines[index], ...req.body };
    saveDbData(db);
    res.json({ success: true, routine: db.routines[index] });
  });

  app.delete('/api/routines/:id', (req, res) => {
    const db = getDbData();
    if (db.routines) {
      db.routines = db.routines.filter((r: any) => r.id !== req.params.id);
      saveDbData(db);
    }
    res.json({ success: true, message: 'Routine item deleted' });
  });

  // Admin login simulation
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Standard default demo credentials
    if ((username === 'admin' && password === 'geniuskg2026') || (username === 'admin' && password === 'admin123')) {
      res.json({
        success: true,
        token: 'auth-token-aynatali-genius-' + Date.now(),
        user: { username: 'admin', role: 'Super Admin', name: 'অধ্যক্ষ / প্রশাসন প্রধান' },
      });
    } else {
      res.status(401).json({ success: false, message: 'ব্যবহারকারী নাম অথবা পাসওয়ার্ড সঠিক নয়।' });
    }
  });

  // --- VITE / STATIC SERVING ---
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
