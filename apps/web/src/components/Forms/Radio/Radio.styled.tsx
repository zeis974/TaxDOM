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
      border: 2px solid token(colors.border);
      border-radius: token(radii.sm);

      & > div {
        display: inherit;
        width: 50%;
        height: 100%;

        &:first-of-type {
          border-radius: token(radii.sm) 0 0 token(radii.sm);
          border-right: none;
        }

        &:last-of-type {
           border-radius: 0 token(radii.sm) token(radii.sm) 0;
          border-left: none;
        }

        & > input {
          display: none;

          &:checked + label {
            transition: background 250ms;
            background: token(colors.textMuted);
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
