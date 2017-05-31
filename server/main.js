import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/api/db.js';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({  
  'findUser': function(username) {
    return Meteor.users.findOne({
      username: username
    }, {
      fields: { 'username': 1 }
    });
  }
});