const chai = require('chai');
let connect4 = require('../connect4/connect4.js');
let should = chai.should();

describe('Unit tests - Puissance 4', () => {
    it('it should create an empty grid', (done) => {
        let game = new connect4();
        let grid = game.grid;
        (game.grid).should.be.an('array')
        done();
    });
    it('it should handle plays correctly', (done) => {
        let game = new connect4();
        let grid = game.grid;
        (game.grid).should.be.an('array');
        game.play('R',1);
        game.play('Y',0);
        game.play('R',2);
        game.play('Y',0);
        game.play('R',3);
        game.play('Y',0);
        game.play('R',4).should.be.true;
        //game.displayGrid();
        game.checkCols().should.be.false;
        game.checkRows().should.be.true;
        game.checkDiagonals().should.be.false;
        game.isWon().should.be.true;
        game.isPlayable().should.be.false;

        done();
    });
    it('it should be able to play randomly', (done) => {
        let game = new connect4();
        let grid = game.grid;
        (game.grid).should.be.an('array')
        //game.displayGrid();
        game.IA_randomPlay('R').should.be.true;
        game.IA_randomPlay('Y').should.be.true;
        game.IA_randomPlay('Y').should.be.false;
        game.IA_randomPlay('R').should.be.true;
        game.IA_randomPlay('Y').should.be.true;
        game.IA_randomPlay('R').should.be.true;
        game.IA_randomPlay('Y').should.be.true;
        game.IA_randomPlay('R').should.be.true;
        game.IA_randomPlay('Y').should.be.true;
        while(game.isPlayable()){
            game.IA_randomPlay(game._turn);
        }
        /*game.displayGrid();
        console.log(game._winner);
        console.log(game._winType);
        console.log(game._allMoves);
        console.log(game.undoLastMove());
        console.log(game._allMoves);
        console.log(game.isWon());
        console.log(game._winner);
        console.log(game._winType);
        game.displayGrid();*/
        done();
    });
    it('it should have a (quite) smart IA', (done) => {
        let game = new connect4();
        let grid = game.grid;
        (game.grid).should.be.an('array')
        game.play('R',1);
        game.play('Y',0);
        game.play('R',2);
        game.play('Y',0);
        while(game.isPlayable()){
            game.IA_cleanSmartPlay(game._turn);
        }
        //game.displayGrid();
        game.isPlayable().should.be.false;
        (game.isWon()||game.isDraw()).should.be.true;
        done();
    });
});