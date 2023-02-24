//Import modules
const express = require("express");
const compression = require('compression');
const cors = require('cors');
const methodOverride = require('method-override');
const xss = require('xss-clean');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const app = express();
const fs = require("fs");
const path = require("path");
const contentDisposition = require('content-disposition');
const getVideoInfo = require("./server/getVideoInfo");
const downloadVid = require("./server/downloadVideo");


// GLOBAL MIDDLEWARES

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against XSS
app.use(xss());

app.use(compression());
// Implement CORS
app.use(cors());
app.use(methodOverride());
app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.use(express.static('public'))
    //handle get request : get the video info

app.get("/getData", (req, res) => {
    videoUrl = req.query.videoUrl //destructing (req.query) object
    getVideoInfo(videoUrl).then(data => res.send(data)) //get the video info by its URL then send it to the frontend
})

//hadle get request : download video
app.get("/downloadVid", (req, res) => {
    const { videoQuality, videoTitle, videoType } = req.query //destructing (req.query) object

    //set header
    res.setHeader('Content-Disposition', contentDisposition(`${videoTitle}.${videoType}`))
    downloadVid(videoUrl, videoQuality, res) //download the video

});

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
app.use('/api', limiter);

// Page not found middleware
app.use((req, res, next) => {
    res.sendFile(__dirname + '/public/404.html');
});
//add port 
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})
