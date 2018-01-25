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

function bookDetailLoad(ctx, next) {
  console.log('hello');
  console.log('ctx obj', ctx);
  app.Book.fetchOne(ctx, next);
  next();
}

function bookDetailShow(ctx) {
  $('#book-list').hide();
  $('#form-view').hide();
  $('#detail-view').show();
}

function formShow(ctx, next) {
  $('#book-list').hide();
  $('#detail-view').hide();
  $('#form-view').show();
  next();
}

function formSubmit(ctx) {

}



page('/', bookListLoad, bookListShow);
page('/books/:id', bookDetailLoad, bookDetailShow);
page('/books/new', formShow, formSubmit);
// page('*', ctx => console.log('404', ctx));


$(function() {
  // not sure if this is being referenced properly
  const form = $('form')[0]
  page();

  form.on('submit', function() {
    const path = [form.title.value, form.book-author.value, form.isbn.value, form.img-url.value].filter(item => item).join('/');
    console.log(path);
    // need to write code in here to either update or add a book to to the database depending on whether it exists or not
  });
})