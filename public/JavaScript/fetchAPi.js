//Get DOM elements
const videoUrlInput = document.getElementById("video-url-input") //input video link field
const videoUrlBtn = document.getElementById("video-url-btn") //submit button

//define the function that will be invoked after clicking the submit button
const clickSubmitBtn = e => {
    e.preventDefault()

    //check if the input field is empty
    if (!videoUrlInput.value) {
        showErrorMsg("Please enter video url") //ask the user to enter a video url
    }
    //if the input field isn't empty
    else {
        //fetch video data
        fetch(`/getData/?videoUrl=${videoUrlInput.value}`)
            .then(response => response.json())
            .then(data => {
                //reorder (available formats for downloading)array according to their quality 
                sortFormatsQuality(data.formats)

                //filter available formats for downloading into new arrays
                vidAndAud = filterVidAud(data.formats) //video and audio together
                vidOnly = filterVidOnly(data.formats) //video only formats
                audOnly = filterAudOnly(data.formats) //audio only formats

                //control the height of videos only container
                videoOnlyHeight(vidOnly)
                rotateSides() //rotate back side to contain the video details
                modifyBackSide(data) //modify the back side styles and write video details in it
            })
            //if there is an error (the url is invalid)
            .catch(err => {
                showErrorMsg("Please enter valid video url") //ask the user to enter the url again
                ctrlLoaderDis("block", "none") //hide loader and show submit button again
            })


        //show loader and hide submit button to prevent the user from clicking on the button again during fecthing the video info
        ctrlLoaderDis("none", "flex")
    }
}

//add click event to the submit button
videoUrlBtn.addEventListener("click", clickSubmitBtn)