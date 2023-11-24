
import React from 'react'; 
import { Card } from 'primereact/card';
import ToggleEnable from './ToggleEnable';

export default function BasicDemo() {
    return (
        <div className="card">
            <Card title="MMsatStat Configuration">
                <div className="flex align-items-center">
                    <p className='mr-8'>MMsatStat</p>
                    <ToggleEnable />
                </div>
            </Card>
        </div>
    )
}
        