// parent class
var Circuit = function(voltage, resistors, currents) {
	this.voltage = voltage;
	this.resistors = resistors;
	this.currents = currents;
}

Circuit.prototype.setVoltage = function() {
	var voltage = 0;
		while(isNaN(voltage)|| voltage == 0) {
			voltage = parseFloat(prompt("voltage", "0"));
		}
	var title = (document.getElementById("voltageInstance").children)[0];
	title.innerHTML=voltage;
	this.voltage = voltage;
}

Circuit.prototype.setResistance = function (connections) {
	//to be implemented by children
}

Circuit.prototype.setCurrent = function(connections) {
	//to be implemented by children
}

Circuit.prototype.solveResistance = function() {
	//to be implemented by children
}

Circuit.prototype.solveVoltage = function() {
	//to be implemented by children
}

Circuit.prototype.solveCurrent = function() {
	//to be implemented by children
}

// child class Parallel
function Parallel(voltage, resistors, currents) {
	Circuit.call(this, voltage, resistors, currents);
}

Parallel.prototype = Object.create(Circuit.prototype);
Parallel.prototype.constructor = Parallel;

Parallel.prototype.setResistance = function(connections) {
	var resistance = 0;
	var resistors = new Array();
		
	//for the very first resistance does not have a pattern
		while(isNaN(resistance)|| resistance == 0) {
			resistance = parseFloat(prompt("resistance for " + connections[0].targetId + ".", "0"));
			var element = (document.getElementById(connections[0].targetId).children)[0];
			element.innerHTML=resistance;
			resistors.push({resistance: resistance});
		}
		
		resistance = 0;
		for(var i = 3 ; i < connections.length; i+=2) {
			while(isNaN(resistance)|| resistance == 0) {
				resistance = parseFloat(prompt("resistance for " + connections[i].sourceId + ".", "0"));
			}
			var element = (document.getElementById(connections[i].sourceId).children)[0];
			element.innerHTML=resistance;
			resistors.push({resistance: resistance});
			resistance = 0;
		}
	this.resistors = resistors;
}

Parallel.prototype.setCurrent = function(connections) {
	var current = 0;
	var currents = new Array();
	
	for(var i = 0 ; i < connections.length; i+=2) {
		while(isNaN(current)|| current == 0) {
			current = parseFloat(prompt("current for " + connections[i].sourceId + " - " + connections[i].targetId + " and vice versa.", "0"));
		}
		currents.push(current);
		connections[i].setLabel("" + current);
		connections[i+1].setLabel("" + current);
		current = 0;
	}
	this.currents = currents;
}

Parallel.prototype.solveResistance = function() {
	var resistance = 0;
	for(var i = 0 ; i < this.currents.length; i++) {
		this.resistors.push({resistance: trueRound(this.voltage / this.currents[i], 5)});
	}
	
	return this.resistors;
	//resistance = voltage / current
}

Parallel.prototype.solveVoltage = function() {
	var totalCurrent = 0;
	var totalResistance = 0;
	
	for(var i = 0 ; i < this.currents.length; i++) {
		totalCurrent += this.currents[i];
	}
	
	for(var i = 0 ; i < this.resistors.length; i++) {
		totalResistance += 1/(this.resistors[i].resistance);
	}
	
	this.voltage = trueRound(totalCurrent/(1/totalResistance), 5);
	return this.voltage;
	//voltage = current / 1/resistance
}

Parallel.prototype.solveCurrent = function() {
	for(var i = 0 ; i < this.resistors.length; i++) {
		this.currents.push(trueRound(this.voltage/(this.resistors[i].resistance), 5));
	}		
	
	return this.currents;
	//current = voltage / resistance
}

//child class Series
function Series(voltage, resistors, currents) {
	Circuit.call(this, voltage, resistors, currents);
}

Series.prototype = Object.create(Circuit.prototype);
Series.prototype.constructor = Series;

Series.prototype.setResistance = function(connections) {
		var resistance = 0;
		var resistors = new Array();
		
		for(var i = 0 ; i < connections.length-1; i++) {
			while(isNaN(resistance) || resistance == 0) {
				resistance = parseFloat(prompt("resistance for " + connections[i].targetId + ".", "0"));
				var element = (document.getElementById(connections[i].targetId).children)[0];
				element.innerHTML=resistance;
				resistors.push({resistance: resistance});
			}
			resistance = 0;
		}
		
		this.resistors = resistors;
}

Series.prototype.setCurrent = function(connections) {
	this.currents = parseFloat(prompt("current for entire circuit", "0"));
	
	for(var i = 0 ; i < connections.length; i++) {
		connections[i].setLabel(this.currents + "");
	}
	
}

Series.prototype.setPowerUsedForResistors = function(connections) {
	var powerUsed = 0;
	var resistors = new Array();
		
	//for the very first resistance does not have a pattern
		while(isNaN(powerUsed)|| powerUsed == 0) {
			powerUsed = parseFloat(prompt("powerUsed for " + connections[0].targetId + ".", "0"));
			var element = (document.getElementById(connections[0].targetId).children)[0];
			element.innerHTML=powerUsed;
			resistors.push({powerUsed: powerUsed});
		}
		
		powerUsed = 0;
		for(var i = 2 ; i < connections.length; i++) {
			while(isNaN(powerUsed)|| powerUsed == 0) {
				powerUsed = parseFloat(prompt("powerUsed for " + connections[i].sourceId + ".", "0"));
			}
			var element = (document.getElementById(connections[i].sourceId).children)[0];
			element.innerHTML=powerUsed;
			resistors.push({powerUsed: powerUsed});
			powerUsed = 0;
		}
	this.resistors = resistors;
}

Series.prototype.solveResistance = function() {
	for(var i = 0 ; i < this.resistors.length; i++) {
		this.resistors[i].resistance = trueRound(this.resistors[i].powerUsed / parseFloat(this.currents), 5);
	}
	//resistance = voltage / current
	return this.resistors;
}

Series.prototype.solveVoltage = function() {
	var totalResistance = 0;
	var totalCurrent = this.currents * this.resistors.length;
	
	for(var i = 0; i < this.resistors.length; i++) {
		totalResistance += this.resistors[i].resistance;
	}
	
	this.voltage = trueRound(totalCurrent/(totalResistance), 5);
	return this.voltage;
}

Series.prototype.solveCurrent = function() {
	var totalResistance = 0;
	
	for(var i = 0 ; i < this.resistors.length; i++) {
		totalResistance += this.resistors[i].resistance;
	}
	
	this.currents = trueRound(this.voltage/(totalResistance), 5);
	return this.currents;
	
}

// global method to roundUp
function trueRound(value, digits){
	return ((Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits)) * 1;
}

// object creation
function createObject(proto) {
    function ctor() { }
    ctor.prototype = proto;
    return new ctor();
}
