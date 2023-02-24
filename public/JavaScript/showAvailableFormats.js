//control the appearance of the available formats for downloading after fetching the video data

//DOM elements
//select formats containers
const formatsContainer = document.getElementById("available-formats-container") //main container that separate into 3 sub-containers 

const vidAudContainer = document.getElementById("video-audio-formats") //video and audio formats container

const vidOnlyContainer = document.getElementById("video-only-formats") //video formats container

const audOnlyContainer = document.getElementById("audio-only-formats") //audio formats container


//define function that reorder the formats array according to their quality(video height)
const sortFormatsQuality = formatsArr => formatsArr.sort((a, b) => { return a.height - b.height })

//filter the formats array into new arrays
//filter formats that have video and audio together
const filterVidAud = formatsArr => { return formatsArr.filter(format => format.hasVideo && format.hasAudio) }

//filter formats that have video only
const filterVidOnly = formatsArr => { return formatsArr.filter(format => format.hasVideo && !format.hasAudio) }

//filter formats that have audio only
const filterAudOnly = formatsArr => { return formatsArr.filter(format => !format.hasVideo && format.hasAudio) }


//define function that create table for the formats details (order, quality ,file type ,size ,download button)
const createFormatsTable = (section) => {
    section.innerHTML += `
    <div class="formats-properties">
    <div class="format-order">
        <h5>No.</h5>
    </div>
    <div class="quality">
        <h5>Quality</h5>
    </div>
    <div class="type">
        <h5>Type</h5>
    </div>
    <div class="size">
        <h5>Size</h5>
    </div>
    <div class="download-buttons">
        <h5>Download</h5>
    </div>
</div>`
}

createFormatsTable(vidAudContainer) //create table for the video and audio container
createFormatsTable(vidOnlyContainer) //create table for the video only container
createFormatsTable(audOnlyContainer) //create table for the audio only container

//define function that check the format size should be written in Kilobyte or Megabyte or Gigabyte
const checkFormatSize = (size) => {
    const byteInKb = 1024 //bytes in one kilobyte
    const byteInMb = Math.pow(1024, 2) //bytes in one megabyte
    const byteInGb = Math.pow(1024, 3) //bytes in one gigabyte

    //if the format size is more than 1 kb and less than 1 Mb, write the size in kilobyte
    if (size > byteInKb && size < byteInMb) return `${Math.round(size/byteInKb)} KB`

    //if the format size is more than 1 Mb and less than 1 Gb, write the size in Megabyte
    else if (size > byteInMb && size < byteInGb) return `${Math.round(size/byteInMb)} MB`

    //if the format size is more than 1 Gb, write the size in gigabyte
    else if (size > byteInGb) return `${Math.round(size/byteInGb *10)/10} GB`

    //if the format size is not given(null), write -
    return `-`
}

//audio formats in the API are mp4 and webm, so this function is defined to convert mp4 to mp3 and webm to opus 
const addAudFormat = (fileType) => {
    if (fileType === "mp4") return "mp3" //convert mp4 to mp3
    else if (fileType === "webm") return "opus" //convert webm to opus
}

//create object that add short values to the keys(audio quality in the API)
const audioQualityObj = {
    "AUDIO_QUALITY_LOW": "low",
    "AUDIO_QUALITY_MEDIUM": "medium",
    "AUDIO_QUALITY_HIGH": "high"
}


//show data of available formats for downloading
const showAvailableFormats = (formatsArr, index, videoTitle, addAudFormat = null) => {
    /*formatsArr : formats array from the API
    index: index of container(video and audio or video only or audio only
    addAudFormat : add audio format if the format has audio only )*/

    //select DOM elements
    const formatOrder = document.querySelectorAll(".format-order") //order of format 

    const formatQuality = document.querySelectorAll(".quality") //the format quality

    const formatType = document.querySelectorAll(".type") //type of format file

    const formatSize = document.querySelectorAll(".size") //size of format

    const downloadBtns = document.querySelectorAll(".download-buttons")
    let videoOrder = 0 //start counting the video order
    for (arr of formatsArr) {
        const { qualityLabel, container, contentLength, audioQuality, itag } = arr //destructing the keys of each format in the formats array
        videoOrder++ //increase the vide order by 1

        formatOrder[index].innerHTML += `<h5>${videoOrder}</h5>` //write the format order

        //write video quality(qualityLabel) if it is available, or write the audio quality
        formatQuality[index].innerHTML += `<h5>${qualityLabel || audioQualityObj[audioQuality]}</h5>`

        //try to add the audio format 
        try {
            //if the format has audio only, the audio format will be written 
            formatType[index].innerHTML += `<h5>${addAudFormat(container)}</h5>`

            //add download buttons with the required data for downloading:video quality,name , type
            downloadBtns[index].innerHTML += `<div><button onclick='sendDownloadReq(${itag},"${videoTitle}","${addAudFormat(container)}")'>
            download</button></div>`
        } catch {
            //if the format has video, the video format will be written 
            formatType[index].innerHTML += `<h5>${container}</h5>`

            //add download buttons with the required data for downloading:video quality,name , type
            downloadBtns[index].innerHTML += `<div><button onclick='sendDownloadReq(${itag},"${videoTitle}","${container}")'>
            download</button></div>`
        }

        //write the format size
        formatSize[index].innerHTML += `<h5>${checkFormatSize(parseInt(contentLength))}</h5>`

    }

}