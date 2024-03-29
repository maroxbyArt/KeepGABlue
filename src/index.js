import Phaser from 'phaser';
import Player from 'Player';

import Modal from 'Modal';
import Level from 'Level';
import MainMenu from 'MainMenu';

import * as dialogueData from './Dialogues.json';


const width = 1000;
const height = 900;

const config = {

    title: 'this game -', 
    url: 'http://geekwagon.net',   
    version: 'ery early version', 
    type: Phaser.AUTO,
    parent: "game",
    //scene: [ MainMenu, Level ],
    scene: [ MainMenu, Level, Modal  ],
    autoFocus: true,

    input: {
        keyboard: true,
        mouse: true,
        gamepad: true,
    },

    disableContextMenu: true,       
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: 0
        }
    },

    width: 1000,
    height: 900,
    backgroundColor: '#FFFFFF',

    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    

};

/*
class Game extends Phaser.Game {


    constructor(config) {
        super(config);

        console.log("GAME START");

        this.scene.add('level', Level, true);
    }
}
*/

var game = new Phaser.Game(config);
game.dialogue = dialogueData["default"];
