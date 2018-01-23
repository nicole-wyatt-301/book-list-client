'use strict';

let bookView = {};

(function (module) {
  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();

    app.Book.all.forEach(a => $('#book-list').append(a.toHtml()));

  };

  $(document).ready(app.Book.fetchAll(bookView.initIndexPage));

  module.bookView = bookView;

})(app)