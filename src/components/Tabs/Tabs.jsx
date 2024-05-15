import { Tabs as RootTabs } from 'mui-tabs';
import tabsClasses from 'mui-tabs/Tabs/tabsClasses';
import styled from 'styled-components';
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
