# Todo Application

A full-stack Todo application built with React frontend and Node.js/Express backend.

## Features

- Add new tasks through a simple input form
- Display tasks in a list with creation timestamps
- Export all tasks to a downloadable txt file
- Memory-based storage (data persists during server runtime)
- Japanese UI interface

## Project Structure

```
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/          # Node.js/Express backend
│   ├── index.js
│   └── package.json
└── package.json     # Root package for concurrent running
```

## Setup and Installation

1. Install dependencies for all parts:
```bash
npm run install-all
```

2. Start both frontend and backend:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend development server on http://localhost:3000

## API Endpoints

- `GET /api/todos` - Retrieve all tasks
- `POST /api/todos` - Add a new task
- `GET /api/health` - Health check endpoint

## Usage

1. Enter a task in the input field
2. Click "追加" (Add) button or press Enter
3. View tasks in the list below
4. Click "過去タスクをメモ帳に吐き出す" to export tasks to a txt file

## Development

- Frontend: React with proxy configuration to backend
- Backend: Express server with CORS enabled
- Data storage: In-memory array (resets on server restart)
