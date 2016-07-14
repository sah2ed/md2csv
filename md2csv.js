'use strict';

var request = require('request');
var URL_SAMPLE = 'https://git.io/vK4St';
var EMAIL_SUBJECT = 'Webtask.io - Markdown2CSV: Conversion Successful';

function log(message) {
	if (process.env.NODE_ENV === 'development') {
		console.log(message);
	}
}

module.exports = function (ctx, done) {
    var srcUrl = ctx.data.url || URL_SAMPLE;
    var destUrl = 'https://api.github.com/markdown/raw';
    var destOptions = {
        url: destUrl,
        headers: {
            'User-Agent': 'Markdown2CSV',
            'Content-Type': 'text/plain'
        }
    };
    var dataCSV = "";
    var dataHTML = "";

    request
        .get(srcUrl)
        .on('response', function(response) { log('OK - Fetched raw markdown file.'); })
        .on('error', function(error) { log('Failed - GET error: ' + error); done(error); })
        .on('data', function(chunk) { dataCSV += chunk; })
        .on('end', function() {
			// TODO: can't use 'htmlparser' since webtask.io doesn't support 'soupselect'
			// consider using https://github.com/fb55/htmlparser2
		})
        .pipe(request.post(destOptions)
            .on('response', function(response) { log('OK - Fetched HTML formatted markdown file.'); })
            .on('error', function(error) { log('Failed - POST error: ' + error); done(error); })
            .on('data', function(chunk) { dataHTML += chunk; })
            .on('end', function() {
				var sg = require('sendgrid')(ctx.data.EMAIL_SENDGRID_APIKEY); // webtask.io only supports v1.8.0
				var email = new sg.Email();
				email.subject = ctx.data.EMAIL_SUBJECT || EMAIL_SUBJECT;
				email.from = ctx.data.EMAIL_FROM;
				email.to = ctx.data.emailTo || ctx.data.EMAIL_TO;
				email.html = dataHTML;

				sg.send(email, function(err, json) {
					if (err) console.error(err);
					else log('OK - Email sent successfully.');
					done(null, dataHTML);
				});
			})
        )
}


