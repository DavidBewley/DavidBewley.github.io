var app = new PIXI.Application(600, 600, { backgroundColor: 0x1099bb });
document.getElementById("view").appendChild(app.view);

var gameState = {};
var startTime = {};

const AX = 3.25;
const AY = 3.25;
const BX = 1.45;
const BY = 3.25;
const CX = 1.45;
const CY = 1.45;
const DX = 3.25;
const DY = 1.45;
const BossX = 2;
const BossY = 2;

//ArenaFloor
const arenaFloor = new PIXI.Container();
app.stage.addChild(arenaFloor);
arenaFloor.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/Floor.png')));

arenaFloor.x = app.screen.width / 2;
arenaFloor.y = app.screen.height / 2;
arenaFloor.pivot.x = arenaFloor.width / 2;
arenaFloor.pivot.y = arenaFloor.height / 2;

function addSpriteToContainer(container, sprite, x, y) {
    container.addChild(sprite);
    container.x = app.screen.width / x;
    container.y = app.screen.height / y;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
}

function addArrowSpriteToContainer(container, x, y) {
    container.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/BossArrow.png')));
    container.x = app.screen.width / x;
    container.y = app.screen.height / y;
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    if(gameState.bossArrowRotation == 1)
        container.rotation = 3.135;
    if(gameState.bossArrowRotation  == 2)
        container.rotation = 4.7;
    if(gameState.bossArrowRotation  == 3)
        container.rotation = 0;
    if(gameState.bossArrowRotation  == 4)
        container.rotation = 1.57;
}

function clearActiveSprites(){
    ringPositionA.destroy({children:true, texture:true, baseTexture:false});
    ringPositionB.destroy({children:true, texture:true, baseTexture:false});
    ringPositionC.destroy({children:true, texture:true, baseTexture:false});
    ringPositionD.destroy({children:true, texture:true, baseTexture:false});
    arrow.destroy({children:true, texture:true, baseTexture:false});

    ringPositionA = new PIXI.Container();
    ringPositionB = new PIXI.Container();
    ringPositionC = new PIXI.Container();
    ringPositionD = new PIXI.Container();
    arrow = new PIXI.Container();

    app.stage.addChild(ringPositionA);
    app.stage.addChild(ringPositionB);
    app.stage.addChild(ringPositionC);
    app.stage.addChild(ringPositionD);
    app.stage.addChild(arrow);
}

function clearNumberSprites(){
     NumberA.destroy({children:true, texture:true, baseTexture:false});
     NumberB.destroy({children:true, texture:true, baseTexture:false});
     NumberC.destroy({children:true, texture:true, baseTexture:false});
     NumberD.destroy({children:true, texture:true, baseTexture:false});
     NumberBoss.destroy({children:true, texture:true, baseTexture:false});

     NumberA = new PIXI.Container();
     NumberB = new PIXI.Container();
     NumberC = new PIXI.Container();
     NumberD = new PIXI.Container();
     NumberBoss = new PIXI.Container();

     app.stage.addChild(NumberA);
     app.stage.addChild(NumberB);
     app.stage.addChild(NumberC);
     app.stage.addChild(NumberD);
     app.stage.addChild(NumberBoss);
}

