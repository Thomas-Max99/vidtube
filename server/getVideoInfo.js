//import modules
const youtubeDl = require("ytdl-core")

/*define (getVideoInfo) async function that takes one argument(the youtube video url),
 then assign the video info to the function*/

const getVideoInfo = async(videoUrl) => {
    return youtubeDl.getInfo(videoUrl) //get the video info
        .then(data => { return data }) //assign the video info to the function
        .catch(err => { 
            new Error("wrong url") 
        }) //throw error if the video url is unvalid
}


module.exports = getVideoInfo