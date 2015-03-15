//parent
var UIManager = function() {
}

UIManager.prototype.setVoltage = function(voltage) {
	var title = (document.getElementById("voltageInstance").children)[0];
	title.innerHTML=parseFloat(voltage);
}

UIManager.prototype.getVoltage = function(voltage) {
	var voltage;
	
	voltage = parseFloat(document.getElementById("voltageInstance").children[0].value);
	
	return voltage;
}