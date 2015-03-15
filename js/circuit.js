// parent class
var Circuit = function(voltage, resistors, currents) {
	this.voltage = voltage;
	this.resistors = resistors;
	this.currents = currents;
}

Circuit.prototype.setVoltage = function(voltage) {
	this.voltage = voltage;
}

Circuit.prototype.setResistance = function (resistors) {
	this.resistors = resistors;
}

Circuit.prototype.setCurrent = function(currents) {
	this.currents = currents;
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