function displayGameState(gameState){
    if(gameState.phase == 1){

        arrow = new PIXI.Container();
        addArrowSpriteToContainer(arrow,2,2);
        app.stage.addChild(arrow);

        ringPositionA = new PIXI.Container();
        ringPositionB = new PIXI.Container();
        ringPositionC = new PIXI.Container();
        ringPositionD = new PIXI.Container();
               
        if(gameState.posASafe == true)
            addSpriteToContainer(ringPositionA,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),AX,AY);
        else
            addSpriteToContainer(ringPositionA,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),AX,AY);        
        if(gameState.posBSafe == true)
            addSpriteToContainer(ringPositionB,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),BX,BY);
        else
            addSpriteToContainer(ringPositionB,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),BX,BY);
        if(gameState.posCSafe == true)
            addSpriteToContainer(ringPositionC,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),CX,CY);
        else
            addSpriteToContainer(ringPositionC,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),CX,CY);
        if(gameState.posDSafe == true)
            addSpriteToContainer(ringPositionD,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),DX,DY);
        else
            addSpriteToContainer(ringPositionD,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),DX,DY);

        app.stage.addChild(ringPositionA);
        app.stage.addChild(ringPositionB);
        app.stage.addChild(ringPositionC);
        app.stage.addChild(ringPositionD);
    }   
    if(gameState.phase == 2){
        arrow = new PIXI.Container();
        addArrowSpriteToContainer(arrow,2,2);
        app.stage.addChild(arrow);

        NumberA = new PIXI.Container();
        NumberB = new PIXI.Container();
        NumberC = new PIXI.Container();
        NumberD = new PIXI.Container();
        NumberBoss = new PIXI.Container();

        if(gameState.ANumber == 1)
            addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/1.png')),AX,AY);
        if(gameState.ANumber == 2)
            addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/2.png')),AX,AY);
        if(gameState.ANumber == 3)
            addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/3.png')),AX,AY);

        if(gameState.BNumber == 1)
            addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/1.png')),BX,BY);
        if(gameState.BNumber == 2)
            addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/2.png')),BX,BY);
        if(gameState.BNumber == 3)
            addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/3.png')),BX,BY);

        if(gameState.CNumber == 1)
            addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/1.png')),CX,CY);
        if(gameState.CNumber == 2)
            addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/2.png')),CX,CY);
        if(gameState.CNumber == 3)
            addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/3.png')),CX,CY);

        if(gameState.DNumber == 1)
            addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/1.png')),DX,DY);
        if(gameState.DNumber == 2)
            addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/2.png')),DX,DY);
        if(gameState.DNumber == 3)
            addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/3.png')),DX,DY);

        if(gameState.BossNumber == 1)
            addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/1.png')),BossX,BossY);
        if(gameState.BossNumber == 2)
            addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/2.png')),BossX,BossY);
        if(gameState.BossNumber == 3)
            addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/3.png')),BossX,BossY);
       
        NumberA.interactive = true;
        NumberB.interactive = true;
        NumberC.interactive = true;
        NumberD.interactive = true;
        
        if(gameState.posAfinalAnswer)
            NumberA.on('mousedown', function (e) {
                gameState.correctAnswerFound = true;
              });
        else{
            NumberA.on('mousedown', function (e) {
                gameState.correctAnswerFound = false;
              });
        }
        if(gameState.posBfinalAnswer)
            NumberB.on('mousedown', function (e) {
                gameState.correctAnswerFound = true;
            });
        else{
            NumberB.on('mousedown', function (e) {
                gameState.correctAnswerFound = false;
              });
        }
        if(gameState.posCfinalAnswer)
            NumberC.on('mousedown', function (e) {
                gameState.correctAnswerFound = true;
            });
        else{
            NumberC.on('mousedown', function (e) {
                gameState.correctAnswerFound = false;
              });
        }
        if(gameState.posDfinalAnswer)
            NumberD.on('mousedown', function (e) {
                gameState.correctAnswerFound = true;
            });
        else{
            NumberD.on('mousedown', function (e) {
                gameState.correctAnswerFound = false;
              });
        }
        app.stage.addChild(NumberA);
        app.stage.addChild(NumberB);
        app.stage.addChild(NumberC);
        app.stage.addChild(NumberD);
        app.stage.addChild(NumberBoss);
    }
    if(gameState.phase == 3){
        clearNumberSprites();
        if(gameState.correctAnswerFound){
            correct = new PIXI.Container();
            addSpriteToContainer(correct,new PIXI.Sprite(new PIXI.Texture.from('Img/Correct.png')),3,3);
            app.stage.addChild(correct);
        }
        else{
            incorrect = new PIXI.Container();
            addSpriteToContainer(incorrect,new PIXI.Sprite(new PIXI.Texture.from('Img/Incorrect.png')),3,3);
            app.stage.addChild(incorrect);
        }
    }
}

function CreateGameStart(){
    gameState = {
        phase: 1,
        round: 1,
        posASafe:true, 
        posBSafe:false, 
        posCSafe:true, 
        posDSafe:false, 
        ANumber: 0,
        BNumber: 0,
        CNumber: 0,
        DNumber: 0,
        BossNumber: 0,
        posAfinalAnswer: false,
        posBfinalAnswer: false,
        posCfinalAnswer: false,
        posDfinalAnswer: false,
        correctAnswerFound: false,
        timer: 4000, //4000 is game like
        bossArrowRotation: Math.floor(Math.random() * 4) + 1
    }; 

    if(Math.floor(Math.random() * 2) + 1 == 1){
        gameState.posASafe = false;
        gameState.posBSafe = true;
        gameState.posCSafe = false;
        gameState.posDSafe = true;
    }

    displayGameState(gameState);
    console.log(gameState);
    startTime = +new Date();
}
CreateGameStart();

function updateGameState(){
    if(gameState.phase == 3){ 
        gameState.phase = 4;      
    }    
    if(gameState.phase == 2){
        gameState.phase = 3;
        gameState.timer = 5000; //reset
        console.log(gameState.correctAnswerFound);
    }
    if(gameState.phase == 1){
        if(gameState.round < 3){
            gameState.round+=1;
            gameState.posASafe = !gameState.posASafe;
            gameState.posBSafe = !gameState.posBSafe;
            gameState.posCSafe = !gameState.posCSafe;
            gameState.posDSafe = !gameState.posDSafe;
            gameState.bossArrowRotation += 1;
            if(gameState.bossArrowRotation > 4)
                gameState.bossArrowRotation = 1;
        }
        else
        {
            gameState.phase = 2;
            gameState.round = 1;
            gameState.timer = 9000; //9 seconds in the game
            determineSolution();
        }
    }
}

