const login = require('facebook-chat-api');
const bcrypt = require('bcrypt');
const fs = require('fs');
let conf = JSON.parse(fs.readFileSync('creds.json'))
const creds = {
  email: conf.user.email,
  password: conf.user.password
}
let answeredThreads = {};
let exclued = '' // TODO 1: Lneed to make into an array and loop over it

login({
	email: creds.email,
	password: creds.password 
},function callback(err, api) {
   
  api.setOptions({logLevel: "silent"});

	if (err) {
    switch(err.error) {
      case 'login-approval': // if you have login approvals turned on this will just re-enter you password so you don't have to approve it multiple times.
        err.continue(creds.password);
        break;
      default:
        console.error(err);
    }
    
    return;
  }

	api.listen(function callback(err, message) {
		console.log(message.threadID);
    if (message.threadID != exclued) { // TODO 1: should be for loop? to loop through exclued array.

		  if (!answeredThreads.hasOwnProperty(message.threadID)) {
		  	answeredThreads[message.threadID] = true; // This line only allows this bot/app/script to respond once. If it's removed the bot/app/script will respond to each message sent. 
			  api.sendMessage('Insert your cool away message here', message.threadID);
		  }
    }

	});
});

/* 
 * Notes: 
 *
 * Could probably wrap into express framework but I'm not that smart yet. 
 * Should probably encrypt/decrypt passwords so if the server gets hacked your info isnt in plaintext. 
 * Maybe encrypt/decrypt email too?
 *
 * eat pizza
 *
 */
