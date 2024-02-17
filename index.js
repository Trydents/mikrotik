var MikroNode = require("mikronode2");
const parseMIkrotikSystem = require("./utilities");

var device = new MikroNode("192.168.4.10");

device
	.connect()
	.then(([login]) => {
		return login("admin", "Mypasspcit");
	})
	.then(function (conn) {
		console.log("Conexión establecida");

		var chan = conn.openChannel();

		chan.write("/ip/address/print");
		chan.on("done", function (data) {
			let parsedDataArray = new Array();
			// data is all of the sentences in an array.
			data.data.forEach(function (item) {
				let parsedData = parseMIkrotikSystem(item);

				parsedDataArray.push(parsedData);
				console.log(
					"Interface/IP: " + parsedData.interface + "/" + parsedData.address
				);
			});

			chan.close(); // close the channel. It is not autoclosed by default.
			conn.close(); // when closing connection, the socket is closed and program ends.
		});
	})
	.catch((error) => {
		console.log("Caught error:", error);
	});
