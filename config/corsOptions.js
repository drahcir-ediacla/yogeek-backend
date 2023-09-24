const corsOptions = {
    origin: ["http://localhost:3000", "https://yogeek.onrender.com"], // Specify the exact origin of your frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization,Access-Control-Allow-Private-Network,Access-Control-Allow-Headers,Access-Control-Allow-Credentials',
  };

  module.exports = corsOptions