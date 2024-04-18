import { Tab as RootTab, Tabs as RootTabs } from 'mui-tabs';
import tabClasses from 'mui-tabs/Tab/tabClasses';
import tabsClasses from 'mui-tabs/Tabs/tabsClasses';
import styled from 'styled-components';
export const Tab = styled(RootTab)`
   background-color: transparent;
   color: #949494;
   font-size: 15px;
   font-weight: 700;
   padding: 20px 24px;
   text-transform: initial;
   &.${tabClasses.selected} {
      color: #454142;
   }
`;
export const Tabs = styled(RootTabs)`
   background-color: transparent;
   & .${tabsClasses.scroller} .${tabsClasses.indicator} {
      background: #397af5;
      height: 2px;
   }
   & .tab-button {
      opacity: 1;
   }
   & .tab-button-disabled {
      color: #949494;
   }
`;
