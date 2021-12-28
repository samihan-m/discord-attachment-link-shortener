# discord-attachment-link-shortener

 Check it out at https://dscd.link!

 A web page that shortens given cdn.discordapp.com/attachment/.. links to point towards the page and redirects those generated links to the proper Discord attachment link afterward.
 
 <b>Technology</b>
 
 Uses NodeJS. Converts the data in the link from BigInt to Base64 to shorten it, and reverses that to redirect the user to the original file.
 
 <b>How Effective is the Link Shortening?</b>
 
 The amount the link gets shortened by is considerable - the digits in the link (which I believe convey Discord server + channel information) are reduced from 36 to 22. The characters for "https://cdn.discordapp.com/attachment/" are reduced to "http://dscrd.link/" (when using that link instead of the herokuapp link) which is a reduction of 20 characters. The file name is left untouched.
 
 In total, that's a reduction of 34 characters!
