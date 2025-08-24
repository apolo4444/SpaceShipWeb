WINDOW_WIDTH=1280;
WINDOW_HEIGHT=720;

VIRTUAL_WIDTH=640;
VIRTUAL_HEIGHT=360;

backgroundScroll=0;
groundScroll=0;

BACKGROUND_SCROLL_SPEED=30;
GROUND_SCROLL_SPEED=60;

BACKGROUND_LOOPING_POINT = 413

dt=1/60;

GRAVITY=20;

GAP_HEIGHT = 90

GamePlayManager={

    init: function(){
        //console.log("init");
        game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally=true;
        game.scale.pageAlignVertically=true;
        //Se inicializa la variable flagFirstMouseDown como falsa
        this.flagFirstMouseDown=false;
        this.endGame = false;

        this.x=VIRTUAL_WIDTH+32;
        this.y=0;
        this.spawnTimer=0;
        this.count=0;
        this.random=0;
        this.count2=0;
    },

    preload:function(){
        //console.log("preload");
        //cargar Fondo
        game.load.image("background","../SRC/IMAGES/space.png");
        //cargar sprites decorativos
        game.load.image("bird","../SRC/IMAGES/Rocket1.png");
        //game.load.image("ground","../SRC/IMAGES/ground.png");
        game.load.image("pipe","../SRC/IMAGES/Asteroid1.png");
        //game.load.image("pipe2","../SRC/IMAGES/pipe2.png")
        //Cargar Sonidos
        game.load.audio("hurt","../SRC/SOUNDS/hurt.wav");
        game.load.audio("jump","../SRC/SOUNDS/jump.wav");
        game.load.audio("score","../SRC/SOUNDS/score.wav");
        game.load.audio("marios_way","../SRC/SOUNDS/marios_way.mp3");
    },
    create:function(){
        //console.log("create");
        this.background=game.add.sprite(0,0,"background");
        this.background.height=game.height;
        //this.ground=game.add.sprite(0,game.height-15,"ground");
        this.bird=game.add.sprite(0,0,"bird");
        this.bird.anchor.setTo(0.5,0.5);
        this.bird.x=game.width/2;
        this.bird.y=game.height/2;
        this.bird.angle=0;
        this.bird.scale.setTo(1);
        //Opacidad del sprite
        this.bird.alpha=1;

        //Agregar sonidos
        this.loop=game.sound.add("marios_way");
        this.loop.play(); 
        
        this.jump=game.sound.add("jump");
        this.hurt=game.sound.add("hurt");
        this.score=game.sound.add("score");

       //this.showFinalMessage('Click to Start');
       
        game.input.onDown.add(this.onTap,this);
      
        //Agregar texto y puntaje
        this.currentScore = 0;
        var style = {
        font: 'bold 30pt Arial',
        fill: '#FFFFFF',
        align: 'center'
        }
   
        this.scoreText = game.add.text(game.width/2, 40, '0', style);
        this.scoreText.anchor.setTo(0.5);

       //this.spawnPipes();
       //this.pipes_grounp=[];
       this.pipes_pair=[];

    },

    spawnPipes: function(){
        //this.pipes_pair=[];
        
        for(let i=0;i<1;i++){

            this.random=game.rnd.integerInRange(100,1000);
        //this.y=0;
            
            // var pipe=game.add.sprite(this.x,this.y,"pipe");
            // this.pipes_pair[this.count]=pipe;
            // this.pipes_pair[this.count].anchor.setTo(0.5,0.5);
            
            //this.pipes_pair[i].scale.setTo(-1);
           // this.x=VIRTUAL_WIDTH+32;
           
                var pipe=game.add.sprite(this.x,this.y,"pipe");
                this.pipes_pair[this.count]=pipe;
                this.pipes_pair[this.count].anchor.setTo(0.5,0.5);
                //this.y=0;
                //this.y+=pipe.height+GAP_HEIGHT;
                this.y=(this.random);
                //this.pipes_pair[this.count].scale.setTo(1);
           
            

            this.count+=1;
        }
        //this.pipes_grounp.add(this.pipes_pair);
        //this.pipes_grounp[this.count]=this.pipes_pair;
       
        // this.pipes_pair[0]=game.add.sprite(50,(VIRTUAL_HEIGHT/2)-GAP_HEIGHT);
        // this.pipes_pair[1]=game.add.sprite(50,(VIRTUAL_HEIGHT/2)+GAP_HEIGHT);
    },

    // spawnPipes: function(){
    //     this.pipes_pair=[];
    //     this.pipes_grounp[this.count]=this.pipes_pair;
    //     for(let i=0;i<2;i++){

    //         var pipe=game.add.sprite(this.x,this.y,"pipe");
    //         this.pipes_pair[i]=pipe;
    //         this.pipes_pair[i].anchor.setTo(0.5,0.5);
    //         //this.pipes_pair[i].scale.setTo(-1);
    //        // this.x=VIRTUAL_WIDTH+32;
    //         if(i%2==0){
    //             this.y+=pipe.height+GAP_HEIGHT;
    //             this.pipes_pair[i].scale.setTo(-1);
    //         }else{
    //             this.y-=pipe.height+GAP_HEIGHT;
    //         }
    //     }
    //     //this.pipes_grounp.add(this.pipes_pair);
    //     //this.pipes_grounp[this.count]=this.pipes_pair;
    //     this.count+=1;
    //     // this.pipes_pair[0]=game.add.sprite(50,(VIRTUAL_HEIGHT/2)-GAP_HEIGHT);
    //     // this.pipes_pair[1]=game.add.sprite(50,(VIRTUAL_HEIGHT/2)+GAP_HEIGHT);
    // },

    onTap: function(){
        if(!this.flagFirstMouseDown){
            //this.tweenMollusk = game.add.tween(this.mollusk.position).to( {y: -0.001}, 5800, Phaser.Easing.Cubic.InOut, true, 0, 1000, true).loop(true);
            this.flagFirstMouseDown=true;
            
        }else{
            //this.flagFirstMouseDown=false;
            if(!this.endGame){
                this.bird.y-=10;
                this.jump.play()
            }
           
        }
        
    },

    showFinalMessage:function(msg){
        //Anula la animacion de la medusa
        //this.tweenMollusk.stop();
        //Crea un bitmap con el texto
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        //Crea un sprite con el bitmap
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var style = {
            font: 'bold 60pt Arial',
            fill: '#FFFFFF',
            align: 'center'
          }
        
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
    },

    increaseScore:function(){
        //cambia el sprite del caballo cuando agarra un diamante durante un tiempo determinado
        this.currentScore+=1;
        this.scoreText.text = this.currentScore;
        this.score.play();
    },

    getBoundsDiamond: function(currentDiamond){
        //Devuelve un rectangulo con las mismas dimenciones que los sprites
        return new Phaser.Rectangle(currentDiamond.left,currentDiamond.top,currentDiamond.width,currentDiamond.height);

    },

    isRectanglesOverlapping: function(rect1, rect2) {
        if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
            return false;
        }
        if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
            return false;
        }
        return true;
    },

    //Crea el rectangulo de nuestro caballo
    getBoundsHorse:function(){
        //el ancho debe ser siempre positivo
        var x0 = this.bird.x - Math.abs(this.bird.width)/4;
        var width = Math.abs(this.bird.width)/2;
        var y0 = this.bird.y - this.bird.height/2;
        var height = this.bird.height;
        return new Phaser.Rectangle(x0, y0,width,height);
    },

     //Crea el rectangulo de nuestro caballo
     getBoundsPipe:function(pipe){
        //el ancho debe ser siempre positivo
        var x0 = pipe.x - Math.abs(pipe.width)/4;
        var width = Math.abs(pipe.width)/2;
        var y0 = pipe.y - pipe.height/2;
        var height = pipe.height;
        return new Phaser.Rectangle(x0, y0,width,height);
    },

    parallaxEffect:function(){
        backgroundScroll = (backgroundScroll + BACKGROUND_SCROLL_SPEED * dt) % BACKGROUND_LOOPING_POINT
        //groundScroll = (groundScroll + GROUND_SCROLL_SPEED * dt) % VIRTUAL_WIDTH
        //this.background.frame+=backgroundScroll;
        this.background.tilePosition+=backgroundScroll;
        //this.ground.frame+=groundScroll;
    },

    birdMove:function(){
        this.bird.y+=GRAVITY*dt;
        
        if(this.bird.y>game.height+16){
            this.gameOver();
        }
       
    },
    pipesMove:function(){
        // if(this.pipes_grounp.len!=0){
        //     for(let i=0;i<this.pipes_grounp.len;i++){
        //         this.pipes_grounp[i].pipes_pair[0].x-=GRAVITY*dt
        //         this.pipes_grounp[i].pipes_pair[1].x-=GRAVITY*dt
        //     }
        // }
        // if(this.count>0){
        //     for(let i=0;i<this.count;i++){
        //         this.pipes_grounp[i][0].x-=GRAVITY*dt
        //         this.pipes_grounp[i][1].x-=GRAVITY*dt
        //     }
        // }
        // this.pipes_pair[0].x-=GRAVITY*dt
        // this.pipes_pair[1].x-=GRAVITY*dt
        if(this.count>0){
                 for(let i=0;i<this.count;i++){
                    
                    let pipe=this.pipes_pair[i];
                    //console.log(pipe);
                    pipe.x-=GRAVITY*dt;
                   
                    var colliderBird=this.getBoundsDiamond(this.bird);
                    var colliderPipe=this.getBoundsDiamond(pipe);
                    //var colliderPipe=this.getBoundsPipe(this.pipes_pair[i]);

                    if(pipe.visible&&this.isRectanglesOverlapping(colliderBird,colliderPipe)){
                       this.gameOver();
                       
                    }

                    if(this.count2==i&&this.bird.x>pipe.x+(pipe.width/2)){
                         this.increaseScore();
                         this.count2+=2;
                     }
                    
                    // if(this.bird.x>this.pipes_pair[i].x+(this.pipes_pair[i].width/2)){
                    //     this.increaseScore();
                    // }

                    if(pipe.x<-20){
                        pipe.visible=false;
                    }
                 }
         }
    },

    gameOver:function(){
        this.endGame=true;
        this.showFinalMessage("GameOver");
        //this.flagFirstMouseDown=false;
    },

    update:function(){
        //console.log("update");
        if(this.flagFirstMouseDown && !this.endGame){
            //this.parallaxEffect();
            this.pipesMove();
            this.birdMove();
            this.spawnTimer+=dt;
             //if(this.spawnTimer%2==0){
                 //spawnTimer=0;
                 //this.spawnPipes();
             //}
            //this.pipesMove();
            if(this.spawnTimer>7){
                //this.spawnPipes();
                this.spawnTimer=0;
                this.spawnPipes();
                //this.pipesMove();
            }
            //this.pipesMove();
           
        }
    }

}

var game= new Phaser.Game(VIRTUAL_WIDTH,VIRTUAL_HEIGHT,Phaser.AUTO);
game.state.add("gameplay",GamePlayManager);
game.state.start("gameplay");