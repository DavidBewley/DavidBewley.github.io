var app = new PIXI.Application({ backgroundColor: 0xffffff, width:600,height:600 });
document.getElementById("view").appendChild(app.view);

var gameState = {};
var startTime = {};

const RingAX = 0;
const RingAY = 0;
const RingBX = 300;
const RingBY = 0;
const RingCX = 300;
const RingCY = 300;
const RingDX = 0;
const RingDY = 300;

const NumberBossX = 300;
const NumberBossY = 300;
const NumberAX = 150;
const NumberAY = 150;
const NumberBX = 450;
const NumberBY = 150;
const NumberCX = 450;
const NumberCY = 450;
const NumberDX = 150;
const NumberDY = 450;

const NumberOffsetX = 75;
const NumberOffsetY = 75;

const ArrowLocationUpX = 275;
const ArrowLocationUpY = 165;
const ArrowLocationRightX = 385;
const ArrowLocationRightY = 275;
const ArrowLocationDownX = 275;
const ArrowLocationDownY = 385;
const ArrowLocationLeftX = 165;
const ArrowLocationLeftY = 275;

const arrowDamageUpX = 0;
const arrowDamageUpY = 0;
const arrowDamageRightX = 300;
const arrowDamageRightY = 0;
const arrowDamageDownX = 0;
const arrowDamageDownY = 300;
const arrowDamageLeftX = 0;
const arrowDamageLeftY = 0;

//ArenaFloor
const arenaFloor = new PIXI.Container();
app.stage.addChild(arenaFloor);
arenaFloor.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/FloorEdit.png')));

function addSpriteToContainer(container, sprite, x, y) {
    container.addChild(sprite);
    container.x = x;
    container.y = y;
}

function addArrowSpriteToContainer() {
    if(gameState.phase != 2){
        boss = new PIXI.Container();
        boss.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/Boss.png')));
        boss.x = NumberBossX - NumberOffsetX;
        boss.y = NumberBossY - NumberOffsetY;
        app.stage.addChild(boss);
    }

    arrow = new PIXI.Container();  
    var rotation = gameState.bossArrowRotation;
    if(gameState.phase == 3)
        rotation = gameState.BossFinalArrowRotation;

    if(rotation == 1){
        arrow.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/BlockArrowUp.png')));
        arrow.x = ArrowLocationUpX;
        arrow.y = ArrowLocationUpY;
    }
    if(rotation  == 2){
        arrow.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/BlockArrowRight.png')));
        arrow.x = ArrowLocationRightX;
        arrow.y = ArrowLocationRightY;
    }
    if(rotation  == 3){
        arrow.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/BlockArrowDown.png')));
        arrow.x = ArrowLocationDownX;
        arrow.y = ArrowLocationDownY;
    }
    if(rotation  == 4){
        arrow.addChild(new PIXI.Sprite(new PIXI.Texture.from('Img/BlockArrowLeft.png')));
        arrow.x = ArrowLocationLeftX;
        arrow.y = ArrowLocationLeftY;
    }
    app.stage.addChild(arrow);
}

function clearActiveSprites(){
    if(gameState.phase == 1){
        ringPositionA.destroy({children:true, texture:true, baseTexture:false});
        ringPositionB.destroy({children:true, texture:true, baseTexture:false});
        ringPositionC.destroy({children:true, texture:true, baseTexture:false});
        ringPositionD.destroy({children:true, texture:true, baseTexture:false});
        rectangleAttack.destroy({children:true, texture:true, baseTexture:false});
        arrow.destroy({children:true, texture:true, baseTexture:false});
        boss.destroy({children:true, texture:true, baseTexture:false});
    }

    if(gameState.phase == 2){
        NumberA.destroy({children:true, texture:true, baseTexture:false});
        NumberB.destroy({children:true, texture:true, baseTexture:false});
        NumberC.destroy({children:true, texture:true, baseTexture:false});
        NumberD.destroy({children:true, texture:true, baseTexture:false});
        NumberBoss.destroy({children:true, texture:true, baseTexture:false});
        arrow.destroy({children:true, texture:true, baseTexture:false});
    }

    if(gameState.phase == 3){
        if(gameState.correctAnswerFound)
            correctText.destroy({children:true, texture:true, baseTexture:false});
        else
            incorrectText.destroy({children:true, texture:true, baseTexture:false});
        ringPositionA.destroy({children:true, texture:true, baseTexture:false});
        ringPositionB.destroy({children:true, texture:true, baseTexture:false});
        ringPositionC.destroy({children:true, texture:true, baseTexture:false});
        ringPositionD.destroy({children:true, texture:true, baseTexture:false});
        rectangleAttack.destroy({children:true, texture:true, baseTexture:false});
        arrow.destroy({children:true, texture:true, baseTexture:false});
        boss.destroy({children:true, texture:true, baseTexture:false});
    }
}

