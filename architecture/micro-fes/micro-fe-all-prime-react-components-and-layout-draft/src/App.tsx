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
import ConfirmDialog from './components/overlay/ConfirmDialog';
import ConfirmPopUp from './components/overlay/ConfirmPopUp';
import Dialog from './components/overlay/Dialog';
import OverlayPanel from './components/overlay/OverlayPanel';
import Sidebar from './components/overlay/Sidebar';
import Tooltip from './components/overlay/Tooltip';
import FileUpload from './components/file/FileUpload';
import BreadCrumb from './components/menu/BreadCrumb';
import ContextMenu from './components/menu/ContextMenu';
import Dock from './components/menu/Dock';
import MegaMenu from './components/menu/MegaMenu';
import Menu from './components/menu/Menu';
import MenuBar from './components/menu/MenuBar';
import PanelMenu from './components/menu/PanelMenu';
import Steps from './components/menu/Steps';
import TabMenu from './components/menu/TabMenu';
import TieredMenu from './components/menu/TieredMenu';
import Chart from './components/chart/Chart';
import Message from './components/message/Message';
import Messages from './components/message/Messages';
import Toast from './components/message/Toast';
import Carousel from './components/media/Carousel';
import Galleria from './components/media/Galleria';
import Image from './components/media/Image';
import Avatar from './components/misc/Avatar';
import Badge from './components/misc/Badge';
import Block from './components/misc/Block';
import Chip from './components/misc/Chip';
import Inplace from './components/misc/Inplace';
import ScrollTop from './components/misc/ScrollTop';
import Skeleton from './components/misc/Skeleton';
import ProgressBar from './components/misc/ProgressBar';
import ProgressSpinner from './components/misc/ProgressSpinner';
import Ripple from './components/misc/Ripple';
import StyleClass from './components/misc/StyleClass';
import Tag from './components/misc/Tag';
import Terminal from './components/misc/Terminal';

const App = () => (
  <PrimeReactProvider>
    <div className='container'>
      <h1 className='text-center'>Misc: </h1>
      <Terminal />
      <Tag />
      <StyleClass />
      {/* <Ripple /> */}
      <ProgressSpinner />
      <ProgressBar />
      <Skeleton />
      <ScrollTop />
      <Inplace />
      <Chip />
      <Block />
      <Badge />
      <Avatar />
      <h1 className='text-center'>Media: </h1>
      <Image />
      <Galleria />
      <Carousel />
      <h1 className='text-center'>Message: </h1>
      <Toast />
      <Messages />
      <Message />
      <h1 className='text-center'>Menu: </h1>
      <TieredMenu />
      <TabMenu />
      <Steps />
      <PanelMenu />
      <MenuBar />
      <Menu />
      <MegaMenu />
      <Dock />
      <ContextMenu />
      <BreadCrumb />
      <h1 className='text-center'>File: </h1>
      <FileUpload />
      <h1 className='text-center'>Overlay: </h1>
      <Tooltip />
      <Sidebar />
      <OverlayPanel />
      <Dialog />
      <ConfirmPopUp />
      <ConfirmDialog/>
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
