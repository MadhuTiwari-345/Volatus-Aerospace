🚀 Run & Deploy

This repository contains everything you need to run the application locally and understand how it’s deployed in production.

🌐 Live Application
👉 https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/

The app is deployed on Google Cloud Run, providing scalable, serverless hosting with fast cold-start performance.

🧑‍💻 Running the App Locally

Follow the steps below to set up and run the project on your local machine.

✅ Prerequisites

Make sure you have the following installed:

Node.js (v18 or later recommended)

npm (comes bundled with Node.js)

A valid Gemini API Key

📦 Installation

Clone the repository and install dependencies:

npm install


This will install all required packages listed in package.json.

🔐 Environment Configuration

The app uses Google Gemini API for AI-powered features.

Create a file named .env.local in the root directory

Add your Gemini API key:

GEMINI_API_KEY=your_gemini_api_key_here


⚠️ Important

Never commit .env.local to version control

Ensure the key has proper API access enabled in Google Cloud Console

▶️ Start Development Server

Run the app in development mode:

npm run dev


Once started, the app will be available at:

http://localhost:3000


The development server supports:

Hot reloading

Fast refresh

Real-time error reporting

☁️ Deployment (Cloud Run)

The production version of this app is deployed using Google Cloud Run, which offers:

Automatic scaling

Container-based deployment

Secure environment variables

Pay-per-use pricing

High-level deployment flow:

Build the application

Containerize using Docker

Push image to Google Container Registry

Deploy to Google Cloud Run

Attach environment variables securely

📌 Live Deployment URL
https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/

🛠️ Tech Stack

Frontend: React / Next.js (if applicable)

Backend: Node.js

AI: Google Gemini API

Deployment: Google Cloud Run

Environment Management: .env.local

🧪 Scripts Reference
Command	Description
npm install	Install project dependencies
npm run dev	Run app in development mode
npm run build	Build app for production
npm start	Start production server
📄 Notes

Ensure your Gemini API quota is sufficient

For production, use secure environment variable configuration

Cloud Run handles HTTPS and scaling automatically
