const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const languagesRouter = require('./routes/languages.router');
const servicesRouter = require('./routes/services.router');
const childRouter = require('./routes/child.router');
const locationRouter = require('./routes/location.router');
const childrenRouter = require('./routes/children.router');
const resultsRouter = require('./routes/results.router');
const favoritesRouter = require('./routes/favorites.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/child', childRouter);
app.use('/api/location', locationRouter);
app.use('/api/children', childrenRouter);
app.use('/api/results', resultsRouter);
app.use('/api/favorites', favoritesRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

