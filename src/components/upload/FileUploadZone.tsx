// src/components/upload/FileUploadZone.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ALLOWED_EXTENSIONS } from '../../types';

interface FileUploadZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ files, onFilesChange }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const existingNames = new Set(files.map(f => f.name));
    const newFiles = acceptedFiles.filter(f => !existingNames.has(f.name));
    onFilesChange([...files, ...newFiles]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? '#21A038' : '#ccc'}`,
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f0fdf4' : '#fafafa',
          transition: 'all 0.2s ease',
        }}
        role="button"
        aria-label="Зона загрузки файлов"
        tabIndex={0}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ color: '#21A038', fontSize: '16px' }}>
            Отпустите файлы здесь...
          </p>
        ) : (
          <div>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              Перетащите файлы сюда или <span style={{ color: '#21A038' }}>нажмите для выбора</span>
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Поддерживаемые форматы: {ALLOWED_EXTENSIONS.join(', ')}
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            Загруженные файлы ({files.length}):
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px',
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name} ({(file.size / 1024).toFixed(1)} КБ)
                </span>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#E30611',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '0 8px',
                  }}
                  aria-label={`Удалить файл ${file.name}`}
                  type="button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;