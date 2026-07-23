# 🧠 QuizGen AI

An AI-powered quiz generation web application that creates multiple-choice quizzes on any topic using Large Language Models (LLMs). Built with FastAPI, OpenRouter AI, HTML, CSS, and JavaScript, QuizGen AI provides an interactive and responsive interface for students, educators, and self-learners.

---

## 🚀 Features

- 🤖 AI-powered quiz generation
- 📚 Generate quizzes on any topic
- 🎯 Difficulty levels (Easy, Medium, Hard)
- 🔢 Choose the number of questions
- ⚡ Real-time streaming AI responses
- 📄 Download quizzes as PDF
- 📋 Copy quiz to clipboard
- 🧹 Clear generated quiz
- 🌐 Internet connectivity check
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- FastAPI
- OpenRouter API
- OpenAI Python SDK

### AI Model
- GPT-OSS 20B (via OpenRouter)

---

## 📂 Project Structure

```
QuizGenAI/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── logo.svg
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Add your API key

Create a `.env` file inside the backend folder.

```
OPENROUTER_API_KEY=your_api_key_here
```

### Run the project

```bash
uvicorn main:app --reload
```

Open your browser:

```
http://127.0.0.1:8000
```

---

## 📷 Screenshots

(Add screenshots here)

---

## 🔮 Future Enhancements

- Interactive quiz mode
- Score calculation
- User authentication
- Quiz history
- Leaderboard
- Dark/Light mode
- Export to DOCX

---

## 👨‍💻 Author

Developed by **Deepak Jaish**

