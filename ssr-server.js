const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const userRouter = require('./api/routes/userRouter');
const scenarioRouter = require('./api/routes/scenarioRouter');
const choiceRouter = require('./api/routes/choiceRouter');
const dotenv = require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const db_pwd = process.env.EXPLORATION_PWD;

const db = connect("mongodb+srv://luciaokeh:" + db_pwd + "@cluster0-2ri3z.mongodb.net/Exploration?retryWrites=true&w=majority")
  .then(
    () => {
      console.log('Successfully connected to database (: ');
    },
    (err) => {
      console.log('Error occured connecting to database ): ', err);
    }
  );

require('./api/models/userModel');

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use('/api/users', userRouter);
    server.use('/api/scenarios', scenarioRouter);
    server.use('/api/choices', choiceRouter);

    // server.get('/signup', (req, res) => {
    //   return app.render(req, res,'/signup');
    // });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('Server ready on localhost::3000 ! (:');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });