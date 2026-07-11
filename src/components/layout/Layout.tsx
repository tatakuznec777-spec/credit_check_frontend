// src/components/layout/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header с навигацией */}
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '16px 24px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <h2 style={{ margin: 0, marginRight: '48px', color: '#21A038' }}>
            AI-агент проверки кредитов
          </h2>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: location.pathname === '/' ? '#21A038' : '#333',
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/' ? '2px solid #21A038' : 'none',
              paddingBottom: '4px'
            }}
          >
            Загрузка документов
          </Link>
          <Link 
            to="/history" 
            style={{ 
              textDecoration: 'none', 
              color: location.pathname === '/history' ? '#21A038' : '#333',
              fontWeight: location.pathname === '/history' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/history' ? '2px solid #21A038' : 'none',
              paddingBottom: '4px'
            }}
          >
            История проверок
          </Link>
        </nav>
      </header>

      {/* Основной контент */}
      <main style={{ flex: 1, padding: '0 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#fff', 
        padding: '16px 24px', 
        marginTop: '48px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        © 2026 AI-агент проверки целевого использования льготных кредитов
      </footer>
    </div>
  );
};

export default Layout;