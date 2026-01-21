/* eslint-disable react/prop-types */
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 100%;
  padding: 16px;
  background: linear-gradient(180deg, #000000, #ffffff00);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const SearchInputField = styled.input`
  width: 50%;
  padding: 12px 16px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px) brightness(0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 1);
  border-radius: 8px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media screen and (width < 720px) {
    width: 100%;
    font-size: 16px;
    padding: 10px 14px;
  }
`;

const SearchInput = ({ value, onChange, placeholder = "Buscar canal..." }) => {
  return (
    <SearchContainer>
      <SearchInputField
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
      />
    </SearchContainer>
  );
};

export default SearchInput;
