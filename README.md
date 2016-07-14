# Markdown to CSV Conversion
This app was created to try out https://webtask.io.

The app merely converts a Markdown formatted table into CSV format then emails a HTML formatted version of the same file using `Sendgrid`. 


## Webtask.io Deployment
```shell
npm install wt-cli -g

wt init <your-email-address>@example.com

wt create md2csv.js \
  --name md2csv \
  -s EMAIL_TO=<recipient@example.com> \
  -s EMAIL_FROM=<sender@example.com> \
  -s EMAIL_SENDGRID_APIKEY=<API-KEY> \
  -s URL=https://gist.githubusercontent.com/<raw-file-name>.md
```

To get the multiline commands above to work on Windows, replace the `\` character with `^`:
```shell
wt create md2csv.js ^
  --name md2csv ^
  -s EMAIL_TO=<recipient@example.com> ^
  -s EMAIL_FROM=<sender@example.com> ^
  -s EMAIL_SENDGRID_APIKEY=<API-KEY> ^
  -s URL=https://gist.githubusercontent.com/<raw-file-name>.md
```

For the actual conversion, simply set the `emailTo` and `url` query parameters in the url handed to you by `wt-cli`:
```shell
curl https://webtask.it.auth0.com/api/run/wt-<your-email>-0/md2csv?webtask_no_cache=1&emailTo=<your-email>@<domain.com>&url=https://git.io/vK4St
```


## Local Deployment
The app can also be run from the command line.
.1. Clone the repository locally.
```shell
git clone git@github.com:sah2ed/md2csv.git 
cd md2csv/
```

.2. Next rename the environment file `.env-example` to `.env`.
```shell
mv .env-example .env
```

.3. Then edit the values to suit your environment. 
At a minimum, you'll need to set the `URL` variable to a valid markdown file containing the table that you want to convert to CSV.
Urls to private gists hosted on GitHub will also work.


.4. The conversion will write the CSV to standard out.
```shell
npm install
node index.js
```

.5. Debugging network problems.
On Windows use:
```shell
SET NODE_DEBUG=request && node index.js
```

On Linux use:
```shell
NODE_DEBUG=request node index.js 
```


## Motivation
Inspired by https://github.com/tomroy/mdtable2csv