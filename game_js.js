 function loadImage() {
 	 virus_image = new Image;
 	 virus_image.src ="v1.png"
 	 player_img=new Image;
 	 player_img.src="superhero.png";
 	 gem_image = new Image;
 	 gem_image.src="gemm.png";
 	 
 }
 function init()
 {
 	// DOM Tree Traversal to find an element
 	canvas=document.getElementById("myCanvas");
    console.log(canvas);
    //change the height and breadth
    W= 700;
    H= 400;
    canvas.height=H;
    canvas.width=W;

    pen = canvas.getContext('2d');
    console.log(pen); 
    score=0;
    game_over=false;
// we want to create a box
    e1={
	    x: 150,
	    y: 50,
	    w: 60,
	    h: 60,
	    speed:20,
    };
    e2={
	    x: 300,
	    y: 150,
	    w: 60,
	    h: 60,
	    speed:25,
    };
    e3={
	    x: 450,
	    y: 20,
	    w: 60,
	    h: 60,
	    speed:30,
    };
    enemy =[e1,e2,e3];
    player={
    	x:20,
    	y:H/2,
    	w:60,
    	h:60,
    	speed: 20,
    	moving : "false"
    };
    gem={
    	x:W-100,
    	y:H/2,
    	w:60,
    	h:60,
    };
    
    //create an event listener
    canvas.addEventListener('mousedown',function(){
		
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){

		player.moving = false;
	});
 }
 function draw()
 {
 	pen.clearRect(0,0,W,H);
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
 	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
 	pen.fillStyle="red";
    pen.fillStyle="white";
    pen.fillText("Score "+score,10,10);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }    
 }
 
 
 function isColliding(b1,b2)
 {
 	if(Math.abs(b1.x-b2.x)<=30 && Math.abs(b1.y-b2.y)<=30)
 	{
 		return true;
 	}
 	return false;
 }
 //game loop
 function update() {
 	if(player.moving==true && player.x<=gem.x)
 	{
 		player.x+=player.speed;
 		if(game_over==false){
 		    score+=20;
 		}    
 	}
 	for(let i=0;i<enemy.length;i++)
    {
 	    if(isColliding(enemy[i],player))
 	    {
 		    score-=i*100;
 		    if(score<0)
 		    {
 			    game_over=true;
 			    //alert("Game over");
 			   
 		    }
 	    }
    }
    //between gem and player
 	if(isColliding(gem,player))
 	{
 		game_over=true;
 		draw();
 		
 	}
 	for(let i=0;i<enemy.length;i++){
 	    enemy[i].y+=enemy[i].speed;
 	    if(enemy[i].y>(H-enemy[i].h)||enemy[i].y<0)
 	    {
 		    enemy[i].speed*=-1;
 	    }
     }	
 }
 function gameloop(){

 	if(game_over==true)
 	{
 		alert("Game over\nYour score "+score);
 		clearInterval(f);
 	}
 	draw();
 	update();
 }
 loadImage();
 init();
 var f=setInterval(gameloop,100);
	
