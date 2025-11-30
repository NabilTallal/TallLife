# TallLife - Life Tracking & Analytics App 🌱

TallLife is a full-stack wellness tracking application built with the **MERN stack** that helps users track and analyze their habits, moods, and sleep patterns. With interactive dashboards and insightful analytics, TallLife empowers users to monitor their lifestyle and improve their well-being.

![TallLife Banner](https://img.shields.io/badge/TallLife-Wellness%20Tracker-yellow) ![MERN Stack](https://img.shields.io/badge/Stack-MERN-green) ![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## ✨ Features

- **🎯 Habit Tracking**: Create, track, and analyze your daily habits with time tracking
- **😊 Mood Tracking**: Log your mood (1-10 scale) with notes and tags
- **😴 Sleep Tracking**: Record sleep hours, quality, and energy levels
- **📊 Analytics Dashboards**: Visualize your data with charts and insights
- **🏆 Progress Tracking**: Monitor consistency and personal growth
- **🔐 Secure Authentication**: JWT-based user authentication
- **📱 Responsive Design**: Beautiful UI that works on all devices

---

## 🛠 Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **TailwindCSS** - Utility-first CSS framework
- **Daisy UI** - Component library for TailwindCSS
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **Zustand** - State management
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NabilTallal/TallLife.git
cd TallLife
Install Backend Dependencies
```

```bash
Copy code
cd backend
npm install
Install Frontend Dependencies
```
```bash
Copy code
cd ../frontend
npm install
Environment Setup
Create a .env file in the backend directory:
```

env
Copy code 
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
Important Security Note: The .env file is excluded from version control. Make sure to create your own with your specific configuration.
```

Run the Application
Start the backend server:

```bash
Copy code
cd backend
npm run dev
Start the frontend development server:
```

```bash
Copy code
cd frontend
npm start
Access the Application
```

Frontend: http://localhost:3000

Backend API: http://localhost:5000

📁 Project Structure
```bash
Copy code
TallLife/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   ├── middleware/     # Custom middleware
│   ├── stores/         # Zustand stores
│   ├── utils/          # Utility functions
│   ├── .env            # Environment variables (gitignored)
│   └── server.js       # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── stores/     # Zustand state management
│   │   ├── utils/      # Helper functions
│   │   └── App.js      # Main App component
│   └── public/         # Static assets
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```
## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login  
- `GET /api/auth/check` - Verify authentication

### Mood Tracking
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get user's mood entries
- `PUT /api/moods/:id` - Update mood entry
- `DELETE /api/moods/:id` - Delete mood entry
- `GET /api/moods/analytics` - Get mood analytics

### Habit Tracking
- `POST /api/habits` - Create habit entry
- `GET /api/habits` - Get user's habits
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `GET /api/habits/analytics` - Get habit analytics

### Sleep Tracking
- `POST /api/sleep` - Create sleep entry
- `GET /api/sleep` - Get user's sleep records
- `PUT /api/sleep/:id` - Update sleep entry
- `DELETE /api/sleep/:id` - Delete sleep entry
- `GET /api/sleep/analytics` - Get sleep analytics

## 🎨 UI Components

### Forms
- **MoodForm** - Track daily mood with emoji scale
- **HabitForm** - Create and manage habits with time tracking
- **SleepForm** - Log sleep duration and quality

### Layout
- **Sidebar** - Navigation with user info
- **Header** - Page headers with user greeting
- **StatCard** - Reusable analytics cards

### Pages
- **Dashboard** - Overview with recent entries and analytics
- **Moods** - Mood tracking interface
- **Habits** - Habit management
- **Sleep** - Sleep tracking interface
- **Login/Signup** - Authentication pages

## 🔧 Development

### Running in Development Mode

```bash
# Backend with hot reload
cd backend && npm run dev

# Frontend with hot reload
cd frontend && npm start
```

## 🎨 UI Components

### Forms
- **MoodForm** - Track daily mood with emoji scale
- **HabitForm** - Create and manage habits with time tracking
- **SleepForm** - Log sleep duration and quality

### Layout
- **Sidebar** - Navigation with user info
- **Header** - Page headers with user greeting
- **StatCard** - Reusable analytics cards

### Pages
- **Dashboard** - Overview with recent entries and analytics
- **Moods** - Mood tracking interface
- **Habits** - Habit management
- **Sleep** - Sleep tracking interface
- **Login/Signup** - Authentication pages

## 🔧 Development

### Running in Development Mode
# Backend with hot reload
cd backend && npm run dev

# Frontend with hot reload
cd frontend && npm start

### Building for Production
# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**Steps:**
1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Nabil Tallal**
- GitHub: @NabilTallal
- Project: TallLife

## 🙏 Acknowledgments

- Icons by Lucide React
- UI components by Daisy UI
- Styling with Tailwind CSS

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the development team.

---

**TallLife** - Track your life, improve your well-being! 🌟
