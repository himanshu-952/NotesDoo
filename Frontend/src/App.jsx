import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SubjectSelector from "./components/SubjectSelector";
import ClassSelector from "./components/ClassSelector";
import GetNotes from './pages/GetNotesPage';
import UploadNotes from './pages/UploadNotesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class" element={<ClassSelector />} />
        <Route path="/subject" element={<SubjectSelector />} />
        <Route path="/get-notes" element={<GetNotes />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
