import { styled } from "@/panda/jsx"

export const HintText = styled.span`
  display: block;
  font-size: 0.75rem;
  font-family: token(fonts.nativeFont);
  color: token(colors.surface);
  margin-top: 4px;
  line-height: 1.4;
`

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 0;
  font-family: token(fonts.nativeFont);

  & > label {
    margin-bottom: 6px;
    font-size: clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem);
    font-weight: 600;
    user-select: none;
    color: token(colors.foreground);

    & > span {
      color: token(colors.error);
      font-size: 0.8em;
    }

    &:has(span) {
      & ~ input {
        border-color: token(colors.error);
      }
    }
  }

  & > input {
    outline: none;
    height: 40px;
    border-radius: token(radii.md);
    background: token(colors.bg);
    border: 1px solid token(colors.surface);
    padding: 8px 12px;
    font-family: inherit;
    color: token(colors.foreground);
    font-size: 0.9375rem;
    transition:
      border-color 150ms,
      box-shadow 150ms;

    &::placeholder {
      color: token(colors.surface);
    }

    &:focus {
      border-color: token(colors.peterRiver);
      box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.peterRiver) 15%, transparent);
    }

    &[aria-invalid="true"] {
      border-color: token(colors.error);
      box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.error) 15%, transparent);
    }

    &[disabled="true"],
    &[aria-disabled="true"] {
      cursor: not-allowed;
      background: token(colors.surface);
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
