import { Tab as RootTab, Tabs as RootTabs } from 'mui-tabs';
import tabClasses from 'mui-tabs/Tab/tabClasses';
import tabsClasses from 'mui-tabs/Tabs/tabsClasses';
import { array, bool, func, string } from 'prop-types';
import styled from 'styled-components';
const { scroller, indicator } = tabsClasses;
const { selected } = tabClasses;
const Tab = styled(RootTab)`
   background-color: transparent;
   border-radius: 24px;
   color: #949494;
   font-size: 16px;
   font-weight: 600;
   min-height: 40px;
   min-width: 60px;
   padding: 0 20px;
   text-transform: initial;
   & + button {
      margin: 0 0 0 6px;
   }
   &:hover:not(.${selected}) {
      color: #3a79f3;
   }
   &.${selected} {
      background-color: #3a79f3;
      color: #ffffff;
   }
`;
const Tabs = styled(RootTabs)`
   align-items: center;
   background-color: transparent;
   min-height: 40px;
   & .${scroller} .${indicator} {
      display: none;
   }
   & .tab-button {
      opacity: 1;
   }
   & .tab-button-disabled {
      color: #454142;
   }
   & .tabs-scroll-button {
      background-color: #3a79f3;
      border-radius: 23px;
      color: #ffffff;
      height: 36px;
      width: 36px;
      & svg {
         height: 24px;
         width: 24px;
      }
   }
`;
const SimpleTabs = ({
   isDisabled = false,
   onChange,
   tabs = [],
   value = '',
}) => {
   const disabled = isDisabled;
   return (
      <Tabs
         allowScrollButtonsMobile
         indicatorProps={{ style: { display: 'none' } }}
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
SimpleTabs.propTypes = {
   isDisabled: bool,
   onChange: func,
   tabs: array,
   value: string,
};
export default SimpleTabs;
