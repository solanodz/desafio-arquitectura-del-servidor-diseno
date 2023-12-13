import dotenv from 'dotenv'

let pathEnvFile = null;

dotenv.config()

export default {
    port: process.env.PORT,
    db: {
        mongodbUri: process.env.MONGODB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
}