import * as m from "framer-motion/m"
import { styled } from "@/panda/jsx"

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  gap: 20px;
  margin: 0 20px;
  overflow-y: auto;

  & > button {
    width: calc(100% / 3 - 15px);
    height: 220px;
    cursor: pointer;
    font-weight: bold;
    color: token(colors.primary);
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    border-radius: 10px;
    transition: border 150ms;

    &[disabled] {
      cursor: default;
    }

    &:hover:not([disabled]) {
      border: 2px solid token(colors.primary);
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #2d3436; 
  }
  
  &::-webkit-scrollbar-thumb {
    background: #636e72; 
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #b2bec3; 
  }
`

export const ParcelContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 1;
  background: token(colors.tertiaryBackground);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 6px 15px 0px token(colors.background);
`

export const Card = styled.div`
  width: calc(100% / 3 - 14px);
  height: 220px;
  border-radius: 10px;
  padding: 10px;
  background: token(colors.secondaryBackground);

  & > button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid transparent;
    margin-top: 15px;
    transition: 150ms;
    cursor: pointer;

    &:hover {
      border: 2px solid red;
      background: transparent;
    }
  }
`

export const Loading = styled(m.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff8a;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 10px;
  z-index: 2;

  & > div {
    position: relative;    
    display: flex;
    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;

    &::after {
      content: "";
      position: absolute;
      border: 5px solid #3498db;
      border-top: 5px solid transparent;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      animation: rotate 1s linear infinite;
      opacity: 1;
      transition: opacity 250ms;
    }
  }

  span {
    font-size: 2em;
    font-family: token(fonts.Rowdies);
    margin: 10px 0;
  }
`
