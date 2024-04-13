import styled from "styled-components";

const Container = styled.main`
  display: flex;

  @media screen and (width < 720px) {
    flex-direction: column;
    height: 100vh;
    justify-content: center;
  }
`;

export default Container;
