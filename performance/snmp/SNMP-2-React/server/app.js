const express = require('express');
const snmp = require('net-snmp');

const app = express();

const oidMapping = {
  hrSystemUptime: '1.3.6.1.2.1.25.1.1.0',
  hrSystemDate: '1.3.6.1.2.1.25.1.2.0',
  hrSystemInitialLoadDevice: '1.3.6.1.2.1.25.1.3.0',
  hrSystemInitialLoadParameters: '1.3.6.1.2.1.25.1.4.0',
  hrSystemNumUsers: '1.3.6.1.2.1.25.1.5.0',
  hrSystemProcesses: '1.3.6.1.2.1.25.1.6.0',
  hrSystemMaxProcesses: '1.3.6.1.2.1.25.1.7.0',
  hrMemorySize: '1.3.6.1.2.1.25.2.2.0',
  // hrStorageTable: '1.3.6.1.2.1.25.2.3.0',
  // hrStorageEntry: '1.3.6.1.2.1.25.2.3.1.0',
  hrStorageIndex: '1.3.6.1.2.1.25.2.3.1.1.1',
  hrStorageType: '1.3.6.1.2.1.25.2.3.1.2.1',
  hrStorageDescr: '1.3.6.1.2.1.25.2.3.1.3.1',
  hrStorageAllocationUnits: '1.3.6.1.2.1.25.2.3.1.4.1',
  hrStorageSize: '1.3.6.1.2.1.25.2.3.1.5.1',
  hrStorageUsed: '1.3.6.1.2.1.25.2.3.1.6.1',
  // hrStorageAllocationFailures: '1.3.6.1.2.1.25.2.3.1.7.0',
  // hrDeviceTable: '1.3.6.1.2.1.25.3.2.0',
  // hrDeviceEntry: '1.3.6.1.2.1.25.3.2.1.0',
  hrDeviceIndex: '1.3.6.1.2.1.25.3.2.1.1.196608',
  hrDeviceType: '1.3.6.1.2.1.25.3.2.1.2.196608',
  hrDeviceDescr: '1.3.6.1.2.1.25.3.2.1.3.196608',
  hrDeviceID: '1.3.6.1.2.1.25.3.2.1.4.196608',
  hrDeviceStatus: '1.3.6.1.2.1.25.3.2.1.5.196608',
  hrDeviceErrors: '1.3.6.1.2.1.25.3.2.1.6.262145',
  // hrProcessorTable: '1.3.6.1.2.1.25.3.3.196608',
  // hrProcessorEntry: '1.3.6.1.2.1.25.3.3.1.196608',
  hrProcessorFrwID: '1.3.6.1.2.1.25.3.3.1.1.196608',
  hrProcessorLoad: '1.3.6.1.2.1.25.3.3.1.2.196608',
  // hrNetworkTable: '1.3.6.1.2.1.25.3.4.262145',
  // hrNetworkEntry: '1.3.6.1.2.1.25.3.4.1.262145',
  hrNetworkIfIndex: '1.3.6.1.2.1.25.3.4.1.1.262145',
  // hrPrinterTable: '1.3.6.1.2.1.25.3.5.0',
  // hrPrinterEntry: '1.3.6.1.2.1.25.3.5.1.0',
  // hrPrinterStatus: '1.3.6.1.2.1.25.3.5.1.1.0',
  // hrPrinterDetectedErrorState: '1.3.6.1.2.1.25.3.5.1.2.0',
  // hrDiskStorageTable: '1.3.6.1.2.1.25.3.6.393232',
  // hrDiskStorageEntry: '1.3.6.1.2.1.25.3.6.1.393232',
  hrDiskStorageAccess: '1.3.6.1.2.1.25.3.6.1.1.393232',
  hrDiskStorageMedia: '1.3.6.1.2.1.25.3.6.1.2.393232',
  hrDiskStorageRemoveble: '1.3.6.1.2.1.25.3.6.1.3.393232',
  hrDiskStorageCapacity: '1.3.6.1.2.1.25.3.6.1.4.393232',
  // hrPartitionTable: '1.3.6.1.2.1.25.3.7.0',
  // hrPartitionEntry: '1.3.6.1.2.1.25.3.7.1.0',
  // hrPartitionIndex: '1.3.6.1.2.1.25.3.7.1.1.0',
  // hrPartitionLabel: '1.3.6.1.2.1.25.3.7.1.2.0',
  // hrPartitionID: '1.3.6.1.2.1.25.3.7.1.3.0',
  // hrPartitionSize: '1.3.6.1.2.1.25.3.7.1.4.0',
  // hrPartitionFSIndex: '1.3.6.1.2.1.25.3.7.1.5.0',
  // hrFSTable: '1.3.6.1.2.1.25.3.8.1',
  // hrFSEntry: '1.3.6.1.2.1.25.3.8.1.1',
  hrFSIndex: '1.3.6.1.2.1.25.3.8.1.1.1',
  hrFSMountPoint: '1.3.6.1.2.1.25.3.8.1.2.1',
  hrFSRemoteMountPoint: '1.3.6.1.2.1.25.3.8.1.3.1',
  hrFSType: '1.3.6.1.2.1.25.3.8.1.4.1',
  hrFSAccess: '1.3.6.1.2.1.25.3.8.1.5.1',
  hrFSBootable: '1.3.6.1.2.1.25.3.8.1.6.1',
  hrFSStorageIndex: '1.3.6.1.2.1.25.3.8.1.7.1',
  hrFSLastFullBackupDate: '1.3.6.1.2.1.25.3.8.1.8.1',
  hrFSLastPartialBackupDate: '1.3.6.1.2.1.25.3.8.1.9.1',
  // hrSWOSIndex: '1.3.6.1.2.1.25.3.9.0',
  // hrSWRunTable: '1.3.6.1.2.1.25.4.2.1',
  // hrSWRunEntry: '1.3.6.1.2.1.25.4.2.1.1',
  hrSWRunIndex: '1.3.6.1.2.1.25.4.2.1.1.1',
  hrSWRunName: '1.3.6.1.2.1.25.4.2.1.2.1',
  hrSWRunID: '1.3.6.1.2.1.25.4.2.1.3.1',
  hrSWRunPath: '1.3.6.1.2.1.25.4.2.1.4.1',
  hrSWRunParameters: '1.3.6.1.2.1.25.4.2.1.5.1',
  hrSWRunType: '1.3.6.1.2.1.25.4.2.1.6.1',
  hrSWRunStatus: '1.3.6.1.2.1.25.4.2.1.7.1',
  // hrSWRunPerfTable: '1.3.6.1.2.1.25.5.1.1',
  // hrSWRunPerfEntry: '1.3.6.1.2.1.25.5.1.1.1',
  hrSWRunPerfCPU: '1.3.6.1.2.1.25.5.1.1.1.1',
  hrSWRunPerfMem: '1.3.6.1.2.1.25.5.1.1.2.1',
  hrSWInstalledLastChange: '1.3.6.1.2.1.25.6.1.0',
  hrSWInstalledLastUpdateTime: '1.3.6.1.2.1.25.6.2.0',
  // hrSWInstalledTable: '1.3.6.1.2.1.25.6.3.0',
  // hrSWInstalledEntry: '1.3.6.1.2.1.25.6.3.1.0',
  hrSWInstalledIndex: '1.3.6.1.2.1.25.6.3.1.1.1',
  hrSWInstalledName: '1.3.6.1.2.1.25.6.3.1.2.1',
  hrSWInstalledID: '1.3.6.1.2.1.25.6.3.1.3.1',
  hrSWInstalledType: '1.3.6.1.2.1.25.6.3.1.4.1',
  hrSWInstalledDate: '1.3.6.1.2.1.25.6.3.1.5.1',
};

