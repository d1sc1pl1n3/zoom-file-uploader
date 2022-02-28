import React from "react";
import styled from "styled-components";
import Img from "next/image";

const Logo = () => {
  return (
    <NavBar>
      <ImgCont>
        <Img src="/Bitmap.png" alt="logo" width={125} height={30} />
      </ImgCont>
      <div className="flex-end">Hulp nodig?</div>
    </NavBar>
  );
};

const NavBar = styled.section`
  display: flex;
  justify-content: space-between;
  //width: 100%;
  width: 960px;
  height: 9vh;
  padding: 20px;
  .flex-end {
    justify-content: flex-end;
    color: #757575;
    font-weight: bolder;
  }
`;

const ImgCont = styled.div`
  height: 30px;
  background: #fff;
  border-radius: 3px;
`;

export default Logo;
