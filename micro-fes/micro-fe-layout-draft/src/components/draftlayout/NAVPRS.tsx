
import React from 'react'; 
import { Fieldset } from 'primereact/fieldset';
import ToggleEnable from './ToggleEnable';
import NAVPRS_force from './NAVPRS_force';

export default function ToggleableDemo() {
    return (
        <div className="card">
            <Fieldset legend="NAV/PRS Configuration" toggleable>
                <div className="flex align-items-center">
                    <p className='mr-8'>NAV/PRS data</p>
                    <ToggleEnable />
                </div>
                <NAVPRS_force />
            </Fieldset>
        </div>
    )
}
        