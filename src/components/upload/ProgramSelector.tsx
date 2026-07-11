// src/components/upload/ProgramSelector.tsx
import React from 'react';
import type { ProgramType } from '../../types';
import { PROGRAM_OPTIONS } from '../../types';

interface ProgramSelectorProps {
  value: ProgramType | null;
  onChange: (value: ProgramType) => void;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({ value, onChange }) => {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#222' }}>
        Выберите льготную программу:
      </legend>
      <div style={{ display: 'flex', gap: '24px' }}>
        {PROGRAM_OPTIONS.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '12px 16px',
              border: `2px solid ${value === option.value ? '#21A038' : '#e0e0e0'}`,
              borderRadius: '8px',
              backgroundColor: value === option.value ? '#f0fdf4' : '#fff',
              transition: 'all 0.2s ease',
              flex: 1,
            }}
          >
            <input
              type="radio"
              name="program"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              style={{ width: '18px', height: '18px', accentColor: '#21A038' }}
            />
            <span style={{ fontSize: '15px' }}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default ProgramSelector;