//ADD STYLES WITH JavaScript
//control loader appearance and showing error message
//DOM elements
const loaderContainer = document.getElementById("loader") //loader 
const errorMsg = document.getElementById("error-message") //error message

//control display of loader and submit button display
//Both of loader and submit button have the same position so when one of them appear the another will be hidden 
const ctrlLoaderDis = (BtnDisplay, loaderDisplay) => {
    videoUrlBtn.style.display = BtnDisplay //submit button display
    loaderContainer.style.display = loaderDisplay //loader container display
}

//Error message styles
const showErrorMsg = (errMessage) => {
    errorMsg.textContent = errMessage //error message content
    errorMsg.style.display = "block" //show error message
    errorMsg.addEventListener("animationend", () => errorMsg.style.display = "none") //hide it again after finishing its animation
}

//control the height of videos only container
const videoOnlyHeight = (videoOnlyArr) => { //if the number of available videos is equal to or less than 4
    if (videoOnlyArr.length <= 4) document.querySelector("#video-only-formats .formats-properties").style.height = "fit-content"
}