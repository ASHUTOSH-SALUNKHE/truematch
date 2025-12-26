# 🌟 TrueMatch – Full Stack AI Personality Analyzer

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Spring_Boot-4.0.0-6DB33F?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-16.4-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Google_Gemini-1.0.0-4285F4?style=for-the-badge&logo=google" alt="Google Gemini" />
  
  <img src="https://img.shields.io/badge/Docker-27.3.1-2496ED?style=for-the-badge&logo=docker" />
<img src="https://img.shields.io/badge/Spring_Security-Auth-6DB33F?style=for-the-badge&logo=springsecurity" />
<img src="https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Render-Cloud-46E3B7?style=for-the-badge&logo=render" />
<img src="https://img.shields.io/badge/Netlify-Hosting-00C7B7?style=for-the-badge&logo=netlify" />
<img src="https://img.shields.io/badge/Postman-API_Testing-FF6C37?style=for-the-badge&logo=postman" />
<img src="https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven" />
<img src="https://img.shields.io/badge/Flyway-Migrations-CC0200?style=for-the-badge&logo=flyway" />
<img src="https://img.shields.io/badge/Hibernate-ORM-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />



</div>

## 🚀 Project Overview

**TrueMatch** is a revolutionary dating platform that goes beyond surface-level connections. Powered by advanced AI and cognitive science, we analyze 50+ psychological traits to find your perfect match. Experience connection on a neural level with our psychometric-validated approach.

> "Beyond Surface Level. Traditional apps rely on shared hobbies. We rely on shared cognitive structures."

## ✨ Features

### 🔬 Core Features

- **Cognitive Mapping**: 50-point psychometric analysis mapping your personality structure in high definition
- **Neural Sync**: Advanced matching algorithms that predict emotional resonance before you even meet
- **Privacy First**: Your psychological profile is encrypted with military-grade protocols
- **Adaptive Assessment**: Visual-based questionnaire that bypasses conscious bias to reveal true preferences
- **Real-time Analysis**: Instant processing of your responses for immediate insights

### 🛡️ Security & Trust

- End-to-End Encrypted communication
- Psychometric Validated methodology
- No Hidden Fees - transparent pricing
- Data Privacy guaranteed

## 🎨 Frontend Section

### Tech Stack

- **Framework**: React 19.2.0 with modern hooks and concurrent features
- **Build Tool**: Vite 7.2.4 for lightning-fast development and optimized production builds
- **Styling**: Tailwind CSS 3.4.17 with custom design system and dark theme
- **Animations**: Framer Motion 12.23.26 for smooth, performant animations
- **Routing**: React Router DOM 7.10.1 for seamless navigation
- **HTTP Client**: Axios 1.13.2 for reliable API communication
- **Icons**: Lucide React 0.562.0 for consistent, beautiful iconography

### Key Frontend Features

#### 💾 Caching & Performance

- **LocalStorage Caching**: User responses are intelligently cached in localStorage to prevent data loss during session interruptions
- **Progressive Enhancement**: App works offline for cached data, with graceful degradation
- **Smart Cache Management**: Automatic cleanup of expired or irrelevant cached data
- **Response Persistence**: Multi-step questionnaire progress saved locally, allowing users to resume anytime

#### 🎭 User Experience

- **Responsive Design**: Fully responsive across all devices with mobile-first approach
- **Dark Theme**: Immersive dark UI with subtle gradients and glassmorphism effects
- **Smooth Animations**: Page transitions, hover effects, and loading states using Framer Motion
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

#### 🔐 Authentication Flow

- **Protected Routes**: Secure routing with authentication guards
- **Context-based Auth**: React Context for global authentication state management
- **Seamless Login/Signup**: Integrated authentication with smooth transitions

#### 📊 Interactive Components

- **Dynamic Questionnaires**: Adaptive MCQ system with progress tracking
- **Real-time Feedback**: Instant visual feedback on user interactions
- **Match Visualization**: Beautiful data visualization for compatibility scores
- **Loading States**: Skeleton screens and progress indicators for better UX

### Architecture Highlights

