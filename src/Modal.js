import Utils from 'Utils'

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
            if(this.dialogue == null){
                this.Release();
            } else {
                if(!this.clickThroughSuspended)
                    this.PopulateDialogue();
            }

        }, this);

    }

    DrawLayout_Image_FillWidth = () => {
        var graphics = this.add.graphics();
        graphics.fillStyle(0xffff00, 1.0);

        this.activeArea = this.add.rectangle(
			0, 
            Utils.GetCanvasHeight(this) - Utils.GetCanvasHeight(this) / 3,
            Utils.GetCanvasWidth(this), 
            Utils.GetCanvasHeight(this) / 3,  
			0x6666ff
        );
        this.activeArea.displayOriginX = 0;
        this.activeArea.displayOriginY = 0;

        /*
        this.activeArea = graphics.fillRect(
            0, 			
            Utils.GetCanvasHeight(this) - Utils.GetCanvasHeight(this) / 3,
            Utils.GetCanvasWidth(this), 
            Utils.GetCanvasHeight(this) / 3,  
            250
        );

        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);

        text.setMask(mask);
        */
    }

    Release = () => {
        if(this.unloading == false){

            this.scene.manager.resume(this.sessionData.baseSceneName);
            this.scene.manager.bringToTop(this.sessionData.baseSceneName);
            
            this.scene.manager.remove(this.scene.key);
            
            this.unloading = true;

        }

    }

    SuspendClickThrough = (clickThroughVal = true) => {
        console.log("CALL SUSPEND")
        console.log(clickThroughVal);

        this.clickThroughSuspended = clickThroughVal;

        if(clickThroughVal == true){
		    this.time.delayedCall(5000, this.SuspendClickThrough, [false], this);
        }

    }

    create(modalData) {

        console.log("INCOMING MODAL DATA");
        console.log(modalData);

        var add = this.add;
        var input = this.input;
        this.clickThroughSuspended = false;

        this.textDisplay = null;
        this.sessionData = modalData;
        this.unloading = false;

        this.dialogue = null;
        this.currDialogueIndex = 0;

        this.activeArea = null;
        this.padding = 10;
    
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

        console.log("DATA: ");
        console.log(modalData.interactableData);

        this.DrawLayout_Image_FillWidth();
    
        
        //EVAL DIALOGUE TYPE
        if(modalData.interactableData.dialogueID != null){
            var dialogueData = this.game.dialogue;            
            this.dialogue = this.game.dialogue[modalData.interactableData.dialogueLevelID][modalData.interactableData.dialogueID]
            console.log(this.dialogue);

            this.PopulateDialogue();

        } else {
            this.Populate(modalData.interactableData.copy);

        }
        

    }

    
    PopulateDialogue = () => {
        console.log(this.dialogue);
        this.SuspendClickThrough();

        if(this.currDialogueIndex == this.dialogue.length)
            this.Release();
        else {
            this.Populate(this.dialogue[this.currDialogueIndex]);
            this.currDialogueIndex++;
        }


    }

    Populate = (copy) => {
        console.log("POPULATE MODAL: " + copy);
        this.copy = copy;

        this.PopulateCopy();
    }

    PopulateCopy = () => {    
        if(this.activeArea == null){
            console.log("ERROR: modal active area is null");
            return
        }

        if(this.textDisplay != null)
            this.textDisplay.destroy();

        console.log(this.activeArea);

        this.textDisplay = this.add.text(
            this.activeArea.x + this.padding,
            this.activeArea.y + this.padding,
            this.copy
        );

            /*
        this.textDisplay = this.add.text(
            this.activeArea.width - this.padding,
            this.activeArea.height - this.padding,
            this.copy
        );
            */

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