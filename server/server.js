import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import expressSession from 'express-session';
import MongoStore from 'connect-mongodb-session';
import AuthRoute from './Routes/Auth/Auth';
config();

const server = express();
const baseOrigin = {
  dev: 'http://localhost:3000',
  prod: '',
};

const origin = process.env.NODE_ENV === 'production' ? baseOrigin.prod : baseOrigin.dev;
const mongoURI = process.env.mongoURI;
//=============================================================Middlewares======================================================
server.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

const Mongostore = MongoStore(expressSession);
const store = new Mongostore({
  collection: 'usersessions',
  expires: 365 * 24 * 60 * 60 * 1000,
  uri: mongoURI,
});

const isCookieSecure = process.env.NODE_ENV === 'production' ? true : false;
server.use(
  expressSession({
    name: '_sid',
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isCookieSecure,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: false,
      signed: true,
    },
  })
);

//=======================================================MongoDB conenction & Confis============================================
const connectionOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false };
connect(mongoURI, connectionOptions, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Connection to Mongodb was successful');
});

//==========================================================Server Endpoints===================================================
server.use(AuthRoute);

//====================================================Servre connection & Configs===============================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