function determineSolution(){
    gameState.BossNumber = Math.floor(Math.random() * 3) + 1
    var finalRotation = gameState.bossArrowRotation - gameState.BossNumber + 1

    var rotateLeft = 0;
    if(gameState.BossNumber == 3)
        rotateLeft = 2;
    if(gameState.BossNumber == 2)
        rotateLeft = 1;
    if(gameState.BossNumber == 1)
        rotateLeft = 0;

    var finalRotation = gameState.bossArrowRotation - rotateLeft;

    if(finalRotation < 1)
        finalRotation += 4;
    if(finalRotation > 4)
        finalRotation -= 4;

    markOppositeSideFailure(finalRotation);
    markRandomOtherAsIncorrect();
    markFinalAnswer();
}

function markOppositeSideFailure(finalRotation){
    if(finalRotation == 1)
    {
        gameState.ANumber = Math.floor(Math.random() * 3) + 1
        gameState.BNumber = Math.floor(Math.random() * 3) + 1
    }
    if(finalRotation == 2)
    {
        gameState.BNumber = Math.floor(Math.random() * 3) + 1
        gameState.CNumber = Math.floor(Math.random() * 3) + 1
    }
    if(finalRotation == 3)
    {
        gameState.CNumber = Math.floor(Math.random() * 3) + 1
        gameState.DNumber = Math.floor(Math.random() * 3) + 1
    }
    if(finalRotation == 4)
    {
        gameState.ANumber = Math.floor(Math.random() * 3) + 1
        gameState.DNumber = Math.floor(Math.random() * 3) + 1
    }
}

function markRandomOtherAsIncorrect(){
    if(Math.floor(Math.random() * 2) + 1){
        if(gameState.ANumber == 0){
            if(gameState.posASafe == true)
            {
                gameState.ANumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.ANumber = 1;
                else
                    gameState.ANumber = 3
            }
        }
        else if(gameState.BNumber == 0){
            if(gameState.posBSafe == true)
            {
                gameState.BNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.BNumber = 1;
                else
                    gameState.BNumber = 3
            }
        }
        else if(gameState.CNumber == 0){
            if(gameState.posCSafe == true)
            {
                gameState.CNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.CNumber = 1;
                else
                    gameState.CNumber = 3
            }
        }
        else if(gameState.DNumber == 0){
            if(gameState.posDSafe == true)
            {
                gameState.DNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.DNumber = 1;
                else
                    gameState.DNumber = 3
            }
        }
    }
    else{
        if(gameState.DNumber == 0){
            if(gameState.posDSafe == true)
            {
                gameState.DNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.DNumber = 1;
                else
                    gameState.DNumber = 3
            }
        }
        else if(gameState.CNumber == 0){
            if(gameState.posCSafe == true)
            {
                gameState.CNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.CNumber = 1;
                else
                    gameState.CNumber = 3
            }
        }
        else if(gameState.BNumber == 0){
            if(gameState.posBSafe == true)
            {
                gameState.BNumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.BNumber = 1;
                else
                    gameState.BNumber = 3
            }
        }
        else if(gameState.ANumber == 0){
            if(gameState.posASafe == true)
            {
                gameState.ANumber = 2;
            }
            else{
                if(Math.floor(Math.random() * 2) + 1)
                    gameState.ANumber = 1;
                else
                    gameState.ANumber = 3
            }
        }
    }
}

function markFinalAnswer(){
    if(gameState.ANumber == 0)
    {
        gameState.posAfinalAnswer = true;
        if(gameState.posASafe == false)
        {
            gameState.ANumber = 2;
        }
        else{
            if(Math.floor(Math.random() * 2) + 1)
                gameState.ANumber = 1;
            else
                gameState.ANumber = 3
        }
    }
    if(gameState.BNumber == 0)
    {
        gameState.posBfinalAnswer = true;
        if(gameState.posBSafe == false)
        {
            gameState.BNumber = 2;
        }
        else{
            if(Math.floor(Math.random() * 2) + 1)
                gameState.BNumber = 1;
            else
                gameState.BNumber = 3
        }
    }
    if(gameState.CNumber == 0)
    {
        gameState.posCfinalAnswer = true;
        if(gameState.posCSafe == false)
        {
            gameState.CNumber = 2;
        }
        else{
            if(Math.floor(Math.random() * 2) + 1)
                gameState.CNumber = 1;
            else
                gameState.CNumber = 3
        }
    }
    if(gameState.DNumber == 0)
    {
        gameState.posDfinalAnswer = true;
        if(gameState.posDSafe == false)
        {
            gameState.DNumber = 2;
        }
        else{
            if(Math.floor(Math.random() * 2) + 1)
                gameState.DNumber = 1;
            else
                gameState.DNumber = 3
        }
    }
}


app.ticker.add((delta) => {
    if(getTime() > gameState.timer){
        clearActiveSprites();
        updateGameState();
        displayGameState(gameState);
        resetTimer();
    }
});


////////////////////////Timers////////////////////////
function getTime() {
    var now = +new Date();
    return now - startTime;
}

function resetTimer(){
    startTime = +new Date();
}