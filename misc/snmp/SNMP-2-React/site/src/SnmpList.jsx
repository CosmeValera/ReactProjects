import React, { useEffect, useState, useRef } from 'react';
import fetchSnmpObject from './services/snmpService';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

function SnmpList() {
    const [mibObjects, setMibObjects] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const errorToast = useRef(null);

    const showToast = (objectName) => {
        errorToast.current.show({ severity: 'error', summary: 'Error', detail: `HOST-RESOURCES-MIB::${objectName }= No Such Instance currently exists at this OID` });
    };

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

    const parseObjectInfo = (snmpObject) => {
        // Remove the surrounding curly braces and split the string at the colon
        const [name, info] = snmpObject.replace(/"/g, '').slice(1, -1).split(':');
        // Split the info at the equals sign to separate OID and value
        const [oid, value] = info.trim().split('=');
        // Trim whitespace from OID and value
        return { name: name.trim(), oid: oid.trim(), value: value.trim() };
    };

    const objectClicked = async (objectName) => {
        try {
            const result = await fetchSnmpObject(objectName);
            const { name, oid, value } = parseObjectInfo(JSON.stringify(result));
            setDialogContent({ name, oid, value });
            setDialogVisible(true);
        } catch (error) {
            console.error('Error fetching SNMP object:', error);
            showToast(objectName);
        }
    }
    
    const onHideDialog = () => {
        setDialogVisible(false);
    };

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

    const renderDialog = () => {
        const { name, oid, value } = dialogContent;
        return (
            <Dialog header={name} visible={dialogVisible} onHide={onHideDialog} style={{ minWidth: '30vw', minHeight: '15vw' }} >
                <div>
                    <h4><span style={{color: '#DF0024'}}>OID:</span> {oid}</h4>
                    <h4><span style={{color: '#DF0024'}}>Value:</span> {value}</h4>
                </div>
            </Dialog>
        );
    };

    return (
        <>
            <Toast ref={errorToast} />
            <h1>SNMP Objects List</h1>
            {mappedObjects()}
            {renderDialog()}
        </>
    );
}

export default SnmpList;
