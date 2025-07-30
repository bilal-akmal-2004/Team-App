🧠 Team Task Manager — Full Stack Web Application
Overview
Team Task Manager is a full stack web application designed to help users register or log in securely, create teams, assign tasks, and collaborate in real-time. It brings together a smooth user experience and robust backend logic to streamline task management for teams of any size.

Features
This application features secure user authentication using sessions and HTTP-only cookies. Passwords are hashed with bcrypt for security, and protected routes ensure that only authenticated users can access sensitive data. Team management is intuitive — users can create teams, invite members, and manage them efficiently. Task management is equally streamlined, allowing team members to create, assign, and track tasks. Only the team creator has permission to delete a team, providing basic role-based access control.

Tech Stack
The project uses React with Vite on the frontend and Node.js with Express on the backend. PostgreSQL is used for database management, while Knex.js handles migrations. Styling is done with TailwindCSS. The application is deployed on Vercel for both frontend and backend.

How to Run Locally
To run the app locally, first navigate to the backend folder, install the dependencies using npm install, and start the development server with npm run dev. Then, navigate to the frontend folder, install its dependencies, and start the Vite development server.

Database Schema
The database schema is managed using Knex migrations. It includes four main tables:

users with fields for id, name, email, and hashed password

teams for storing team id, name, and the user who created the team

memberships for linking users to teams

tasks containing the task title, description, assigned member, due date, and the associated team

Security
Security is a top priority in this app. Passwords are securely hashed using bcrypt. Session data is stored in PostgreSQL in production environments, and authentication tokens are delivered using HTTP-only cookies. Middleware is in place to restrict access to protected routes, and user input is validated using express-validator to prevent injection attacks.

