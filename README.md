# discord-attachment-link-shortener
 A web page that shortens given cdn.discordapp.com/attachment/.. links to point towards the page and redirects those generated links to the proper Discord attachment link afterward.
 
 <b>Technology</b>
 
 Uses NodeJS. Converts the data in the link from BigInt to Base64 to shorten it, and reverses that to redirect the user to the original file.
 
 <b>How Effective is the Link Shortening?</b>
 
 The amount the link gets shortened by is considerable - the digits in the link (which I believe convey Discord server + channel information) are reduced from 36 to 22. 
 It still looks long though, because the demo is hosted on a domain that is very long (discord-link-shortener.herokuapp.com). If hosted on a short domain (discordl.ink) it would be very effective. I just don't want to pay that $28 dollars a year for that domain name :).
