import Utils from 'Utils.js'

export default class InteractableData {
        
    constructor(scene, tileObj, sceneBoundaries) {
        this.scene = scene;
        this.properties = tileObj.properties;

        this.id =  tileObj.id;
        this.name = tileObj.name;

        this.copy = Utils.GetPropertyByName("copy", this.properties);
        this.type = Utils.GetPropertyByName("type", this.properties);

        this.boundaryID = Utils.GetPropertyByName("boundaries", this.properties);
        this.boundary;
        this.pathFinder;

        if(this.boundaryID)
            this.PopulateAIData();


    }

    PopulateAIData = () => {
        var grid = [];
        var easystarjs = require('easystarjs');

        this.boundary = sceneBoundaries[this.boundaryID];
        this.pathFinder = new easystarjs.js();

        this.boundaryXCoord = this.scene.map.worldToTileX(parseInt(this.boundary.x));
        this.boundaryWidthCoor = this.scene.map.worldToTileX(parseInt(this.boundary.width + this.boundary.x));
        this.boundaryYCoord = this.scene.map.worldToTileY(parseInt(this.boundary.y));
        this.boundaryHeightCoord = this.scene.map.worldToTileY(parseInt(this.boundary.y + this.boundary.height));


        for(var y = boundaryYCoord; y < boundaryHeightCoord; y++){
            var col = [];
            for(var x = boundaryXCoord; x < boundaryWidthCoor; x++){
                // In each cell we store the ID of the tile, which corresponds
                // to its index in the tileset of the map ("ID" field in Tiled)
                var tile = this.scene.map.getTileAt(
                    x, y, 
                    true, 
                    this.scene.belowLayer
                );

                console.log("TILE x: " + x);
                console.log("TILE y: " + y);

                if(tile != null){
                    tile.alpha = 0.5;
                    console.log("TILE: " + tile);
                    var tileIndex = tile.index;
                    col.push(tileIndex);

                    //console.log("TILE [tileIndex]: " + tileIndex);

                }

            }
            grid.push(col);
        }

        this.pathFinder.setGrid(grid);
        this.pathFinder.setAcceptableTiles(grid);

    }

    GetRandomCoord = () => {
        var randomCoord = {
            x: Utils.GetRandomIntBetween(this.boundaryXCoord, this.boundaryWidthCoor),
            y: Utils.GetRandomIntBetween(this.boundaryYCoord, this.boundaryHeightCoord)
        }

        return randomCoord;
    }

    Move = (cb) => {
        var startCoords = this.GetRandomCoord();
        var endCoords = this.GetRandomCoord();

        this.pathFinder.findPath(coords.x, coords.y, endCoords.x, endCoords.y, cb);
        this.pathFinder.calculate();
        
    }

    

}