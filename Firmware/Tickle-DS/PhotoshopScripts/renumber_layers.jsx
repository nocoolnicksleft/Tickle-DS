 
/*********************************************************/
/*                                                       */
/* renumber_layers                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/* rename all layers according to the name of layer 0    */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/* Bjoern Seip, TURBO D3, www.td3.com                    */
/*                                                       */
/*********************************************************/
 

if (documents.length > 0) 
{ 
        displayDialogs = DialogModes.NO; 

        var workDoc = activeDocument; 

        var temp = new Array();
        temp = workDoc.layers[workDoc.layers.length - 1].name.split('_');

        if (temp.length != 4) {
            alert("Fehlerhafter Layername (character_gruppe_sequenz_frame)");
        } else {

        var character = temp[0];
        var group = temp[1];
        var sequenz = temp[2];
        var frame = temp[3];
    
        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        { 
            if ( workDoc.layers[workDoc.layers.length - 1 - i].kind == LayerKind.NORMAL) 
	    	{ 
                workDoc.activeLayer = workDoc.layers[workDoc.layers.length - 1 - i];
                workDoc.activeLayer.name = character + "_" + group + "_" + sequenz + "_" + i;
            } 
        }
        
        }
        
        workDoc.layers[0].visible = true;
        workDoc.activeLayer = workDoc.layers[0];
} 
else 
{ 
    alert("No document found!"); 
} 

workDoc = null 



