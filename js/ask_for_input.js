function askForPowerUsed(connections) {
	var powerUsed = 0;
	
	for(var i=0; i<connections.length; i++) {
		while(isNaN(powerUsed)|| powerUsed == 0) {
			powerUsed = parseFloat(prompt("power used for " + connections[i].targetId , "0"));
		}
				
		var element = (document.getElementById(connections[i].targetId).children)[0];
		element.innerHTML="\n"+title;
		powerUsed = 0;
	}
}

function updateResistanceGUIParallel(connections, resistors) {
	for(var i = 0; i < connections.length; i+=2) {
		var element = (document.getElementById(connections[i].targetId).children)[0];
		element.innerHTML=resistors[i/2].resistance;
	}
}

function updateResistanceGUISeries(connections, resistors) {

		var element = (document.getElementById(connections[0].targetId).children)[0];
		element.innerHTML=resistors[0].resistance;
		
		for(var i = 2 ; i < connections.length; i++) {
			var element = (document.getElementById(connections[i].sourceId).children)[0];
			element.innerHTML=resistors[i-1].resistance;
		}
}

function updateVoltageGUI(voltage) {
	var title = (document.getElementById("voltageInstance").children)[0];
	title.innerHTML=voltage;
}

function updateCurrentGUIParallel(connections, currents) {
	for(var i = 0 ; i < connections.length; i+=2) {
		connections[i].setLabel(currents[i/2] + "");
		connections[i+1].setLabel(currents[i/2] + "");
	}
}

function updateCurrentGUISeries(connections, currents) {
	for(var i = 0 ; i < connections.length; i++) {
		connections[i].setLabel(currents + "");
	}
}