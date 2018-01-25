'use strict';

var app = app || {};
let book = {};

let __API_URL__ = 'http://localhost:3000';

(function (module) {

  // Instantiates a new Book constructor and creating book objects from the database
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  // creates an empty book array which will hold all of our instantiated book objects
  Book.all = [];

  // takes in data as arguments, sorts rows by title, maps over rows to create an array of book instances, and assigns the array to Book.all
  Book.loadAll = rawData => {
    rawData.rows.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    console.log(rawData.rows);
    Book.all = rawData.rows.map((bookObj) => new Book(bookObj));
  }

  // 
  Book.loadOne = rawData => {
    console.log('result from server', rawData);
    Book.all = rawData.rows.map((bookObj) => new Book(bookObj));
  }

  // compiles handlebars template (which has ID of book-list-template) and returns it with the content
  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.prototype.detailToHtml = function () {
    let template = Handlebars.compile($('#detail-view-template').text());
    return template(this);
  }

  Book.prototype.create = function (callback) {
    $.post(`${__API_URL__}/api/v1/books`, { books_id: this.books_id, author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description })
      .then(console.log)
      .then(callback);
  }

  // takes callback of initIndexPage as argument, makes request to API at GET: /api/v1/books, on success passes results to Book.loadAll, on failure invokes error callback
  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callback();
      })
      .catch(function (err) {
        app.errorView.errorCallback(err);
      });
  };

  // takes callback (not sure which yet) as an argument, makes request to API to GET one book, on success passes results to Book.loadOne
  Book.fetchOne = (ctx, next) => {
    console.log('fetchOne context object', ctx);
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => {
        Book.loadOne(results);
        next();
      })
      .catch(function (err) {
        app.errorView.errorCallback(err);
      });
  };

  module.Book = Book;

})(app)