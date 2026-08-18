# Task Management System API

## Description

A REST API for managing projects, tasks and comments.

## Features

- User registration
- User login
- JWT authentication
- Role-based authorization
- Project management
- Task management
- Comment management
- Request validation
- PostgreSQL database
- Swagger API documentation

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- bcrypt
- Zod
- Swagger

## Installation

git clone ...

npm install

## Environment Variables

Create a `.env` file:

PORT=3000
DB_USER=
DB_HOST=
DB_PASSWORD=
DB_NAME=
DB_PORT=5432
SALTROUNDS=10
SECRET_KEY=

## Running the Project

npm run dev

## API Documentation

After starting the server:

http://localhost:3000/api-docs

## API Routes

### Authentication

POST /auth/register
POST /auth/login

### Users

GET /user/me
DELETE /user/:id

### Projects

POST /project
GET /project
GET /project/:id
PATCH /project/:id
DELETE /project/:id

### Tasks

POST /task
GET /task
GET /task/:id
PATCH /task/:id
DELETE /task/:id

### Comments

POST /comment
GET /comment/task/:id
GET /comment/:id
PATCH /comment/:id
DELETE /comment/:id