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

        if(clickThroughVal == true){}
		    this.time.delayedCall(5000, this.SuspendClickThrough, [false], this);

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