'use strict';

let bookView = {};
let __API_URL__ = 'http://localhost:3000';

pageLoad();
// Instantiates a new Book constructor and creating book objects from the database
(function (module) {

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Book.all = [];

  Book.loadAll = rows => {
    rows.sort((a, b) => {
      if(a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    Book.all = rows.map((bookObj) => new Book(bookObj));
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());

    return template(this);
  }

  $('#user-form').on('submit', function (e) {
    e.preventDefault();

    let data = {
      name: e.target.name.value,
      age: e.target.age.value,
      ninja: e.target.ninja.value
    }

    $.post(`${__API_URL__}/db/person`, data)
      .then(function () {
        pageLoad();
      })
      .catch(function (err) {
        console.error(err);
        pageLoad();
      });
  });

  function pageLoad() {
    $.get(`${__API_URL__}/db/person`)
      .then(function (data) {
        console.log('our data:', data);
        $('#results').empty();

        data.rows.forEach(function (item) {
          let content = `
        <h2>name: ${item.name}</h2>
        <p>age: ${item.age}</p>
        <p>ninja status: ${item.ninja}</p>
      `;
          $('#results').append(content);
        });
      }, function (err) {
        console.error(err);
      });
  }
})(app)