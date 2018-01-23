'use strict';

let bookView = {};
let __API_URL__ = 'http://localhost:3000';

pageLoad();

(function (module) {
  // Instantiates a new Book constructor and creating book objects from the database
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  // creates an empty book array which will hold all of our instantiated book objects
  Book.all = [];

  // takes in rows as arguments, sorts rows by title, maps over rows to create an array of book instances, and assigns the array to Book.all
  Book.loadAll = rows => {
    rows.sort((a, b) => {
      if(a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    Book.all = rows.map((bookObj) => new Book(bookObj));
  }

  // compiles handlebars template (which has ID of book-list-template) and returns it with the content
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());

    return template(this);
  }

  // takes callback as argument, makes request to API at GET: /api/v1/books, on success passes results to Book.loadAll, on failure invokes error callback
  Book.fetchAll = callback => {
    $.get('/api/v1/books')
      .then(results => {
        Book.loadAll(results);
        callback();
      })
      // ADD CODE SO THAT UPON FAILURE, INVOKE ERROR CALL BACK
  };

  // $('#user-form').on('submit', function (e) {
  //   e.preventDefault();

  //   let data = {
  //     name: e.target.name.value,
  //     age: e.target.age.value,
  //     ninja: e.target.ninja.value
  //   }

  //   $.post(`${__API_URL__}/db/person`, data)
  //     .then(function () {
  //       pageLoad();
  //     })
  //     .catch(function (err) {
  //       console.error(err);
  //       pageLoad();
  //     });
  // });

  // function pageLoad() {
  //   $.get(`${__API_URL__}/db/person`)
  //     .then(function (data) {
  //       console.log('our data:', data);
  //       $('#results').empty();

  //       data.rows.forEach(function (item) {
  //         let content = `
  //       <h2>name: ${item.name}</h2>
  //       <p>age: ${item.age}</p>
  //       <p>ninja status: ${item.ninja}</p>
  //     `;
  //         $('#results').append(content);
  //       });
  //     }, function (err) {
  //       console.error(err);
  //     });
  // }
})(app)