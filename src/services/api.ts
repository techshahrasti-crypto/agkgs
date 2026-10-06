import {
  SchoolSettings,
  Notice,
  Teacher,
  AdmissionApplication,
  ResultRecord,
  FeePayment,
  ContactMessage,
  GalleryItem,
  SchoolStats,
  DownloadItem,
  ClassRoutineItem,
  ClassFeeItem,
} from '../types';

export const api = {
  // Stats
  async getStats(): Promise<SchoolStats> {
    const res = await fetch('/api/stats');
    const data = await res.json();
    return data.stats;
  },

  // Settings
  async getSettings(): Promise<SchoolSettings> {
    const res = await fetch('/api/settings');
    const data = await res.json();
    return data.settings;
  },

  async updateSettings(settings: Partial<SchoolSettings>): Promise<SchoolSettings> {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    return data.settings;
  },

  // Notices
  async getNotices(): Promise<Notice[]> {
    const res = await fetch('/api/notices');
    const data = await res.json();
    return data.notices;
  },

  async createNotice(notice: Omit<Notice, 'id'>): Promise<Notice> {
    const res = await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notice),
    });
    const data = await res.json();
    return data.notice;
  },

  async updateNotice(id: string, updates: Partial<Notice>): Promise<Notice> {
    const res = await fetch(`/api/notices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.notice;
  },

  async deleteNotice(id: string): Promise<boolean> {
    const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Teachers
  async getTeachers(): Promise<Teacher[]> {
    const res = await fetch('/api/teachers');
    const data = await res.json();
    return data.teachers;
  },

  async createTeacher(teacher: Omit<Teacher, 'id'>): Promise<Teacher> {
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher),
    });
    const data = await res.json();
    return data.teacher;
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher> {
    const res = await fetch(`/api/teachers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.teacher;
  },

  async deleteTeacher(id: string): Promise<boolean> {
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Admissions
  async getAdmissions(): Promise<AdmissionApplication[]> {
    const res = await fetch('/api/admissions');
    const data = await res.json();
    return data.admissions;
  },

  async submitAdmission(
    application: Omit<AdmissionApplication, 'id' | 'applicationDate' | 'status'>
  ): Promise<AdmissionApplication> {
    const res = await fetch('/api/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    const data = await res.json();
    return data.admission;
  },

  async updateAdmissionStatus(
    id: string,
    status: AdmissionApplication['status'],
    remarks?: string
  ): Promise<AdmissionApplication> {
    const res = await fetch(`/api/admissions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, remarks }),
    });
    const data = await res.json();
    return data.admission;
  },

  async updateAdmission(id: string, updates: Partial<AdmissionApplication>): Promise<AdmissionApplication> {
    const res = await fetch(`/api/admissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.admission;
  },

  async deleteAdmission(id: string): Promise<boolean> {
    const res = await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Results
  async getResults(): Promise<ResultRecord[]> {
    const res = await fetch('/api/results');
    const data = await res.json();
    return data.results;
  },

  async searchResults(params: {
    year?: string;
    term?: string;
    className?: string;
    rollNo?: string;
    studentId?: string;
  }): Promise<ResultRecord[]> {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const res = await fetch(`/api/results/search?${query}`);
    const data = await res.json();
    return data.results;
  },

  async createResult(result: Omit<ResultRecord, 'id'>): Promise<ResultRecord> {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    const data = await res.json();
    return data.result;
  },

  async updateResult(id: string, updates: Partial<ResultRecord>): Promise<ResultRecord> {
    const res = await fetch(`/api/results/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.result;
  },

  async deleteResult(id: string): Promise<boolean> {
    const res = await fetch(`/api/results/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Fee Payments
  async getFeeRecords(): Promise<FeePayment[]> {
    const res = await fetch('/api/fees/records');
    const data = await res.json();
    return data.fees;
  },

  async submitFeePayment(
    payment: Omit<FeePayment, 'id' | 'date' | 'status'>
  ): Promise<FeePayment> {
    const res = await fetch('/api/fees/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    const data = await res.json();
    return data.payment;
  },

  async verifyPayment(trxId: string): Promise<{ success: boolean; payment?: FeePayment; message?: string }> {
    const res = await fetch(`/api/fees/verify/${encodeURIComponent(trxId)}`);
    return await res.json();
  },

  async updateFeeRecord(id: string, updates: Partial<FeePayment>): Promise<FeePayment> {
    const res = await fetch(`/api/fees/records/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.payment;
  },

  async deleteFeeRecord(id: string): Promise<boolean> {
    const res = await fetch(`/api/fees/records/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Messages
  async getMessages(): Promise<ContactMessage[]> {
    const res = await fetch('/api/messages');
    const data = await res.json();
    return data.messages;
  },

  async sendMessage(
    message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>
  ): Promise<ContactMessage> {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    const data = await res.json();
    return data.message;
  },

  async markMessageRead(id: string): Promise<boolean> {
    const res = await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
    const data = await res.json();
    return data.success;
  },

  async deleteMessage(id: string): Promise<boolean> {
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    return data.gallery;
  },

  async createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.item;
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.item;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Downloads
  async getDownloads(): Promise<DownloadItem[]> {
    const res = await fetch('/api/downloads');
    const data = await res.json();
    return data.downloads;
  },

  async createDownload(doc: Omit<DownloadItem, 'id' | 'publishDate' | 'downloadCount'>): Promise<DownloadItem> {
    const res = await fetch('/api/downloads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    const data = await res.json();
    return data.download;
  },

  async updateDownload(id: string, updates: Partial<DownloadItem>): Promise<DownloadItem> {
    const res = await fetch(`/api/downloads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.download;
  },

  async deleteDownload(id: string): Promise<boolean> {
    const res = await fetch(`/api/downloads/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  async incrementDownloadCount(id: string): Promise<number> {
    const res = await fetch(`/api/downloads/${id}/increment`, { method: 'PATCH' });
    const data = await res.json();
    return data.downloadCount;
  },

  // Fee Structure
  async getFeeStructure(): Promise<ClassFeeItem[]> {
    const res = await fetch('/api/fee-structure');
    const data = await res.json();
    return data.feeStructure;
  },

  async createFeeStructure(item: Omit<ClassFeeItem, 'id'>): Promise<ClassFeeItem> {
    const res = await fetch('/api/fee-structure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.feeItem;
  },

  async updateFeeStructure(id: string, updates: Partial<ClassFeeItem>): Promise<ClassFeeItem> {
    const res = await fetch(`/api/fee-structure/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.feeItem;
  },

  async deleteFeeStructure(id: string): Promise<boolean> {
    const res = await fetch(`/api/fee-structure/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Class Routines
  async getRoutines(): Promise<ClassRoutineItem[]> {
    const res = await fetch('/api/routines');
    const data = await res.json();
    return data.routines;
  },

  async createRoutine(item: Omit<ClassRoutineItem, 'id'>): Promise<ClassRoutineItem> {
    const res = await fetch('/api/routines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.routine;
  },

  async updateRoutine(id: string, updates: Partial<ClassRoutineItem>): Promise<ClassRoutineItem> {
    const res = await fetch(`/api/routines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.routine;
  },

  async deleteRoutine(id: string): Promise<boolean> {
    const res = await fetch(`/api/routines/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data.success;
  },

  // Auth
  async loginAdmin(credentials: { username: string; password: string }) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  },
};