function displayRectangleAttacks(){
    rectangleAttack = new PIXI.Container();
    var rotation = gameState.bossArrowRotation;
    if(gameState.phase == 3)
        rotation = gameState.BossFinalArrowRotation;

    if(rotation == 1)
        addSpriteToContainer(rectangleAttack,new PIXI.Sprite(new PIXI.Texture.from('Img/HalfSquareH.png')),arrowDamageUpX,arrowDamageUpY);
    if(rotation == 2)
        addSpriteToContainer(rectangleAttack,new PIXI.Sprite(new PIXI.Texture.from('Img/HalfSquareV.png')),arrowDamageRightX,arrowDamageRightY);
    if(rotation == 3)
        addSpriteToContainer(rectangleAttack,new PIXI.Sprite(new PIXI.Texture.from('Img/HalfSquareH.png')),arrowDamageDownX,arrowDamageDownY);
    if(rotation == 4)
        addSpriteToContainer(rectangleAttack,new PIXI.Sprite(new PIXI.Texture.from('Img/HalfSquareV.png')),arrowDamageLeftX,arrowDamageLeftY);

    app.stage.addChild(rectangleAttack);
}

function displayRingAttacks(){
    //logic for answer is wrong

    ringPositionA = new PIXI.Container();
    ringPositionB = new PIXI.Container();
    ringPositionC = new PIXI.Container();
    ringPositionD = new PIXI.Container();

    var aSafe = gameState.posASafe;
    var bSafe = gameState.posBSafe;
    var cSafe = gameState.posCSafe;
    var dSafe = gameState.posDSafe;

    if(gameState.phase == 3){
        if(gameState.ANumber == 2)
            aSafe = !aSafe;
        if(gameState.BNumber == 2)
            bSafe = !bSafe;
        if(gameState.CNumber == 2)
            cSafe = !cSafe;
        if(gameState.DNumber == 2)
            dSafe = !dSafe;
    }
               
    if(aSafe == true)
        addSpriteToContainer(ringPositionA,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),RingAX,RingAY);
    else
        addSpriteToContainer(ringPositionA,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),RingAX,RingAY);        
    if(bSafe == true)
        addSpriteToContainer(ringPositionB,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),RingBX,RingBY);
    else
        addSpriteToContainer(ringPositionB,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),RingBX,RingBY);
    if(cSafe == true)
        addSpriteToContainer(ringPositionC,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),RingCX,RingCY);
    else
        addSpriteToContainer(ringPositionC,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),RingCX,RingCY);
    if(dSafe == true)
        addSpriteToContainer(ringPositionD,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleEmpty.png')),RingDX,RingDY);
    else
        addSpriteToContainer(ringPositionD,new PIXI.Sprite(new PIXI.Texture.from('Img/CircleFull.png')),RingDX,RingDY);

    app.stage.addChild(ringPositionA);
    app.stage.addChild(ringPositionB);
    app.stage.addChild(ringPositionC);
    app.stage.addChild(ringPositionD);
}

