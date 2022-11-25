const canvas = document.getElementById("game")
const c = canvas.getContext("2d")

let canvasSize
let elementsSize

window.addEventListener("load", StartGame)
window.addEventListener("resize",resizeCanvas)

//Buttons and Keys - Variables and Events
window.addEventListener("keydown", keydownEvent)

const leftButton = document.getElementById("left")
const rightButton = document.getElementById("right")
let upButton;
let downButton;
isOnTablet(false)
leftButton.addEventListener("click", leftClick)
rightButton.addEventListener("click", rightClick)

function isOnTablet(isTrue){
    if(isTrue){
        upButton = document.getElementById("upTablet")
        downButton = document.getElementById("downTablet")
    }else{
        upButton = document.getElementById("up")
        downButton = document.getElementById("down")
    }
    upButton.addEventListener("click", upClick)
    downButton.addEventListener("click", downClick)
}

function upClick(){
    player.DirectionToMove("up")
}
function downClick(){
    player.DirectionToMove("down")
}
function leftClick(){
    player.DirectionToMove("left")
}
function rightClick(){
    player.DirectionToMove("right")
}

function keydownEvent(event){
    // console.log(event)
    if(event.code == "KeyW" || event.code == "ArrowUp") upClick()
    else if(event.code == "KeyS" || event.code == "ArrowDown") downClick()
    else if(event.code == "KeyA" || event.code == "ArrowLeft") leftClick()
    else if(event.code == "KeyD" || event.code == "ArrowRight") rightClick()
}
//Player----------------------------------------
class Player{
    Constructor(){
        this.isAlive

        this.spawnX
        this.spawnY

        this.x = undefined
        this.y = undefined

        this.nextX
        this.nextY

        this.objectHittedX
        this.objectHittedY
        
        this.coins

        this.skin
    }

    Draw(){
        if(this.x == undefined){
            this.x = this.spawnX
            this.y = this.spawnY
        }
        c.font = elementsSize * .95 + "px Verdana" 
        c.fillText(playerEmojis[this.skin], this.x, this.y)
    }

    Move(){
        this.x = this.nextX
        this.y = this.nextY
        this.Draw()
        displayCanvas()
    }

    Reset(){
        this.isAlive = true
        this.spawnX = undefined
        this.spawnY = undefined

        this.x = undefined
        this.y = undefined
    }

    Die(){
        this.isAlive = false
        c.fillText(emojis["BOMB_COLLISION"], this.x, this.y)
    }

    Win(){
        if(this.objectHitted == "I"){
            NextLevel()
        }
    }

    GoBack(){
        PreviusLevel()
    }
    GetCoin(){
        // mapRowCols[this.objectHittedX][this.objectHittedY] = "-"
        coinFound(this.objectHittedX, this.objectHittedY)
        this.coins++
        console.log(this.coins)

    }
    DirectionToMove(direction){
        if(!this.isAlive){
            LoadLevel()
            return
        }

        let xIndexToMove = this.x;
        let yIndexToMove = this.y;

        switch (direction){
            case "up":
                yIndexToMove -= elementsSize
            break
            case "down":
                yIndexToMove += elementsSize
            break
            case "left":
                xIndexToMove -= elementsSize
            break
            case "right":
                xIndexToMove += elementsSize
            break
        }

        this.nextX = xIndexToMove
        this.nextY = yIndexToMove

        this.objectHittedX = parseInt(yIndexToMove / elementsSize -1)
        this.objectHittedY = parseInt(xIndexToMove / elementsSize)
        

        switch (mapRowCols[this.objectHittedX][this.objectHittedY]){
            case "-":
                this.Move()
            break
            case "O":
                this.Move()
                this.GoBack()
            break
            case "I":
                this.Move()
                NextLevel()
            break
            case "X":
                this.Move()
                this.Die()
            break
            case "C":
                this.Move()
                this.GetCoin()
            break
            case undefined:
            break
            case "H":
                this.Move()
            break
        }
    }
}
let player = new Player()
player.isAlive = true
player.skin = 01

