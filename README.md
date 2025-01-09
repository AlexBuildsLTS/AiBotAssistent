# AlexAI Assistant Learning Platform

An all-in-one AI learning platform with an interactive chatbot for personalized learning experiences.

---

## 🚀 Features

- AI-powered learning modules with progress tracking
- Interactive chatbot for real-time assistance
- Modern dark theme design
- RESTful API backend for scalable operations
- OpenAI API integration

---

## 🛠️ Tech Stack

### Frontend
- **Frameworks & Libraries:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide React Icons
- **API Integration:** OpenAI API

### Backend
- **Frameworks:** Spring Boot 3.2 (Spring Security, Spring AI, Spring Data JPA)
- **Database:** MariaDB
- **API:** RESTful endpoints

---

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Java 17+ ([Download](https://www.oracle.com/java/technologies/javase-downloads.html))
- Maven 3.8+ ([Guide](https://maven.apache.org/install.html))
- MariaDB 10.11+ ([Guide](https://mariadb.com/downloads/))
- OpenAI API Key ([Sign Up](https://platform.openai.com/))

---

## 🔧 Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AlexBuildsLTS/AiBotAssistent.git
   cd alexai-assistant/frontend


Install dependencies:
npm install


Create .env file:
VITE_OPENAI_API_KEY=your_openai_key_here
VITE_API_BASE_URL=http://localhost:8080/api


npm run dev


# Backend Setup
Navigate to the backend directory

cd backend

spring.datasource.url=jdbc:mariadb://localhost:3306/alexai_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

openai.api.key=your_openai_key_here


./mvnw spring-boot:run


## 🏗️ Project Structure
- alexai-assistant/
- ├── frontend/
- │   ├── src/
- │   │   ├── components/    # React components
- │   │   ├── data/          # Static data and constants
- │   │   ├── types/         # TypeScript interfaces
- │   │   ├── utils/         # Utility functions
- │   │   └── services/      # API services
- │   └── .env               # Environment variables
- ├── backend/
- │   ├── src/main/java/
- │   │   └── com/alexai/
- │   │       ├── controllers/  # API endpoint handlers
- │   │       ├── services/     # Business logic
- │   │       ├── models/       # Data models/entities
- │   │       └── config/       # Configuration files
- │   └── src/main/resources/
- │       ├── application.properties
- └── README.md



## 🔒 API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login

### Courses
- **GET** `/api/modules` - Get all modules
- **GET** `/api/modules/{id}` - Get module details
- **GET** `/api/progress/{userId}` - Get user progress

### Chat
- **POST** `/api/chat` - Send message to AI assistant
- **GET** `/api/chat/history/{userId}` - Get chat history

---

## 🚀 Deployment

### Frontend
1. Build the project:
   ```bash
   npm run build



# Backend

Package the application:

./mvnw clean package


Deploy the generated JAR file to your server.


## 📝 Environment Variables

### Frontend

- `VITE_OPENAI_API_KEY` - OpenAI API key
- `VITE_API_BASE_URL` - Backend API URL

### Backend

- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `OPENAI_API_KEY` - OpenAI API key

---

## 👥 Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for API integration
- Spring Framework team
- React and Vite communities
