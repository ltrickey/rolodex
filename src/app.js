import Application from 'app/models/application';
import ApplicationView from 'app/views/application_view';
import $ from 'jquery';
import _ from 'underscore';
import Contact from './app/models/contact.js';
import Rolodex from './app/collections/rolodex.js';

var application = new Application();

var appView = new ApplicationView({
  el: '#application',
  model: application
});

var myContact = new Contact({
  name: "Lynn",
  phone: 2062401029,
  email: "lynn@test.com"
});

var contactData = [
  {
    name: "Mom",
    phone: 2063658186,
    email: "mom@test.com"
  },
  {
    name: "Lynn",
    phone: 2062401029,
    email: "lynn@test.com"
  },
  {
    name: "Annie",
    phone: 2061234589,
    email: "Annie@test.com"
  }
];

var myRolodex = new Rolodex(contactData);

var render = function(contact) {
  var templateText = $("#tmpl-contact-card").html();

  var templateObject = _.template(templateText);

  var compiledHTML = templateObject(contact.toJSON());

  $("#contact-cards").append(compiledHTML);
};

var renderCollection = function(collection) {
  $("#contact-cards").empty();
  collection.each(function(contact) {
    render(contact);
  });
};

var getFormData = function() {
  var formName = $("#contact-name").val();
  $("#contact-name").val("");
  var formEmail = $("#contact-email").val();
  $("#contact-email").val("");
  var formPhone = $("#contact-phone").val();
  $("#contact-phone").val("");
  return {
    name: formName,
    email: formEmail,
    phone: formPhone
  };
};

$(document).ready(function() {
  $("#contact-details").hide();
  renderCollection(myRolodex);

  myRolodex.on("update", function() {
    renderCollection(myRolodex);
  });

  $("h3.btn-save").click(function() {
    var formData = getFormData();
    var newContact = new Contact(formData);
    myRolodex.add(newContact);
  });

});
