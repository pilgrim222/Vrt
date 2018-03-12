var mysql = require('mysql');
var connectionData = require('../private/dbconf');

var connection = mysql.createConnection(connectionData.testConnection);

/*
Needs functions for:
- retrieving plant list
*/

exports.getPlantList = function () {
    var query = "SELECT id, vegetable_name FROM vrt.vegetable";
};

exports.insertPlant = function (plantName, cb) {
    var query = "INSERT INTO vrt.vegetable SET vegetable_name = ?";

    connection.query(query, [plantName], function(error, result, fields) {
	if (error) {
	    console.log(error);
	    return;
	}
	cb(result);
    });
};

exports.getData = function(postProcess) {
    var query = "SELECT v.id as id, v.vegetable_name as name, vr.vegetable_id_2 as related_id, vr.effect as effect FROM vrt.vegetable v left join vrt.vegetable_relation vr on v.id=vr.vegetable_id_1";

    connection.query(query, function(error, result, fields) {
	postProcess(result);
    });

    
}

exports.insertPlantRelationIds = function (id1, id2, rval, cb) {
    var query = "INSERT INTO vrt.vegetable_relation SET vegetable_id_1 = ?, vegetable_id_2 = ?, effect = ?";

    connection.query(query, [id1, id2, rval], function(error, result, fields) {
	if (error) {
	    console.log(error);
	    return;
	}
    });
}