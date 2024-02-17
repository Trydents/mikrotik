var MikroNode = require("mikronode2");
const parseMIkrotikSystem = require("./utilities");

var device = new MikroNode("192.168.4.10");
var objectTest = { name: "jonatha", apellido: "La Concha" };
console.log("Objeto de prueba: " + JSON.stringify(objectTest));

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
			// data is all of the sentences in an array.
			console.log("Estos es data:", data.data);
			data.data.forEach(function (item) {
				parseMIkrotikSystem(item);
				console.log("Interface/IP: " + item.interface + "/" + item.address);
			});

			chan.close(); // close the channel. It is not autoclosed by default.
			conn.close(); // when closing connection, the socket is closed and program ends.
		});
	})
	.catch((error) => {
		console.log("Caught error:", error);
	});
