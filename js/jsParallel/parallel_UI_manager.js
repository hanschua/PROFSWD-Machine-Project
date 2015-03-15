function ParallelUIManager() {
	UIManager.call(this);
}

ParallelUIManager.prototype = Object.create(UIManager.prototype);
ParallelUIManager.prototype.constructor = ParallelUIManager;

ParallelUIManager.prototype.setResistance = function(connections, resistance){

//for the very first resistance does not have a pattern
	var element = (document.getElementById(connections[0].targetId).children)[0];
	element.innerHTML=parseFloat(resistance[0].resistance);
	
		
	var counter = 1;
	for(var i = 3 ; i < connections.length; i+=2) {
		var element = (document.getElementById(connections[i].sourceId).children)[0];
		element.innerHTML=parseFloat(resistance[counter].resistance);
		counter++;
	}
}

ParallelUIManager.prototype.setCurrent = function(connections, current) {
	var counter = 0;
	
	for(var i = 0 ; i < connections.length; i+=2) {
		connections[i].setLabel("" + parseFloat(current[counter]));
		connections[i+1].setLabel("" + parseFloat(current[counter]));
		counter++;
	}
}

ParallelUIManager.prototype.getResistance = function(connections) {
	var resistance = new Array();

//for the very first resistance does not have a pattern
	resistance.push(parseFloat((document.getElementById(connections[0].targetId).children)[0].value));
		
	for(var i = 3 ; i < connections.length; i+=2) {
		resistance.push(parseFloat((document.getElementById(connections[i].sourceId).children)[0].value));
	}
	
	return resistance;
}

ParallelUIManager.prototype.getCurrent = function(connections) {
	var current = new Array();
	
	for(var i = 0 ; i < connections.length; i+=2) {
		current.push(parseFloat(connections[i].getLabel()));
	}
	
	return current;
}

