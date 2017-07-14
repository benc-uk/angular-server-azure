# Simple Node.js webserver for Angular and Azure
This is a very simple Node.js Express server designed to host & serve Angular applications.  
It provides access on the client side Angular code to server side environmental variables, specifically [App Settings](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-configure) when deployed into an Azure Web App. This lets you store & control the configuration of your app from the Azure App Service


## How it works
All environment variables starting with 'APPSETTING_' will be placed into a global dictionary called `_APPSETTINGS` within **appsettings.js**. They will be stored as regular key:value pairs.  
To integrate with your Angular app place a reference to the script in your **index.html**, e.g.
```
<script type="text/javascript" src="appsettings.js"></script>
```


## Accessing App Settings in your Angular app
The _APPSETTINGS is a global dictionary object of key value pairs, access using `eval` e.g.
```
var foo = eval("_APPSETTINGS['MYSETTING']")
```
We have to use `eval` to trick the Angular compiler, otherwise you will get errors due to **appsettings.js** only existing when running under this Node server and not when you are in your local Angular development environment. 


## Running the server
Run as a regular Node app, e.g. `npm install` and then `npm start`. The server will listen on port 1337 or whatever value is held in the `PORT` environmental variable.


## Warning!
This exposes all your App Settings to the world! They will be accessible in a public JS file and served to the client. This is designed for Angular apps where configuration details have to be client side by design. Don't put anything secret in there, this is standard practice with Angular apps as no code resides back on the server.

