import Phaser from 'phaser'
import InteractableData from 'TestData'
import Utils from 'Utils'
import ModalData from 'ModalData.js'

export default class MainMenu extends Phaser.Scene
{

	constructor()
	{
		super('main-menu')
	}

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload()
    {
		//this.load.image('glass-panel', 'assets/glassPanel.png')
		//this.load.image('cursor-hand', 'assets/cursor_hand.png')
    }

    create()
    {
		this.dialogueLevelID = "intro";
		this.activeArea;

		//this.timerDuration = 5000;
		this.timerDuration = 5000;
		
		// TODO
        //this.cursors = Phaser.Types.Input.Keyboard.CursorKeys

		// SIZE REFS
		//this.

		this.InitData();


		this.DrawCredits();

	}

	InitData = () => {

		//INIT INTRO INTERACTABLE DATA
		this.introDialogueData = new InteractableData(this);
		this.introDialogueData.dialogueID = "intro";
		this.introDialogueModalData = new ModalData(this.scene.key, this.introDialogueData);

		console.log("INTRO MODAL DATA")
		console.log(this.introDialogueModalData);

		this.introVotingDialogueData = new InteractableData(this);
		this.introVotingDialogueData.dialogueID = "voting";
		this.introVotingModalData = new ModalData(this.scene.key, this.introVotingDialogueData);

		this.introPlayerDialogueData = new InteractableData(this);
		this.introPlayerDialogueData.dialogueID = "player";
		this.introPlayerModalData = new ModalData(this.scene.key, this.introPlayerDialogueData);


	}

	selectNextButton = (change = 1) =>
	{
		// TODO
	}

	confirmSelection = () =>
	{
		// TODO
	}

	DrawCredits = () => {
        const text1 = this.add.text(100, 100, 'Phaser Text with Tint');
        text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
		this.DrawIntroDialogue();
		
		//this.time.delayedCall(this.timerDuration, this.DrawGate, [], this);

	}	

	DrawIntroDialogue = () => {
		console.log("DrawIntroDialogue");
		this.ShowModal(this.introDialogueModalData);

	}

	ShowModal = (currModalData) => {

        var activeScenes = this.scene.manager.getScenes(true);
        var modalScene = this.scene.manager.getScene("modal");

        if(!this.scene.manager.isActive("modal") || this.loadingModal == false){

            this.scene.manager.start("modal", currModalData);
            this.scene.manager.bringToTop("modal");
            this.scene.manager.pause(this.scene.key);

            this.loadingModal = true;


        }

    }

	DrawGate = () => {
		//TOP GATE
		this.topGate = this.add.rectangle(
			0, 
			0,
			 Utils.GetCanvasWidth(this), 
			 Utils.GetCanvasHeight(this) / 4, 
			 0x6666ff);

		this.topGate.displayOriginX = 0;
		this.topGate.displayOriginY = 0;

		//BTM GATE
		this.btmGate = this.add.rectangle(
			0, 
			Utils.GetCanvasHeight(this) - Utils.GetCanvasHeight(this) / 4,
			Utils.GetCanvasWidth(this), 
			Utils.GetCanvasHeight(this) / 4, 
			0x6666ff);

	   this.btmGate.displayOriginX = 0;
	   this.btmGate.displayOriginY = 0;


	   this.time.delayedCall(this.timerDuration, this.DrawIntroDialogue, [], this);

	}
	
	
	update = () =>
	{
		const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		
		if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
		}
	}

}