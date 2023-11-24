
import React from 'react'; 
import { Fieldset } from 'primereact/fieldset';
import ToggleEnable from './ToggleEnable';
import STM_calendar from './STM_calendar';
import STM_TCPIP from './STM_TCPIP';

export default function ToggleableDemo() {
    return (
        <div className="card">
            <Fieldset legend="STM Configuration" toggleable>
                <div className="grid">
                    <div className="col-12">
                        <div className="flex align-items-center">
                            <p className='mr-8'>STM Transmission</p>
                            <ToggleEnable />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="flex align-items-center">
                            <p className='mr-8'>STM Forwarding M-KMF</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STM Forwarding P-KMF</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STM Forwarding GCS-KMF</p>
                            <ToggleEnable />
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="flex align-items-center">
                            <p className='mr-8'>Last STM M-KMF packet</p>
                            <STM_calendar />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>Last STM M-KMF packet</p>
                            <STM_calendar />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>Last STM M-KMF packet</p>
                            <STM_calendar />
                        </div>

                    </div>
                </div>
                
                <STM_TCPIP />
            </Fieldset>
        </div>
    )
}
        