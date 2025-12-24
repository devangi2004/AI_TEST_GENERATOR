# AI Test Generator

An AI-powered web application that automatically generates question papers/tests from user-provided input such as topics, difficulty level, number of questions, and question types. This project is suitable for academic use, internal assessments, practice tests, and mini/major projects.

---

## 🚀 Features

* Generate question papers using AI
* Supports MCQs, short-answer, and long-answer questions
* Difficulty levels: Easy / Medium / Hard
* Topic-wise test generation
* User authentication (Admin / User)
* Secure backend using JWT
* MongoDB database integration
* RESTful API architecture
* Clean and modular project structure

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* (Optional) React / Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* dotenv

### AI Integration

* Google Gemini API / OpenAI API (as configured)

---

## 📁 Project Structure

```
AI_TEST_GENERATOR/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/devangi2004/AI_TEST_GENERATOR.git
cd AI_TEST_GENERATOR
```

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_gemini_or_openai_api_key
```

Run the backend server:

```
npm start
```

---

### 3️⃣ Frontend Setup

Open `frontend/index.html` in your browser

(OR)

If using React:

```
npm install
npm start
```

---

## 🔐 API Endpoints (Sample)

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `POST /api/test/generate` – Generate AI-based test
* `GET /api/test/history` – View generated tests

---

## 🧠 How AI Test Generation Works

1. User selects topic, difficulty, and question type
2. Input is sent to backend API
3. Backend sends prompt to AI model
4. AI returns structured questions
5. Questions are formatted and displayed to the user

---

## 📌 Use Cases

* College internal exams
* Online practice tests
* Teacher question paper generation
* EdTech platforms

---

## 📷 Screenshots



---

## 🧪 Future Enhancements

* PDF export of question papers
* Timer-based online tests
* Student performance analytics
* Question bank storage
* Role-based access control

---

## 🤝 Contribution

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Devangi Inani**
GitHub: [https://github.com/devangi2004](https://github.com/devangi2004)

---

## ⭐ Acknowledgements

* Google Gemini API / OpenAI
* Node.js & Express Community
* MongoDB Atlas

