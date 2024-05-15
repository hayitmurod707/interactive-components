import { Tab as RootTab } from 'mui-tabs';
import tabClasses from 'mui-tabs/Tab/tabClasses';
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
