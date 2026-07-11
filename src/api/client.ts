// src/api/client.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Структура ответа от API для создания проверки
export interface APICheckResponse {
  check_id: string;
  program: string;
  status: 'approve' | 'reject' | 'manual';
  status_label: string;
  reason: string;
  issues: Array<{
    level: 'error' | 'warning';
    message: string;
  }>;
  documents: Array<{
    name: string;
    detected_type: string;
    size_kb: number;
  }>;
  extracted: {
    contractor: string;
    inn: string;
    amount: string;
    date: string;
    subject: string;
  };
  checked_at: string;
}

// Элемент истории (CheckSummary из API)
export interface HistoryItem {
  check_id: string;
  program: string;
  status: 'approve' | 'reject' | 'manual';
  status_label: string;
  doc_count: number;
  checked_at: string;
}

// Формат для ResultCard
export interface CheckResponse {
  status: 'approved' | 'rejected' | 'manual_review';
  explanation: string;
  errors: Array<{ type: 'error'; message: string }>;
  warnings: Array<{ type: 'warning'; message: string }>;
  extracted_data: {
    counterparty: string;
    amount: string;
    date: string;
    paymentSubject: string;
  };
}

// Создание проверки
export const createCheck = async (
  files: File[],
  program: string
): Promise<APICheckResponse> => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append('files', file);
  });
  
  formData.append('program', program);

  const response = await apiClient.post<APICheckResponse>('/api/checks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Получение истории проверок
export const getCheckHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get<HistoryItem[]>('/api/checks');
  return response.data;
};

// Получение деталей проверки
export const getCheckStatus = async (checkId: string): Promise<APICheckResponse> => {
  const response = await apiClient.get<APICheckResponse>(`/api/checks/${checkId}`);
  return response.data;
};

// Преобразование ответа API в формат для ResultCard
export const transformApiResponse = (apiResponse: APICheckResponse): CheckResponse => {
  const statusMap: Record<string, 'approved' | 'rejected' | 'manual_review'> = {
    'approve': 'approved',
    'reject': 'rejected',
    'manual': 'manual_review',
  };

  const errors = apiResponse.issues
    .filter(issue => issue.level === 'error')
    .map(issue => ({ type: 'error' as const, message: issue.message }));

  const warnings = apiResponse.issues
    .filter(issue => issue.level === 'warning')
    .map(issue => ({ type: 'warning' as const, message: issue.message }));

  return {
    status: statusMap[apiResponse.status] || 'manual_review',
    explanation: apiResponse.reason,
    errors,
    warnings,
    extracted_data: {
      counterparty: apiResponse.extracted.contractor,
      amount: apiResponse.extracted.amount,
      date: apiResponse.extracted.date,
      paymentSubject: apiResponse.extracted.subject,
    },
  };
};