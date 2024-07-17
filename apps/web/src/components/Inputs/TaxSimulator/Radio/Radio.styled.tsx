import { styled } from "@/panda/jsx"

export const RadioContainer = styled.div`
  font-family: token(fonts.nativeFont);
  display: flex;

  & > div:first-of-type {
    display: flex;
    flex-direction: column;

    & > div {
      display: inline-flex;
      overflow: hidden;
      height: 40px;
      border: 2px solid #585858; 
      border-radius: 5px;
      opacity: 0.5;

        & > div {
        display: inherit;
        height: 100%;

        &:first-of-type {
          border-radius: 5px 0 0 5px;
          border-right: none;
        }

        &:last-of-type {
          border-radius: 0 5px 5px 0;
          border-left: none;
        } 
        
        & > input {
          display: none;

          &:checked + label {
            transition: background 250ms;
            background: #6a6a6a;
          }
        }

        & label {
          padding: 5px;
          user-select: none;
          text-transform: capitalize;

          /* Disable radio */
          cursor: default;
        }
      }
    }
  
    & > span {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
    }
  }
`
