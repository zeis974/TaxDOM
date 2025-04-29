import * as m from "motion/react-m"
import { styled } from "@/panda/jsx"

export const Container = styled(m.div)`
  position: absolute;
  width: 100%;
  height: calc(100% - 66px);
  border-radius: 10px;
  bottom: 0;
  background: token(colors.secondaryBackground);
  border: 2px solid token(colors.darkGray);
  padding: 20px;
  opacity: 0.8;
  backdrop-filter: blur(10px);
  top: 55%;
  left: 50%;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  transform: translate(-50%, -50%);

  & > div {
  height: 100%;
  
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      color: token(colors.primary);
    }
    
    & p {
      margin: 5px 0;
    }

    & hr {
      border: none;
      height: 1px;
      margin: 20px 0;
      width: 100%;
      background: token(colors.darkGray);
    }
  }
`

export const Backdrop = styled(m.div)`
  position: absolute;
  width: 100%;
  height: calc(100% - 66px);
  border-radius: 10px;
  bottom: 0;
  backdrop-filter: blur(2px);
  z-index: -1;
`

export const ErrorContainer = styled.div`
  color: red;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`

export const TemplateContainer = styled.div`
  color: token(colors.primary);
  margin: 10px 0;
  display: flex;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 10px;
    border-right: 1px solid green;

    & > div {
      width: 200px;
      text-align: center;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background 150ms;
      cursor: pointer;

      &[data-selected="true"] {
        background: token(colors.darkGray);
      }
    }
  }


  & > div:last-child  {
    margin: 0 10px;
    display: flex;
    align-items: flex-start;
    gap: 10px;

    & span {
      border: 2px solid token(colors.darkGray);
      padding: 10px;
      border-radius: 5px;
    }
  }
`

export const ActionContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
  bottom: 0;
  left: 0;
`
