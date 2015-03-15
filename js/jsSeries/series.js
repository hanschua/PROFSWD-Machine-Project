//child class Series
function Series(voltage, resistors, currents) {
	Circuit.call(this, voltage, resistors, currents);
}

Series.prototype = Object.create(Circuit.prototype);
Series.prototype.constructor = Series;


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

