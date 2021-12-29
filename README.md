# discord-attachment-link-shortener

 Check it out at https://dscd.link!

 A web page that shortens given cdn.discordapp.com/attachment/.. and discord.com/channels/ links to point towards the page and redirects those generated links to the proper Discord attachment link afterward.
 
 <b>Technology</b>
 
 Uses NodeJS. Converts the data in the link from BigInt to Base64 to shorten it, and reverses that to redirect the user to the original file.
 
 <b>How Effective is the Link Shortening?</b>

Parts of the URL that contain server, channel, or message codes are shortened by about 7 characters.
File names are left untouched for readability's sake (users will have an idea of what they are clicking on when they see a shortened link).
cdn.discordapp.com and discord.com are shortened to dscd.link (a shortening of 9 characters and 2 characters, respectively).

Example shortened links:
https://cdn.discordapp.com/attachments/763533415978762261/925208250020933652/Dreamcast_Swirl.jpeg -> https://dscd.link/file/CpidmLGOABU/DNcAAF3CMBQ/Dreamcast_Swirl.jpeg (shortened by 30 characters)
https://discord.com/channels/713671901985243137/763533415978762261/925208250188714034 -> https://dscd.link/msg/Ced40EwCAAE/CpidmLGOABU/DNcAAGfCUDI (shortened by 28 characters)

I'd say that's a pretty significant reduction!
