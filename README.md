# ✅ Smart Task Manager (with OpenAI Priority Analysis)

A simple yet intelligent to-do list app built with **React**, featuring **task creation, completion toggling, deletion**, and dynamic **priority detection** using the **OpenAI API**.

---

## ✨ Features

- 📌 Add new tasks via input form
- 🧠 **Automatic task priority analysis** (`low`, `medium`, `high`) using OpenAI GPT
- ✅ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 🧮 Task counters (created and completed)
- 📦 Data persists in `localStorage` between sessions
- 🔄 Tasks are auto-sorted (incomplete before completed)

---

## 📸 Preview

> _You can add a screenshot or a GIF here if needed._

---

## 🛠️ Technologies Used

- React (with Hooks)
- TypeScript
- Phosphor Icons
- CSS Modules
- OpenAI API (GPT-4)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-task-manager.git
cd smart-task-manager

```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Add your OpenAI API key

Add your key (get it from https://platform.openai.com/account/api-keys)

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the app

```bash
npm run dev
# or
yarn dev
```

### 5. 🔐 Security Notes

- Do not use the OpenAI API key directly in frontend code in production.
- In production apps, route OpenAI requests through a backend for security.

## 📌 Future Improvements

- 🌈 Visual indicators (color tags) for priority
- 🔍 Task filtering (by priority or status)
- 📱 Mobile responsiveness
- ☁️ Cloud sync with user login (optional)

## 📄 License

MIT — Free to use, modify, and distribute.
