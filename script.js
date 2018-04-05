$(document).ready(intiApp);
var gameBoardArray = [];//2d array to store the disc containter value . 2 means emty, 0 means player1 color ; 1 means player2 color 
var boardTokenArray = []; // 2d array that store the all <div> s teg of the class disc_container. 
var player1_color_value_in_gameBoardArray = 0;
var player1_color = 'black';
var player2_color = 'green';
var player2_color_value_in_gameBoardArray = 1; 
var emty_splace = 2;
var divNum; // the number that represents the disc_container  
var boxNum = 0; // num that on the box
var clickTime = 0;// how many times that can click 
var playerTurn;
var containerCol; 
var containerRow;
var currentBoxLocationInGameBoardArray; 
// var changablediscForPlayer1 = [];



function intiApp(){
	//step1 create a 8x8 board; 
	create_board();
	// $('#28').off('click'); // disable the click on the the boxs; 
	// $('#37').off('click');
	// $('#29').off('click');
	// $('#36').off('click');
	// definePlayerTurn();
	// // checkBoxReliability();
	$('.disc_container').click(boxClick);
	// $('.disc_container').on('click', horizontalClickRight);// box_click is when game stars

}
//step 1: 
function create_board(){
	for(var r = 0; r < 8; r++ ){
		var nestedArrSet  = [];
		boardTokenArray[r] = [];
        gameBoardArray.push(nestedArrSet);
		for(var c = 0; c < 8; c++){
			nestedArrSet.push(emty_splace);
			boxNum ++;
			var disc_container = $('<div>', {
				class: 'disc_container', 
				attr: {
					row: r, //row location of the disc container 
					col: c    // col location of the disc container
				},
				id: boxNum 
			}).appendTo('#game-area').data('boxNumber', boxNum );
			disc_container.text(boxNum);
			disc_container.off('click')
			boardTokenArray[r][c] = disc_container;
			// console.log(boardTokenArray);
      		

		}
	}
	console.log(boardTokenArray);
//step 3 append the center 4 disc onto the board in box 28, 29, 36, and 37;
	makeToken(player1_color).appendTo('#28');
    gameBoardArray[3][3] = player1_color_value_in_gameBoardArray //0
    makeToken(player1_color).appendTo('#37');
    // $('<div>', {class: 'transparent_disc black'}) is equail to makeToken('black').
    gameBoardArray[4][4] = player1_color_value_in_gameBoardArray // 0
     makeToken(player2_color ).appendTo('#29');
    gameBoardArray[3][4] = player2_color_value_in_gameBoardArray// 1
    
    makeToken(player2_color ).appendTo('#36');
    gameBoardArray[4][3] = player2_color_value_in_gameBoardArray;//1
  	console.log(gameBoardArray);

  	////testing 
  	makeToken(player2_color ).appendTo('#35');
  	gameBoardArray[4][2] = player2_color_value_in_gameBoardArray;
    makeToken(player2_color ).appendTo('#27');
  	gameBoardArray[3][2] = player2_color_value_in_gameBoardArray;
  	makeToken(player2_color ).appendTo('#38');
  	gameBoardArray[4][5] = player2_color_value_in_gameBoardArray;

}
//step 2 making the disc with class disc and class color; and disable all the boxs to click.
function makeToken(playerColor){
	return $('<div>', {class: 'transparent_disc'}).addClass(playerColor);
}	

//step 3 findout which player's turn
function player_turn(){
	if(clickTime % 2 === 0 && clickTime < 60){
		playerTurn = 'player1'; // even 
		// clickTime ++; 

	}else{
		if(clickTime < 60){
		playerTurn = 'player2'; // odd
		// clickTime ++; 
		}
	}
}

//step 4 mouseover the disc container of player choice; 

