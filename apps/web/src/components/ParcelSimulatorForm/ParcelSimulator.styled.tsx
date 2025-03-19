import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);

  & form {
    display: inherit;
    width: 100%;

    & > div:first-of-type {
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

      #captcha-container {
        margin-top: 20px;
      }
    }

    & > div:last-child {
      flex: 2;
    }
  }
`
