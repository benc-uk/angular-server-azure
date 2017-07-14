var express = require('express');
//var fs = require('fs');
//var path = require('path');
var app = express();
var public = __dirname;

// We find all env vars starting APPSETTING_ and serve them from a pseudo file appsettings.js
// The Angular app index.html should include appsettings.js, 
//  and the Angular code uses eval("_APPSETTINGS['FOO']") to access values
app.get('/appsettings.js', function (req, res) {
   var js_content = "_APPSETTINGS = {};\n"
   for (var envvar in process.env) {

      if(envvar.startsWith("APPSETTING_")) {
         var varshort = envvar.replace("APPSETTING_", "");
         varshort = varshort.replace(" ", "_");
         js_content += `_APPSETTINGS.${varshort} = "${process.env[envvar]}";\n`; //`${varshort} = "${process.env[envvar]}";\n`);
      }
   }
   res.type('javascript')
   res.send(js_content);
});
app.use('/', express.static(public));
app.use((req, res) => res.sendFile(`${public}/index.html`));

var port = process.env.PORT || 1337;
app.listen(port);
