var LayerStyle = (function() {
    
    var exports = {};
    
    
    //******************************************************************************
    exports.CopyLayerStyle= function(){
        try{
            executeAction( charIDToTypeID( "CpFX" ) , undefined, DialogModes.NO );
            return true;
        }catch(e){
            return false;
        }
    }
         
    //******************************************************************************
    exports.PasteLayerStye = function(){
        try{
            executeAction( charIDToTypeID( "PaFX" ), new ActionDescriptor(), DialogModes.NO );
            return true;
        }catch(e){
            return false;
        }
    }
    
    
    return exports;
 
})();    