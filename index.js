var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var fileupload = require('express-fileupload');
var dm = require('./backend/dataManipulation');

//var testData = require('./testData');

var app = express();

app.use(fileupload());
app.use('/public', express.static(path.join(__dirname, 'public')))

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main', helpers: {
    'tojson': (o) => JSON.stringify(o)
}}));
app.set('view engine', 'handlebars');

app.get('/ui', function (req, res) {
	if (typeof(testData) === "object") {
	    res.render('ui', {vegetables: testData.test, state: "false"});
	}
	else {
		dm.getData(function (data) {
		    res.render('ui', {vegetables: data, state: "false"});
		});
	}
});

app.post('/ui', function (req, res) {
    let uploadedState = req.files.gardenFile.data.toString("utf-8"); 
    if (typeof(testData) === "object") {
	res.render('ui', {vegetables: testData.test, state: uploadedState});
    }
    else {
	dm.getData(function (data) {
	    res.render('ui', {vegetables: data, state: uploadedState});
	});
    }    
});

app.get('/dataedit', function (req, res) {
	if (typeof(testData) === "object") {
		res.render('dataedit', {vegetables: testData.test});
	}
	else {
		dm.getData(function(data) {
			res.render('dataedit', {vegetables: data});
		});
	}
});

app.post('/upload', function(req, res) {
    if(req.files.odsfile == null) { // Error handling
	
    }
    else {
	dm.neighbouringMatrix(req.files.odsfile.data);
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("App started, listening on 3000.");
});
