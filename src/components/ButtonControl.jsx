/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonStyled = styled.button`
  color: #ffffffaf;
  background: transparent;
  font-size: 16px;
  padding: 16px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  border: 2px solid #ffffff5d;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }
`;

const ButtonControl = ({ eventHandle, children }) => {
  return <ButtonStyled onClick={eventHandle}>{children}</ButtonStyled>;
};

export default ButtonControl;
