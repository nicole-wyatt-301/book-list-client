'use strict';

function bookListLoad(ctx, next) {
  console.log('book list ctx', ctx);
  app.Book.fetchAll(app.bookView.initIndexPage);
  next();
}

function bookListShow(ctx) {
  $('#detail-view').hide();
  $('#form-view').hide();
  $('#book-list').show();
}




page('/', bookListLoad, bookListShow);
page('/books/new', bookView.formShow, bookView.formSubmit);
page('/books/:book_id', app.Book.fetchOne, bookView.initDetailPage);
page('/hamburger', bookView.hamburger)
// page('*', ctx => console.log('404', ctx));


$(function() {
  page();

  $('#myForm').submit(function(e) {
    e.preventDefault();
    
  });
})