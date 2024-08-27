import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
const StyledScrollbar = styled(SimpleBar)`
   height: 100%;
   max-height: 100%;
   max-width: 100%;
   width: 100%;
   & .simplebar-scrollbar {
      cursor: pointer !important;
   }
   & .simplebar-track {
      z-index: 3;
      &.simplebar-vertical {
         bottom: 0;
         top: 0;
         width: 13px;
      }
      &.simplebar-horizontal {
         height: 13px;
         left: 0;
         right: 0;
         & .simplebar-scrollbar {
            height: 13px;
         }
      }
      & .simplebar-scrollbar {
         &:before {
            background-color: #3a79f3;
            bottom: 3px;
            height: initial;
            left: 3px;
            right: 3px;
            top: 3px;
            transition: 200ms;
         }
         &.simplebar-visible {
            &:before {
               opacity: 1 !important;
            }
         }
      }
   }
`;
const Scrollbar = ({ children }) => (
   <StyledScrollbar autoHide={false}>{children}</StyledScrollbar>
);
export default Scrollbar;
