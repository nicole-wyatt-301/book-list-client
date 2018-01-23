'use strict';

let errorView = {};
var app = app || {};


(function (module) {

  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    let template = Handlebars.compile($('#error-template').text());
    template(err).append('#error-message');
  }

  errorView.errorCallback = (err) => {
    console.log('error n stuff', err);
    errorView.initErrorPage(err);
  }

  module.errorView = errorView;

})(app)