function displayNumbers(){
    NumberA = new PIXI.Container();
    NumberB = new PIXI.Container();
    NumberC = new PIXI.Container();
    NumberD = new PIXI.Container();
    NumberBoss = new PIXI.Container();

    if(gameState.ANumber == 1)
        addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/1RingEdit.png')),NumberAX-NumberOffsetX,NumberAY-NumberOffsetY);
    if(gameState.ANumber == 2)
        addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/2RingEdit.png')),NumberAX-NumberOffsetX,NumberAY-NumberOffsetY);
    if(gameState.ANumber == 3)
        addSpriteToContainer(NumberA,new PIXI.Sprite(new PIXI.Texture.from('Img/3RingEdit.png')),NumberAX-NumberOffsetX,NumberAY-NumberOffsetY);

    if(gameState.BNumber == 1)
        addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/1RingEdit.png')),NumberBX-NumberOffsetX,NumberBY-NumberOffsetY);
    if(gameState.BNumber == 2)
        addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/2RingEdit.png')),NumberBX-NumberOffsetX,NumberBY-NumberOffsetY);
    if(gameState.BNumber == 3)
        addSpriteToContainer(NumberB,new PIXI.Sprite(new PIXI.Texture.from('Img/3RingEdit.png')),NumberBX-NumberOffsetX,NumberBY-NumberOffsetY);

    if(gameState.CNumber == 1)
        addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/1RingEdit.png')),NumberCX-NumberOffsetX,NumberCY-NumberOffsetY);
    if(gameState.CNumber == 2)
        addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/2RingEdit.png')),NumberCX-NumberOffsetX,NumberCY-NumberOffsetY);
    if(gameState.CNumber == 3)
        addSpriteToContainer(NumberC,new PIXI.Sprite(new PIXI.Texture.from('Img/3RingEdit.png')),NumberCX-NumberOffsetX,NumberCY-NumberOffsetY);

    if(gameState.DNumber == 1)
        addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/1RingEdit.png')),NumberDX-NumberOffsetX,NumberDY-NumberOffsetY);
    if(gameState.DNumber == 2)
        addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/2RingEdit.png')),NumberDX-NumberOffsetX,NumberDY-NumberOffsetY);
    if(gameState.DNumber == 3)
        addSpriteToContainer(NumberD,new PIXI.Sprite(new PIXI.Texture.from('Img/3RingEdit.png')),NumberDX-NumberOffsetX,NumberDY-NumberOffsetY);

    if(gameState.BossNumber == 1)
        addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/1RingEdit.png')),NumberBossX-NumberOffsetX,NumberBossY-NumberOffsetY);
    if(gameState.BossNumber == 2)
        addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/2RingEdit.png')),NumberBossX-NumberOffsetX,NumberBossY-NumberOffsetY);
    if(gameState.BossNumber == 3)
        addSpriteToContainer(NumberBoss,new PIXI.Sprite(new PIXI.Texture.from('Img/3RingEdit.png')),NumberBossX-NumberOffsetX,NumberBossY-NumberOffsetY);
   
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

function displayGameState(gameState){
    if(gameState.phase == 1){
        displayRectangleAttacks();
        displayRingAttacks();
        addArrowSpriteToContainer();   
    }   
    if(gameState.phase == 2){       
        displayNumbers();     
        addArrowSpriteToContainer();
    }
    if(gameState.phase == 3){       
        displayRectangleAttacks();    
        displayRingAttacks();  
        addArrowSpriteToContainer();

        if(gameState.correctAnswerFound){
            correctText = new PIXI.Text("Correct", {font:"200px Arial", fill:"green"});
            correctText.scale.x = 3;
            correctText.scale.y = 3;
            app.stage.addChild(correctText);
        }
        else{
            incorrectText = new PIXI.Text("Incorrect", {font:"200px Arial", fill:"red"});
            incorrectText.scale.x = 3;
            incorrectText.scale.y = 3;
            app.stage.addChild(incorrectText);
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
    if(gameState.phase == 4){
        gameState.phase = 5;
    }
    if(gameState.phase == 3){ 
        gameState.timer = 5000;
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
    if(gameState.phase == 5){
        gameState.phase = 1;
        CreateGameStart();
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

    gameState.BossFinalArrowRotation = finalRotation;

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