- **Component-based**: Modular, reusable components with clear separation of concerns
- **Custom Hooks**: Encapsulated logic for authentication, caching, and API calls
- **Context Providers**: Global state management for user data and app settings
- **Optimized Bundling**: Code splitting and lazy loading for faster initial loads

## 🔧 Backend Section

### Tech Stack

- **Framework**: Spring Boot 4.0.0 with Spring Web MVC
- **Language**: Java 17 with modern features
- **Database**: PostgreSQL 16.4 hosted on Neon DB server
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT authentication
- **AI Integration**: Google Gemini AI 1.0.0 for cognitive analysis
- **Migration**: Flyway for database schema management
- **Containerization**: Docker with multi-stage build
- **Build Tool**: Maven 3.9.9
- **Additional Libraries**: Lombok, MapStruct, Jackson, JJWT

### Key Backend Features

#### 🔐 Authentication & Security

- **JWT Authentication**: Stateless authentication with access and refresh tokens
- **Secure Cookies**: HttpOnly refresh tokens for enhanced security
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Configured for cross-origin requests
- **Security Filters**: JWT authentication and logging filters

#### 🤖 AI Integration

- **Google Gemini AI**: Advanced AI for psychological trait analysis
- **Cognitive Mapping**: 50+ point psychometric analysis
- **Prompt Engineering**: Custom prompt builder for accurate AI responses
- **Response Caching**: Database storage of AI responses for performance

#### 📊 Database Design

- **PostgreSQL**: Robust relational database with JSONB support
- **Entity Relationships**: Users and AI responses with proper foreign keys
- **Database Migrations**: Version-controlled schema changes with Flyway
- **UUID Primary Keys**: Secure, unique identifiers for all entities

#### 🏗️ API Architecture

- **RESTful APIs**: Well-structured endpoints for auth and user operations
- **DTO Pattern**: Data transfer objects for clean API contracts
- **Global Exception Handling**: Centralized error management
- **Validation**: Bean validation for input data integrity

### API Endpoints

#### Authentication Endpoints (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login with JWT tokens
- `POST /refresh_token` - Refresh access tokens
- `POST /validate` - Validate JWT tokens
- `GET /me` - Get current user profile
- `POST /logout` - User logout

#### User Endpoints (`/api/user`)

- `POST /askai` - Send user data to AI for analysis
- `GET /response` - Fetch AI analysis results from database

### Database Schema

```sql
-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- AI Responses table
CREATE TABLE ai_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    response_json JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Deployment & Infrastructure

- **Docker Containerization**: Multi-stage Docker build for optimized images
- **Container Registry**: Hosted on Docker Hub as `ashutoshsalunkhe/truematch-application`
- **Database Hosting**: PostgreSQL hosted on Neon DB server
- **Environment Configuration**: Secure environment variable management
- **Port Configuration**: Backend runs on port 7070

### Backend Architecture Highlights

- **Layered Architecture**: Clear separation between controllers, services, and repositories
- **Dependency Injection**: Spring's IoC container for loose coupling
- **Service Layer**: Business logic encapsulation
- **Repository Pattern**: Data access abstraction
- **DTO Mapping**: MapStruct for efficient object mapping
- **Exception Handling**: Global exception handler for consistent error responses

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd truematch-main/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```



## 📱 Usage

### Full Application Flow

1. **Landing Page**: Explore the hero section and core features on the React frontend
2. **Authentication**: Sign up or log in through secure JWT-based authentication
3. **Questionnaire**: Complete the comprehensive 50+ question psychological assessment
4. **AI Analysis**: Backend processes responses using Google Gemini AI for cognitive mapping
5. **Results**: View personalized compatibility insights and neural sync analysis
6. **Data Persistence**: All responses and AI analyses are securely stored in PostgreSQL

### API Testing

You can test the backend APIs using tools like Postman or curl:

```bash
# Register a new user
curl -X POST http://localhost:7070/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:7070/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Made with ❤️ for meaningful connections</p>
  <p>
    <a href="#features">Features</a> •
    <a href="#frontend-section">Frontend</a> •
    <a href="#installation--setup">Setup</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

