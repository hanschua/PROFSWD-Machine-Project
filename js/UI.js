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

UIManager.prototype.init = function(connections) {
	for(var i = 0; i < connections.length; i++) {
		
		var element = (document.getElementById(connections[i].sourceId).children)[0];
		if(connections[i].sourceId != 'voltageInstance')
			element.innerHTML=connections[i].sourceId;
		else
			element.innerHTML= 'V';
		
		
		connections[i].setLabel("");
	}
}