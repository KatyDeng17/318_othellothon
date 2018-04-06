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



function intiApp(){
	//step1 create a 8x8 board; 
	create_board();
	$('.disc_container').click(boxClick);
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

}
//step 2 making the disc with class disc and class color; and disable all the boxs to click.
function makeToken(playerColor){
	return $('<div>', {class: 'transparent_disc'}).addClass(playerColor);
}	

//step 3 findout which player's turn
function player_turn(){
	if(clickTime % 2 === 0 && clickTime < 60){
		playerTurn = 'player1'; // even 

	}else{
		if(clickTime < 60){
		playerTurn = 'player2'; // odd
		}
	}
}

//step 4 mouseover the disc container of player choice; 
function boxClick(){
    player_turn()// findout the player turn; 
    if(playerTurn === 'player1'){
    	///step 5
    	horizontalRight(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	horizontalLeft(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	verticalUp(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	verticalDown(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	diagonalNE(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	diagonalSW(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	diagonalNW(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    	diagonalSE(this, player1_color_value_in_gameBoardArray, player1_color,'black', 'green');
    

    }else{
      playerTurn === 'player2'
          	horizontalRight(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	horizontalLeft(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	verticalUp(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	verticalDown(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	diagonalNE(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	diagonalSW(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	diagonalNW(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black');
          	diagonalSE(this, player2_color_value_in_gameBoardArray, player2_color,'green', 'black'); 

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
                		if(!$(element).children().length){ // element = this; if things inside the box is not 0, 
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;
                		}
                		
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
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
 							$(element).off();
                		    clickTime++;
                		}
                		// makeToken(playerColor).off('click');
                		// makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
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

function verticalUp(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < containerRow ; i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow-i][containerCol] !== playerValueInGBA && gameBoardArray[containerRow-i][containerCol] !== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow-i][containerCol]);
                changableBoxLocationInGBA.push(containerRow-i);
                changableBoxLocationInGBA.push(containerCol);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow-i][containerCol] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).off('click');
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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

function verticalDown(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < (8-containerRow) ; i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow+i][containerCol] !== playerValueInGBA && gameBoardArray[containerRow+i][containerCol] !== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow+i][containerCol]);
                changableBoxLocationInGBA.push(containerRow+i);
                changableBoxLocationInGBA.push(containerCol);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow+i][containerCol] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).off('click');
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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

function diagonalNE(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < containerRow+1 ; i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow-i][containerCol+i] !== playerValueInGBA && gameBoardArray[containerRow-i][containerCol+i]!== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow-i][containerCol+i]);
                changableBoxLocationInGBA.push(containerRow-i);
                changableBoxLocationInGBA.push(containerCol+i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow-i][containerCol+i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element)// place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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

function diagonalSW(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < (8-containerRow); i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow+i][containerCol-i] !== playerValueInGBA && gameBoardArray[containerRow+i][containerCol-i]!== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow+i][containerCol-i]);
                changableBoxLocationInGBA.push(containerRow+i);
                changableBoxLocationInGBA.push(containerCol-i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow+i][containerCol-i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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

function diagonalNW(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < containerRow; i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow-i][containerCol-i] !== playerValueInGBA && gameBoardArray[containerRow-i][containerCol-i]!== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow-i][containerCol-i]);
                changableBoxLocationInGBA.push(containerRow-i);
                changableBoxLocationInGBA.push(containerCol-i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow-i][containerCol-i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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

function diagonalSE(element, playerValueInGBA, playerColor,addClass, removeClass){ //GBA = gameBoardArray
      	getConatinerRowAndCol(element);
    	var changableDiscForPlayer = [];
    	var changableBoxLocationInGBA =[];
    	for(var i = 1; i < (8-containerRow); i++){ //if containerCol = 3; i < 3 next box will be 4; 5, 6, 7
    		if(gameBoardArray[containerRow+i][containerCol+i] !== playerValueInGBA && gameBoardArray[containerRow+i][containerCol+i]!== emty_splace){ // i =1
       			changableDiscForPlayer.push(boardTokenArray[containerRow+i][containerCol+i]);
                changableBoxLocationInGBA.push(containerRow+i);
                changableBoxLocationInGBA.push(containerCol+i);
               
                }else{
                	if(changableDiscForPlayer.length > 0 && gameBoardArray[containerRow+i][containerCol+i] === playerValueInGBA){
                		$(element).css("border-color",'pink');
                		if(!$(element).children().length){
                			// console.log($(element).children());
                		    makeToken(playerColor).appendTo(element).off('click'); // place the disc of black color in the box;
                		    $(element).off();
                		    clickTime++;

                		}
                		// makeToken(playerColor).appendTo(element); // place the disc of black color in the box;
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


function winModal() {
	var eggLoader = $('<div>').addClass('loader');

	for(var i=0; i<=28; i++) {
		var image = $('<div>');
		eggLoader.append(image);
	}

	$('.eggContainer').append(eggLoader);
	
	var playerWon;
	if (clickTime % 2) {
		playerWon = 'Player 1 wins!'
	} else {
		playerWon = 'Player 2 wins!'
	}
	setTimeout(function() {
		$('.winText').css('display', 'block').text(playerWon);
	}, 4000)
}

