 
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
 
ansicodes = Array(
" ", "!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", ",", "-", ".", "/", 
"0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C",
"D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W",
"X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k",
"l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"," ",
"€","","‚","ƒ","„","…","†","‡","ˆ","‰","Š","‹","Œ","","Ž","","","‘","’","“",
"”","•","–","—","˜","™","š","›","œ","","ž","Ÿ"," ","¡","¢","£","¤","¥","¦","§",
"¨","©","ª","«","¬","­","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»",
"¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï",
"Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã",
"ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷",
"ø","ù","ú","û","ü","ý","þ","ÿ"," ");         


if (documents.length > 0) 
{ 
        displayDialogs = DialogModes.NO; 

        var workDoc = activeDocument; 

        var c_height = 7;
        var c_width  = 5;
        var rows = 14;
        var cols = 16;
            
        var c = 32;
            
        workDoc.resizeCanvas(c_width * cols, c_height * rows);
            
        for (r = 0; r < rows; r++)
        {
              for (col = 0; col < cols; col++)
              {
                var layer = workDoc.artLayers.add();
                layer.kind = LayerKind.TEXT;
                workDoc.activeLayer = layer;
                layer.textItem.position = Array(col * c_width, c_height * (r+1) -0);
                layer.textItem.antiAliasMethod = AntiAlias.NONE;
                layer.textItem.font = "ComicSansMS";
                layer.textItem.size = 8;
                layer.textItem.fauxBold = false;
                if (c < 256) layer.textItem.contents = ansicodes[c-32];
                else layer.textItem.contents = ' ';
                layer.merge();
                c++;
              }
              WaitForRedraw();
        }
            
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


