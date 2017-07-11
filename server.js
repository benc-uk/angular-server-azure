var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var public = __dirname;

// We find all env vars starting APPSETTING_ and write them into env.js
// index.html should include env.js, and the Angular code uses eval("FOO") to access values
fs.writeFileSync(public + "/env.js", ""); 
for (var envvar in process.env) {

   if(envvar.startsWith("APPSETTING_")) {
      varshort = envvar.replace("APPSETTING_", "");
      fs.appendFileSync(`${public}/env.js`, `${varshort} = "${process.env[envvar]}";`);
   }
}

app.use('/', express.static(public));
app.use((req, res) => res.sendFile(`${public}/index.html`))
var port = process.env.PORT || 1337;
app.listen(port);