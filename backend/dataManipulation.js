var db = require('./db');
var xlsx = require('xlsx');
var async = require('async');

exports.neighbouringMatrix = function (fileContent) {
    var workbook = xlsx.read(fileContent, {type: "array"});
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    var cellContents = Object.keys(worksheet).
	filter((x) => x[0] != '!'). // remove non-cell info
	map((k) => [aux_functions.cellpos(k), worksheet[k].v]); // split the cell pos

    var horizMap = {};
    var vertMap = {};
    
    var plants = cellContents.filter((x) => aux_functions.isString(x[1]))
    plants.forEach((x) => {
	horizMap[x[0][0]] = x[1];
	vertMap[x[0][1]] = x[1];
    });

    plants = new Set(plants.map((x) => x[1]));

    horizMap[0] = null;
    vertMap[0] = null;

    var interactions = cellContents.filter((x) => !aux_functions.isString(x[1])).
	map((x) => [horizMap[x[0][0]], vertMap[x[0][1]], x[1]]);

    var plantToIdMap = {};
    var insertResponse;

    async.each(plants, function(x, cb) {
	db.insertPlant(x, function(r) {
	    plantToIdMap[x] = r.insertId;
	    cb();
	});
    }, function(err) {
	async.each(interactions, function(x, cb) {
	    db.insertPlantRelationIds(plantToIdMap[x[0]],
				      plantToIdMap[x[1]],
				      x[2]);
	    cb();
	});
    });
}

exports.getData = function(show) {
    db.getData(function(rows) {
	// transform data into suitable form
	data = {};
	plant_ids = new Set(rows.map((x) => x.id));

	async.each(plant_ids,
		   function(pid, cb) {
		       var relevant = rows.filter((x) => x.id==pid);

		       var relationships = {};
		       
		       for(r in relevant) {
			   relationships[relevant[r].related_id] = relevant[r].effect;
		       }
		       var name = relevant[0].name;

		       data[pid] = {
			   name: name,
			   type: null,
			   relationships: relationships
		       };
		       
		       cb();
		   },
		   function(err) {
		       console.log(data);
		       show(data);
		   });
    });
}

var aux_functions = {
    cellpos: function (cellPos) {
	function rowToInt(char_seq) {
	    const base = 'A'.charCodeAt(0);
	    var digits = char_seq.split("");	    
	    var value = digits[0].charCodeAt(0) - base + 1;
	    
	    for(var i = 1; i < digits.length; i++) {
		value = value * 26 +  digits[i].charCodeAt(0) - base;
	    }

	    if(digits.length == 1) {
		return value - 1;
	    }
	    else {
		return value;
	    }
	}
	
	const pattern = /([A-Z]+)(\d+)/;
	var coords = pattern.exec(cellPos);	
	return [rowToInt(coords[1]), Number.parseInt(coords[2] - 1)];
    },

    isString: function (invar) {
	return typeof invar === "string";
    }
};
