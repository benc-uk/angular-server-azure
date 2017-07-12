var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var public = __dirname;

// We find all env vars starting APPSETTING_ and write them into appsettings.js
// index.html should include appsettings.js, and the Angular code uses eval("FOO") to access values
fs.writeFileSync(public + "/appsettings.js", "_APPSETTINGS = {};\n"); 
for (var envvar in process.env) {

   if(envvar.startsWith("APPSETTING_")) {
      varshort = envvar.replace("APPSETTING_", "");
      varshort = varshort.replace(" ", "_");
      fs.appendFileSync(`${public}/appsettings.js`, `_APPSETTINGS.${varshort} = "${process.env[envvar]}";\n`); //`${varshort} = "${process.env[envvar]}";\n`);
   }
}

app.use('/', express.static(public));
app.use((req, res) => res.sendFile(`${public}/index.html`))
var port = process.env.PORT || 1337;
app.listen(port);