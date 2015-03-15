function SeriesUIManager() {
	UIManager.call(this);
}

SeriesUIManager.prototype = Object.create(UIManager.prototype);
SeriesUIManager.prototype.constructor = SeriesUIManager;

SeriesUIManager.prototype.setResistance = function(connections, resistors){

	var counter = 0;
	
	for(var i = 0 ; i < connections.length-1; i++) {
		var element = (document.getElementById(connections[i].targetId).children)[0];
		element.innerHTML=resistors[counter].resistance;
		counter++;
	}
		
}

SeriesUIManager.prototype.setCurrent = function(connections, current) {
	
	for(var i = 0 ; i < connections.length; i++) {
		connections[i].setLabel(current + "");
	}
}

SeriesUIManager.prototype.setPowerUsed = function(connections, resistors) {
	
	var counter = 0;
	
	for(var i = 0 ; i < connections.length-1; i++) {
		var element = (document.getElementById(connections[i].targetId).children)[0];
		element.innerHTML=resistors[counter].powerUsed;
		counter++;
	}
}

SeriesUIManager.prototype.getResistance = function(connections) {
	var resistors = new Array();

	for(var i = 0 ; i < connections.length-1; i++) {
		resistors.push(parseFloat((document.getElementById(connections[i].targetId).children)[0].value));
	}
	
	return resistors;
}

SeriesUIManager.prototype.getCurrent = function(connections) {
	var current = new Array();
	
	for(var i = 0 ; i < connections.length; i++) {
		currents.push(parseFloat(connections[i].getLabel(current + "")));
	}
	
	return current;
}

SeriesUIManager.prototype.getPowerUsed = function(connections) {
	var resistors = new Array();

	for(var i = 0 ; i < connections.length-1; i++) {
		resistors.push(parseFloat((document.getElementById(connections[i].targetId).children)[0].value));
	}
	
	return resistors;
}