import React from 'react';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
const StyledScrollbar = styled.div`
   height: 100%;
   width: 100%;
   & .simplebar-scrollbar {
      cursor: pointer !important;
   }
   & .simplebar-track {
      z-index: 3;
      &.simplebar-vertical {
         bottom: 2px;
         top: 2px;
         width: 13px;
      }
      &.simplebar-horizontal {
         height: 13px;
         left: 3px;
         right: 3px;
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
   <StyledScrollbar>
      <SimpleBar
         autoHide={false}
         style={{
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            width: '100%',
         }}
      >
         {children}
      </SimpleBar>
   </StyledScrollbar>
);
export default Scrollbar;
