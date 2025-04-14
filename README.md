
# Wora

*Write Once Run Anywhere* — A Content Adaptation App using Google Cloud's Vertex AI.

## Overview
Wora is designed for content creators and students, enabling them to generate, edit, and adapt their content for various platforms with a single click. It simplifies the content creation process and provides tools for personalizing and enhancing the content.

### UI Preview

#### Home Page  
![Wora Home Preview](woraV1_Preview_2.png)

#### Content Editing and Adaptation  
![Wora Adaptation Preview](woraV1_Preview_1.png)

## Features
- **Prompt Generation**: Input a prompt and generate content using Google Cloud's Vertex AI.
- **Content Editing and Adaptation**: Edit and adapt the generated content for specific platforms.
- **Email Sending**: Send emails using Nodemailer.
- **User Authentication**: Sign up and sign in functionality with cookie and CORS support.
- **Themes**: Choose between Coffee, Sage, and Snow themes for a personalized visual aesthetic.
- **Sound Effects**: Listen to Rain, Cafe, and Nature sounds while creating content.
- **Content Saving and Viewing**: Save your content and view it anytime.
- **Animations**: Enjoy smooth animations for a polished user experience.
- **Hashtag and Title Suggestions**: Get relevant hashtags and titles automatically.
- **PDF Export**: Export your content as a PDF when needed.

## Tech Stack
- **Front End**: HTML, CSS, JavaScript, React
- **Back End**: Node.js, Express, MongoDB, Google Cloud's Vertex AI

## Getting Started

Follow these steps to set up Wora on your local machine.

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB
- Google Cloud Project with Vertex AI enabled
- Git

### Clone the Repository
```bash
git clone https://github.com/your-username/wora.git
cd wora
```

### Install Dependencies
For both client and server:
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_service_account_key.json
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Also, make sure the service account JSON file is stored securely and the path is correct.

### Run the App

Start the backend server:
```bash
cd server
npm install
npm run dev
```

Start the frontend development server:
```bash
cd ../client
npm instal 
npm run dev
```

Your app should now be running at `http://localhost:3000`.

## Future Updates

### 1. Smart Contracts for Premium Features
- Implement smart contracts to manage premium subscriptions and features.
- Utilize blockchain technology to ensure secure and transparent transactions.

### 2. Improved Design
- Enhance the UI/UX for a more intuitive and visually appealing experience.
- Focus on user-friendly navigation and aesthetic improvements.

### 3. OAuth Authentication
- Integrate OAuth for seamless and secure user authentication.
- Support multiple OAuth providers (e.g., Google, Facebook, GitHub) for flexible login options.

### 4. Reminders and Calendars
- Add functionalities for setting reminders and managing calendars.
- Include options for notifications and alerts for important events and deadlines.

### 5. More Animations
- Introduce additional animations for a more dynamic and engaging user interface.
- Use animations to enhance user interactions and improve overall user experience.
