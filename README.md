# ai-subbu

## Pre-requisities: 
* node >= v7.0.0 //check the version with `node -v` command.
* npm >= 3.2.0 // check the version with `npm -v` command.

### Setting up project:
* Clone the repo. cd into at-golf(`cd at-golf`) and run these commands.
* `npm install` //for installing all the dependencies of the project.

### For development: 
* `ng serve --port 4200 --host 0.0.0.0` //port number can be any free port. not necessarily 4200.
* Open: http://localhost:4200

### For production and deployment:
* `npm run build`
* Once the above command is run, a 'dist' folder will be created in the same directory('/at-golf').
* 'dist' folder contains an index.html, required .js files (app.js, vendor.js, polyfills.js and other module chunks), and an assets folder(which contains images and other public media).
* move this folder to server and point the url to the index.html in this folder which is quite similar to pointing to a normal html file on server.

> Written and developed by **[Subrahmayam Bhamidipati](https://github.com/subbu3012/)**


