# Todo App Backend

This is the backend for Todo App that is build using the ExpressJs, Prisma and MySQL.

## Getting Started

### Prerequisites
 **Install Node.js**: [Node.js Guide](https://nodejs.org/)


## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/irehmanullah/todo-app-backend.git
```


### 2. Move into directory

```bash
cd todo-app-backend
```


### 3. Install the packages

```bash
npm install
```


### 4. Set MySQL database URL

Set MySQL databse URL in .env file

### 5. Initialize Prisma

```bash
npx prisma init
```

### 6. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```


### 4. Start the development server

```bash
npm start
```

You can access the development server on: [http://localhost:4000/](http://localhost:4000/)
