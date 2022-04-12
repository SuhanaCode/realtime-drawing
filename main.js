noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup(){
  video = createCapture(VIDEO);
  video.size(550 , 500);

  canvas = createCanvas(400 , 400);
  canvas.position(560 , 150);

  poseNet = ml5.poseNet(video , modelLoaded);
  poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
  console.log("PoseNet is Initialized");
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("nose x = " + noseX + " nose y = " + noseY);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);

    console.log("Left Wrist = " + leftWristX + " right wrist = " + rightWristX + " difference = " + difference);
  }
}

function draw(){
  background('#969A97');

  document.getElementById("square_side").innerHTML = "Height and Width of the Square is = " + difference + "px";
  fill('#F90093');
  stroke('#F90093');

  square(noseX , noseY , difference);
}
