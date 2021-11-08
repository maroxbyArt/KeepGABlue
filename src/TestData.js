import Utils from 'Utils.js'

export default class InteractableData {
        
    constructor(tileObj) {
        this.properties = tileObj.properties;

        this.id =  tileObj.id;
        this.name = tileObj.name;

        this.copy = Utils.GetPropertyByName("copy", this.properties);


    }
    

}