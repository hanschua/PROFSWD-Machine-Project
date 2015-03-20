QUnit.test( "Parallel Solve Resistance 1", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var voltage = 10;
	
	parallel.setVoltage(voltage);
	
	var currents = new Array();
	currents.push(50);
	currents.push(10);
	
	parallel.setCurrent(currents);
	
	var resistance = parallel.solveResistance();
	
	assert.ok( resistance[0].resistance == "0.2", "Passed!" );
	assert.ok( resistance[1].resistance == "1", "Passed!" );

});

QUnit.test( "Parallel Solve Resistance 2", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var voltage = 10;
	
	parallel.setVoltage(voltage);
	
	var currents = new Array();
	
	for(var i=20; i<100; i+=20){
		currents.push(i);
	}
	
	parallel.setCurrent(currents);
	
	var resistance = parallel.solveResistance();
	
	assert.ok( resistance[0].resistance == "0.5", "Passed!" );
	assert.ok( resistance[1].resistance == "0.25", "Passed!" );
	assert.ok( resistance[2].resistance == "0.16667", "Passed!" );
	assert.ok( resistance[3].resistance == "0.125", "Passed!" );

});

QUnit.test( "Parallel Solve Voltage 1", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var resistors = new Array();;
	
	resistors.push({resistance: 10});
	resistors.push({resistance: 20});
	resistors.push({resistance: 30});
	resistors.push({resistance: 40});
	
	parallel.setResistance(resistors);
	
	var currents = new Array();
	
	currents.push(20);
	currents.push(40);
	currents.push(60);
	currents.push(80);
	
	parallel.setCurrent(currents);
	
	var voltage = parallel.solveVoltage();
	
	assert.ok( voltage == "41.66667", "Passed!" );

});

QUnit.test( "Parallel Solve Voltage 2", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var resistors = new Array();;
	
	resistors.push({resistance: 10});
	resistors.push({resistance: 20});
	resistors.push({resistance: 30});
	resistors.push({resistance: 40});
	
	parallel.setResistance(resistors);
	
	var currents = new Array();
	
	currents.push(10);
	currents.push(20);
	currents.push(30);
	currents.push(40);
	
	parallel.setCurrent(currents);
	
	var voltage = parallel.solveVoltage();
	
	assert.ok( voltage == "20.83333", "Passed!" );

});

QUnit.test( "Parallel Solve Current 1", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var voltage = 10;
	
	parallel.setVoltage(voltage);
	
	var resistors = new Array();;
	
	resistors.push({resistance: 10});
	resistors.push({resistance: 20});
	resistors.push({resistance: 30});
	resistors.push({resistance: 40});
	
	parallel.setResistance(resistors);
	
	var currents = parallel.solveCurrent();
	
	assert.ok( currents[0] == "1", "Passed!" );
	assert.ok( currents[1] == "0.5", "Passed!" );
	assert.ok( currents[2] == "0.33333", "Passed!" );
	assert.ok( currents[3] == "0.25", "Passed!" );

});

QUnit.test( "Parallel Solve Current 2", function( assert ) {

	var parallel = new Parallel(null, new Array(), new Array());
	
	var voltage = 50;
	
	parallel.setVoltage(voltage);
	
	var resistors = new Array();;
	
	resistors.push({resistance: 40});
	resistors.push({resistance: 25});
	resistors.push({resistance: 60});
	resistors.push({resistance: 90});
	resistors.push({resistance: 130});
	resistors.push({resistance: 5});
	resistors.push({resistance: 60});
	resistors.push({resistance: 30});
	
	parallel.setResistance(resistors);
	
	var currents = parallel.solveCurrent();
	
	assert.ok( currents[0] == "1.25", "Passed!" );
	assert.ok( currents[1] == "2", "Passed!" );
	assert.ok( currents[2] == "0.83333", "Passed!" );
	assert.ok( currents[3] == "0.55556", "Passed!" );
	assert.ok( currents[4] == "0.38462", "Passed!" );
	assert.ok( currents[5] == "10", "Passed!" );
	assert.ok( currents[6] == "0.83333", "Passed!" );
	assert.ok( currents[7] == "1.66667", "Passed!" );

});

