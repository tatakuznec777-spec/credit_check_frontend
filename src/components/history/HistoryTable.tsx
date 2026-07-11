// src/components/history/HistoryTable.tsx
import React from 'react';

export interface HistoryItem {
  check_id: string;
  program: string;
  status: 'approve' | 'reject' | 'manual';
  status_label: string;
  doc_count: number;
  checked_at: string;
}

interface HistoryTableProps {
  items: HistoryItem[];
  onRowClick: (item: HistoryItem) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ 
  items, 
  onRowClick,
  filter,
  onFilterChange 
}) => {
  // Фильтрация
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.status === filter);

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Цвет статуса
  const getStatusColor = (status: HistoryItem['status']) => {
    switch (status) {
      case 'approve':
        return { bg: '#e8f5e9', text: '#21A038', label: '✓ Можно заявлять' };
      case 'reject':
        return { bg: '#ffebee', text: '#E30611', label: '✗ Нельзя заявлять' };
      case 'manual':
        return { bg: '#fff8e1', text: '#FF9800', label: '! Ручная проверка' };
      default:
        return { bg: '#f5f5f5', text: '#666', label: '?' };
    }
  };

  return (
    <div>
      {/* Фильтр */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px', fontWeight: 600 }}>
          Фильтр по статусу:
        </label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        >
          <option value="all">Все проверки</option>
          <option value="approve">Можно заявлять</option>
          <option value="reject">Нельзя заявлять</option>
          <option value="manual">Ручная проверка</option>
        </select>
      </div>

      {/* Таблица */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            color: '#666',
          }}
        >
          <p style={{ fontSize: '16px', margin: 0 }}>
            {items.length === 0 
              ? 'История проверок пуста. Загрузите документы для первой проверки.' 
              : 'По фильтру ничего не найдено.'}
          </p>
        </div>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <thead style={{ backgroundColor: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                Дата проверки
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                Программа
              </th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e0e0e0' }}>
                Документов
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const statusConfig = getStatusColor(item.status);
              return (
                <tr
                  key={item.check_id}
                  onClick={() => onRowClick(item)}
                  style={{
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                    {formatDate(item.checked_at)}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                    {item.program === 'federal' ? 'Федеральная' : 'Областная'}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
                    {item.doc_count}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.text,
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;