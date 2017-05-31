import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';

import './main.html';
import './main.css';
import { Tweets } from '../imports/api/db.js';







Template.userManagement.helpers({

  });

  Template.userManagement.events({
    'click #signup': function() {
      var user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        profile: {
          fullname: $('#signup-fullname').val()
        }
      };

      Accounts.createUser(user, function (error) {
        if(error) alert(error);
      });
    },

    'click #login': function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if(error) alert(error);
      });
    },

    'click #logout': function() {
      Meteor.logout();
    }
  });







Template.tweetBox.onRendered(function () {  
  Session.set('numChars', 0);
});


Template.tweetBox.events({  
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);
  },

  'click button': function() {  
  var tweet = $('#tweetText').val();
  $('#tweetText').val("");
  Session.set('numChars', 0);

  if(Meteor.user())
  {
  Tweets.insert({message: tweet, users: Meteor.user().username});
  }
}


});


Template.tweetBox.helpers({  
  charCount: function() {
    return 140 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 140) {
      return 'errCharCount';    //css class name
    } else {
      return 'charCount';       //css class name
    }
  },

  disableButton: function() {
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 140) {
      return 'disabled';
    }
  }
});










Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

    Tweets.insert({tweet: "test"});
  },
});
