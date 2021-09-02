const fs = require("fs");
const path = require("path");
var videoshow = require("videoshow");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const chalk = require("chalk");
const errorColor = chalk.red.inverse;
const successColor = chalk.green.inverse;
const startingColor = chalk.yellow.inverse;

const folderPath = "D:\\Documents\\Node.js\\blog\\slide-maker\\media";
const images = fs
  .readdirSync(folderPath)
  .map((fileName) => {
    return path.join(folderPath, fileName);
  })
  .filter((file) => {
    return (path.extname(file) === ".jpg") || (path.extname(file) === ".png") || (path.extname(file) === ".bmp");
  });

const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 0.2, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};

videoshow(images, videoOptions)
  .audio("D:\\Documents\\Node.js\\blog\\slide-maker\\media\\bensound-ukulele.mp3") // credit for song from https://www.bensound.com
  .save("D:\\Documents\\Node.js\\blog\\slide-maker\\media\\video.mp4")
  .on("start", function (command) {
    console.log(startingColor("ffmpeg process started:", command));
  })
  .on("error", function (err, stdout, stderr) {
    console.log(errorColor("Error:", err));
    console.log(errorColor("ffmpeg stderr:", stderr));
  })
  .on("end", function (output) {
    console.log(successColor("Video created in:", output));
  });