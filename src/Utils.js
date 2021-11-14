
export default class Utils {

    static GetPropertyByName = (propertyName, objectProps) => {    
        for(var i = 0; i < objectProps.length; i++){
            let prop = objectProps[i];
            
            if(prop.name == propertyName)
                return prop.value;

        }

        console.log("Property [" + propertyName +"] not found.");
        return null;


    }

    static GetRandomIntBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    static GetCanvasWidth = (scene) => {
        return scene.sys.game.canvas.width;
    }
    
    static GetCanvasHeight = (scene) => {
        return scene.sys.game.canvas.height;
    }

}