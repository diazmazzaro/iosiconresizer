#!/usr/bin/env node

var Jimp = require('jimp');
var path = require('path');

var inputPath = process.argv[2];
var sizes = [20, 29, 40, 44, 48, 55, 58, 60, 76, 80, 87, 88, 100, 120, 152, 167, 180, 172, 196, 216, 1024];

Jimp.read(inputPath).then(function (image) {
	// Check input image is square	
	var existingWidth = image.bitmap.width;
	var existingHeight = image.bitmap.height;
	
	if (existingWidth != existingHeight) {
		console.error('We can only process square images');
		return;
	}
}).catch(function (err) {
    console.error(err);
});
	
var inputFileDetails = path.parse(inputPath);

// For each size, generate a resized image
sizes.map(function(item) {
	Jimp.read(inputPath).then(function (image) {
		var outputPath = path.join(inputFileDetails.dir, inputFileDetails.name + item.toString() + inputFileDetails.ext);
	
		image.resize(item, item)           
			.quality(100)
			.write(outputPath);	
	
		console.log('Icon created: ' + outputPath + ' (' + item + 'x' + item + ')');
	}).catch(function (err) {
    console.error(err);
	});
});
