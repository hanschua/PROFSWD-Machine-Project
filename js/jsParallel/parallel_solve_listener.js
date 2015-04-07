function solve() {

	var parallel = new Parallel(null, new Array(), new Array());
	var parallelUIManager = new ParallelUIManager();
	var connections = jsPlumb.getConnections();
	parallelUIManager.init(connections);
	
	if(document.getElementById("resistance").checked) {
		var voltage = askVoltage();
		parallelUIManager.setVoltage(voltage);
		parallel.setVoltage(voltage);
		
		var currents = askCurrent(connections);
		parallelUIManager.setCurrent(connections, currents);
		parallel.setCurrent(currents);
		
		
		parallelUIManager.setResistance(connections, parallel.solveResistance());
	}
	else if (document.getElementById("voltage").checked) {
		var currents = askCurrent(connections);
		parallelUIManager.setCurrent(connections, currents);
		parallel.setCurrent(currents);
		
		var resistors = askResistance(connections);
		parallelUIManager.setResistance(connections, resistors);
		parallel.setResistance(resistors);

		
		parallelUIManager.setVoltage(parallel.solveVoltage());
	}
	else if (document.getElementById("current").checked) {
		var voltage = askVoltage();
		parallelUIManager.setVoltage(voltage);
		parallel.setVoltage(voltage);
		
		var resistors = askResistance(connections);
		parallelUIManager.setResistance(connections, resistors);
		parallel.setResistance(resistors);

		parallelUIManager.setCurrent(connections, parallel.solveCurrent());
	}
	else {
		// do nothing
	}
	
}

function askResistance(connections) {

	var resistors = new Array();
	var resistance = 0;
	
	while(isNaN(resistance) || resistance == 0) {
		resistance = parseFloat(prompt("resistance for " + connections[0].targetId + " :", "0"));
	}
	resistors.push({resistance: resistance});
	
	for(var i = 3 ; i < connections.length; i+=2) {
		resistance = 0;
		while(isNaN(resistance) || resistance == 0) {
			resistance = parseFloat(prompt("resistance for " + connections[i].sourceId + " :", "0"));
		}
		resistors.push({resistance: resistance});
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

function askCurrent(connections) {

	var currents = new Array();
	var current = 0;
		
	for(var i = 0; i < connections.length; i+=2) {
		current = 0;
		while(isNaN(current) || current == 0) {
			current = parseFloat(prompt("current for " + connections[i].sourceId + " to " + connections[i].targetId + " and vice versa: " , "0"));
		}
		currents.push(current);		
	}
	return currents;
	
}
