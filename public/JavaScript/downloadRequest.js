//send request to the server to download the video
const sendDownloadReq = (quality, title, type) => {

    window.open((`/downloadVid/?videoQuality=${quality}&videoTitle=${encodeURIComponent(title)}&videoType=${type}`))
}