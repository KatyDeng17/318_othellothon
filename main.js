$(document).ready(intiApp);
var gameBoardArray = [];
var divNum; // the number that represents the disc_container  
var boxNum;
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
	for(var i = 0; i <64; i++ ){
		gameBoardArray.push(0);
		console.log(gameBoardArray);
		boxNum = i+1;
		var disc_container = $('<div>', {class: 'disc_container', id: boxNum }).appendTo('#game-area').data('boxNumber', boxNum );
		disc_container.text(boxNum);
  
		}

    $('<div>', {class: 'transparent_disc black'}).appendTo('#28');
    gameBoardArray[28-1] = 2
    $('#28').off('click');
    $('<div>', {class: 'transparent_disc black'}).appendTo('#37');
    gameBoardArray[37-1] = 2
    $('#37').off('click');
    $('<div>', {class: 'transparent_disc white'}).appendTo('#29');
    gameBoardArray[29-1] = 1
    $('#29').off('click');
    $('<div>', {class: 'transparent_disc white'}).appendTo('#36');
    gameBoardArray[36-1] = 1
    $('#36').off('click');


     console.log(gameBoardArray); 

}

function box_click(){ // box_click is when game stars


		if(clickTime % 2 === 0 && clickTime < 60){
			divNum = $(this).data('boxNumber');
			$('<div>', {class: 'transparent_disc black'}).appendTo(this);
			clickTime++;
			gameBoardArray[divNum-1] = 2

			$(this).off('click');


		}else{
			if(clickTime < 60){
			divNum = $(this).data('boxNumber');
			$('<div>', {class: 'transparent_disc white'}).appendTo(this);
			}
			clickTime++;
			gameBoardArray[divNum-1] = 1
		}
	
	// var disc = $(this).addClass('black');
	console.log(divNum);
	console.log(gameBoardArray)
}

function horizontalClick(num){
      
}

function verticalClick(){

}



