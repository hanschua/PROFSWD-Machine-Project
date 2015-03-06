
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
		
		if (validConnections != null) {
			if(document.getElementById("resistance").checked) {
				series.setPowerUsedForResistors(validConnections);
				series.setCurrent(validConnections);
				updateResistanceGUISeries(validConnections, series.solveResistance());
			}
			else if (document.getElementById("voltage").checked) {
				series.setCurrent(validConnections);
				series.setResistance(validConnections);
				updateVoltageGUI(series.solveVoltage());
			}
			else if (document.getElementById("current").checked) {
				series.setVoltage();
				series.setResistance(validConnections);
				updateCurrentGUISeries(validConnections, series.solveCurrent());
			}
			else {
			// do nothing
			}
		}
	}
	
	function trueRound(value, digits){
		return ((Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits)) * 1;
	}

	
	makeTarget(document.getElementById("voltageInstance"));
	makeSource(voltageInstance, connector);
	makeDraggable(voltageInstance);
	
	function makeSource(id, connector) {
		jsPlumb.makeSource( connector, {
			parent:id,
			anchor: 'Continuous',
			maxConnections: 1, 
			connector: 'Flowchart',
			connectorStyle : { 
				strokeStyle:"#00C5CD",
				lineWidth: 5
			},
			paintStyle: {
				fillStyle: "none"
			}
		});	
	}
	
	function makeTarget(state) {
		jsPlumb.makeTarget(state, {
			anchor: 'Continuous',
			maxConnections: 1, 
			paintStyle: {
				fillStyle: "#FF8360"
		}});
	}
	
	function makeDraggable(id) {
		jsPlumb.draggable(id, {
			containment:"parent"
		});
	}
	
	function remove(state, event) {
		jsPlumb.detachAllConnections($(state));
		//available_nodes.splice(available_nodes.indexOf(state),1);
		$(state).remove();
	}
	
	var resistance_count = 0;
	$(document).on("click", "#resistanceInstance", function () {
	
		var id = "resistance" + resistance_count;
		
		var newState = $('<div>').attr('id', id).addClass('resistance');
		var connector = $('<div>').addClass('connector');
		var title = $('<p>').text(id);
		$(newState).append(title);
		
		newState.append(connector);
		$('#diagramContainer').append(newState);
		
		makeTarget(newState);
		makeSource(id, connector);
		makeDraggable(id);
		//available_nodes.push(newState);
		
		newState.dblclick(function(e) {
			remove(this, e);
		});
		
		resistance_count++;
		
	});
	
	jsPlumb.bind("connection", function(info) {
	
		var connections = jsPlumb.getConnections();
		var lastConnection = connections[connections.length-1];
		
		if(lastConnection.targetId == lastConnection.sourceId)
			jsPlumb.detach(lastConnection);
		else {
			lastConnection.addOverlay([ "Arrow", { foldback:0.2, location:0.75, width:25 } ]);
		}
		
	});
