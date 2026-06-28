import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  gap: 20px;
  overflow-y: scroll;

  & > button {
    width: calc(100% / 3 - 15px);
    height: 220px;
    cursor: pointer;
    font-weight: bold;
    color: token(colors.foreground);
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    border-radius: token(radii.lg);
    transition: border 150ms;

    &[disabled] {
      cursor: default;
    }

    &:hover:not([disabled]) {
      border: 2px solid token(colors.foreground);
    }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: token(colors.background); 
  }
  
  &::-webkit-scrollbar-thumb {
    background: token(colors.border); 
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: token(colors.textMuted); 
  }
`

export const ParcelContent = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  background: token(colors.background);
  padding-bottom: 5px;
  z-index: 1;
  top: 0;

  & > div:first-of-type {
    position: sticky;
    display: inherit;
    justify-content: space-around;
    width: 100%;
    padding: 10px;
    border-radius: token(radii.lg);
    background: token(colors.elevated);
  }

  button {
    width: 100px;
    cursor: pointer;
    padding: 10px;
    border-radius: token(radii.lg);
    border: 2px solid transparent;
    transition: 150ms;
    
    &:hover {
      background: transparent;
      border: 2px solid token(colors.elevated);
    }
  }
`

export const Card = styled.div`
  width: calc(100% / 3 - 14px);
  height: 220px;
  border-radius: token(radii.lg);
  padding: 10px;
  background: token(colors.elevated);

  & > button {
    width: 100%;
    padding: 10px;
    border-radius: token(radii.sm);
    border: 2px solid transparent;
    margin-top: 5px;
    transition: 150ms;
    cursor: pointer;

    &:hover {
      border: 2px solid token(colors.errorFg);
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
  background: color-mix(in srgb, token(colors.background) 54%, transparent);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: token(radii.lg);
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
      border: 5px solid token(colors.primary);
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
    font-family: token(fonts.rowdies);
    margin: 10px 0;
  }
`

export const ParcelSimulatorSkeleton = styled.div`
  width: 100px;
  background: token(colors.elevated);
  border-radius: token(radii.lg);
  animation: skeleton 1s linear infinite;
`
