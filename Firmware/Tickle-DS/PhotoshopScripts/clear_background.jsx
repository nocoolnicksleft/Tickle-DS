 
/*********************************************************/
/*                                                       */
/* clear_background                                      */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/* delete connected white and black pixels of all layers */
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
			if (workDoc.layers[i].name == "Hintergrund") workDoc.layers[i].remove();
		}

        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        { 
            workDoc.activeLayer = workDoc.layers[i];
            
            workDoc.selection.select(Array(Array(0,0),Array(0,1),Array(1,1),Array(1,0),Array(0,0)));
            workDoc.selection.grow(0,false);
            workDoc.selection.clear();
            workDoc.selection.select(Array(Array(1,1),Array(1,2),Array(2,2),Array(2,1),Array(1,1)));
            workDoc.selection.grow(0,false);
            workDoc.selection.clear();
            
            workDoc.activeLayer.visible = false;
        }
        
        workDoc.selection.deselect();
        
        workDoc.layers[workDoc.layers.length-1].visible = true;
        workDoc.activeLayer = workDoc.layers[workDoc.layers.length-1];
} 
else 
{ 
    alert("No document found!"); 
} 

workDoc = null 



