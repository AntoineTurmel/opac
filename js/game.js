var block_img_src = "images/blocks/crate.png";
var empty_img_src = "images/blocks/empty.png";
var ghost_img_src = "images/blocks/ghost.png";
var eaterR_img_src = "images/blocks/eaterR.png";
var eaterL_img_src = "images/blocks/eaterL.png";

var folder = "images/blocks/";
var extension = ".png";

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
  type:  [
    ["ghost","empty"],
    ["ghost","ghost"]
  ],
};

var current_block = {
  type:  [
    ["crate","empty"],
    ["crate","crate"]
  ],
};

var old_block = {
  type:[
    ["empty","empty"],
    ["empty","empty"]
  ],
};

function rotate_block() {
  old_block.type[0][0] = current_block.type[0][0];
  old_block.type[0][1] = current_block.type[0][1];
  old_block.type[1][0] = current_block.type[1][0];
  old_block.type[1][1] = current_block.type[1][1];

  current_block.type[0][0] = old_block.type[0][1];
  current_block.type[0][1] = old_block.type[1][1];
  current_block.type[1][0] = old_block.type[0][0];
  current_block.type[1][1] = old_block.type[1][0];
}

function right_block() {
  if(position_right<5 || position_left < 4)
  {
    position_left++;
    position_right++;
    //display
    document.getElementById("block_" + (k) + (position_left-1)).src = empty_img_src;
    document.getElementById("block_" + (k-1) + (position_left-1)).src = empty_img_src;
    //location
    blocks[position_left - 1 ][ k ] = "empty";
    blocks[position_left - 1 ][ k - 1 ] = "empty";
  }

}

function left_block() {
  if(position_right >1 || position_left > 0)
  {
    position_left--;
    position_right--;
    //display
    document.getElementById("block_" + ( k ) + (position_right + 1 )).src = empty_img_src;
    document.getElementById("block_" + ( k - 1 ) + (position_right + 1 )).src = empty_img_src;
    //location
    blocks[position_right + 1 ][ k ] = "empty";
    blocks[position_right + 1 ][ k - 1 ] = "empty";
  }
}


function init_next_block()
{
  // display next block
  document.getElementById("next_block_00").src = folder + next_block.type[0][0] + extension;
  document.getElementById("next_block_01").src = folder + next_block.type[0][1] + extension;
  document.getElementById("next_block_10").src = folder + next_block.type[1][0] + extension;
  document.getElementById("next_block_11").src = folder + next_block.type[1][1] + extension; 
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
      return "ghost";
    else
      return "crate";
  }

  if(nb_coup < 2) // generate random block with ghost/block
  {	
    random_block = { type:  [[attribute_block(),"empty"],[attribute_block(),attribute_block()] ],};
    nb_coup++;
  }
  else // generate random block with eater and ghost/block  
  {
    var eater_block;

    if((Math.floor((2)*Math.random()+1)) == 1) // initiate random left or right eater	
      eater_block = "eaterL";
    else
      eater_block = "eaterR";

    var random13 = Math.floor((3)*Math.random()+1); // random variable bewteen 1 and 3

    if(random13 == 1) // initiate a random position for the eater (a switch case would be better)
      random_block = { type:  [[eater_block,"empty"],[attribute_block(),attribute_block()]],};
    else if(random13 == 2)
      random_block = { type:  [[attribute_block(),"empty"],[eater_block,attribute_block()]],};
    else
      random_block = { type:  [[attribute_block(),"empty"],[attribute_block(),eater_block]],};

    nb_coup = 0; // reset the eater count
  }
  return random_block;
}

init_next_block();


var block_img = new Array(); // for the display


// initiate the blocks location matrice


var blocks = new Array();

for(var i=0; i<7; i++)
   blocks[i] = new Array();

for(var i=0; i<7; i++)
   for(var j=0; j<16; j++)
      blocks[i][j] = "empty"; /*  this array can take the string : empty, crate, ghost , eaterL, eaterR */
      
      


for (j = 0; j < 15; j++){

  for (i = 0; i < 6; i++)
  {

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
      
      blocks[ position_left ][ (k - 1) ] = "empty";
      blocks[ position_right ][ (k - 1) ] = "empty";
    }
    document.getElementById("block_" + (k) + position_left).src = empty_img_src;
    document.getElementById("block_" + (k) + position_right).src = empty_img_src;
    // display        
    document.getElementById("block_" + k + position_left).src = folder + current_block.type[0][0] + extension;
    document.getElementById("block_" + k + position_right).src = folder + current_block.type[0][1] + extension;
    document.getElementById("block_" + (k + 1) + position_left).src = folder + current_block.type[1][0] + extension;
    document.getElementById("block_" + (k + 1) + position_right).src = folder + current_block.type[1][1] + extension;
    
    
    blocks[position_left ][ k ] = "empty";
    blocks[ position_right ][ k] = "empty";
    // location 
    blocks[ position_left ][ k ] = current_block.type[0][0];
    blocks[ position_right ][ k ] = current_block.type[0][1];
    blocks[ position_left ][ (k + 1) ] = current_block.type[1][0];
    blocks[ position_right ][ (k + 1) ] = current_block.type[1][1];

    
    k++;
    
    //alert(blocks[ position_left ][ (k + 1) ]+" - "+blocks[ position_right ][ (k + 1) ]); // debug, showing the two block under current block in real time


    // We check if we are at the last line or if they are blocks under current blocks
    if( k == 14 || ( blocks[ position_left ][ (k + 1) ] != "empty") || ( blocks[ position_right ][ (k + 1) ] != "empty" ))
    {
      
      
      //alert(blocks[ (k + 7) , position_right]); // debug
      
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
