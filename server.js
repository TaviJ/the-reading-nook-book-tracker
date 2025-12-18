const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');

const authController = require('./controllers/auth');
const bookController = require('./controllers/books');

const port = process.env.PORT || 3000;

// Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passUserToView);

// Home
app.get('/', (req, res) => {
  res.render('index');
});

// Auth routes (must be public)
app.use('/auth', authController);

// Book routes (protected)
app.get('/books', isSignedIn, bookController.index);
app.get('/books/new', isSignedIn, bookController.new);
app.post('/books', isSignedIn, bookController.create);
app.get('/books/:id/edit', isSignedIn, bookController.edit);
app.get('/books/:id', isSignedIn, bookController.show);
app.put('/books/:id', isSignedIn, bookController.update);
app.delete('/books/:id', isSignedIn, bookController.destroy);

// Server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
