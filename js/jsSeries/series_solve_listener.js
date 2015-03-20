
function validateGUI() {
	var finalConnections = [];
	var connections = jsPlumb.getConnections();
	
	for(var k = 0 ; k < connections.length; k++) {
		if(connections[k].sourceId == "voltageInstance") {
			finalConnections.push(connections[k]);
			break;
		}
	}
	
	var i = 0;
	if(finalConnections.length > 0) {
		for(var j = 0; j < connections.length-1; j++) {
			for(var k = 0; k < connections.length; k++) {
				if(connections[k].sourceId == finalConnections[i].targetId) {
					finalConnections.push(connections[k]);
					i++;
					break;
				}
			}
		}
	
		for(var k = 0 ; k < finalConnections.length; k++) {
			console.log(finalConnections[k].sourceId + " - " + finalConnections[k].targetId);
		}
	
		if(finalConnections[0].sourceId == "voltageInstance" && finalConnections[finalConnections.length-1].targetId == "voltageInstance") {
			return finalConnections;
		}
		else {
			return null
		}
	}
}

function solve() {
	var validConnections = validateGUI();
	var series = new Series(null, new Array(), null);
	var seriesUIManager = new SeriesUIManager();
	
	if (validConnections != null) {
		if(document.getElementById("resistance").checked) {
			var voltage = askVoltage();
			seriesUIManager.setVoltage(voltage);
			series.setVoltage(voltage);
		
			var powerUsed = askPowerUsed(validConnections);
			seriesUIManager.setPowerUsed(validConnections, powerUsed);
			series.setResistance(powerUsed);
			
			var currents = askCurrent();
			seriesUIManager.setCurrent(validConnections, currents);
			series.setCurrent(currents);
			
			seriesUIManager.setResistance(validConnections, series.solveResistance());
		}
		else if (document.getElementById("voltage").checked) {
			var currents = askCurrent();
			seriesUIManager.setCurrent(validConnections, currents);
			series.setCurrent(currents);
			
			var resistance = askResistance(validConnections);
			seriesUIManager.setResistance(validConnections, resistance);
			series.setResistance(resistance);

			seriesUIManager.setVoltage(series.solveVoltage());
		}
		else if (document.getElementById("current").checked) {
			var voltage = askVoltage();
			seriesUIManager.setVoltage(voltage);
			series.setVoltage(voltage);
			
			var resistance = askResistance(validConnections);
			seriesUIManager.setResistance(validConnections, resistance);
			series.setResistance(resistance);

			seriesUIManager.setCurrent(validConnections, series.solveCurrent());
		}
		else {
		// do nothing
		}
	}
}


function askResistance(connections) {
	var resistors = new Array();
	var resistance = 0;
	
	for(var i = 0 ; i < connections.length-1; i++) {
		while(isNaN(resistance) || resistance == 0) {
			resistance = parseFloat(prompt("resistance for " + connections[i].targetId + " :", "0"));
		}
		resistors.push({resistance: resistance});
		resistance = 0;
	}
	return resistors;
}

function askVoltage() {
	var voltage = 0;
		while(isNaN(voltage) || voltage == 0) {
			voltage = parseFloat(prompt("voltage: " , "0"));
		}

	return voltage;
}

function askCurrent() {

	var current = 0;
	while(isNaN(current) || current == 0) {
		current = parseFloat(prompt("current for entire circuit: " , "0"));
	}
		
	return current;
}

function askPowerUsed(connections) {
	var resistors = new Array();
	var powerUsed = 0;
	
	for(var i = 0 ; i < connections.length-1; i++) {
		while(isNaN(powerUsed) || powerUsed == 0) {
			powerUsed = parseFloat(prompt("powerUsed for " + connections[i].targetId + " :", "0"));
		}
		resistors.push({powerUsed: powerUsed});
		powerUsed = 0;
	}
	return resistors;
}
