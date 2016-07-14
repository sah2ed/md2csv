'use strict';

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  	require('longjohn');
}

var ctx = {};
ctx.data = {};
ctx.data.url = process.env.URL;
ctx.data.EMAIL_TO = ctx.data.emailTo = process.env.EMAIL_TO;
ctx.data.EMAIL_FROM = process.env.EMAIL_FROM;
ctx.data.EMAIL_SENDGRID_APIKEY = process.env.EMAIL_SENDGRID_APIKEY;
ctx.data.EMAIL_SUBJECT = process.env.EMAIL_SUBJECT;

var request = require('./md2csv');
request(ctx, function(error, data) {
	if (error) {
		console.error(error.stack);
	} else {
		console.log();
		console.log(data);
	}
});