function boxClick(){
    player_turn()// findout the player turn; 
    if(playerTurn === 'player1'){
    	///step 5
    	horizontalRight(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	horizontalLeft(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green')
    	clickTime++;

    }else{
      playerTurn === 'player2'
          	horizontalRight(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	clickTime++;

    }
}
//step 5
function getConatinerRowAndCol(element){
   containerRow = Number($(element).attr('row')); 
   containerCol = Number($(element).attr('col'));

}
//step 6
function horizontalRight(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < (8-containerCol); i ++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow][containerCol+i] !== playerValueInGBA && gameBoardArray[containerRow][containerCol+i] !== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow][containerCol+i]);
                console.log(changableDiscForPlayer);
                changableBoxLocationInGBA.push(containerRow);
                changableBoxLocationInGBA.push(containerCol+i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow][containerCol+i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
                		for(var j = 0; j < changableDiscForPlayer.length; j++){
                			changableDiscForPlayer[j].find('.transparent_disc').addClass(addClass).removeClass(removeClass);
                			console.log(changableBoxLocationInGBA);
                			for(var z = 0; z < changableBoxLocationInGBA.length/2; z++){
                				    var row = changableBoxLocationInGBA[z];
                				    var col = changableBoxLocationInGBA[z+1];
                				    changableBoxLocationInGBA.splice(0,2); 
                				    z--;

              						gameBoardArray[row][col] = playerValueInGBA

              					    console.log(gameBoardArray)
    						}
    						gameBoardArray[containerRow][containerCol] = playerValueInGBA;	
                		}
                	

                	}
    			//keep looking 
    			return;

    		}
    	}
}

function horizontalLeft(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < containerCol ; i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow][containerCol-i] !== playerValueInGBA && gameBoardArray[containerRow][containerCol-i] !== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow][containerCol-i]);
                changableBoxLocationInGBA.push(containerRow);
                changableBoxLocationInGBA.push(containerCol-i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow][containerCol-i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
                		for(var j = 0; j < changableDiscForPlayer.length; j++){
                			changableDiscForPlayer[j].find('.transparent_disc').addClass(addClass).removeClass(removeClass);
                			console.log(changableBoxLocationInGBA);
                			for(var z = 0; z < changableBoxLocationInGBA.length/2; z++){
                				    var row = changableBoxLocationInGBA[z];
                				    var col = changableBoxLocationInGBA[z+1];
                				    changableBoxLocationInGBA.splice(0,2); 
                				    z--;

              						gameBoardArray[row][col] = playerValueInGBA

              					    console.log(gameBoardArray)
    						}
    						gameBoardArray[containerRow][containerCol] = playerValueInGBA;	
                		}
                	

                	}
    			//keep looking 
    			return;

    		}
    	}
}
























//////////////////////////////////////////////////////////////////////////
// function horizontalClickRight(){
      

	// for( var rowIndex=0 ; rowIndex < 8; rowIndex++){ // index = 0 
 //        for(var colIndex = 0; colIndex < 8; colIndex++){
 //        	gameBoardArray[rowIndex][colIndex];
 //        	if(gameBoardArray[rowIndex][colIndex] === 2 ){ // local the black 
	// 			colIndex++; // nestedArrayIndex = 1;
 // 				if(gameBoardArray[rowIndex][colIndex]  === 1 ){ //nestedArrayIndex = 1; 
 //                     colIndex++;  // discBoxIndex = 2; 
 //                     if(gameBoardArray[rowIndex][colIndex] === 1){
 //                        colIndex++;  // nestedArrayIndex = 3 

 //                     }else{ // mainArrayIndex[nestedArrayIndex] = 0; 
 //                       box_click(this);
 //                       gameBoardArray[rowIndex][colIndex] = 2; 
 //                       gameBoardArray[rowIndex][colIndex-1] = 2;
 //                       boardTokenArray[rowIndex][colIndex-1].find('.transparent_disc').removeClass('green').addClass('black');

 //                     }


 //                }else{
 //                    return; // look to the left
 // 				}
 //        	}
 //        }
      
	// }
// }

//////////////////////////////////////////////////////////////////
// function switchColor(){

// }
// function verticalClick(){

// }


