import styled from "styled-components";

import Button from "../button/button.component";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 410px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  ${Button} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

// .cart-dropdown-container {
//   position: absolute;
//   width: 300px;
//   height: 410px;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   border: 1px solid black;
//   background-color: white;
//   top: 90px;
//   right: 40px;
//   z-index: 5;

//   .cart-items {
//     height: 300px;
//     display: flex;
//     flex-direction: column;
//     overflow: auto;
//   }

//   button {
//     margin-top: auto;
//   }
// }
