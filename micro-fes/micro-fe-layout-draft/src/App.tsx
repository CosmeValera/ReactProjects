import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import FormAutoComplete from './components/form/FormAutoComplete';
import FormCalendar from './components/form/FormCalendar';
import FormCascadeSelect from './components/form/FormCascadeSelect';
import FormCheckbox from './components/form/FormCheckbox';
import FormChips from './components/form/FormChips';
import FormColorPicker from './components/form/FormColorPicker';
import FormDropDown from './components/form/FormDropDown';
import FormInputGroup from './components/form/FormInputGroup';
import FormInputMask from './components/form/FormInputMask';
import FormInputSwitch from './components/form/FormInputSwitch';
import FormInputNumber from './components/form/FormInputNumber';
import FormInputText from './components/form/FormInputText';
import FormInputTextArea from './components/form/FormInputTextArea';
import FormKeyFilter from './components/form/FormKeyFilter';
import FormKnob from './components/form/FormKnob';
import FormListBox from './components/form/FormListBox';
import FormMention from './components/form/FormMention';
import FormMultiselect from './components/form/FormMultiselect';
import FormMultiStateCheckbox from './components/form/FormMultiStateCheckbox';
import FormPassword from './components/form/FormPassword';
import FormRadioButton from './components/form/FormRadioButton';
import FormRating from './components/form/FormRating';
import FormSelectButton from './components/form/formSelectButton';
import FormSlider from './components/form/FormSlider';
import FormTreeSelect from './components/form/FormTreeSelect';
import FormTriStateCheckbox from './components/form/FormTriStateCheckbox';
import FormToggleButton from './components/form/FormToggleButton';
import Button from './components/button/Button';
import SpeedDial from './components/button/SpeedDial';
import SplitButton from './components/button/SplitButton';
import DataTable from './components/data/DataTable';
import DataView from './components/data/DataView';
import DataScroller from './components/data/DataScroller';
import OrderList from './components/data/OrderList';
import OrganizationChart from './components/data/OrganizationChart';
import Paginator from './components/data/Paginator';
import PickList from './components/data/PickList';
import Tree from './components/data/Tree';
import TreeTable from './components/data/TreeTable';
import Timeline from './components/data/Timeline';
import VirtualScroller from './components/data/VirtualScroller';
import Accordion from './components/panel/Accordion';
import Card from './components/panel/Card';
import DeferredContent from './components/panel/DeferredContent';
import Divider from './components/panel/Divider';
import Fieldset from './components/panel/Fieldset';
import Panel from './components/panel/Panel';
import Scrollbar from './components/panel/Scrollbar';
import Splitter from './components/panel/Splitter';
import TabView from './components/panel/TabView';
import ToolBar from './components/panel/ToolBar';

const App = () => (
  <PrimeReactProvider>
    <div className='container'>
      <h1 className='text-center'>Panel: </h1>
      <ToolBar/>
      <TabView/>
      <Splitter/>
      <Scrollbar/>
      <Panel/>
      <Fieldset/>
      <Accordion/>
      <Card/>
      <Divider/>
      {/* <DeferredContent/> */}
      <h1 className='text-center'>Data: </h1>
      <VirtualScroller />
      <Timeline />
      <TreeTable />
      <Tree />
      <PickList />
      <Paginator />
      <OrganizationChart />
      <OrderList />
      <DataScroller />
      <DataView />
      <DataTable />
      <h1 className='text-center'>Button: </h1>
      <SplitButton />
      <SpeedDial />
      <Button />
      <h1 className='text-center'>Form: </h1>
      <FormToggleButton/>
      <FormTriStateCheckbox/>
      <FormTreeSelect/>
      <FormSlider/>
      <FormSelectButton/>
      <FormRating/>
      <FormRadioButton/>
      <FormPassword/>
      <FormMultiStateCheckbox/>
      <FormMultiselect/>
      <FormMention/>
      <FormListBox/>
      <FormKnob/>
      <FormKeyFilter/>
      <FormInputTextArea/>
      <FormInputText/>
      <FormInputNumber/>
      <FormInputSwitch/>
      <FormInputMask />
      <FormInputGroup />
      <FormDropDown />
      <FormColorPicker />
      <FormChips />
      <FormCheckbox />
      <FormCascadeSelect />
      <FormCalendar />
      <FormAutoComplete/>
    </div>
  </PrimeReactProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
