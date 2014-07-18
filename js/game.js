var block_img_src = "images/blocks/crate.png";
var empty_img_src = "images/blocks/empty.png";
var ghost_img_src = "images/blocks/ghost.png";

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

k = 0; // Counter for blocks fall (15 lines)


function applyKey (e){
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

init_next_block();


var block_img = new Array();

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
    
        var timing = setInterval(function(){
       
        // clearing
        
        // check if we are on first line
        if (k != 0) {
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
            
            if (k == 14) {
                clearInterval(timing);
                
                k=0;
                
                var temp_block = current_block;
                current_block = next_block;
                next_block = temp_block;

                init_next_block();
                ingame();
            }
            
        },0200);
    }


ingame();
