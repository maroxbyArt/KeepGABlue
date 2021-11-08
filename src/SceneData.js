import Portal from 'Portal.js'
import PortalData from 'PortalData.js'
//import InteractableData from 'InteractableData.js'
import Room from 'Room.js'
import InteractableData from 'TestData.js'


export default class SceneData {

    constructor(scene) {
        
        this.scene = scene;
        this.map = scene.map;

        //this.rooms = [];
        //this.portals = scene.physics.add.group();
        this.currPortal;
        this.prevPortal;

        this.currRoom;
        this.prevRoom;

        this.Initialize();

    }

    Initialize = () => {
        this.ParsePortalData();
        this.ParseRoomData();
        this.ParseInteractablesData();


    }


    GetPortalByID(id){
        array.forEach(e => {
            if(e.id == id)
                return e;
        });

        console.log("Portal [" + id +"] not found.");
    }

    ParseInteractablesData = () => {
        var interactableObjs = this.map.getObjectLayer('Interactables')['objects'];
        this.scene.interactables = this.scene.physics.add.staticGroup();

        interactableObjs.forEach(obj => {
            console.log("FOUND INTERACTABLE: " + JSON.stringify(obj));

            let currObj = this.scene.interactables.create(
                obj.x, obj.y, "sign"
            );
            currObj.setScale(obj.width/34, obj.height/34);
            currObj.setOrigin(0);
            
            currObj.body.width = obj.width;
            currObj.body.height = obj.height;

            currObj.setData("properties", obj.properties);
            currObj.setData("interactableData", new InteractableData(obj));

        });

    }

    ParsePortalData = () => {

        this.map.findObject('Portal', function(object) {
            //console.log("BASE PORTAL OBJ: " + JSON.stringify(object))
            var newPortal = new Portal(this.scene, object.x, object.y, object);

            this.scene.portals.add(
                newPortal
            );
            

            //newPortal.data = Object.create();
            newPortal.setData("properties", object.properties);
            newPortal.setData("portalData", new PortalData(object));

            //newPortal.data.object["properties"] = object.properties;
            //newPortal.data["properties"] = object.properties;
            //console.log("BASE PORTAL OBJ [newPortal]: " + JSON.stringify(newPortal.getData("properties")));


        }, this);

        //this.scene.portals.refresh();


    }

    ParseRoomData = () => {
        this.map.findObject('Rooms', function(object) {

            var newRoom = new Room(object);
            this.scene.rooms.push(newRoom);

        }, this);

    }



}

