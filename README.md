# Life Planner 📋

A comprehensive web application for organizing daily life activities, built with modern web technologies. Life Planner helps users manage tasks, track goals, build habits, schedule events, monitor finances, and stay motivated.

![Life Planner](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff)
![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.4-green)

## 🌟 Features

### Core Modules

1. **📝 Daily Tasks**
   - Add, edit, and delete tasks
   - Mark tasks as complete/incomplete
   - Priority levels (High, Medium, Low)
   - Due date tracking with overdue indicators
   - Filter by status (All, Active, Completed)

2. **🎯 Goals**
   - Create long-term and short-term goals
   - Track progress with visual progress bars
   - Set deadlines with urgency indicators
   - Categorize goals (Personal, Education, Career, Health, Financial, Skills)
   - Quick progress updates

3. **💪 Habits**
   - Build and track daily habits
   - Streak counter with milestone emojis
   - Daily completion tracking
   - Automatic streak calculation
   - Visual completion status

4. **📅 Schedule/Calendar**
   - Add upcoming events and activities
   - Date and time management
   - Location tracking
   - Today's events highlighted
   - Past events visual distinction

5. **💰 Micro-Finance Tracking**
   - Track income and expenses
   - Category-based organization
   - Balance summary (Income, Expenses, Net Balance)
   - Transaction history
   - Filter by type

6. **✨ Motivational Notes**
   - Create inspiring notes
   - Categorize by theme
   - Grid layout for easy browsing
   - Edit and manage notes

7. **📊 Dashboard**
   - Overview of all activities
   - Task completion percentage
   - Active goals progress
   - Habit streaks display
   - Upcoming events count
   - Quick access to pending items

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router DOM 6.20.1
- **HTTP Client**: Axios 1.6.2
- **Backend/Database**: JSON Server 0.17.4
- **Development**: ESLint, Concurrently

## 📁 Project Structure

```
life-planner/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── Badge.jsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── goals/
│   │   │   ├── GoalCard.jsx
│   │   │   └── GoalForm.jsx
│   │   ├── habits/
│   │   │   ├── HabitCard.jsx
│   │   │   └── HabitForm.jsx
│   │   ├── schedule/
│   │   │   ├── CalendarItem.jsx
│   │   │   └── ScheduleForm.jsx
│   │   ├── finance/
│   │   │   ├── TransactionCard.jsx
│   │   │   └── TransactionForm.jsx
│   │   ├── notes/
│   │   │   ├── NoteCard.jsx
│   │   │   └── NoteForm.jsx
│   │   ├── dashboard/
│   │   │   └── DashboardCard.jsx
│   │   └── layout/
│   │       └── Navbar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Goals.jsx
│   │   ├── Habits.jsx
│   │   ├── Schedule.jsx
│   │   ├── Finance.jsx
│   │   └── Notes.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── taskService.js
│   │   ├── goalService.js
│   │   ├── habitService.js
│   │   ├── scheduleService.js
│   │   ├── financeService.js
│   │   └── noteService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd Project-Final-Kelompok-front-end-development
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

You have two options to run the application:

#### Option 1: Run Both Servers Concurrently (Recommended)

```bash
npm run dev:all
```

This will start both the Vite development server and JSON Server simultaneously.

#### Option 2: Run Servers Separately

**Terminal 1 - Start Vite Development Server:**
```bash
npm run dev
```
The app will be available at: `http://localhost:5173`

**Terminal 2 - Start JSON Server:**
```bash
npm run server
```
The API will be available at: `http://localhost:3001`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📡 API Endpoints

JSON Server provides RESTful API endpoints:

| Resource | Endpoint | Methods |
|----------|----------|---------|
| Tasks | `/tasks` | GET, POST, PUT, DELETE |
| Goals | `/goals` | GET, POST, PUT, DELETE |
| Habits | `/habits` | GET, POST, PUT, DELETE |
| Schedules | `/schedules` | GET, POST, PUT, DELETE |
| Finances | `/finances` | GET, POST, PUT, DELETE |
| Notes | `/notes` | GET, POST, PUT, DELETE |

### Example API Calls

```javascript
// Get all tasks
GET http://localhost:3001/tasks

// Create a new task
POST http://localhost:3001/tasks
{
  "title": "Complete project",
  "description": "Finish the Life Planner app",
  "priority": "high",
  "dueDate": "2025-11-30",
  "completed": false
}

// Update a task
PUT http://localhost:3001/tasks/1
{
  "completed": true
}

// Delete a task
DELETE http://localhost:3001/tasks/1
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with glassmorphism effects
- **Gradient Accents**: Beautiful gradient colors throughout the app
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Ready**: Prepared for dark mode implementation
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Custom Scrollbar**: Styled scrollbars for better aesthetics
- **Accessibility**: Focus states and semantic HTML

## 🔧 Component Architecture

### Reusable UI Components
- **Button**: Multiple variants (primary, secondary, danger, success, outline)
- **Input**: Form inputs with labels and error handling
- **Modal**: Backdrop modal with animations
- **Card**: Glassmorphism card with hover effects
- **ProgressBar**: Animated progress indicator
- **Badge**: Status and category indicators

### Feature Components
Each module has dedicated Card and Form components for consistent UX.

## 📊 Database Schema

The `db.json` file contains sample data for all modules:

- **tasks**: id, title, description, completed, priority, dueDate, createdAt
- **goals**: id, title, description, deadline, progress, category, createdAt
- **habits**: id, name, description, streak, lastCompleted, frequency, createdAt
- **schedules**: id, title, description, startTime, endTime, location, createdAt
- **finances**: id, type, category, amount, description, date, createdAt
- **notes**: id, title, content, category, createdAt

## 💡 UI/UX Improvements & Suggestions

### Implemented Features
✅ Component-based architecture for maintainability  
✅ Responsive grid layouts  
✅ Visual feedback for user actions  
✅ Loading states  
✅ Empty states with helpful messages  
✅ Confirmation dialogs for destructive actions  
✅ Filter and sort functionality  
✅ Real-time statistics on dashboard  

### Future Enhancements
- 🔐 User authentication and multi-user support
- 🌙 Dark mode toggle
- 📱 Progressive Web App (PWA) capabilities
- 🔔 Push notifications for reminders
- 📈 Advanced analytics and charts
- 🔄 Data export/import functionality
- 🎨 Theme customization
- 🔍 Search functionality across all modules
- 📤 Cloud sync and backup
- 🏆 Gamification (achievements, badges)

## 🤝 Contributing

This is a university final project. For educational purposes, feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is created for educational purposes as part of a university assignment.

## 👥 Authors

**Front-End Development Team**  
Final Project - Life Planner Application

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing-fast build tool
- JSON Server for the quick backend solution

---

**Built with ❤️ using React + Vite + Tailwind CSS**
