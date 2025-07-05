import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-1 rounded border border-gray-400 dark:border-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">📘 About AI Notes Portal</h1>

        <p className="text-lg mb-6">
          <strong>AI Notes Portal</strong> is a smart, AI-powered summarization web app designed to help users convert long, complex text into clear, concise notes — instantly.
          Whether you're a student, educator, researcher, or knowledge worker, this tool is built to save time and boost productivity.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 shadow-sm">
          <p className="text-md mb-2"><strong>🌐 Project Type:</strong> Full-stack AI Summarization Web App</p>
          <p className="text-md mb-2"><strong>🧑‍💻 Developer:</strong> Adarsh Pandey</p>
          <p className="text-md mb-2"><strong>🔗 GitHub Repo:</strong> 
            <a 
              href="https://github.com/your-username/ai-notes-summarizer" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              github.com/your-username/ai-notes-summarizer
            </a>
          </p>
          <p className="text-md"><strong>📩 Contact:</strong> 
            <a 
              href="mailto:adarshsomeshwar@gmail.com" 
              className="text-blue-600 hover:underline ml-1"
            >
              adarshsomeshwar@gmail.com
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-3">🔍 What Can You Do Here?</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Summarize large text blocks into digestible notes using AI</li>
          <li>Auto-generate intelligent titles for your notes</li>
          <li>Upload PDF files and get summarized content</li>
          <li>Save, update, and delete notes anytime — all stored securely</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">🚀 How to Use the App</h2>
        <ol className="list-decimal list-inside mb-6 space-y-1">
          <li>Register or log in with your account</li>
          <li>Paste text or upload a PDF</li>
          <li>Click <strong>Summarize</strong> to generate your summary</li>
          <li>Edit, save, or delete your notes as needed</li>
          <li>Access saved notes anytime from your dashboard</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-6 mb-3">🧠 Tech Stack</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>Frontend:</strong> React.js + Tailwind CSS</li>
          <li><strong>Backend:</strong> Django REST Framework (DRF)</li>
          <li><strong>Authentication:</strong> JWT (Token-based)</li>
          <li><strong>AI Models:</strong> 
            <ul className="list-[circle] ml-5 mt-1 space-y-1">
              <li>TextRank (`summa`) — lightweight & efficient</li>
              <li>Optional: Hugging Face Transformers (e.g., T5, BART)</li>
              <li>Optional: Google Gemini API for scalable summaries</li>
            </ul>
          </li>
          <li><strong>Database:</strong> PostgreSQL (Render) or SQLite (local)</li>
          <li><strong>Deployment:</strong> Render.com (Full-stack deployment)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">💡 Future Enhancements</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Download summaries as PDF or .txt files</li>
          <li>Dark mode support</li>
          <li>Multi-language summarization</li>
          <li>Shareable notes and collaboration features</li>
          <li>Model selector — choose between TextRank, T5, Gemini</li>
        </ul>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Proudly built as a portfolio project. Feedback is always welcome. 🚀
        </p>
      </div>

      <footer className="text-center py-4 border-t mt-10 text-sm text-gray-600 dark:text-gray-400">
        Made with 💡 by Adarsh Pandey | AI Notes Portal © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default About;
