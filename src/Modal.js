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

    update(time, delta) {
        this.input.keyboard.on('keydown-SPACE', function () {
            console.log("MODAL SPACE");
            this.Release();

        }, this);

    }

    Release = () => {
        if(this.unloading == false){

            this.scene.manager.resume(this.sessionData.baseSceneName);
            this.scene.manager.bringToTop(this.sessionData.baseSceneName);
            
            this.scene.manager.remove(this.scene.key);
            
            this.unloading = true;

        }

    }

    create(modalData) {

        console.log("INCOMING MODAL DATA: " + JSON.stringify(modalData));

        var add = this.add;
        var input = this.input;

        this.textDisplay = null;
        this.sessionData = modalData;
        this.unloading = false;
    
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
    

        this.Populate(modalData.interactableData.copy);

        //graphics.fillStyle(0xff0000, 0.5);
        //graphics.fillRect(250, 200, 400, 256);

    }

    Populate = (copy) => {
        console.log("POPULATE MODAL: " + copy);
        this.copy = copy;

        this.PopulateCopy();
    }

    PopulateCopy = () => {    
        if(this.textDisplay != null)
            this.textDisplay.destroy();

        this.textDisplay = this.add.text(
            this.sys.game.canvas.width / 2, 
            this.sys.game.canvas.height / 2, 
            this.copy
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