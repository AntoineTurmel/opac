var block_img_src = "images/blocks/crate.png";
var empty_img_src = "images/blocks/empty.png";
var ghost_img_src = "images/blocks/ghost.png";
var eaterR_img_src = "images/blocks/eaterR.png";
var eaterL_img_src = "images/blocks/eaterL.png";

document.onkeydown = applyKey;

/*
KEY_DOWN	= 40;
KEY_UP		= 38;
KEY_LEFT	= 37;
KEY_RIGHT	= 39;
*/

// Initial position of blocks at the center
var position_left = 2; 
var position_right = 3;
var nb_coup = 0;

k = 0; // Counter for blocks fall (15 lines)





function applyKey (e){ // (a switch case would be better)
    if (e.keyCode == 38) {
        rotate_block();
    }
    else if(e.keyCode == 39){
         right_block();   
    }
    else if(e.keyCode == 37){
         left_block();   
    }
}

var next_block = {
    img:  [
            [ghost_img_src,empty_img_src],
            [ghost_img_src,ghost_img_src]
          ],
};

var current_block = {
    img:  [
            [block_img_src,empty_img_src],
            [block_img_src,block_img_src]
          ],
};

var old_block = {
    img:[
          [empty_img_src,empty_img_src],
          [empty_img_src,empty_img_src]
        ],
};

function rotate_block() {
    old_block.img[0][0] = current_block.img[0][0];
    old_block.img[0][1] = current_block.img[0][1];
    old_block.img[1][0] = current_block.img[1][0];
    old_block.img[1][1] = current_block.img[1][1];
        
    current_block.img[0][0] = old_block.img[0][1];
    current_block.img[0][1] = old_block.img[1][1];
    current_block.img[1][0] = old_block.img[0][0];
    current_block.img[1][1] = old_block.img[1][0];
}

function right_block() {
    if(position_right<5 || position_left < 4)
    {
        position_left++;
        position_right++;
        document.getElementById("block_" + (k) + (position_left-1)).src = empty_img_src;
        document.getElementById("block_" + (k-1) + (position_left-1)).src = empty_img_src;
    }

}

function left_block() {
    if(position_right >1 || position_left > 0)
    {
        position_left--;
        position_right--;
        document.getElementById("block_" + (k) + (position_right+1)).src = empty_img_src;
        document.getElementById("block_" + (k-1) + (position_right+1)).src = empty_img_src;
    }
}


function init_next_block()
{
    // display next block
    document.getElementById("next_block_00").src = next_block.img[0][0];
    document.getElementById("next_block_01").src = next_block.img[0][1];
    document.getElementById("next_block_10").src = next_block.img[1][0];
    document.getElementById("next_block_11").src = next_block.img[1][1];  
}

function random_next_block()
{
	// trois block possible :  1 boite, 2 fantome, ou 3 pacman
	// le pacman ne peut être présent qu'une fois par "Next block" et il n'est disponible tout les 3 coups (P,B,B,P,B,B,P,...) , le pacman peut apparaitre seul.
	// le block en haut à gauche (next_block.img[0][1]) est toujours égal à empty
	//-----------------------------------------------------------
	
	function attribute_block() // this fonction return a ghost or a block
	{	
		if((Math.floor((2)*Math.random()+1)) == 1)
			return ghost_img_src;
		else
			return block_img_src;
	}
	
	if(nb_coup < 2) // generate random block with ghost/block
	{	
		random_block = { img:  [[attribute_block(),empty_img_src],[attribute_block(),attribute_block()] ],};
		nb_coup++;
	}
	else // generate random block with eater and ghost/block  
	{
		var eater_block;
		
		if((Math.floor((2)*Math.random()+1)) == 1) // initiate random left or right eater	
			eater_block = eaterL_img_src;
		else
			eater_block = eaterR_img_src;
		
		var random13 = Math.floor((3)*Math.random()+1); // random variable bewteen 1 and 3
		
		if(random13 == 1) // initiate a random position for the eater (a switch case would be better)
			random_block = { img:  [[eater_block,empty_img_src],[attribute_block(),attribute_block()]],};
		else if(random13 == 2)
			random_block = { img:  [[attribute_block(),empty_img_src],[eater_block,attribute_block()]],};
		else
			random_block = { img:  [[attribute_block(),empty_img_src],[attribute_block(),eater_block]],};
		
		nb_coup = 0; // reset the eater count
	}
	return random_block;	
}

init_next_block();


var block_img = new Array(); // for the display
var blocks = new Array(); // for the location
	
for (j = 0; j < 15; j++){
    
    for (i = 0; i < 6; i++)
    {
        blocks[i,j] = 0; /* 0 : empty , 1 : block , 2 : ghost , 3 : eater */
		
		block_img[i,j] = document.createElement("img");
        block_img[i,j].setAttribute("id","block_" + j + i);
        block_img[i,j].setAttribute("src", empty_img_src);
        
        game_board_div = document.getElementById("game_board");
        
        game_board_div.appendChild(block_img[i,j]);
        game_board_div.appendChild(block_img[i,j]);
    }
}

function ingame(){

	var timing = setInterval(function()
	{
   
		// clearing
		
		// check if we are on first line
		if (k != 0)
		{
		  document.getElementById("block_" + (k - 1) + position_left).src = empty_img_src;
		  document.getElementById("block_" + (k - 1) + position_right).src = empty_img_src;
		}
		document.getElementById("block_" + (k) + position_left).src = empty_img_src;
		document.getElementById("block_" + (k) + position_right).src = empty_img_src;
		// display        
		document.getElementById("block_" + k + position_left).src = current_block.img[0][0];
		document.getElementById("block_" + k + position_right).src = current_block.img[0][1];
		document.getElementById("block_" + (k + 1) + position_left).src = current_block.img[1][0];
		document.getElementById("block_" + (k + 1) + position_right).src = current_block.img[1][1];   

		

		k++;
		
		//if (k == 14)
		if(k == 14 /*|| ((document.getElementById("block_" + (k + 2) + position_right).src || document.getElementById("block_" + (k + 2) + position_left).src)  !="file:///C:/Users/Clemaul/MES%20VRAI%20DOCUMENTS/opac/images/blocks/empty.png" )*/)
		{
			
			
			
			clearInterval(timing);
			
			k=0;
			
			current_block = next_block;
			next_block = random_next_block();

			init_next_block();

			position_left = 2; 
			position_right = 3;

			ingame();
		}
		
	},0200);
}


ingame();
