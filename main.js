$(document).ready(intiApp);
var gameBoardArray = [];
var divNum; // the number that represents the disc_container  
var boxNum = 0;
var clickTime = 0;



function intiApp(){
	create_board()
	$('.disc_container').on('click',box_click);// box_click is when game stars
	$('#28').off('click');
	$('#37').off('click');
	$('#29').off('click');
	$('#36').off('click');
}

function create_board(){
	for(var nestedArr = 0; nestedArr < 8; nestedArr++ ){
		var nestedArrSet  = [];
        gameBoardArray.push(nestedArrSet);
		for(var arrIterm = 0; arrIterm < 8; arrIterm++){
			nestedArrSet.push(0);
			boxNum += 1;
			var disc_container = $('<div>', {class: 'disc_container', id: boxNum }).appendTo('#game-area').data('boxNumber', boxNum );
      		disc_container.text(boxNum);

		}
	}
	$('<div>', {class: 'transparent_disc black'}).appendTo('#28');
    gameBoardArray[3][3] = 2
    // $('#28').off('click');
    $('<div>', {class: 'transparent_disc black'}).appendTo('#37');
    gameBoardArray[4][4] = 2
    // $('#37').off('click');
    $('<div>', {class: 'transparent_disc white'}).appendTo('#29');
    gameBoardArray[3][4] = 1
    // $('#29').off('click');
    $('<div>', {class: 'transparent_disc white'}).appendTo('#36');
    gameBoardArray[4][3] = 1;
    // $('#36').off('click');
  	console.log(gameBoardArray);
}

// function create_board(){
// 	for(var i = 0; i <64; i++ ){
// 		// gameBoardArray.push(0);
// 		console.log(gameBoardArray);
// 		boxNum = i+1;
// 		var disc_container = $('<div>', {class: 'disc_container', id: boxNum }).appendTo('#game-area').data('boxNumber', boxNum );
// 		disc_container.text(boxNum);
  
// 		}

//     $('<div>', {class: 'transparent_disc black'}).appendTo('#28');
//     gameBoardArray[28-1] = 2
//     // $('#28').off('click');
//     $('<div>', {class: 'transparent_disc black'}).appendTo('#37');
//     gameBoardArray[37-1] = 2
//     // $('#37').off('click');
//     $('<div>', {class: 'transparent_disc white'}).appendTo('#29');
//     gameBoardArray[29-1] = 1
//     // $('#29').off('click');
//     $('<div>', {class: 'transparent_disc white'}).appendTo('#36');
//     gameBoardArray[36-1] = 1
//     // $('#36').off('click');


//      console.log(gameBoardArray); 

// }

function box_click(){ // box_click is when game stars


		if(clickTime % 2 === 0 && clickTime < 60){
			divNum = $(this).data('boxNumber');
			$('<div>', {class: 'transparent_disc black'}).appendTo(this);
			clickTime++;
			gameBoardArray[divNum-1] = 2

			$(this).off('click');       //disables click after black disc is formed 


		}else{
			if(clickTime < 60){
			divNum = $(this).data('boxNumber');
			$('<div>', {class: 'transparent_disc white'}).appendTo(this);
			}
			clickTime++;
			gameBoardArray[divNum-1] = 1
			$(this).off('click');        //disables click after white disc is formed
		}
	
	// var disc = $(this).addClass('black');
	console.log(divNum);
	console.log(gameBoardArray)
}

function horizontalClick(num){
	for( var arrayIndex=0 ; arrayIindex<8; arrayIndex++){
		if(gameBoardArray[arrayIndex]=2){
			if(gameBoardArray[arrayIndex+1] !== 2 && gameBoardArray[arrayIndex+1] === 1){
				arrayIndex+2// we want to move over 2 from the current position of that player in order for player to place disc 
			} else if (gameBoardArray[arrayIndex+1] === 0 && ){ 
				//break
			}
		}
      
	}
}

function verticalClick(){

}


