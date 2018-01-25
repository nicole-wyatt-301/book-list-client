'use strict';

let bookView = {};
var app = app || {};


(function (module) {

  // This is called from book.js and is the callback function that is performed once 
  bookView.initIndexPage = () => {
    app.Book.all.forEach(a => $('#book-list').append(a.toHtml()));
    
    $('.book-container').show();
  };


  module.bookView = bookView;

  // don't think we need this anymore because we're now calling it in routes.js but i may be wrong???
  // $(document).ready(app.Book.fetchAll(bookView.initIndexPage));

})(app)