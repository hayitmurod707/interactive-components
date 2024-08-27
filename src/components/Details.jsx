import { string } from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
const Minus = () => (
   <svg fill='none' height='22' viewBox='0 0 20 20' width='22'>
      <circle cx='10' cy='10' r='10' fill='#5254F1' />
      <path
         d='M13.75 9.13062V10.8693H10.8693H9.13068H6.25V9.13062H9.13068L9.07971 9.13106H10.8183L10.8693 9.13062H13.75Z'
         fill='white'
      />
   </svg>
);
const Plus = () => (
   <svg fill='none' height='22' viewBox='0 0 20 20' width='22'>
      <circle cx='10' cy='10' r='10' fill='#5254F1' />
      <path
         d='M13.75 9.13062V10.8693H10.8693H9.13068H6.25V9.13062H9.13068L9.07971 9.13106H10.8183L10.8693 9.13062H13.75Z'
         fill='white'
      />
      <path
         d='M13.75 9.13068V10.8693H10.8693V13.75H9.13068V10.8693H6.25V9.13068H9.13068V6.25H10.8693V9.13068H13.75Z'
         fill='white'
      />
   </svg>
);
const StyledElement = styled.div`
   border-radius: 12px;
   border: 1px solid #e2e4ea;
   margin: 10px 0;
   max-width: 700px;
   overflow: hidden;
   width: 100%;
   &:first-child {
      margin: 0 0 10px 0;
   }
   &:last-child {
      margin: 10px 0 0 0;
   }
   & .summary {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 16px;
      &:hover {
         background-color: rgba(226, 228, 234, 0.2);
      }
      & .icon {
         height: 22px;
         width: 22px;
      }
      & .title {
         font-size: 16px;
         font-weight: 600;
         line-height: 140%;
         width: calc(100% - 32px);
      }
   }
   & .content {
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
      transition: grid-template-rows 400ms;
      &[data-open='true'] {
         grid-template-rows: 1fr;
      }
      & > div {
         min-height: 0;
         & .inner-content {
            border-top: 1px solid rgba(105, 111, 133, 0.15);
            color: #6e7892;
            font-size: 15px;
            font-weight: 500;
            line-height: 160%;
            padding: 16px;
         }
      }
   }
`;
const Details = ({ content = '', title = '' }) => {
   const [open, setOpen] = useState(false);
   return (
      <StyledElement>
         <div className='summary' onClick={() => setOpen(prev => !prev)}>
            <div className='title'>{title}</div>
            <div className='icon'>{open ? <Minus /> : <Plus />}</div>
         </div>
         <div className='content' data-open={open}>
            <div>
               <div className='inner-content'>{content}</div>
            </div>
         </div>
      </StyledElement>
   );
};
Details.propTypes = {
   content: string,
   title: string,
};
export default Details;
