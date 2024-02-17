function parseMIkrotikSystem(array) {
	let response = new Object();

	array.forEach((element) => {
		response[element.field] = element.value;
	});

	return response;
}

module.exports = parseMIkrotikSystem;
