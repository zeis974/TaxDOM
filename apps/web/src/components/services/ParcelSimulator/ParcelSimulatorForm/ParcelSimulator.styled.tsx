import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  height: 100%;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);

  & form {
    display: inherit;
    width: 100%;
    gap: 20px;

    & > div:first-of-type {
      flex: 1;
      position: relative;
      height: 100%;
      padding: 20px;
      background: token(colors.secondaryBackground);
      border-radius: 10px;

      #captcha-container {
        height: 70px;
        margin-top: 20px;
      }
    }

    & > div:last-child {
      flex: 2;
    }
  }
`
