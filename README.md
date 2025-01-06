# AlexAI Assistant Learning Platform

A modern AI learning platform with an interactive chatbot, built with React (frontend) and Spring Boot (backend).

## 🚀 Features

- Interactive AI Learning Modules
- Real-time AI Chatbot Assistant
- Course Progress Tracking
- Modern Dark Theme UI
- OpenAI Integration
- RESTful API Backend

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- OpenAI API Integration

### Backend
- Spring Boot 3.2
- Spring AI
- Spring Security
- Spring Data JPA
- PostgreSQL
- OpenAI Client

## 📋 Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.8+
- PostgreSQL 15+
- OpenAI API Key

## 🔧 Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd alexai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_OPENAI_API_KEY=your_openai_key_here
VITE_API_BASE_URL=http://localhost:8080/api
```

4. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/alexai_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

openai.api.key=your_openai_key_here
```

3. Build and run:
```bash
./mvnw spring-boot:run
```

## 🏗️ Project Structure

```
alexai-assistant/
├── src/
│   ├── components/        # React components
│   ├── data/             # Static data and constants
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   └── services/         # API services
├── backend/
│   ├── src/main/java/
│   │   └── com/alexai/
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── models/
│   │       └── config/
│   └── src/main/resources/
└── README.md
```

## 🔒 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Courses
- GET `/api/modules` - Get all modules
- GET `/api/modules/{id}` - Get module details
- GET `/api/progress/{userId}` - Get user progress

### Chat
- POST `/api/chat` - Send message to AI assistant
- GET `/api/chat/history/{userId}` - Get chat history

## 🚀 Deployment

### Frontend
```bash
npm run build
```
Deploy the `dist` directory to your hosting service.

### Backend
```bash
./mvnw clean package
```
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

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for API integration
- Spring Framework team
- React and Vite communities