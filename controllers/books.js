const express = require('express');
const router = express.Router();
const Book = require('../models/books');

async function index(req, res) {
  const books = await Book.find({ user: req.session.user._id }).sort({ createdAt: -1 });
  res.render('books/index', { books });
}

function newBook(req, res) {
  res.render('books/new');
}

async function create(req, res) {
  try {
    req.body.user = req.session.user._id;

  
    const pages = Number(req.body.pages || 0);
    const pagesRead = Number(req.body.pagesRead || 0);
    if (pages && pagesRead > pages) return res.redirect('/books/new');

    await Book.create(req.body);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.redirect('/books/new');
  }
}

async function show(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.redirect('/books');


  if (!book.user.equals(req.session.user._id)) return res.redirect('/books');

  res.render('books/show', { book });
}

async function edit(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.redirect('/books');
  if (!book.user.equals(req.session.user._id)) return res.redirect('/books');

  res.render('books/edit', { book });
}

async function update(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.redirect('/books');
    if (!book.user.equals(req.session.user._id)) return res.redirect('/books');

    const pages = Number(req.body.pages || book.pages || 0);
    const pagesRead = Number(req.body.pagesRead || 0);
    if (pages && pagesRead > pages) return res.redirect(`/books/${book._id}/edit`);

    await Book.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/books');
  }
}

async function confirmDelete(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.redirect('/books');
  if (!book.user.equals(req.session.user._id)) return res.redirect('/books');

  res.render('books/delete', { book });
}

async function destroy(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.redirect('/books');
  if (!book.user.equals(req.session.user._id)) return res.redirect('/books');

  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
}


module.exports = {
  index,
  new: newBook,
  create,
  show,
  edit,
  update,
  destroy,
  confirmDelete,
};