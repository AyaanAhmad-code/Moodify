# 🎵 Moodify - Where AI Meets Emotion through Music

**Moodify** is a cutting-edge MERN stack application that transforms your emotional state into a personalized musical journey. By leveraging real-time facial expression analysis, Moodify curates the perfect soundtrack to match your vibe.

![Moodify Hero](https://github.com/your-username/Moodify/blob/main/frontend/public/banner-image.png) 

## 🚀 Features

* **Real-Time Mood Detection:** Uses MediaPipe and computer vision to analyze facial landmarks and detect emotions (Happy, Sad, Surprised, Neutral, etc.).
* **Smart Music Matching:** An AI-powered engine that filters and plays songs from a curated library based on your detected energy.
* **Personalized Aura:** Visual resonance and intensity bars that sync with your current emotional state.
* **Secure Authentication:** Full-featured JWT-based login and registration system with persistent sessions.
* **Seamless Player:** A custom-built music player with play/pause, volume control, playback speed, and mood-synced playlists.

## 🛠️ Tech Stack

### Frontend
* **React.js** (Functional Components, Hooks)
* **Context API** (State Management)
* **SASS/SCSS** (Futuristic UI Styling)
* **React Router** (Protected Routing)

### Backend
* **Node.js & Express.js**
* **MongoDB** (Database)
* **JWT & HTTP-Only Cookies** (Secure Auth)

### AI & Tools
* **MediaPipe/TensorFlow.js** (Facial Analysis)
* **Axios** (API Communication)
* **Tavily AI** (Real-time data fetching)

## 📸 Screenshots

| Login Page | Dashboard | Mood Detection |
|---|---|---|
| ![Login](https://github.com/your-username/Moodify/blob/main/screenshots/login.png) | ![Dashboard](https://github.com/your-username/Moodify/blob/main/screenshots/dashboard.png) | ![Detection](https://github.com/your-username/Moodify/blob/main/screenshots/detect.png) |

## 🚦 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas Account
* Tavily API Key

---

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/AyaanAhmad-code/Moodify.git](https://github.com/AyaanAhmad-code/Moodify.git)
   cd Moodify
2. **Install Dependencies**

   ```Bash
   # Install backend deps
   npm install
   # Install frontend deps
   cd frontend && npm install
3. **Environment Setup**
     Create a .env file in the root directory:

     ```Code snippet
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     TVLY_API_KEY=your_tavily_key
     Run the App


## Run both frontend and backend
    ```bash
    npm run dev

---

🛡️ Future Roadmap
[ ] Integration with Spotify API for unlimited library access.

[ ] Social sharing of "Daily Mood Playlists".

[ ] Mobile-responsive PWA (Progressive Web App).

---

👨‍💻 Author
Ayaan Ahmad MERN Stack Developer | Sheriyans Coding School Student

https://www.linkedin.com/in/ayaanah287/ | https://my-portfolio-ayaan.vercel.app/

---

⭐️ If you like this project, give it a star!
