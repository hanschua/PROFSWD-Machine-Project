
	function solve() {
		var parallel = new Parallel(null, new Array(), new Array());
		
		var connections = jsPlumb.getConnections();
		
		if(document.getElementById("resistance").checked) {
			//create a parallel circuit
			parallel.setVoltage();
			parallel.setCurrent(connections);
			updateResistanceGUIParallel(connections, parallel.solveResistance());
		}
		else if (document.getElementById("voltage").checked) {
		
			parallel.setResistance(connections);
			parallel.setCurrent(connections);
			updateVoltageGUI(parallel.solveVoltage());
		}
		else if (document.getElementById("current").checked) {
			
			parallel.setVoltage();
			parallel.setResistance(connections);
			updateCurrentGUIParallel(connections, parallel.solveCurrent());
		}
		else {
			// do nothing
		}
	}

	jsPlumb.importDefaults({
		ConnectionsDetachable: false,
	});

	makeDraggable("voltageInstance");

	function connect(source, target) {
		jsPlumb.connect({
			source: source,
			target: target,
			anchor: 'Continuous',
			endpointStyles:[ 
			{ 	fillStyle:"none"},
			{ 	fillStyle:"none" }
			],
			paintStyle:{ strokeStyle:"#00C5CD", lineWidth:5 },
			connector:'Flowchart'
		});
	}

	function makeDraggable(id) {
		jsPlumb.draggable(id, {
			containment:"parent"
		});
	}

	function remove(state, event) {
		jsPlumb.detachAllConnections($(state));
		$(state).remove();
	}


	var resistance_count = 0;
	$(document).on("click", "#resistanceInstance", function () {
		
		var id = "resistance" + resistance_count;
		
		var newState = $('<div>').attr('id', id).addClass('resistance');
		var title = $('<p>').text(id);
		$(newState).append(title);
		
		$('#diagramContainer').append(newState);
		
		connect("voltageInstance", id);
		connect(id, "voltageInstance");
		
		makeDraggable(id);
		
		
		newState.dblclick(function(e) {
			remove(this, e);
		});
		
		resistance_count++;
		
	});

	jsPlumb.bind("connection", function(info) {
		var connections = jsPlumb.getConnections();
		var lastConnection = connections[connections.length-1];
		lastConnection.addOverlay([ "Arrow", { foldback:0.2, location:0.75, width:25 } ]);
	});
