import React, { useEffect, useState } from 'react';
import fetchSnmpObject from './services/snmpService'

function SnmpTree() {
    const [mibObjects, setMibObjects] = useState([]);

    useEffect(() => {
        fetch('/data/HOST-RESOURCES-MIB.txt')
            .then(response => response.text())
            .then(text => extractMibObjects(text))
            .catch(error => console.error('Error fetching MIB file:', error));
    }, []);

    const extractMibObjects = (text) => {
        setMibObjects(prevMibObjects => {
            const lines = text.split('\n');
            return lines.filter(line => line.includes('OBJECT-TYPE')).map(line => line.split(/\s+/)[0]);
        });
    };

    const objectClicked = async (objectName) => {
        try {
            const result = await fetchSnmpObject(objectName);
            alert(JSON.stringify(result));
        } catch (error) {
            console.error('Error fetching SNMP object:', error);
        }
    }

    const mappedObjects = () => {
        return mibObjects.map((objectName) => {
            if (objectName != '' && objectName != 'MODULE-IDENTITY,') {
                return (
                    <p key={objectName} onClick={() => objectClicked(objectName)}>
                        {objectName}
                    </p>
                )
            }
        })
    }

    return (
        <div>
            <h1>SNMP Tree</h1>
            {mappedObjects()}
        </div>
    );
}

export default SnmpTree;
