require('dotenv').config(); // Load env FIRST

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 7010;
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());
app.use(express.json());
app.use(mongoSanitize());


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("home page");
});

//routes
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if(file.endsWith('.routes.js')) {
        const route = require(path.join(routesPath, file));

        //Validate that the file exports a router

        if(route && typeof route === 'function')
        {
            app.use('/api', route);
            console.log(`Loaded route: ${file}`);
        }
        else {
            console.warn(`skipped ${file}: not a valid router export`);
        }
    }

})

app.use(require("./middleware/errorHandler"));

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error.message);
    }
};

startServer();
