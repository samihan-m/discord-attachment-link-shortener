function shorten() {
    var discordURL = document.getElementById("discordURL").textContent
    var prefix = "https://cdn.discordapp.com/attachments/"
    var prefixIndex = discordURL.indexOf(prefix)
    console.log(prefixIndex)
    if(prefixIndex == -1) {
        alert("Not a recognized Discord attachment link, try a different one.")
    }
    else {
        //read the file information from the given url - first, remove everything before the server ID to make splitting the rest easier.
        var fileInformation = discordURL.substring(prefix.length).split("/")
        console.log(fileInformation)

        var serverID = BigInt(fileInformation[0])
        console.log(serverID)
        
        var channelID = BigInt(fileInformation[1])
        console.log(channelID)
        
        var fileName = fileInformation[2]
        console.log(fileName)

        /* This method of 'compressing' the length of the URL didn't actually make it smaller.
        function idSplitterEncoder(id) { //takes a string and returns a string 'X/Y' where X is the hashid encoded first half and Y is the hashid encoded second half
            var mid = Math.floor(id.length/2)
            var head = id.substring(0, mid)
            var tail = id.substring(mid)

            var hashids = new Hashids()
            var encodedHead = hashids.encode(head)
            var encodedTail = hashids.encode(tail)

            return `${encodedHead}-${encodedTail}`
        }

        var serverCode = idSplitterEncoder(serverID)
        var channelCode = idSplitterEncoder(channelID)

        var shortenedLink = `localhost:3000/${serverCode}/${channelCode}/${fileName}`
        */

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
        
        //put those new strings together for the new link
        var shortenedLink = `${window.location.origin}/${serverCode}/${channelCode}/${fileName}`

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