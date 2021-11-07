import Phaser from 'phaser'

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
		this.load.image('glass-panel', 'assets/glassPanel.png')
		this.load.image('cursor-hand', 'assets/cursor_hand.png')
    }

    create()
    {
		// TODO
        this.cursors = Phaser.Types.Input.Keyboard.CursorKeys

	}

	selectNextButton = (change = 1) =>
	{
		// TODO
	}

	confirmSelection = () =>
	{
		// TODO
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