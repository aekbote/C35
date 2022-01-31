var hypnoticBall, database;
var position;


function setup(){
  // creating database
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  //creating ball
  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

//refering to database and reading(on)
  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");

  if(position!== undefined){

    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }

    drawSprites();
  }
}

// updating ball position in database
function writePosition(x,y){
  database.ref("ball/position").update({
     'x': hypnoticBall.x + x,
     'y': hypnoticBall.y + y
  })
}

// extracting positions from data and applying it here (val means value extracted from value)
function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
