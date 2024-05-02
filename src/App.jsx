import { Fragment } from 'react';
import styled from 'styled-components';
import Detail from './components/Details';
import data from './data';
const StyledHeader = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   & h1 {
      font-size: 32px;
      font-weight: 600;
      margin: 32px 0 0 0;
      text-align: center;
   }
   & p {
      color: #768695;
      font-size: 18px;
      font-weight: 500;
      margin: 24px 0;
      text-align: center;
      & a {
         align-items: center;
         background-color: #5254f1;
         border-radius: 10px;
         color: white;
         display: flex;
         font-size: 16px;
         justify-content: center;
         padding: 12px 24px;
         text-decoration: none;
      }
   }
`;
const StyledElement = styled.div`
   align-items: center;
   display: flex;
   flex-direction: column;
   & .sub-title {
      font-size: 24px;
      font-weight: 600;
      margin: 24px 0;
      text-align: center;
   }
   & .items {
      max-width: 700px;
      width: 100%;
   }
`;
const App = () => {
   return (
      <Fragment>
         <StyledHeader>
            <h1>Interactive components</h1>
            <p>Interactive components for react application</p>
            <p>
               <a
                  href='https://github.com/hayitmurod707/interactive-components'
                  rel='noreferrer'
                  target='_blank'
               >
                  Github repository
               </a>
            </p>
         </StyledHeader>
         <StyledElement>
            <h2 className='sub-title'>Details</h2>
            <div className='items'>
               {data.map((item, index) => (
                  <Detail {...item} key={index} />
               ))}
            </div>
         </StyledElement>
      </Fragment>
   );
};
export default App;
