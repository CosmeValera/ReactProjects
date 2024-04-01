import React, { useEffect, useState } from 'react';

function SnmpTree() {
  const [mibObjects, setMibObjects] = useState([]);

  const extractMibObjects = (text) => {
    setMibObjects(prevMibObjects => {
        const lines = text.split('\n');
        return lines.filter(line => line.includes('OBJECT-TYPE')).map(line => line.split(/\s+/)[0]);
    });
  };

  useEffect(() => {
    fetch('/data/HOST-RESOURCES-MIB.txt')
      .then(response => response.text())
      .then(text => extractMibObjects(text))
      .catch(error => console.error('Error fetching MIB file:', error));
  }, []);

  return (
    <div>
      <h1>SNMP Tree</h1>
      <pre>{mibObjects.join('\n')}</pre>
    </div>
  );
}

export default SnmpTree;