let obstacleSkin = 01
//Customisation---------------------------------
function GetSkin__Player(emoji){
    player.skin = emoji
    displayCanvas()
}
function GetSkin__Obstacle(emoji){
    obstacleSkin = emoji
    displayCanvas()
}
//Player
//Coins-----------------------------------------
class Coins{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}
function coinFound(x, y){
    if(coinsArray.some(coin => coin.x == x && coin.y == y)){
        console.log("ya esta")
        return
    }

    coinsArray.push(new Coins(x, y))
}

let coinsArray = []

//Game------------------------------------------
let mapIndex = 0;
let map = maps[mapIndex];
let mapRows
let mapRowCols

let isPreviusLevel = false

SplitMap()

function StartGame(){

    resizeCanvas()
}
function LoadLevel(){
    SplitMap()
    player.Reset()
    displayCanvas()
}

function NextLevel(){
    mapIndex++
    map = maps[mapIndex]
    LoadLevel()
}
function PreviusLevel(){
    if(mapIndex == 0) return
    isPreviusLevel = true
    mapIndex--
    map = maps[mapIndex]
    LoadLevel()
}

//Canvas----------------------------------------
function SplitMap(){
    mapRows = map.trim().split("\n")
    mapRowCols = mapRows.map(row => row.trim().split(""))
}
function resizeCanvas(){

    if(window.innerWidth < 500){
        canvasSize = 255
    }
    if(window.innerWidth >= 400){
        canvasSize = 300
    }
    if(window.innerWidth >= 500){
        canvasSize = 350

        // isOnTablet(false)
    }
    if(window.innerWidth >= 750){
        canvasSize = 400

        // isOnTablet(true)
    }
    if(window.innerWidth >= 900){
        canvasSize = 500

    }
    if(window.innerWidth >= 1300){
        canvasSize = 600
    }

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)

    elementsSize = (canvasSize / 10) - 1

    LoadLevel()
}
function displayCanvas(){

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.font = elementsSize + "px Verdana" 

    mapRowCols.some((row, rowIndex) => {
        row.some((col, colIndex) => {

            let emoji = emojis[col]
            const posX = elementsSize * colIndex
            const posY = elementsSize * (rowIndex + 1)
            
            if(col == "C" && coinsArray.some(coin => coin.x == rowIndex && coin.y == colIndex)){
                mapRowCols[rowIndex][colIndex] = "-"
                return
            }

            if(isPreviusLevel && col == "I" && player.x == undefined){
                player.spawnX = posX;
                player.spawnY = posY;
                isPreviusLevel = false
            }

            if(col == "O" && player.x == undefined || col == "H" && player.x == undefined){
                player.spawnX = posX;
                player.spawnY = posY;
            }

            if(col == "X"){
                emoji = obstacleEmojis[obstacleSkin]
            }

            c.fillText(emoji, posX, posY)


        })
    })

    player.Draw()
}


//Extras----------------------------------------
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
//WebInteraction--------------------------------
let shopBar = document.getElementById("ShopBar")
let shopItems = document.getElementById("ShopItems")
shopBar.addEventListener("click", ToggleBar)

function ToggleBar(){
    if(shopItems.style.display == "none"){
        shopItems.style.display = "inline-block"
        shopBar.classList.toggle("Shop__TitleCointainer--hidden")
    } else{
        shopItems.style.display = "none"
        shopBar.classList.toggle("Shop__TitleCointainer--hidden")
    }
    console.log("A")
}
//Guardas-------------------------------------
// const timer = ms => new Promise(res => setTimeout(res, ms))
// async MoveAnimation(){
    //     let x = (this.nextX - this.x) / this.speed
    //     let y = (this.nextY - this.y) / this.speed

    //     console.log("here")

    //     for(let i = 0; i < this.speed; i++){
    //         this.x += x
    //         this.y += y
    //         console.log("lop")
    //         player.draw()
    //         displayCanvas()
    //         await timer(1)
    //     }
    //     this.x = this.nextX
    //     this.y = this.nextY
        
    // }
