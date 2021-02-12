const express = require('express');
const app = express();
const port = 3000;

/*
ds.crd/SERVER/CHANNEL/filename.ext
	-SERVER is a 13 digit number, turn that into base 64 to shorten it
	-CHANNEL is the same
  -going to that link calculates the real URL and redirects user to that page.
  should become
cdn.discordapp.com/attachments/SERVER/CHANNEL/filename.ext
*/

//File location for sendFile
//Files need to be in a separate folder- they cannot be in the root directory, or strange behavior with URL forwarding happens.
const page_root = __dirname + '/pages/'

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () => {
    console.log('a user is connected');
});

//Used to serve the CSS/JS files for the page
app.use(express.static('pages/static/'));

//Displays the home.html file upon starting the node app
app.get('/', async (request, response) => {
    //Show the main page.
    //response.sendFile('home.html', {root: page_root});
    response.redirect('/shortener');
});

//Displays the shortener.html file
app.get('/shortener', async (request, response) => {
  //Show the shortener page.
  response.sendFile('shortener.html', {root: page_root});
});


//Redirection route
app.get('/:server/:channel/:fileName', async (request, response) => {
  //Read the server, channel, and file name from the URL and redirect to that.

  //test link: localhost:3000/745412423611056219/809369283325853696/IMG_20210211_032342295_HDR.jpg
  //should redirect to: https://cdn.discordapp.com/attachments/745412423611056219/809369283325853696/IMG_20210211_032342295_HDR.jpg

  var serverCode = request.params.server
  var channelCode = request.params.channel
  var fileName = request.params.fileName

  function atob(b64) {
    return Buffer.from(b64, 'base64').toString('binary');
  }

  //turns a url safe base 64 string into a big int
  function b64ToBn(b64) {
    b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
    var bin = atob(b64);
    var hex = [];

    bin.split('').forEach(function (ch) {
        var h = ch.charCodeAt(0).toString(16);
        if (h.length % 2) { h = '0' + h; }
        hex.push(h);
    });

    return BigInt('0x' + hex.join(''));
  }

  var serverID = b64ToBn(serverCode)
  var channelID = b64ToBn(channelCode)

  var newURL = `https://cdn.discordapp.com/attachments/${serverID}/${channelID}/${fileName}`
  console.log(newURL)
  response.redirect(newURL);
});

app.listen(process.env.PORT || port, () => console.log(`App available on http://localhost:${port}`));