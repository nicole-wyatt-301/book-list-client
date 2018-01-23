'use strict';

let errorView = {};

(function(module) {

  errorView.initErrorPage(err) {
      $('.container').hide();
      $('.error-view').show();
      $('#error-message').empty();
      let template = Handlebars.compile($('#error-template').text());
      template(err).append('#error-message');
  }

  module.errorView = errorView;
 
})(app)