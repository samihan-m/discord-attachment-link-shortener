function shorten() {
    var discordURL = document.getElementById("discordURL").textContent
    var attachmentPrefix = "https://cdn.discordapp.com/attachments/"
    var attachmentPrefixIndex = discordURL.indexOf(attachmentPrefix)
    var messagePrefix = "https://discord.com/channels/"
    var messagePrefixIndex = discordURL.indexOf(messagePrefix)
    if(attachmentPrefixIndex == -1 && messagePrefixIndex == -1) {
        alert("Not a recognized Discord attachment or message link, try a different one.")
    }
    else {
        var prefix
        if(attachmentPrefixIndex > messagePrefixIndex) {
            prefix = attachmentPrefix 
        }
        else {
            prefix = messagePrefix
        }
        //read the file information from the given url - first, remove everything before the server ID to make splitting the rest easier.
        var linkInformation = discordURL.substring(prefix.length).split("/")
        console.log(linkInformation)

        var serverID = BigInt(linkInformation[0])
        var channelID = BigInt(linkInformation[1])
        // thirdID can be a file name OR a message code
        var thirdID = linkInformation[2]

        //Turns a big int into a url-safe base 64 string
        function bnToB64(bn) {
            var hex = BigInt(bn).toString(16);
            if (hex.length % 2) { hex = '0' + hex; }

            var bin = [];
            var i = 0;
            var d;
            var b;
            while (i < hex.length) {
                d = parseInt(hex.slice(i, i + 2), 16);
                b = String.fromCharCode(d);
                bin.push(b);
                i += 2;
            }
            
            return btoa(bin.join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');;
        }

        //turn the numbers into a base64 string

        var serverCode = bnToB64(serverID)
        var channelCode = bnToB64(channelID)
        
        var shortenedLink = ""

        // Construct the appropriate link based on if the link is an attachment or a message
        if(attachmentPrefixIndex != -1) {
            // Link is an attachment
            shortenedLink = `${window.location.origin}/file/${serverCode}/${channelCode}/${thirdID}`
        }
        else if (messagePrefixIndex != -1){
            // Link is a file
            var messageCode = bnToB64(BigInt(thirdID))
            shortenedLink = `${window.location.origin}/msg/${serverCode}/${channelCode}/${messageCode}`
        }
        else {
            // Link is neither a file nor attachment yet passed the if check that verifies it is one or the other???
            alert("Not a recognized Discord attachment or message link, try a different one.")
            return
        }

        //print the new link onto the page
        var outputLink = document.getElementById("shortenedURL")
        outputLink.textContent = shortenedLink
        outputLink.href = shortenedLink

        //also print the new link into the hidden input so it can be copied from
        var copiableLink = document.getElementById("copiable-link")
        copiableLink.defaultValue = shortenedLink
        console.log(copiableLink.defaultValue)

        //unhide the output
        var outputBox = document.getElementById("output-box")
        outputBox.classList.remove("hidden")
    }
}

function copyLink() {
    //select the link
    var link = document.getElementById("copiable-link")
    //reveal the textarea because copying only works if the textarea is visible
    link.classList.remove("hidden")

    //select text
    link.select()
    link.setSelectionRange(0, 99999); /* For mobile devices */

    //copy the text from the link
    console.log(document.execCommand("copy"))

    //hide the area again
    link.classList.add("hidden")

    //visually tell the user that the copy worked
    var output = document.getElementById("console")
    output.textContent = "Copied :)"
}