# Quiz App

The Quiz App is a web application that allows users to participate in quizzes and store their quiz results. It is built using React Vite for the frontend, Node Express for the backend, and MongoDB as the database.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js: https://nodejs.org
- MongoDB: https://www.mongodb.com

## Getting Started

### Client (Frontend)

1. Clone the repository:

```shell
   git clone <repository_url>
```

2. Navigate to the client directory:

```shell
   cd client
```

3. Install dependencies:
```shell
   npm install
```

4. Start the development server:
```shell
   npm run dev
```

### Server (Backend)

1. Navigate to the client directory:

```shell
   cd server
```

2. Install dependencies:
```shell
   npm install
```

3. Set up environment variables:
- Create a .env file in the root of the server directory.
- Define the following variables:
```shell
    PORT=<server_port>
    CONNECTION_STRING=<mongodb_connection_uri>
```

4. Start the server:
```shell
    node index.js (or) 
    nodemon index.js
```