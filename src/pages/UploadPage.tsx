// src/pages/UploadPage.tsx
import React, { useState } from 'react';
import FileUploadZone from '../components/upload/FileUploadZone';
import ProgramSelector from '../components/upload/ProgramSelector';
import ResultCard from '../components/result/ResultCard';
import type { ProgramType } from '../types';
import { createCheck, transformApiResponse } from '../api/client';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof transformApiResponse> | null>(null);

  const canSubmit = files.length > 0 && selectedProgram !== null;

  const handleSubmit = async () => {
    if (!canSubmit || !selectedProgram) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // API возвращает результат сразу (синхронно)
      const apiResponse = await createCheck(files, selectedProgram);
      
      // Преобразуем ответ API в формат для ResultCard
      const transformedResult = transformApiResponse(apiResponse);
      setResult(transformedResult);
    } catch (err) {
      console.error('Ошибка при проверке:', err);
      setError(
        'Не удалось выполнить проверку. Проверьте подключение к интернету и попробуйте снова.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `check-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>
        Загрузка документов для проверки
      </h1>

      <div style={{ 
        backgroundColor: '#fff', 
        padding: '24px', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <section aria-labelledby="upload-heading" style={{ marginBottom: '24px' }}>
          <h2 id="upload-heading" style={{ fontSize: '18px', marginBottom: '12px' }}>
            1. Загрузите пакет документов
          </h2>
          <FileUploadZone
            files={files}
            onFilesChange={setFiles}
          />
        </section>

        <section aria-labelledby="program-heading" style={{ marginBottom: '24px' }}>
          <h2 id="program-heading" style={{ fontSize: '18px', marginBottom: '12px' }}>
            2. Выберите льготную программу
          </h2>
          <ProgramSelector
            value={selectedProgram}
            onChange={setSelectedProgram}
          />
        </section>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          style={{
            backgroundColor: canSubmit && !isLoading ? '#21A038' : '#ccc',
            color: '#fff',
            border: 'none',
            padding: '12px 32px',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: canSubmit && !isLoading ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease',
          }}
          aria-label="Запустить проверку документов"
          type="button"
        >
          {isLoading ? 'Проверка...' : 'Запустить проверку'}
        </button>

        {/* Индикатор загрузки */}
        {isLoading && (
          <div
            style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
            }}
            role="status"
            aria-live="polite"
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
            <p style={{ margin: 0, color: '#666' }}>
              Идёт проверка документов. Это может занять несколько секунд...
            </p>
          </div>
        )}

        {/* Сообщение об ошибке */}
        {error && (
          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#ffebee',
              border: '1px solid #E30611',
              borderRadius: '8px',
              color: '#E30611',
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Результат проверки */}
        {result && <ResultCard result={result} onDownloadReport={handleDownloadReport} />}
      </div>
    </div>
  );
};

export default UploadPage;