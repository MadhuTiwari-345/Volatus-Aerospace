

## 🚀 Run & Deploy Guide

This repository contains everything required to run the application locally and understand how it is deployed in production.

The app is designed with scalability and performance in mind and is deployed on **Google Cloud Run**, enabling serverless execution with automatic scaling and minimal operational overhead.



## 🌐 Live Application

🔗 **Production URL**
[https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/](https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/)

The production build is hosted on **Google Cloud Run**, which provides:

* Fast cold starts
* Automatic HTTPS
* Global scalability
* Pay-per-use billing model



## 🧑‍💻 Running the App Locally

Follow the steps below to set up and run the project on your local machine for development or testing.



## ✅ Prerequisites

Ensure the following are installed on your system:

* **Node.js** (v18 or later recommended)
* **npm** (bundled with Node.js)
* A valid **Google Gemini API Key**

You can verify your Node.js installation using:

```bash
node -v
npm -v
```



## 📦 Installation

Clone the repository and install all dependencies:

```bash
npm install
```

This command installs all required packages defined in `package.json`, including runtime dependencies and development tools.



## 🔐 Environment Configuration

This application uses the **Google Gemini API** to power its AI features.

### Steps:

1. Create a file named `.env.local` in the root directory
2. Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### ⚠️ Important Notes

* **Do NOT commit** `.env.local` to version control
* Ensure the API key has the required permissions enabled in **Google Cloud Console**
* API quota limits may affect AI-powered features during heavy usage



## ▶️ Start the Development Server

Run the application in development mode:

```bash
npm run dev
```

Once the server starts, open your browser and visit:

```
http://localhost:3000
```

### Development Features

* Hot reloading
* Fast refresh
* Real-time error reporting
* Improved developer feedback loop



## ☁️ Deployment (Google Cloud Run)

The production version of this app is deployed using **Google Cloud Run**, a fully managed serverless platform for containerized applications.

### Key Benefits

* Automatic horizontal scaling
* Secure environment variable management
* No server maintenance required
* HTTPS enabled by default

### High-Level Deployment Flow

1. Build the production version of the application
2. Create a Docker image
3. Push the image to **Google Container Registry (GCR)**
4. Deploy the image to **Google Cloud Run**
5. Configure environment variables securely
6. Serve traffic via the Cloud Run service URL



## 📌 Production Deployment URL

🔗 [https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/](https://volatus-aerospace-improved-ux-demo-73291669658.us-west1.run.app/)



## 🛠️ Tech Stack

* **Frontend:** React / Next.js
* **Backend:** Node.js
* **AI Services:** Google Gemini API
* **Deployment:** Google Cloud Run
* **Environment Management:** `.env.local` (local), Cloud Run environment variables (production)



## 🧪 Scripts Reference

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm install`   | Install project dependencies |
| `npm run dev`   | Start development server     |
| `npm run build` | Build the app for production |
| `npm start`     | Run the production server    |



## 📄 Additional Notes

* Ensure your **Gemini API quota** is sufficient for production workloads
* Use **Cloud Run environment variables** instead of `.env.local` in production
* Cloud Run automatically handles HTTPS, scaling, and load balancing



