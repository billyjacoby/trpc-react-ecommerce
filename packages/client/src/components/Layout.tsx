import styled from 'styled-components';
import { Navbar } from './Navbar';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

interface ContainerProps {
  children: JSX.Element;
}

export const Layout = (props: ContainerProps) => {
  const { children } = props;
  return (
    <StyledContainer {...props}>
      <Flowbite className="dark">
        {/* <DarkThemeToggle /> */}
        <Navbar />
        {children}
      </Flowbite>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
