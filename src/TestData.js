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

        /*
        if(this.boundaryID)
            this.PopulateAIData();
        */

    }

    

}