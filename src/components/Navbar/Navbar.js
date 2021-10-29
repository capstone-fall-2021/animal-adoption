import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

const NavLogo = styled.a`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const NavLink = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn1 = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled.a`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

const Navbar = ({ toggle }) => {
  const { data: session } = useSession();

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo href="/" passHref>
            <h1>[Logo]Name</h1>
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavLink href="/about" passHref activeStyle>
              About
            </NavLink>
            <NavLink href="/profiles" passHref activeStyle>
              Animals
            </NavLink>
            <NavLink href="/news" passHref activeStyle>
              News
            </NavLink>
            <NavLink href="/account" passHref activeStyle>
              Account
            </NavLink>
          </NavMenu>
          <NavMenu>
            <NavBtn>
              {session ? (
                <NavBtnLink onClick={() => signOut()}>Log Out</NavBtnLink>
              ) : (
                <>
                  <NavBtn1>
                    <NavBtnLink href="/signup" passHref>
                      Sign Up
                    </NavBtnLink>
                  </NavBtn1>
                  <NavBtnLink onClick={() => signIn()}>Log In</NavBtnLink>
                </>
              )}
            </NavBtn>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
