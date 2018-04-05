$(document).ready(intiApp);
var gameBoardArray = [];
var boardTokenArray = [];
var divNum; // the number that represents the disc_container  
var boxNum = 0;
var clickTime = 0;
var containerCol;
var containerRow;
var currentBoxLocation; 



function intiApp(){
	create_board();
	definePlayerTurn();
	// checkBoxReliability();
	$('.disc_container').on('click', horizontalClickRight);// box_click is when game stars
	$('#28').off('click');
	$('#37').off('click');
	$('#29').off('click');
	$('#36').off('click');
}

function create_board(){
	for(var nestedArr = 0; nestedArr < 8; nestedArr++ ){
		var nestedArrSet  = [];
		boardTokenArray[nestedArr] = [];
        gameBoardArray.push(nestedArrSet);
		for(var arrItem = 0; arrItem < 8; arrItem++){
			nestedArrSet.push(0);
			boxNum ++;
			var disc_container = $('<div>', {
				class: 'disc_container', 
				attr: {
					row: nestedArr, //row location of the disc container 
					col: arrItem    // col location of the disc container
				},
				id: boxNum 
			}).appendTo('#game-area').data('boxNumber', boxNum );
			disc_container.text(boxNum);
			boardTokenArray[nestedArr][arrItem] = disc_container;
			console.log(boardTokenArray);
      		

		}
	}
	makeToken('black').appendTo('#28');
    gameBoardArray[3][3] = 2
    makeToken('black').appendTo('#37');
    // $('<div>', {class: 'transparent_disc black'}) is equail to makeToken('black').
    gameBoardArray[4][4] = 2
     makeToken('green').appendTo('#29');
    gameBoardArray[3][4] = 1
    
    makeToken('green').appendTo('#36');
    gameBoardArray[4][3] = 1;   
  	console.log(gameBoardArray);
}

function makeToken(color){
	return $('<div>', {class: 'transparent_disc'}).addClass(color);
}	



function box_click(element){ // box_click is when game stars.... element is the box that clicked 
		if(clickTime % 2 === 0 && clickTime < 60){
			boxRow = $(element).attr('row'); //element is the equail to this. which refer to the actually disc container that is clikced
			boxCol = $(element).attr('col');
			makeToken('black').appendTo(element);  // place the disc in black to the disc container 
			clickTime++;
			gameBoardArray[boxRow][boxCol] = 2;
			$(element).off('click'); //disables click after black disc is formed 

		}else{
			if(clickTime < 60){
			divNum = $(element).data('boxNumber');
			makeToken('green').appendTo(element);
			}
			clickTime++;
			gameBoardArray[boxRow][boxCol] = 1;	
			$(element).off('click');        //disables click after white disc is formed
		}
	
	// var disc = $(this).addClass('black');
	// console.log(divNum);
	console.log(gameBoardArray)
}



/// function to check for the color in player's turn; 
function definePlayerTurn(){
	if(clickTime % 2 === 0 && clickTime < 60){ //clickTime is equal to even 
        // player 1 turn 
        checkColorInPlayerTurn('black');

 
   }else {
       // player 2 turn
        checkColorInPlayerTurn('green');
   }
}


function checkColorInPlayerTurn(color){
	for(var r = 0; r < 8; r++){
		for(var c = 0; c < 8; c++){
			if(boardTokenArray[r][c].find('.transparent_disc').hasClass(color)){
				containerRow = boardTokenArray[r][c].attr('row');  /// r =3; c =3; 
				containerCol = boardTokenArray[r][c].attr('col');
				checkBoxReliability();
				return;
				// look for boxs that are able to click. make a function that are 
			}
		}
	}
}

function checkBoxReliability(){
     currentBoxValue = gameBoardArray[containerRow][containerCol]; /// currentBoxValue =2;
     ////////Horizontal check 
     for(var i = containerCol ; i > 0; i--){ // i = 3, i > 0; i-- 3,2,1,0
     var leftOfTheCurrentBox = gameBoardArray[containerRow][i-1]; //checking to the left   //2, 1, 0
     var rightOfTheCurrentBox = gameBoardArray[containerRow][i+1]; // checking to the right 
          if(leftOfTheCurrentBox !== currentBoxValue && leftOfTheCurrentBox !== 0){
          	

              // leftOfTheCurrentBox = gameBoardArray[containerRow][i-1];
              // console.log(leftOfTheCurrentBox);
         
          }else{
          	return;
          }
     }





}

//////////////////////////////////////////////////////////////////////////
function horizontalClickRight(){
      

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
}

//////////////////////////////////////////////////////////////////
// function switchColor(){

// }
// function verticalClick(){

// }


