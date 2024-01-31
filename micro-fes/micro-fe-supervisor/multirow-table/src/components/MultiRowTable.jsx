import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function MultiRowTable() {
    const [customers, setCustomers] = useState([]);

    const data = {
        id: 1000,
        name: 'James Butt',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
    };

    useState(() => {
        setCustomers(data);
    }, []);

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <img alt={data.representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} className="ml-2" />
                <span className="vertical-align-middle ml-2 font-bold line-height-3">{data.representative.name}</span>
            </React.Fragment>
        );
    };

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan={5}>
                    <div className="flex justify-content-end font-bold w-full">Total Customers: {calculateCustomerTotal(data.representative.name)}</div>
                </td>
            </React.Fragment>
        );
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={rowData.country.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const calculateCustomerTotal = (name) => {
        let total = 0;

        if (customers) {
            for (let customer of customers) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };


    return (
        <DataTable value={[customers]} rowGroupMode="subheader" groupRowsBy="representative.name"
            sortMode="single" sortField="representative.name" sortOrder={1}>
            <Column field="name" header="Name" style={{ width: '20%' }} />
            <Column field="country.name" header="Country" style={{ width: '20%' }} />
            <Column field="company" header="Company" style={{ width: '20%' }} />
            <Column field="status" header="Status" style={{ width: '20%' }} />
            <Column field="date" header="Date" style={{ width: '20%' }} />
        </DataTable>
    );
}
