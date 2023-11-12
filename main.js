leftWristx=0
leftWristy=0
rightWristx=0
rightWristy=0
scoreleftwrist=0
scorerightwrist=0

song=""
function preload()
{
song=loadSound("music.mp3")
}





function setup()
{
    canvas=createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose', gotposes)

}

function draw()
{
    image(video,0,0.600,500)
    fill("red")
    stroke("red")

    if(scorerightwrist>0.2)
    {
        circle(rightWristx,rightWristy,20)
        if(rightWristy>0&&rightWristy<100){
            document.getElementById("speed").innerHTML="speed=0.5x"
            song.rate(0.5)
        }
       else if(rightWristy>100&&rightWristy<200){
            document.getElementById("speed").innerHTML="speed=1x"
            song.rate(1)
        }
      else  if(rightWristy>200&&rightWristy<300){
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5)
        }
        else if(rightWristy>300&&rightWristy<400){
            document.getElementById("speed").innerHTML="speed=2x"
            song.rate(2)
        }
        else if(rightWristy>400&&rightWristy<500){
            document.getElementById("speed").innerHTML="speed=2.5x"
            song.rate(2.5)
        }
    }

    if(scoreleftwrist>0.2){
        circle(leftWristx,leftWristy,20)
        innumberleftWristx=Number(leftWristy)
        remove_decimal=floor(innumberleftWristx)
        volume=remove_decimal/500
        document.getElementById("volume").innerHTML="volume="+volume
        song.setVolume(volume)
    }
}
function play()
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function modelLoaded(){
    console.log('posenet is initialized')
}

function gotposes(results){
    if(results.length>0){
        console.log(results)
        leftWristx=results[0].pose.leftWrist.x
        leftWristy=results[0].pose.leftWrist.y
        console.log("leftWristx="+leftWristx+"leftWristy="+leftWristy)

        rightWristx=results[0].pose.rightWrist.x
        rightWristy=results[0].pose.rightWrist.y
        console.log("rightWistx="+rightWristx+"rightWristy="+rightWristy)
        scoreleftwrist=results[0].pose.keypoints[9].score
        scorerightwrist=results[0].pose.keypoints[10].score
        console.log("scoreleftwrist="+scoreleftwrist + "scorerightwrist="+scorerightwrist) 
    }
}