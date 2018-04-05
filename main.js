$(document).ready(intiApp);
var gameBoardArray = [];
var boardTokenArray = [];
var divNum; // the number that represents the disc_container  
var boxNum = 0;
var clickTime = 0;



function intiApp(){
	create_board()
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
		console.log(boardTokenArray);
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
			makeToken('black').appendTo(element);
			clickTime++;
			gameBoardArray[boxRow][boxCol] = 2
			$(element).off('click'); //disables click after black disc is formed 


		}else{
			if(clickTime < 60){
			divNum = $(element).data('boxNumber');
			makeToken('green').appendTo(element);
			}
			clickTime++;
			gameBoardArray[boxRow][boxCol] = 1
			$(element).off('click');        //disables click after white disc is formed
		}
	
	// var disc = $(this).addClass('black');
	console.log(divNum);
	console.log(gameBoardArray)
}





function horizontalClickRight(){
	
	for( var rowIndex=0 ; rowIndex < 8; rowIndex++){ // index = 0 
        for(var colIndex = 0; colIndex < 8; colIndex++){
        	gameBoardArray[rowIndex][colIndex];
        	if(gameBoardArray[rowIndex][colIndex] === 2 ){ // local the black 
				colIndex++; // nestedArrayIndex = 1;
 				if(gameBoardArray[rowIndex][colIndex]  === 1 ){ //nestedArrayIndex = 1; 
                     colIndex++;  // discBoxIndex = 2; 
                     if(gameBoardArray[rowIndex][colIndex] === 1){
                        colIndex++;  // nestedArrayIndex = 3 

                     }else{ // mainArrayIndex[nestedArrayIndex] = 0; 
                       box_click(this);
                       gameBoardArray[rowIndex][colIndex] = 2; 
                       gameBoardArray[rowIndex][colIndex-1] = 2;
                       boardTokenArray[rowIndex][colIndex-1].find('.transparent_disc').removeClass('green').addClass('black');

                     }


                }else{
                    return; // look to the left
 				}
        	}
        }

		// if(nestedArrInGBA[arrayIndex]=2){ //nestedArrInGBA[0];
		// 	if(gameBoardArray[arrayIndex+1] !== 2 && gameBoardArray[arrayIndex+1] === 1){ // to the right 
		// 		arrayIndex+2// we want to move over 2 from the current position of that player 
		// 	} else if (gameBoardArray[arrayIndex+1] === 0 && ){ 
		// 		//break
		// 	}
		// }
      
	}
}


function switchColor(){

}
// function verticalClick(){

// }


