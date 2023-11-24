
import React from 'react'; 
import { Fieldset } from 'primereact/fieldset';
import ToggleEnable from './ToggleEnable';
import STC_buffer_select from './STC_buffer_select';
import STC_buffer_flush from './STC_buffer_flush';
import STC_TCPIP from './STC_TCPIP';

export default function ToggleableDemo() {
    return (
        <div className="card">
            <Fieldset legend="STC Configuration" toggleable>
                <div className="grid">
                    <div className="col-6">
                        <div className="flex align-items-center">
                            <p className='mr-8'>STC Reception</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STC Uplk M-KMF</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STC Uplk P-KMF</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STC Uplk GCS-KMF</p>
                            <ToggleEnable />
                        </div>
                        <div className="flex align-items-center">
                            <p className='mr-8'>STC Buffer</p>
                            <STC_buffer_select />
                            <STC_buffer_flush />
                        </div>

                    </div>
                    <div className="col-6">
                        <STC_TCPIP/>

                    </div>
                </div>

            </Fieldset>
        </div>
    )
}
        