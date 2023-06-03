import styled from "styled-components";
export const Container = styled.div`
width: 100%;
display: flex;
height: 100vh;
`;
export const ImgField = styled.div`
width: 50%;

`;
export const Content = styled.div`

 @media (max-width:768px) {
  width: 100%  !important;
  }

`;
export const Button = styled.button`
color: #fff;
  display: flex;
 
  align-items: center;
  width: 98%;
  height: 50px;
  font-size: 20px;
  font-weight: 400;
  margin-top: 60px;
  border-radius: 56px;
  border: none;
  background-image: linear-gradient(
    to right,
    #1a87ef 50%,

    #7347ff 100%
  );
 @media (max-width:1250px) {
  font-size: 1.616666666666667vw;
  gap: 5% !important;
  }
  @media (max-width:744px) {
    font-size: 3vw;
    gap: 5% !important;
    }
`;
export const ImgContainer = styled.div`
width: 50% !important;
 @media (max-width:768px) {
 display: none  !important;
  }
`;