import express from 'express';
import passport from 'passport'
import path from 'path';
import handlebars from 'express-handlebars';
import expressSessions from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser'

import { URI } from './db/mongodb.js';
import indexRouter from './routers/index.router.js';
// import sessionsRouter from './routers/sessions.router.js';
import productsRouter from './routers/product.router.js';
import usersRouter from './routers/users.router.js';
import { init as initPassportConfig } from './config/passport.config.js'
import { __dirname } from './utils.js';
import config from './config.js';


const app = express();
const SESSION_SECRET = config.sessionSecret;

app.use(expressSessions({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions: {},
        ttl: 120,
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassportConfig()
app.use(passport.initialize());
app.use(passport.session())

// app.use('/', );
// app.use('/sessions', sessionsRouter);
app.use('/', productsRouter, usersRouter, indexRouter);

app.use((error, req, res, next) => {
    const message = `⛔ Ha ocurrido un error desconocido: ${error.message}.`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
});

export default app;
