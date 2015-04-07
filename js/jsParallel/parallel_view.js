
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
		
		var id = "R" + resistance_count;
		
		var newState = $('<div>').attr('id', id).addClass('resistance');
		var title = $('<p>').text(id);
		$(newState).append(title);
		
		$('#diagramContainer').append(newState);
		
		connect("voltageInstance", id);
		connect(id, "voltageInstance");
		
		makeDraggable(id);
		
		if(jQuery.isTouchCapable()){
			newState.doubletap(function(e) {
				remove(this, e);
			});
		}
		else {
			newState.dblclick(function(e) {
				remove(this, e);
			});
		}
		
		resistance_count++;
		
	});

	jsPlumb.bind("connection", function(info) {
		var connections = jsPlumb.getConnections();
		var lastConnection = connections[connections.length-1];
		lastConnection.addOverlay([ "Arrow", { foldback:0.85, location:0.50, width:25 } ]);
	});
	
	$(window).resize(function(){
		jsPlumb.repaintEverything();
	});

	function connectLoad(source, target, label) {
		console.log(label);
		if(target != 'voltageInstance') {
			jsPlumb.connect({
				source: source,
				target: target,
				anchor: 'Continuous',
				endpointStyles:[ 
				{ 	fillStyle:"none"},
				{ 	fillStyle:"none"}
				],
				paintStyle:{ strokeStyle:"#00C5CD", lineWidth:5 },
				connector:'Flowchart',
				overlays:[ 
					[ "Label", { label:label } ]
				],
			});
		}
		else {
			jsPlumb.connect({
				source: "R" + (resistance_count - 1),
				target: target,
				anchor: 'Continuous',
				endpointStyles:[ 
				{ 	fillStyle:"none"},
				{ 	fillStyle:"none"}
				],
				paintStyle:{ strokeStyle:"#00C5CD", lineWidth:5 },
				connector:'Flowchart',
				overlays:[ 
					[ "Label", { label:label } ]
				],
			});
		}
	}
	
	function loadParallelView(source, target, x, y, value, label) {
	
		var id = "R" + resistance_count;
		
		var newState = $('<div>').attr('id', id).addClass('resistance');
		
		newState.css({
			'top': x + "px",
			'left': y + "px"
		});
		
		//var connector = $('<div>').addClass('connector');
		var title = $('<p>').text(value);
		$(newState).append(title);
		
		//newState.append(connector);
		$('#diagramContainer').append(newState);
		
		//makeTarget(newState);
		//makeSource(id, connector);
		makeDraggable(id);
		
		
		if(source == 'voltageInstance')
			connectLoad(source, id, label);
		else
			connectLoad("R" + (resistance_count-1) , id, label);
		
		//available_nodes.push(newState);
		
		if(jQuery.isTouchCapable()){
			newState.doubletap(function(e) {
				remove(this, e);
			});
		}
		else {
			newState.dblclick(function(e) {
				remove(this, e);
			});
		}
		
		resistance_count++;
	}
	
