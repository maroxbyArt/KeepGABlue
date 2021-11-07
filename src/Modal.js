//import "assets/fonts/PokemonGb-RAeo.ttf"

/**
 * Class representing a level (https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
 * @extends Phaser.Scene
 */

export default class Modal extends Phaser.Scene {

    /** Create the level. */
    constructor() {
        super({key: 'modal'});

    }

    preload() {
        //this.InitStyles();
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        var add = this.add;
        var input = this.input;
    
        /*
        WebFont.load({
            custom: {
                families: [ 'pokemon' ]
            },
            active: function ()
            {
                add.text(32, 32, 'The face of the\nmoon was in\nshadow.', { fontFamily: 'pokemon', fontSize: 80, color: '#ff0000' }).setShadow(2, 2, "#333333", 2, false, true);
            }
        });
        */

        
        var graphics = this.add.graphics();

        graphics.fillStyle(0x00ff00, 0.5);
        graphics.fillRect(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height);
    
        //graphics.fillStyle(0xff0000, 0.5);
        //graphics.fillRect(250, 200, 400, 256);


        this.add.text(
            this.sys.game.canvas.width / 2, 
            this.sys.game.canvas.height / 2, 
            'Testing'
        );
    }


    InitStyles = () => {
        var element = document.createElement('style');

        document.head.appendChild(element);
    
        var sheet = element.sheet;
    
        var styles = '@font-face { font-family: "pokemon"; src: url("assets/fonts/PokemonGb-RAeo.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
    
        /*
        styles = '@font-face { font-family: "Caroni"; src: url("assets/fonts/ttf/caroni.otf") format("opentype"); }';    
        sheet.insertRule(styles, 0);
        */

    }

}