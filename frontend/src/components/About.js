import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About AI Notes Portal</h1>

      <p className="text-lg mb-4">
        <strong>AI Notes Portal</strong> is a smart note-taking platform that leverages cutting-edge AI to help you
        generate concise and clear summaries from long texts, articles, or documents. Whether you are a student, researcher, or content consumer—this tool is designed to save you time and enhance your productivity.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔍 What Does It Do?</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Summarizes long text input into shorter, meaningful notes.</li>
        <li>Auto-generates titles based on summary content.</li>
        <li>Supports uploading PDFs and summarizing their content.</li>
        <li>Lets you save, view, edit, and delete notes anytime.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🚀 How to Use It?</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>Login or sign up to your account.</li>
        <li>Enter or paste your text into the summarizer box.</li>
        <li>Click <strong>Summarize</strong> — the AI will generate a summary instantly.</li>
        <li>You can choose to <strong>save</strong> it, <strong>edit</strong> it, or <strong>delete</strong> anytime from your dashboard.</li>
        <li>You can also upload a PDF to extract and summarize its text.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🧠 How Is It Built?</h2>
      <p className="mb-4">
        The portal is built using modern web technologies and AI services:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Frontend:</strong> React.js with Tailwind CSS for a sleek, fast UI.</li>
        <li><strong>Backend:</strong> Django REST Framework for secure APIs and user management.</li>
        <li><strong>AI Summarization:</strong> 
          <ul className="ml-4 list-[circle]">
            <li><code>summa</code> (TextRank) for lightweight summarization.</li>
            <li>Optional: Hugging Face Transformers (T5, BART) for deep learning-based summaries.</li>
            <li>Optional: Gemini API (Google AI) for more advanced and deployable summarization.</li>
          </ul>
        </li>
        <li><strong>Database:</strong> PostgreSQL or SQLite (based on your deployment).</li>
        <li><strong>Hosting:</strong> Render.com or other free-tier services like Railway or Vercel.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">💡 Future Plans</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Export summaries as PDF or text files.</li>
        <li>Advanced AI model switching and customization.</li>
        <li>Multilingual support and summarization style tuning.</li>
        <li>Collaborative notes and sharing.</li>
      </ul>

      <p className="mt-6">
        For any queries, email us at{' '}
        <a href="mailto:adarshsomeshwar@gmail.com" className="text-blue-600 underline hover:text-blue-800">
          adarshsomeshwar@gmail.com
        </a>
      </p>

    </div>
  );
};

export default About;
