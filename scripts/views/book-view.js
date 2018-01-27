'use strict';

let bookView = {};
var app = app || {};


(function (module) {

  // This is called from book.js and is the callback function that is performed once 
  bookView.initIndexPage = () => {
    $('#book-list').empty();
    app.Book.all.forEach(a => $('#book-list').append(a.toHtml()));
    $('.book-container').show();
  };

  bookView.initDetailPage = (ctx) => {
    $('#detail-view').empty();
    console.log('initDetailPage success');
    app.Book.detail.forEach(a => $('#detail-view').append(a.detailToHtml()));
    $('#detail-view').show();
    $('#book-list').hide();
    $('#form-view').hide();
    $('.detail-container').show();
  };


  bookView.bookDetailShow = function(ctx) {

  }

  bookView.formShow = function (ctx, next) {
    console.log('form show');
    $('#book-list').hide();
    $('#detail-view').hide();
    $('#form-view').show();
    next();
  }

  bookView.formSubmit = function(ctx) {
    console.log('helloooo')
  }

  bookView.hamburger = function (ctx) {
    $('#hamburger-menu').toggleClass('hide');
  }

  module.bookView = bookView;

  // don't think we need this anymore because we're now calling it in routes.js but i may be wrong???
  // $(document).ready(app.Book.fetchAll(bookView.initIndexPage));

})(app)