# Simple Node.js webserver for Angular and Azure

Does stuff

## Warning!
This exposes all your App Settings to the world! They will be in a public JS file and served to the client. This is designed for Angular apps where configuration details have to be client side by design. Don't put anything secret in there, this is standard practice with Angular apps as no code resides back on the server.

## Accessing App Settings
The _APPSETTINGS is a global dictionary of key value pairs, access the standard JavaScript way e.g.
```
var foo = _APPSETTINGS.MYSETTING
```
