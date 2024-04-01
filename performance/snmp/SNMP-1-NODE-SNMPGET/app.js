// This File run with Node does the same as: 
// snmpget -v 2c -c public -O n localhost .1.3.6.1.2.1.25.3.8.1.8.1
// snmpget -v 3 -u cosme -A cosmecosme -a SHA -c public -O n -l AuthNoPriv localhost .1.3.6.1.2.1.25.3.8.1.8.1

var snmp = require("net-snmp");

// var target = "192.168.56.1";
var target = "172.19.168.20"; // Change this to the IP address of your SNMP-enabled device
var community = "public"; // Change this to the SNMP community string of your device

var oids = ['1.3.6.1.2.1.25.6.3.1.1.157'];

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
