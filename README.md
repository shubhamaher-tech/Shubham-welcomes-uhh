# Shubham's Portfolio Website

A personal portfolio website showcasing Shubham's skills, projects, experience, and education.

## Features

- Responsive design
- Interactive UI with animations
- Contact form with email notification
- Project showcase
- Experience timeline
- Skills display
- Education section

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email**: Nodemailer
- **Animation**: AOS (Animate on Scroll)
- **Icons**: Font Awesome

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```
   Note: For Gmail, you'll need to generate an App Password if you have 2FA enabled.

4. Start the server:
   ```
   npm start
   ```

5. Visit `http://localhost:3000` in your browser.

## Development

For development with hot-reloading:
```
npm run dev
```

## Project Structure

```
portfolio-website/
├── public/             # Static files
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   ├── images/         # Image assets
│   ├── assets/         # Other assets (PDFs, etc.)
│   └── index.html      # Main HTML file
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── README.md           # Project documentation
└── server.js           # Express server
```

## Deployment

This application can be deployed to various platforms:

### Heroku
```
heroku create
git push heroku main
```

### Netlify/Vercel
Deploy the `public` folder for static hosting, and use Netlify Functions or Vercel Serverless Functions for the backend API.

## License

ISC