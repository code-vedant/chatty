# Chatty

Chatty is a real-time chat application built with the MERN stack, using WebSockets for instant messaging. It supports authentication, message persistence, theming, and responsive UI design.

## Features

- 🔒 Authentication with JWT & cookies
- 💬 Real-time messaging using Socket.IO
- 🎨 Theme switching with DaisyUI
- 🗃️ MongoDB database for storing users and messages
- ⚡ Fast and responsive UI with React and TailwindCSS

## Tech Stack

**Frontend:** React, TailwindCSS, DaisyUI, Zustand  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Real-time:** Socket.IO  
**Authentication:** JWT + HTTP-only Cookies

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/chatty.git
cd chatty
```

2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../frontend
npm install
```

3. Setup environment variables
Create a `.env` file in the `server` directory with the following:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

4. Run the application
```bash
# Backend
cd server
npm run dev

# Frontend
cd ../frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Folder Structure
```
chatty/
├── frontend/        # React app with TailwindCSS and DaisyUI
├── server/          # Express server and API
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   ├── controllers/ # Controllers
│   └── lib/         # DB and socket setup
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