QUnit.test( "Series Solve Resistance 1", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var voltage = 10;
	
	series.setVoltage(voltage);
	
	var powerUsed = new Array();
	
	powerUsed.push(20);
	powerUsed.push(15);
	powerUsed.push(50);
	
	series.setResistance(powerUsed);
	
	var currents = new Array();
	
	currents.push(100);
	
	series.setCurrent(currents);
	
	var resistance = series.solveResistance();
	
	assert.ok( resistance[0] == "20", "Passed!" );
	assert.ok( resistance[1] == "15", "Passed!" );
	assert.ok( resistance[2] == "50", "Passed!" );
	
});

QUnit.test( "Series Solve Resistance 2", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var voltage = 10;
	
	series.setVoltage(voltage);
	
	var powerUsed = new Array();
	
	powerUsed.push(50);
	powerUsed.push(65);
	powerUsed.push(100);
	powerUsed.push(120);
	powerUsed.push(110);
	powerUsed.push(105);
	powerUsed.push(130);
	
	series.setResistance(powerUsed);
	
	var currents = new Array();
	
	currents.push(100);
	currents.push(120);
	
	series.setCurrent(currents);
	
	var resistance = series.solveResistance();
	
	assert.ok( resistance[0] == "50", "Passed!" );
	assert.ok( resistance[1] == "65", "Passed!" );
	assert.ok( resistance[2] == "100", "Passed!" );
	assert.ok( resistance[3] == "120", "Passed!" );
	assert.ok( resistance[4] == "110", "Passed!" );
	assert.ok( resistance[5] == "105", "Passed!" );
	assert.ok( resistance[6] == "130", "Passed!" );
	
});

QUnit.test( "Series Solve Voltage 1", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var current = 10;
	
	series.setCurrent(current);
	
	var resistors = new Array();
	
	resistors.push({resistance: 50});
	resistors.push({resistance: 65});
	resistors.push({resistance: 100});
	resistors.push({resistance: 120});
	resistors.push({resistance: 110});
	resistors.push({resistance: 105});
	resistors.push({resistance: 130});
	
	series.setResistance(resistors);
	
	var voltage = series.solveVoltage();
	
	assert.ok( voltage == "0.10294", "Passed!" );
	
});

QUnit.test( "Series Solve Voltage 2", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var current = 100;
	
	series.setCurrent(current);
	
	var resistors = new Array();
	
	resistors.push({resistance: 10});
	resistors.push({resistance: 45});
	resistors.push({resistance: 160});
	resistors.push({resistance: 10});
	resistors.push({resistance: 130});
	resistors.push({resistance: 115});
	resistors.push({resistance: 90});
	
	series.setResistance(resistors);
	
	var voltage = series.solveVoltage();
	
	assert.ok( voltage == "1.25", "Passed!" );
	
});

QUnit.test( "Series Solve Current 1", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var voltage = 100;
	
	series.setVoltage(voltage);
	
	var resistors = new Array();
	
	resistors.push({resistance: 150});
	resistors.push({resistance: 435});
	resistors.push({resistance: 1360});
	resistors.push({resistance: 140});
	resistors.push({resistance: 1130});
	resistors.push({resistance: 1515});
	resistors.push({resistance: 950});
	
	series.setResistance(resistors);
	
	var current = series.solveCurrent();
	
	console.log(current);
	
	assert.ok( current	== "0.01761", "Passed!" );
	
});

QUnit.test( "Series Solve Current 2", function( assert ) {

	var series = new Series(null, new Array(), null);
	
	var voltage = 1000;
	
	series.setVoltage(voltage);
	
	var resistors = new Array();
	
	resistors.push({resistance: 40});
	resistors.push({resistance: 55});
	resistors.push({resistance: 60});
	resistors.push({resistance: 30});
	resistors.push({resistance: 15});
	resistors.push({resistance: 5});
	resistors.push({resistance: 90});
	
	series.setResistance(resistors);
	
	var current = series.solveCurrent();
	
	console.log(current);
	
	assert.ok( current	== "3.38983", "Passed!" );
	
});
