import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 10px;
  font-family: token(fonts.nativeFont);

  & > label {
    margin-bottom: 5px;
    font-weight: 600;
    user-select: none;

    & > span {
      color: token(colors.error);
      font-size: 0.8em;
    }

    &:has(span) {
      & ~ input {
        border: 2px solid red;
      }
    }
  }

  & > input {
    outline: none;
    height: 35px;
    border-radius: 5px;
    background: token(colors.darkGray);
    border: 2px solid transparent;
    padding: 5px;
    font-family: inherit;
    transition: border 150ms;

    &:focus {
      border: 2px solid #3498db;
    }
  }

  & > input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
