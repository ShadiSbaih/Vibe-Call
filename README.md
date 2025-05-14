# VibeCall

VibeCall is a full-stack web application that connects language learners for real-time chat and video calls. Users can sign up, complete onboarding, find language partners, send and accept friend requests, and communicate via messaging or video using an intuitive React frontend and a Node.js/Express backend.

---

## Features

- **User Authentication**: Secure sign up, login, and logout with JWT and cookies.
- **Onboarding**: Complete your profile with bio, languages, location, and avatar.
- **Find Language Partners**: Discover recommended users based on your profile.
- **Friend Requests**: Send, accept, and manage friend requests.
- **Real-Time Chat**: 1:1 messaging powered by [Stream Chat](https://getstream.io/chat/).
- **Video Calls**: Start or join video calls with friends using [Stream Video](https://getstream.io/video/).
- **Notifications**: Get notified about friend requests and new connections.
- **Theming**: Choose from multiple beautiful themes (light, dark, and more) with [daisyUI](https://daisyui.com/).
- **Responsive UI**: Modern, mobile-friendly design with [Tailwind CSS](https://tailwindcss.com/).

---

## Tech Stack

- **Frontend**: React, Vite, Zustand, Tailwind CSS, DaisyUI, React Query, Stream Chat & Video SDKs
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Stream Chat API
- **Other**: Axios, React Hot Toast, Lucide Icons

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- [GetStream.io](https://getstream.io/) account for Chat & Video API keys

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/vibecall.git
   cd vibecall
   ```
2.Backend Setup
 ```sh
    cd backend
    cp .env.example .env   # Create and fill in your .env file
    npm install
    npm run dev            # Starts backend on http://localhost:5000
   ```
3.Frontend Setup
 ```sh
    cd ../frontend
    cp .env.example .env   # Create and fill in your .env file
    npm install
    npm run dev            # Starts frontend on http://localhost:5173
   ```
4.Environment Variables
 Backend .env:
 ```sh
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    STREAM_API_KEY=your_stream_api_key
    STREAM_API_SECRET=your_stream_api_secret
    JWT_SECRET_KEY=your_jwt_secret
    NODE_ENV=development
   ```
Frontend .env:
```sh
   VITE_STREAM_API_KEY=your_stream_api_key
   MODE=development
```



Scripts
1.Frontend
```sh
npm run dev – Start development server
npm run build – Build for production
npm run preview – Preview production build
```
2.Backend
```sh
npm run dev – Start backend with nodemon
npm start – Start backend
```
##Folder Structure:
```sh
vibecall/
  backend/
    src/
      controllers/
      models/
      routes/
      lib/
      middleware/
      [server.js](http://_vscodecontentref_/0)
    .env
    [package.json](http://_vscodecontentref_/1)
  frontend/
    src/
      components/
      pages/
      hooks/
      store/
      lib/
      constants/
      [App.jsx](http://_vscodecontentref_/2)
      [main.jsx](http://_vscodecontentref_/3)
      [index.css](http://_vscodecontentref_/4)
    public/
    .env
    [package.json](http://_vscodecontentref_/5)
    [tailwind.config.js](http://_vscodecontentref_/6)
    [vite.config.js](http://_vscodecontentref_/7)
```

## Acknowledgements
- Stream Chat & Video
- Tailwind CSS
- DaisyUI
- Lucide Icons
