//import ytdl-core
const youtubeDl = require("ytdl-core")

//download video with the given quality(itag) and send it as a response
const downloadVid = (url, videoQuality, response) => {
    youtubeDl(url, { quality: `${videoQuality}` })
        .pipe(response)
}

//export (downloadVid) function
module.exports = downloadVid;