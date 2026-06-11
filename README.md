# AI Customer Support Agent

A full-stack AI-powered customer support chatbot built for the Spur Founding Engineer take-home assignment.

## Tech Stack

**Frontend**

* React
* TypeScript
* Axios
* React Markdown

**Backend**

* Node.js
* Express
* TypeScript

**Database**

* PostgreSQL (Neon)
* Prisma ORM

**AI**

* Gemini 2.5 Flash

---

## Features

* AI-powered customer support assistant
* Conversation persistence using PostgreSQL
* Session persistence using localStorage
* Chat history restoration on page refresh
* Context-aware responses using previous conversation history
* Markdown rendering for AI responses
* Suggested starter questions
* New Chat functionality
* Loading states and auto-scrolling chat interface

---

## Architecture

```text
React Frontend
      ↓
Express API
      ↓
Prisma ORM
      ↓
PostgreSQL

      ↓

Gemini 2.5 Flash
```

---

## Setup

### Backend

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_api_key
PORT=5001
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Assignment Checklist

* [x] React + TypeScript frontend
* [x] Express + TypeScript backend
* [x] PostgreSQL database integration
* [x] Prisma ORM
* [x] AI-powered support agent
* [x] Conversation persistence
* [x] Message persistence
* [x] Chat history retrieval
* [x] Context-aware AI responses
* [x] Session persistence
* [x] Loading and error states
* [x] Clean and modular architecture

---

## Design Decisions

* Used Prisma for simple database access and schema management.
* Stored session IDs in localStorage to persist conversations across refreshes.
* Limited AI context to recent messages to reduce token usage and improve response quality.
* Kept the architecture modular using separate routes, controllers, and services.

---

## Future Improvements

* Streaming responses
* Authentication
* Knowledge-base retrieval (RAG)
* Mobile UI improvements
* Analytics and monitoring
