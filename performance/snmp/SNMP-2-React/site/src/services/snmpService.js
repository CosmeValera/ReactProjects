export default async function fetchSnmpObject(objectName) {
    try {
        const response = await fetch(`http://localhost:4001/${objectName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching SNMP object:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
