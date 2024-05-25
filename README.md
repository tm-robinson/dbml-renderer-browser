# dbml-renderer-browser
Simple webpack project to run [@softwaretechnik/dbml-renderer](https://github.com/softwaretechnik-berlin/dbml-renderer/) in the browser.

This was created as a response to [this github issue](https://github.com/softwaretechnik-berlin/dbml-renderer/issues/23) taking some inspiration from previous replies to [this other github issue](https://github.com/softwaretechnik-berlin/dbml-renderer/issues/3).  The intention is to simply get [dbml-renderer](https://github.com/softwaretechnik-berlin/dbml-renderer/) working as a browser based javascript application as simply as possible.

## Developer mode

Run in developer mode (runs on port 8282 and is accessible from any local IP):

* `npm install`
* `npm start`

## Production mode

Build the dist folder for use on a production webserver (and then run local python webserver to test it
):

* `npm install`
* `npm run build`
* `python3 -m http.server 8181 --directory dist`

## Health Warning

I am a complete novice at node, javascript and webpack, so I am sure there are a lot of ways to improve this.  Please raise a github issue or send me a PR if you have ideas, especially on reducing the size of the distribution which is currently 20MB!