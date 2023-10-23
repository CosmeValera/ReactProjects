import React from 'react';
import ReactDOM from 'react-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import "./index.scss";
import FormAutoComplete from './components/Form/FormAutoComplete';
import FormCalendar from './components/Form/FormCalendar';
import FormCascadeSelect from './components/Form/FormCascadeSelect';
import FormCheckbox from './components/Form/FormCheckbox';
import FormChips from './components/Form/FormChips';
import FormColorPicker from './components/Form/FormColorPicker';
import FormDropDown from './components/Form/FormDropDown';
import FormInputGroup from './components/Form/FormInputGroup';
import FormInputMask from './components/Form/FormInputMask';
import FormInputSwitch from './components/Form/FormInputSwitch';
import FormInputNumber from './components/Form/FormInputNumber';
import FormInputText from './components/Form/FormInputText';
import FormInputTextArea from './components/Form/FormInputTextArea';
import FormKeyFilter from './components/Form/FormKeyFilter';
import FormKnob from './components/Form/FormKnob';
import FormListBox from './components/Form/FormListBox';
import FormMention from './components/Form/FormMention';
import FormMultiselect from './components/Form/FormMultiselect';
import FormMultiStateCheckbox from './components/Form/FormMultiStateCheckbox';
import FormPassword from './components/Form/FormPassword';
import FormRadioButton from './components/Form/FormRadioButton';
import FormRating from './components/Form/FormRating';
import FormSelectButton from './components/Form/formSelectButton';
import FormSlider from './components/Form/FormSlider';
import FormTreeSelect from './components/Form/FormTreeSelect';
import FormTriStateCheckbox from './components/Form/FormTriStateCheckbox';
import FormToggleButton from './components/Form/FormToggleButton';

const App = () => (
  <PrimeReactProvider>
    <div className='container'>
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
