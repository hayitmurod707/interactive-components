import { bool, element } from 'prop-types';
import styled from 'styled-components';
const StyledAccordion = styled.div`
   display: grid;
   grid-template-rows: 0fr;
   overflow: hidden;
   transition: grid-template-rows 400ms;
   &[data-open='true'] {
      grid-template-rows: 1fr;
   }
   & > div {
      min-height: 0;
   }
`;
const Accordion = ({ children = '', open = false }) => (
   <StyledAccordion data-open={open}>
      <div>{children}</div>
   </StyledAccordion>
);
Accordion.propTypes = {
   children: element,
   open: bool,
};
export default Accordion;