const getOne = (async (req, res) => {
  const objectName = req.params.name;
  if (!objectName || !oidMapping[objectName]) {
    return res.status(400).send('Invalid object name');
  }

  snmpResponse(objectName, (error, snmpData) => {
    if (!error) {
      let result = {}
      result[objectName] = snmpData
      res.send(result);
    }
  });
});

const getAll = (async (req, res) => {
  const results = {};

  const snmpPromises = [];

  for (const objectName in oidMapping) {
    console.log(objectName);
    // Create a promise for each SNMP request and push it to the array
    const promise = new Promise((resolve, reject) => {
      snmpResponse(objectName, (error, snmpData) => {
        if (error) {
          console.error(`Error fetching SNMP data for ${objectName}:`, error);
          results[objectName] = `Error fetching SNMP data: ${error.message}`;
        } else {
          results[objectName] = snmpData;
        }
        resolve(); // Resolve the promise regardless of error or success
      });
    });
    snmpPromises.push(promise);
  }

  try {
    await Promise.all(snmpPromises);
    res.send(results);
  } catch (error) {
    console.error("An error occurred while fetching SNMP data:", error);
    res.status(500).send('Error fetching SNMP data');
  }
});

const snmpResponse = (objectName, callback) => {
  // Define SNMP target and community
  const target = "172.19.168.20"; // Change this to the IP address of your SNMP-enabled device
  const community = "public"; // Change this to the SNMP community string of your device
  
  // Create an SNMP session to the target device
  const session = snmp.createSession(target, community);

  // Define the OID to query
  const oid = oidMapping[objectName];

  // Perform an SNMP GET request for the specified OID
  session.get([oid], (error, varbinds) => {
    if (error) {
      console.error("SNMP GET Error:", error);
      callback(error);
    } else {
      // Prepare the SNMP response data
      let snmpData = '';
      console.log(varbinds)
      for (let i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError(varbinds[i])) {
          console.error("SNMP Varbind Error:", snmp.varbindError(varbinds[i]));
        } else {
          snmpData += varbinds[i].oid + " = " + varbinds[i].value + '\n';
        }
      }
      callback(null, snmpData);
    }
    // Close the SNMP session
    session.close();
  });
};

////////////////////
// EXPRESS SERVER //
////////////////////

app.get('/', getAll);

app.get('/:name', getOne);

app.listen(4001, () => {
  console.log('Server is running on port 4001');
});