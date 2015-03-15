// child class Parallel
function Parallel(voltage, resistors, currents) {
	Circuit.call(this, voltage, resistors, currents);
}

Parallel.prototype = Object.create(Circuit.prototype);
Parallel.prototype.constructor = Parallel;

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
