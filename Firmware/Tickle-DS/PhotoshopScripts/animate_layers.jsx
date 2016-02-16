 
/*********************************************************/
/*                                                       */
/* animate_layers                                        */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/* switch visibility of layers at a fixed framerate      */
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

        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        {
            workDoc.layers[i].visible = false;
        }
    
        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        { 
            if ( workDoc.layers[workDoc.layers.length - 1 - i].kind == LayerKind.NORMAL) 
	    	{ 
	    	    workDoc.activeLayer.visible = false;
                workDoc.activeLayer = workDoc.layers[workDoc.layers.length - 1 - i];
                workDoc.activeLayer.visible = true;
                WaitForRedraw();
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


function WaitForRedraw()
{
	var eventWait = charIDToTypeID('Wait');
	var enumRedrawComplete = charIDToTypeID('RdCm');
	var typeState = charIDToTypeID('Stte');
	var keyState = charIDToTypeID('Stte');
	var desc = new ActionDescriptor();
	desc.putEnumerated(keyState, typeState, enumRedrawComplete);
	executeAction(eventWait,desc,DialogModes.NO);
}


