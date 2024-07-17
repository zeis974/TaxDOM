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
      color: #ff9b9b;
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
    background: token(colors.lightGray);
    border: 2px solid #585858;
    padding: 5px;
    font-family: inherit;
    transition: border 250ms;
  }

  & > input:focus {
    border: 2px solid white;
  }
`
