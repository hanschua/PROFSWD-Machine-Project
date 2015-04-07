function validateFileSeries(file) {
	var extension = file.name.substring(file.name.lastIndexOf('.'));
	if(extension.toLowerCase() != '.series') {
		showNotice("Wrong file extension");
		return false;
	}
	return true;
}

function loadSeries() {
       //Retrieve the first (and only!) File from the FileList object
	initialize(); 
	 
    var file = document.getElementById("uploadFile").files;
	var f = file[0];

    if (f && validateFileSeries(f)) {
      var r = new FileReader();
      r.onload = function(e) { 
	    var contents = e.target.result;
		var lines = contents.split('\n');
		
		for(var i = 0 ; i < lines.length-1; i+=4) {
			var source = lines[i].substring(0, lines[i].lastIndexOf('-')-1);
			var target = lines[i].substring(lines[i].lastIndexOf('-')+2, lines[i].length);
			
			if(target != 'voltageInstance') {
				var locationLeft = parseFloat(lines[i+1].substring(lines[i+1].lastIndexOf('(')+2, lines[i+1].lastIndexOf(',')));
				var locationTop = parseFloat(lines[i+1].substring(lines[i+1].lastIndexOf(',')+2, lines[i+1].lastIndexOf(')')-1));
			//document.getElementById(id).style.left = locationLeft + "px";
			//document.getElementById(id).style.top = locationTop + "px";
				var value = lines[i+2].substring(lines[i+2].indexOf('-')+2, lines[i+2].length);
				var label = lines[i+3];
				
				//console.log(value);
			
				loadSeriesView(source, target, locationTop, locationLeft, value, label);
			}
			else if(target == 'voltageInstance') {
				var locationLeft = parseFloat(lines[i+1].substring(lines[i+1].lastIndexOf('(')+2, lines[i+1].lastIndexOf(',')));
				var locationTop = parseFloat(lines[i+1].substring(lines[i+1].lastIndexOf(',')+2, lines[i+1].lastIndexOf(')')-1));
				document.getElementById(target).style.left = locationLeft + "px";
				document.getElementById(target).style.top = locationTop + "px";
				document.getElementById(target).children[0].innerHTML = lines[i+2].substring(lines[i+2].indexOf('-')+2, lines[i+2].length);
				var label = lines[i+3];
				connect(source, target, label);
			}
		
			
			
		}
    }
		r.readAsText(f);
		return f;
    } else { 
      return null;
    }
}

