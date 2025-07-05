# ✨ AI Notes Summarizer

An AI-powered Notes Summarization web application that allows users to summarize long texts, manage saved notes, and export content – all through an elegant interface. Built using Django (backend) and React (frontend), integrated with TextRank/Hugging Face/Gemini for summarization.

---

## 🚀 Live Demo

🔗 [AI Notes Summarizer - Live Website](https://ai-notes-frontend.onrender.com)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Django
- Django REST Framework (DRF)
- PostgreSQL
- Text Summarization (TextRank, Hugging Face Transformers, or Gemini)

### Deployment
- Render (Frontend & Backend)
- PgAdmin (PostgreSQL)

---

## ✨ Features

- ✅ User Authentication (Login, Register, Forgot Password)
- 📝 Note Summarization with AI
- 📂 Save, Edit, Delete Notes
- 📄 PDF Upload & Summarization
- 🌙 Dark Mode Support
- 🔍 Search and Filter Notes
- 📥 Export Summarized Notes
- 📱 Responsive Design

---

## 🧠 How It Works

1. **User enters text** to summarize.
2. **AI engine** (TextRank / Hugging Face / Gemini) processes and generates a summary.
3. The note is saved along with a generated title.
4. User can manage (view/edit/delete) notes on the dashboard.

---

## 🧪 Setup Locally

### 🔧 Backend (Django)

```bash
git clone https://github.com/your-username/ai-notes-portal.git
cd ai-notes-portal/backend

python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt

# Set up .env with your keys (DB, Gemini/HF keys if needed)
python manage.py migrate
python manage.py runserver
