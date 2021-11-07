import Utils from 'Utils.js'

export default class PortalData {

    constructor(tileObj) {
        this.properties = tileObj.properties;

        this.id =  tileObj.id;
        this.name = tileObj.name;

        this.room = Utils.GetPropertyByName("room", this.properties);
        this.suffix = Utils.GetPropertyByName("suffix", this.properties);
        this.portalLink = Utils.GetPropertyByName("portal_link", this.properties);
        
        this.suspend = false;
        this.occupied = false

    }


}