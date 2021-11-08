import mapJSON from 'img/home.json';
import tilesSS from 'img/tiles.png';
import sign from 'img/sign.png';
import playerImg from 'img/playerGrid.png';
import Player from 'Player.js'
import SceneData from 'SceneData.js'
import ModalData from 'ModalData.js'

import Utils from 'Utils.js'
import Portals from 'Portals.js'
import Rooms from 'Rooms.js'

var cursors;


/**
 * Class representing a level (https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
 * @extends Phaser.Scene
 */
 export default class Level extends Phaser.Scene {

    /** Create the level. */
    constructor() {
        super({key: 'level'});

        this.isFading = false;
    }

    /** Load assets. */
    preload() {

        this.load.spritesheet(
            'trainer', 
            playerImg, 
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0, 
                margin: 0,
                spacing: 0
            }
        );


        this.load.image("tiles", tilesSS);
        this.load.tilemapTiledJSON('level-1', mapJSON);

        this.load.image("sign", sign);

    }

    /** Setup level. */
    create() {

        // Make map of level 1.
        this.map = this.make.tilemap({key: "level-1"});
        this.loadingModal = false;

        // Define tiles used in map.
        const tileset = this.map.addTilesetImage("base",  "tiles", 32, 32);

        this.player = new Player(this.scene.scene, 400, 300, 'trainer');

        // The map layers.
        this.belowLayer = this.map.createStaticLayer("Background", tileset, 0, 0);

        this.worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
        this.worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.worldLayer);

        this.hSLayer = this.map.createStaticLayer("Hotspots", tileset, 0, 0);
        


        cursors = this.input.keyboard.createCursorKeys();

        // Set physics boundaries from map width and height.
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        
        // Setup things in this level.
        this.rooms = [];
        this.portals = this.physics.add.group();﻿
        this.portalRelease;
        this.isLoading = false;

        this.data = new SceneData(this);

        //INIT INTERACTABLES
        this.InitInteractables();

        //Add Colliders
        this.InitColliders();


        // start camera
        this.LoadRoom("main");
        

    }

    /** Update called every tick. */
    update(time, delta) {


        //this.cameras.main._ch = this.map.heightInPixels;
        //this.cameras.main._cw = this.map.widthInPixels;

        
        // On player room change, stop player movement, fade camerea, and set boundaries.

        if (this.player.roomChange && !this.isFading) {

            /*
            this.isFading = true;

            this.cameras.main.fadeOut(500, 0, 0, 0, function(camera, progress){                
                if(progress == 1){

                    var targetRoom = Rooms.GetRoomByID(this.player.currentRoom, this.rooms);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log("Target Room: " + targetRoom);
                    console.log("Target Room[x]: " + targetRoom.x);
                    console.log("Target Room[y]: " + targetRoom.y);
                    console.log("Target Room[width]: " + targetRoom.width);
                    console.log("Target Room[height]: " + targetRoom.height);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");


                    // Change camera boundaries when fade out complete.
                    this.OnLoadRoom(Portals.GetPortalByID(this.player.currentRoom, this.portals.getChildren()));


                    this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
                        
                        if (progress === 1) {



                            this.player.roomChange = false;
                            this.player.canMove = true;
                            this.isFading = false;


                        }
                        
                    }, this);

                }

            });
            */


        }
        

    }


    ShowModal = (currInteractableData) => {

        var activeScenes = this.scene.manager.getScenes(true);
        var modalScene = this.scene.manager.getScene("modal");

        if(this.scene.manager.isActive("modal") || this.loadingModal == false){

            var modalData = new ModalData(this.scene.key, currInteractableData);

            this.scene.manager.start("modal", modalData);
            this.scene.manager.bringToTop("modal");
            this.scene.manager.pause(this.scene.key);

            this.loadingModal = true;


        }

    }

    InitInteractables = () => {


        this.physics.add.collider(
            this.player, 
            this.interactables,
            (player, interactable) => {
                
                var interactableData = interactable.getData("interactableData");

                //TESTING
                this.input.keyboard.on('keydown-SPACE', function () {
                    //console.log("COLLISION [interactable]: " + JSON.stringify(interactable));
                    //console.log("COLLISION [interactableData]: " + JSON.stringify(interactableData));

                    this.ShowModal(interactableData);


                }, this);

            }
        );


    }

    InitCameras = () => {

        this.cameras.main.setZoom(2.0);

        // Set first room boundaries.
        this.cameras.main.setBounds(
            this.rooms[this.player.currentRoom].x,
            this.rooms[this.player.currentRoom].y,
            this.rooms[this.player.currentRoom].width,
            this.rooms[this.player.currentRoom].height,
            true
        );
        

        this.cameras.main.startFollow(this.player);

    }
    
    InitColliders = () => {

        // Add collisions.
        //this.physics.add.collider(this.player, this.worldLayer);

        this.physics.add.overlap(
            this.player,  
            this.portals,    
            (player, portal) => {

                var data = portal.getData("portalData")
                var isSuspendedPortal = data.suspend;

                if(this.player.roomChange || this.isLoading){
                    return false;
            
                } else if (isSuspendedPortal) {
                    this.MarkPortalForSuspendRelease(data);

                } else {

                    this.isLoading = true;
                    this.player.SuspendPlayer();

                    this.OnPortalCollision(player, portal);
                    return true;
                }

            },
            () => {},
            true

        );


        //console.log("INIT COLLIDERS");
        var portalsArray = this.portals.getChildren();

        //console.log("PORTALS count: " + portalsArray.length);

        
        for(var i = 0; i < portalsArray.length; i++){
            var currChild = portalsArray[i];
            //console.log("CURR CHILD: " + JSON.stringify(currChild));

            //currChild.InitializeCollider();


        }
        


    }

    MarkPortalForSuspendRelease = (portalData) => {
        if(this.portalRelease != null)
            window.clearTimeout(this.portalRelease);

        this.portalRelease = window.setTimeout(
            () => {
                portalData.suspend = false;
                this.portalRelease = null;

            },
            100
        );
    }

    OnPortalCollision = (player, portal) => {
        var collPortalData = portal.getData("portalData");

        var toPortalID = collPortalData.portalLink;        
        var targetPortal = Portals.GetPortalByID(
            toPortalID, this.portals.getChildren()
        );

        this.InitPortalData(portal);
        this.InitRoomData(targetPortal);
        

    }


    InitRoomData = (targetPortal) => {
        var targetRoom = Rooms.GetRoomByID(targetPortal.room, this.rooms);
        
        this.data.prevRoom = this.data.currRoom;
        this.data.currRoom = targetRoom;

        this.LoadRoom(targetRoom, targetPortal);


    }

    InitPortalData = (activePortal) => {

        // == FROM PORTAL DATA == //
        var fromPortal = activePortal;
        var fromPortalData = fromPortal.getData("portalData");
        fromPortalData.suspend = true;

        // == TO PORTAL DATA == //
        var toPortal = Portals.GetPortalByID(fromPortalData.portalLink, this.portals.getChildren());
        var toPortalData = toPortal.getData("portalData");
        toPortalData.suspend = true;

        // == CACHE DATA == //
        this.data.prevPortal = fromPortal;
        this.data.currPortal = toPortal;


    }


    LoadRoom = (toRoomObj, toPortalObj = null) => {
        console.log("LOAD ROOM: " + JSON.stringify(toRoomObj));
        this.player.currentRoom = toRoomObj.id;

        if(toPortalObj != null){
            this.player.x = toPortalObj.x;
            this.player.y = toPortalObj.y;

            this.OnLoadRoom(toPortalObj);
        }

    }

    OnLoadRoom = (targetPortal) => {

        console.log("target portal: " + JSON.stringify(targetPortal));

        this.cameras.main.setBounds(
            this.data.currRoom.x,
            this.data.currRoom.y,
            this.data.currRoom.width,
            this.data.currRoom.height,
            true
        );        

        this.data.currPortal.suspend = true;
        this.data.prevPortal.suspend = true;

        this.PortPlayer(targetPortal);


    }

    PortPlayer = (toPortal) => {
        this.player.x = toPortal.x;
        this.player.y = toPortal.y;

        this.OnPortComplete();

    }

    OnPortComplete = () => {
        this.player.EnablePlayer();
        this.isLoading = false;

    }

}