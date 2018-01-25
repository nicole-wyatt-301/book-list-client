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

  // takes in rows as arguments, sorts rows by title, maps over rows to create an array of book instances, and assigns the array to Book.all
  Book.loadAll = rawData => {
    rawData.rows.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    console.log(rawData.rows);
    Book.all = rawData.rows.map((bookObj) => new Book(bookObj));
  }

  // compiles handlebars template (which has ID of book-list-template) and returns it with the content
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  // takes callback as argument, makes request to API at GET: /api/v1/books, on success passes results to Book.loadAll, on failure invokes error callback
  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(results => {
        console.log('return from api URL', results);
        Book.loadAll(results);
        callback();
      })
      .catch(function(err) {
        app.errorView.errorCallback(err);
      });
  };

  module.Book = Book;

})(app)