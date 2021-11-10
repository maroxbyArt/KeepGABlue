
import InteractableData from 'TestData.js'
import Utils from 'Utils.js'

export default class MobileInteractable  extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, frame, interactableData) {
        super(scene, x, y, frame);
        
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scene = scene;
        this.body.gravity.x = 0
        this.body.gravity.y = 0

        this.interactableData = interactableData;

        this.PopulateAIData();
        this.InitMove();

    }

    PopulateAIData = () => {
        var grid = [];
        var easystarjs = require('easystarjs');

        this.boundary = this.scene.boundaries[this.interactableData.boundaryID];


        this.pathFinder = new easystarjs.js();

        this.boundaryXCoord = this.scene.map.worldToTileX(parseInt(this.boundary.x));
        this.boundaryWidthCoor = this.scene.map.worldToTileX(parseInt(this.boundary.width + this.boundary.x));
        this.boundaryYCoord = this.scene.map.worldToTileY(parseInt(this.boundary.y));
        this.boundaryHeightCoord = this.scene.map.worldToTileY(parseInt(this.boundary.y + this.boundary.height));

        /*
        for(var y = this.boundaryYCoord; y < this.boundaryHeightCoord; y++){
            var col = [];

            for(var x = this.boundaryXCoord; x < this.boundaryWidthCoor; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                var tile = this.scene.map.getTileAt(
                    x, y, 
                    true, 
                    this.scene.belowLayer
                );

                //console.log("TILE x: " + x);
                //console.log("TILE y: " + y);

                if(tile != null){
                    tile.alpha = 0.5;
                    console.log(tile);
                    var tileIndex = tile.index;
                    col.push(tileIndex);

                    //console.log("TILE [tileIndex]: " + tileIndex);

                }

            }
            grid.push(col);
        }
        */
        for(var y = 0; y < this.scene.map.height; y++){
            var col = [];

            for(var x = 0; x < this.scene.map.width; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                var tile = this.scene.map.getTileAt(
                    x, y, 
                    true, 
                    this.scene.belowLayer
                );

                //console.log("TILE x: " + x);
                //console.log("TILE y: " + y);

                if(tile != null){
                    tile.alpha = 0.5;
                    console.log(tile);
                    var tileIndex = tile.index;
                    col.push(tileIndex);

                    //console.log("TILE [tileIndex]: " + tileIndex);

                }

            }
            grid.push(col);
        }

        console.log(grid);

        this.pathFinder.setGrid(grid);
        this.pathFinder.setAcceptableTiles([2]);
        this.pathFinder.disableDiagonals();
        this.pathFinder.disableCornerCutting();
        
        //this.scene.tweens.timeline;


    }

    GetRandomCoord = () => {
        var randomCoord = {
            x: Utils.GetRandomIntBetween(this.boundaryXCoord, this.boundaryWidthCoor),
            y: Utils.GetRandomIntBetween(this.boundaryYCoord, this.boundaryHeightCoord)
        }

        return randomCoord;
    }

    InitMove = () => {
        var startCoords = this.GetRandomCoord();
        var endCoords = this.GetRandomCoord();

        console.log(this.pathFinder._collisionGrid);
        console.log(this.pathFinder._collisionGrid);

        console.log("MIN X: " + this.boundaryXCoord);
        console.log("MAX X: " + this.boundaryWidthCoor);
        console.log("MIN Y: " + this.boundaryYCoord);
        console.log("MAX Y: " + this.boundaryHeightCoord);

        console.log("startCoords " +"x: " + parseInt(this.x) + " y: " + parseInt(this.y));
        console.log("endCoords " +"x: " + endCoords.x + " y: " + endCoords.y);

        this.pathFinder.findPath(
            this.scene.map.worldToTileX(parseInt(this.x)), 
            this.scene.map.worldToTileY(parseInt(this.y)), 
            endCoords.x, 
            endCoords.y, 
            this.Move
        );

        //this.pathFinder.findPath(0, 0, 1, 1, this.Move);
        this.pathFinder.calculate();
        
    }

    Move = (path) => {
        console.log("path: " + path)
            // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
        var tweens = [];

        for(var i = 0; i < path.length - 1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;

            tweens.push({
                targets: this,
                x: {value: ex*this.scene.map.tileWidth, duration: 2000},
                y: {value: ey*this.scene.map.tileHeight, duration: 2000},
            });

            let currTween = tweens[tweens.length - 1];
            //currTween.setCallback
            console.log(currTween)
            //currTween.onStart(() => {console.log("start")})


        }

        this.scene.tweens.timeline({
            tweens: tweens
        });

        /*
        this.scene.tweens.timeline({
            tweens: tweens
        }).setCallback("onComplete", this.InitMove);
        */

    }
    
}