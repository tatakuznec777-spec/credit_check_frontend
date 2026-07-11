// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UploadPage from './pages/UploadPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;