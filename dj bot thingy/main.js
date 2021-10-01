song = ""

function preload(){
    song= loadSound("music.mp3");
}
leftWristX= 0;
leftWristY= 0;
rightWristY=0;
rightWristX=0;
function setup(){
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded(){
    console.log('poseNet is intialized');

}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
    circle(leftWristX, rightWrist, 20);
    InNumberleftWristY= Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "VOLUME=" + volume;
    song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist=" + scoreLeftWrist);

        rightWristX = results [0].pose.rightWrist.x;
        rightWristY = results [0].pose.rightWrist.y;
        console.log("Left wrist =" +rightWristY + "Right wrist =" +rightWristX);
    }
}
