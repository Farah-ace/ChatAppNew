# 🗨️ 1-to-1 Real-Time Chat Application

A full-featured 1-to-1 chat application built using **Node.js**, **Express**, **Next.js**, and **MongoDB**. It supports user authentication, email verification, real-time chatting, voice-to-text messaging, content moderation, and admin management.

---

## 🚀 Features

### 👤 User Authentication
- Sign Up / Login
- Forgot Password & Reset Password (via email and OTP)
- Email verification with OTP
- Secure JWT-based authentication

### 💬 Real-Time Chat
- One-to-one real-time messaging with **Socket.IO**
- Typing indicators and message delivery confirmation
- **Voice input**: Converts speech to text using `react-speech-recognition`

### 🛡️ Content Moderation
- Uses `bad-words-next` to detect offensive language
- Sends **automatic notification emails to admin** on bad-word detection

### 🛠️ Admin Dashboard
- View all users
- Delete users
- View flagged/abusive messages

---

## 🧰 Tech Stack

| Category     | Technologies & Libraries                          |
|--------------|---------------------------------------------------|
| **Frontend** | Next.js, React, Tailwind CSS, react-speech-recognition |
| **Backend**  | Node.js, Express.js, Socket.IO                    |
| **Database** | MongoDB (with Mongoose)                           |
| **Auth**     | JWT, Bcrypt, Nodemailer                           |
| **Moderation** | bad-words-next                                  |

---


