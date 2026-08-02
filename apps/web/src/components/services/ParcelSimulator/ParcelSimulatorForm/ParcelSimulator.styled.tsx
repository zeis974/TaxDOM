import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  height: 100%;
  color: token(colors.foreground);
  font-family: token(fonts.nativeFont);

  & form {
    display: inherit;
    width: 100%;
    gap: token(spacing.s20);

    & > div:first-of-type {
      flex: 1;
      position: relative;
      height: 100%;
      padding: token(spacing.s20);
      background: token(colors.elevated);
      border-radius: 10px;

      #captcha-container {
        height: 70px;
        margin-top: token(spacing.s20);
      }
    }

    & > div:last-child {
      flex: 2;
    }
  }
`
