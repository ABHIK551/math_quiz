var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.getElementById("startreset").onclick=function(){
     if(playing == true){
         
         location.reload();  //reload page
     }else{ 
         
         //change mode to playing
         playing=true;
         
         //if we are not playing
         score = 0;
         document.getElementById("scorevalue").innerHTML= score;
         
          //show countdown box
         
         appear("timeremaining");
         timeremaining = 60;
         document.getElementById("timeremainingvalue").innerHTML = timeremaining;
         
          //hide gameOver box
         hide("gameOver");
         
          //change button to reset
         document.getElementById("startreset").innerHTML="Reset Game"
         
         //start countdown
         startCountdown();
         
         //generate Q&A
         generateQA();
     }
    //if we are playing
    
}


//clicking on the answer box

for(i=1; i<5; i++){
    document.getElementById("options" + i).onclick = function(){
    
    //check if we are playing
    if(playing ==true){
        //yes
        if(this.innerHTML == correctAnswer){
            //correct answer
            
            //increase score
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            
            //hide hide box and show correct box
            hide("wrong");
            appear("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            generateQA();
        }
            else{
                //wrong answer
                 hide("correct");
            appear("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000)
            }
        }
    }
}
    

//if we click on answesr box 
   //if we are playing
        //correct?
            //yes
               //increase score
               //show correct box for 1sec
               //generate new Q&A
            //no
               //show try again box for 1sec

//functions

//start countdown/counter
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            //game over
            stopCountdown();
           appear("gameOver");
            document.getElementById("gameOver").innerHTML ="<p>Game Over!</p><p>Your score is : "+score+"</p>";
           hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
         
    }, 1000)
}


//stop countdown/counter
function stopCountdown()
{
    clearInterval(action);
}

//hiding or settinf display property to none
function hide(id){
    document.getElementById(id).style.display = "none";
}

//settung display property block so that content will appear on window
function appear(id){
    document.getElementById(id).style.display = "block";
}

//for generating question and answer 
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y ;
    document.getElementById("question").innerHTML = x + "X" + y ;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("options"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with incorrect answer
    
    
    var answers = [correctAnswer];
    
    for(i=1 ; i<5 ; i++){
        if(i != correctPosition){
             var wrongAnswer;
            
            do
            {
                     wrongAnswer =(1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));//wrong answer
                    }
             // while(wrongAnswer == correctAnswer)
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("options" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}