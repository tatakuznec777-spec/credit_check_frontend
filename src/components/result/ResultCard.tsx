// src/components/result/ResultCard.tsx
import React from 'react';

interface CheckProblem {
  type: 'error' | 'warning';
  message: string;
}

interface ExtractedData {
  counterparty: string;
  amount: string;
  date: string;
  paymentSubject: string;
}

interface ResultCardProps {
  result: {
    status: 'approved' | 'rejected' | 'manual_review';
    explanation: string;
    errors: CheckProblem[];
    warnings: CheckProblem[];
    extracted_data: ExtractedData;
  };
  onDownloadReport: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onDownloadReport }) => {
  // Определяем цвета и текст статуса
  const getStatusConfig = (status: typeof result.status) => {
    switch (status) {
      case 'approved':
        return {
          bgColor: '#e8f5e9',
          borderColor: '#21A038',
          textColor: '#21A038',
          label: 'Можно заявлять',
          icon: '✓',
        };
      case 'rejected':
        return {
          bgColor: '#ffebee',
          borderColor: '#E30611',
          textColor: '#E30611',
          label: 'Нельзя заявлять',
          icon: '✗',
        };
      case 'manual_review':
        return {
          bgColor: '#fff8e1',
          borderColor: '#FF9800',
          textColor: '#FF9800',
          label: 'Требуется ручная проверка',
          icon: '!',
        };
      default:
        return {
          bgColor: '#f5f5f5',
          borderColor: '#9e9e9e',
          textColor: '#616161',
          label: 'Неизвестный статус',
          icon: '?',
        };
    }
  };

  const config = getStatusConfig(result.status);

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Карточка статуса */}
      <div
        style={{
          backgroundColor: config.bgColor,
          border: `2px solid ${config.borderColor}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '32px',
              color: config.textColor,
              fontWeight: 'bold',
            }}
          >
            {config.icon}
          </span>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                color: config.textColor,
              }}
            >
              {config.label}
            </h2>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
              {result.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Извлеченные данные */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#222' }}>
          Извлеченные данные из документов:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Контрагент:</p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600 }}>
              {result.extracted_data.counterparty || '—'}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Сумма:</p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600 }}>
              {result.extracted_data.amount || '—'}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Дата:</p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600 }}>
              {result.extracted_data.date || '—'}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Предмет оплаты:</p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600 }}>
              {result.extracted_data.paymentSubject || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Ошибки */}
      {result.errors.length > 0 && (
        <div
          style={{
            backgroundColor: '#ffebee',
            border: '1px solid #E30611',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '16px', margin: '0 0 12px', color: '#E30611' }}>
            Ошибки ({result.errors.length}):
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {result.errors.map((error, index) => (
              <li key={index} style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Предупреждения */}
      {result.warnings.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff8e1',
            border: '1px solid #FF9800',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <h3 style={{ fontSize: '16px', margin: '0 0 12px', color: '#FF9800' }}>
            Предупреждения ({result.warnings.length}):
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {result.warnings.map((warning, index) => (
              <li key={index} style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Кнопка скачать отчет */}
      <button
        onClick={onDownloadReport}
        style={{
          backgroundColor: '#21A038',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '16px',
        }}
        type="button"
      >
        Скачать отчёт (JSON)
      </button>
    </div>
  );
};

export default ResultCard;