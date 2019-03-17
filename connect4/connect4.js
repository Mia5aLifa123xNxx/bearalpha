

const cols = 7, rows = 6;
module.exports = class Connect4 {
    constructor() {
        //we will have an array representing
        //the grid by column (7x6 grid)
        this._chatty = false;
        this._grid = new Array();
        this._players = ['R','Y'];
        this._turn = 'R';
        this._allMoves = new Array();
        for(let col = 0; col < cols; col++){
            this._grid[col] = new Array();
            for(let row = 0; row < rows; row++){
                this._grid[col][row] = 0; 
            }
        }
    }
    displayGrid(){
        let st = '';
        for(let col = 0; col < cols; col++){
            for(let row = 0; row < rows; row++){
                st += this._grid[col][row]; 
            }
            st += '\n';
        }
        console.log(st);
        return st;
    }
    get grid(){
        return this._grid;
    }
    set grid(grid){
        return this._grid = grid;
    }

    getRandomInt(theMin, theMax){
        return theMin + Math.floor(Math.random() * Math.floor(theMax));
    }

    isDraw(){
        return !this.isWon() && !this.isPlayable();
    }

    isWon(){
        this._winner = null;
        this._winType = null;
        return this.checkCols() || this.checkRows() || this.checkDiagonals();
    }

    whoWon(){
        if(this.isWon())
            return this._winner;
        else
            return null;
    }

    isPlayable(){
        if(this.isWon())
            return false;
        for(let col = 0; col < cols; col++){
            if(this._grid[col].includes(0))
                return true;
        }
        return false;
    }

    checkCols(){
        let winning = /(RRRR|YYYY)/
        for(let col = 0; col < cols; col++){
            let cmp = this._grid[col].join('');//.replace(/0/g,'');
            if(winning.test(cmp)){
                let redWin = /RRRR/
                let yellowWin = /YYYY/
                if(redWin.test(cmp))
                    this._winner = 'R';
                if(yellowWin.test(cmp))
                    this._winner = 'Y';
                this._winType = {type:'col', coords:{row:null,col:col}};
                return true;
            }
        }
        return false;
    }

    checkRows(){
        let winning = /(RRRR|YYYY)/
        for(let row = 0; row < rows; row++){
            let tmp = new Array();
            for(let col = 0; col < cols; col++){
                tmp.push(this._grid[col][row]); 
            }
            let cmp = tmp.join('');//.replace(/0/g,'');
            if(winning.test(cmp)){
                let redWin = /RRRR/
                let yellowWin = /YYYY/
                if(redWin.test(cmp))
                    this._winner = 'R';
                if(yellowWin.test(cmp))
                    this._winner = 'Y';
                this._winType = {type:'row', coords:{row:row,col:null}};
                return true;
            }
        }
        return false;
    }

    getGridForDisplay(){
        let theRet = new Array();
        for(let row = rows -1; row >= 0; row--){
            let tmp = new Array();
            for(let col = 0; col < cols; col++){
                tmp.push(this._grid[col][row]); 
            }
            theRet.push(tmp);
        }
        return theRet;
    }

    getDiagonalUp(colBegin, rowBegin){
        //return the upward diagonal beginning at the point (colBegin,rowBegin)
        let ret = new Array();
        let cpt = 0;
        while( ((colBegin + cpt) < cols) && ((rowBegin + cpt) < rows)){
            ret.push(this._grid[colBegin+cpt][rowBegin+cpt]);
            cpt++;
        }
        return ret;
    }

    getDiagonalDown(colBegin, rowBegin){
        //return the downward diagonal beginning at the point (colBegin,rowBegin)
        let ret = new Array();
        let cpt = 0;
        while( ((colBegin + cpt) < cols) && ((rowBegin - cpt) >= 0)){
            ret.push(this._grid[colBegin+cpt][rowBegin-cpt]);
            cpt++;
        }
        return ret;
    }

    checkDiagonals(){
        let winning = /(RRRR|YYYY)/
        //check for diagonals in this form : /
        let startingPointsUp = new Array([0,2],[0,1],[0,0],[1,0],[2,0],[3,0]);
        let startingPointsDown = new Array([0,3],[0,4],[0,5],[1,5],[2,5],[3,5]);
        for(let up of startingPointsUp){
            let cmp = this.getDiagonalUp(up[0],up[1]).join('');
            if(winning.test(cmp)){
                let redWin = /RRRR/
                let yellowWin = /YYYY/
                if(redWin.test(cmp))
                    this._winner = 'R';
                if(yellowWin.test(cmp))
                    this._winner = 'Y';
                this._winType = {type:'diag_up', coords:{row:up[0],col:up[1]}};
                return true;
            }
        }
        for(let down of startingPointsDown){
            let cmp = this.getDiagonalDown(down[0],down[1]).join('');
            if(winning.test(cmp)){
                let redWin = /RRRR/
                let yellowWin = /YYYY/
                if(redWin.test(cmp))
                    this._winner = 'R';
                if(yellowWin.test(cmp))
                    this._winner = 'Y';
                this._winType = {type:'diag_down', coords:{row:down[0],col:down[1]}};
                return true;
            }
        }
        return false;
    }

    play(color, column){
        if(this._chatty)
            console.log(`Trying to play ${color} in column ${column}`);
        if(!this.isPlayable()){
            if(this._chatty)
                console.log(`This game is already finished`);
            return false;
        }
        if(color === this._turn){//right turn
            if(column < cols && this._grid[column].includes(0)){//you can play in this column
                for(let row = 0; row < rows; row++){
                    if(this._grid[column][row] === 0){
                        this._grid[column][row] = color;
                        this._turn = (this._turn == 'R'?'Y':'R');//next turn will be for the other player
                        if(this._chatty)
                            console.log(`Played ${color} in column ${column}, next turn is ${this._turn}`);
                        this._allMoves.push({color:color,col:column,row:row});
                        return true;
                        break;//once we added the checker, it's over, we just make sure to stop here
                    }
                }
            }else{
                if(this._chatty)
                    console.log(`Column ${column} is full`);
                return false;
            }
        }else{
            if(this._chatty)
                console.log(`${color} is trying to play in the wrong turn`);
            return false;
        }
    }


    undoLastMove(){
        this._winner = null;
        this._winType = null;
        let lastMove = this._allMoves.pop();
        this._grid[lastMove.col][lastMove.row] = 0;
        return lastMove;
    }


    IA_randomPlay(color){
        if(color != this._turn){
            if(this._chatty)
                console.log(`${color} is trying to play in the wrong turn`);
            return false;
        }
        if(!this.isPlayable()){
            if(this._chatty)
                console.log(`This game is already finished`);
            return false;
        }
        let ok = this.play(color, this.getRandomInt(0,7));
        while(!ok){
            ok = this.play(color, this.getRandomInt(0,7));
        }
        return ok;
    }


    IA_canWin(color){
        let last_turn = this._turn;
        this._turn = color;//overriding the right turn
        for(let col = 0; col < cols; col++){
            this._winner = null;
            this._winType = null;
            let ok = this.play(color, col);
            if(!ok)
                continue;//probably full, don't bother with this column
            if(this.isWon()){//we won, why continue ?
                this._turn = last_turn;
                return this.undoLastMove();
            }else{
                this.undoLastMove();
                this._turn = color;
            }
        }
        //at this point we could not win in a single move with the color specified

        this._turn = last_turn;
        return false;
    }

    IA_cleanSmartPlay(color){
        if(color != this._turn){
            if(this._chatty)
                console.log(`${color} is trying to play in the wrong turn`);
            return false;
        }
        if(!this.isPlayable()){
            if(this._chatty)
                console.log(`This game is already finished`);
            return false;
        }
        let opponentColor = (color == 'R'?'Y':'R');
        let iWin = this.IA_canWin(color);
        let iLose = this.IA_canWin(opponentColor);
        if(iWin)//I can win, let's do it
            return this.play(color, iWin.col);
        if(iLose)//my opponent can win by playing here, block him !
            return this.play(color, iLose.col);
        for(let col = 0; col < cols; col++){
            this.IA_randomPlay(color);
            if(!this.isPlayable())
                break;//there was only one spot left !
            if(this.IA_canWin(opponentColor)){
                this.undoLastMove();
            }
        }
        //at this point it seems we can't avoid losing, random 
        return this.IA_randomPlay(color);
    }
  }
