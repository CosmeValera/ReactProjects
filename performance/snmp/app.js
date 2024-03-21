// Importing the net-snmp module
var snmp = require("net-snmp");

// Define the IP address and SNMP community string of the device you want to interact with
// var target = "192.168.56.1";
var target = "localhost"; // Change this to the IP address of your SNMP-enabled device
var community = "public"; // Change this to the SNMP community string of your device

// Define the OIDs (Object Identifiers) you want to query
var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"]; // These are example OIDs, replace them with the ones you need

// Create an SNMP session to the target device
var session = snmp.createSession(target, community);

// Perform an SNMP GET request for the specified OIDs
session.get(oids, function (error, varbinds) {
  if (error) {
    console.error("SNMP GET Error:", error);
  } else {
    // Iterate through the received varbinds (variable bindings)
    for (var i = 0; i < varbinds.length; i++) {
      // Check if the varbind is an error
      if (snmp.isVarbindError(varbinds[i])) {
        console.error("SNMP Varbind Error:", snmp.varbindError(varbinds[i]));
      } else {
        // Print the OID and its corresponding value
        console.log(varbinds[i].oid + " = " + varbinds[i].value);
      }
    }
  }
  // Close the SNMP session
  session.close();
});
