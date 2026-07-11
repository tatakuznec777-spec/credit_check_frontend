// src/pages/HistoryPage.tsx
import React, { useState, useEffect } from 'react';
import HistoryTable from '../components/history/HistoryTable';
import { getCheckHistory, type HistoryItem } from '../api/client';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getCheckHistory();
        setHistory(data);
      } catch (err) {
        console.error('Ошибка при загрузке истории:', err);
        setError('Не удалось загрузить историю проверок.');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleRowClick = async (item: HistoryItem) => {
    // Пока просто показываем alert
    const programLabel = item.program === 'federal' ? 'Федеральная' : 'Областная';
    alert(
      `Детали проверки ${item.check_id}\n\n` +
      `Статус: ${item.status_label}\n` +
      `Программа: ${programLabel}\n` +
      `Документов: ${item.doc_count}\n` +
      `Дата: ${new Date(item.checked_at).toLocaleString('ru-RU')}`
    );
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>
        История проверок
      </h1>

      {isLoading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#666' }}>Загрузка истории...</p>
        </div>
      ) : error ? (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#ffebee',
            border: '1px solid #E30611',
            borderRadius: '8px',
            color: '#E30611',
          }}
        >
          {error}
        </div>
      ) : (
        <HistoryTable
          items={history}
          onRowClick={handleRowClick}
          filter={filter}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
};

export default HistoryPage;