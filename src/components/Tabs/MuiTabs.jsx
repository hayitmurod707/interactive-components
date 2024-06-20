import { Tab as RootTab, Tabs as RootTabs } from 'mui-tabs';
import tabClasses from 'mui-tabs/Tab/tabClasses';
import tabsClasses from 'mui-tabs/Tabs/tabsClasses';
import { array, bool, func, string } from 'prop-types';
import styled from 'styled-components';
const { scroller, indicator } = tabsClasses;
const { selected } = tabClasses;
const Tab = styled(RootTab)`
   background-color: transparent;
   color: #454142;
   font-size: 16px;
   font-weight: 700;
   padding: 16px 20px;
   text-transform: initial;
   &.${selected} {
      color: #3a79f3;
   }
`;
const Tabs = styled(RootTabs)`
   background-color: transparent;
   & .${scroller} .${indicator} {
      background-color: #397af5;
      height: 2px;
   }
   & .tab-button {
      opacity: 1;
      &:hover {
         color: #397af5;
      }
   }
   & .tab-button-disabled {
      color: #454142;
   }
`;
const MuiTabs = ({ isDisabled = false, onChange, tabs = [], value = '' }) => {
   const disabled = isDisabled;
   return (
      <Tabs
         allowScrollButtonsMobile
         onChange={onChange}
         scrollButtons='auto'
         value={value}
         variant='scrollable'
      >
         {(Array.isArray(tabs) ? tabs : []).map(
            ({ label, value, isDisabled = false }, index) => (
               <Tab key={index} value={value} disabled={isDisabled || disabled}>
                  {label}
               </Tab>
            )
         )}
      </Tabs>
   );
};
MuiTabs.propTypes = {
   isDisabled: bool,
   onChange: func,
   tabs: array,
   value: string,
};
export default MuiTabs;
