'use strict';

function bookListLoad(ctx, next) {
  app.Book.fetchAll(app.bookView.initIndexPage);
  next();
}

function bookListShow(ctx) {
  $('#book-list').show();
}

// function bookDetailLoad(ctx, next) {

// }

// function bookDetailShow(ctx) {

// }

// function formShow(ctx, next) {

// }

// function formSubmit(ctx) {

// }

page('/', bookListLoad, bookListShow);
page('*', ctx => console.log('404', ctx));
// page('/books/:book_id', bookDetailLoad, bookDetailShow);
// page('/books/new', formShow, formSubmit);


$(function() {
  page();
})