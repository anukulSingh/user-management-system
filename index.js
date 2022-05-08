const express = require("express");

// security packages
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit")
// security packages

const config = require("./src/config/config");
const userRouter = require("./src/routes/user");

// connect to DB
require("./src/config/db.config")

const app = express();

app.use(express.json());

// sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet({
    contentSecurityPolicy: false
}))

// prevent xss attacks
app.use(xss())

// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
})
app.use(limiter)

// prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// log requests
if (process.env.NODE_ENV === "development") {
    app.use(require("morgan")("tiny"));
}

app.use("/api/v1/users", userRouter);


const PORT = config.PORT;
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
);

process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});