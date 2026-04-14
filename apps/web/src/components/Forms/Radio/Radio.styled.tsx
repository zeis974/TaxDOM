import { styled } from "@/panda/jsx"

export const Container = styled.div`
  font-family: token(fonts.nativeFont);
  display: flex;
  margin-bottom: 10px;

  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {
      display: inline-flex;
      overflow: hidden;
      width: fit-content;
      padding: 2px;
      height: 40px;
      border: 2px solid #585858; 
      border-radius: 5px;

        & > div {
        display: inherit;
        width: 50%;
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
            border-radius: 2px;
          }

          &[disabled] + label {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }

        & label {
          width: 100%;
          padding: 5px;
          user-select: none;
          text-transform: capitalize;
          cursor: pointer;
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
