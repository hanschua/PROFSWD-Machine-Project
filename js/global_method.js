// global method to roundUp
function trueRound(value, digits){
	return ((Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits)) * 1;
}

function save(id) {
	var textFile = null;
	
	var text = makeText();
	
    var data = new Blob([text], {type: 'text/plain'});
	
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);
	var link = document.getElementById(id);
	
	//alert(position.top);
    link.href = textFile;
	
    //return textFile;
}

function makeText() {
	//var connections = validateGUI();
	var connections = jsPlumb.getConnections();
	var text = "";

	for(var i = 0; i < connections.length; i++) {
		//id
		var source = connections[i].sourceId;
		var target = connections[i].targetId;
		text += source + " - " + target + "\n";
		
		//location
		var positionSource = $('#'+source).position();
		text += "( " + positionSource.left + ", " + positionSource.top + " )" + " - ";
		
		var positionTarget = $('#'+target).position();
		text += "( " + positionTarget.left + ", " + positionTarget.top + " )" + "\n";
		
		//value
		var valueSource = (document.getElementById(source).children)[0];
		text += valueSource.innerHTML + " - ";
		
		var valueTarget = (document.getElementById(target).children)[0];
		text += valueTarget.innerHTML + "\n";
		
		//current
		text += connections[i].getLabel() + "\n";
	}
	
	return text;
}

function initialize() {
	var connections = jsPlumb.getConnections();
		for(var i = 0 ; i < connections.length; i++) {
			if(connections[i].sourceId != 'voltageInstance') {
				console.log(connections[i].sourceId);
				jsPlumb.detachAllConnections($("#"+connections[i].sourceId));
				//available_nodes.splice(available_nodes.indexOf(state),1);
				$("#"+connections[i].sourceId).remove();
			}
		}
	}