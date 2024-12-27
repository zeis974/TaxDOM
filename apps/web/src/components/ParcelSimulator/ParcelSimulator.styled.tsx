import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  color: token(colors.primary);
  height: 100%;

  font-family: token(fonts.nativeFont);
  overflow-y: auto;

  & > div:first-child {
    flex: 1;
    position: relative;
    height: 100%;
    padding: 20px;
    background: token(colors.secondaryBackground);
    border-radius: 10px;

    & h1 {
      font-family: token(fonts.NotoSansBold);
    }

    & hr {
      margin: 10px 0;
    }

    & form {
      #captcha {
        margin-top: 20px;
      }
    }
  }
  
  & > div:last-child {
    flex: 2;
  }
`

export const ParcelSimulatorSubmit = styled.div`
  width: 100%;
`
