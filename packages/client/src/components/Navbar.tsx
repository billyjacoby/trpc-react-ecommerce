import { Navbar as FBNavbar, Button as FBButton } from 'flowbite-react';
import styled from 'styled-components';

export const Navbar = () => {
  return (
    <StyledFBNavbar rounded={false}>
      <FBNavbar.Brand href="#">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Keebilly Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Keebilly
        </span>
      </FBNavbar.Brand>
      <div className="flex md:order-2">
        <FBButton>Get started</FBButton>
        <FBNavbar.Toggle />
      </div>
      <FBNavbar.Collapse>
        <FBNavbar.Link href="#" active={true}>
          Home
        </FBNavbar.Link>
        <FBNavbar.Link href="#">About</FBNavbar.Link>
        <FBNavbar.Link href="#">Services</FBNavbar.Link>
        <FBNavbar.Link href="#">Pricing</FBNavbar.Link>
        <FBNavbar.Link href="#">Contact</FBNavbar.Link>
      </FBNavbar.Collapse>
    </StyledFBNavbar>
  );
};

const StyledFBNavbar = styled(FBNavbar)`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100%;
`;
