 
/*********************************************************/
/*                                                       */
/* layerstofiles                                         */
/*                                                       */
/*                                                       */
/*                                                       */
/*                                                       */
/* make all layers visible on their own, store each      */
/* view to a single png file                             */
/*                                                       */
/*                                                       */
/*                                                       */
/* Bjoern Seip, TURBO D3, www.td3.com                    */
/*                                                       */
/*********************************************************/
 
var target_directory = "C:\\LokaleDaten\\Grafikexport\\";

if (documents.length > 0) 
{ 
        displayDialogs = DialogModes.NO; 

        var workDoc = activeDocument; 

        var temp = new Array();
        
        

        temp = workDoc.layers[0].name.split('_');

        if (temp.length != 4) {
            alert("Fehlerhafter Layername (character_gruppe_sequenz_frame)");
        } else {

        var character = temp[0];
        var group = temp[1];
        // var sequenz = temp[2];
        // var frame = temp[3];
        
        var directory = target_directory + "\\" + character + "\\" + group;
                
        var fldr = new Folder(directory);
        fldr.create();

        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        {
            workDoc.layers[i].visible = false;
        }
    
        for (var i = 0  ; i < workDoc.layers.length ; i++) 
        { 
            if ( workDoc.layers[i].kind == LayerKind.NORMAL) 
	    	{ 
                workDoc.activeLayer = workDoc.layers[i] 
                workDoc.layers[i].visible = true;
                

                pngFile = new File(directory + "\\" + workDoc.activeLayer.name); 
                pngSaveOptions = new PNGSaveOptions;  
                pngSaveOptions.interlaced = false;
                workDoc.saveAs (pngFile, pngSaveOptions, true, Extension.LOWERCASE); 

                workDoc.layers[i].visible = false;
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



