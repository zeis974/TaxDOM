import { styled } from "@/panda/jsx"

export const HintText = styled.span`
  display: block;
  font-size: token(fontSizes.label-md);
  font-family: token(fonts.nativeFont);
  color: token(colors.elevated);
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
      color: token(colors.errorFg);
      font-size: 0.8em;
    }

    &:has(span) {
      & ~ input,
      & ~ div > input {
        border-color: token(colors.errorFg);
      }
    }
  }

  & > input,
  & > div > input {
    outline: none;
    height: 40px;
    border-radius: token(radii.md);
    background: token(colors.elevated);
    border: 1px solid token(colors.elevated);
    padding: 8px 12px;
    font-family: inherit;
    color: token(colors.foreground);
    font-size: 0.9375rem;
    transition:
      border-color 150ms,
      box-shadow 150ms;

    &::placeholder {
      color: token(colors.elevated);
    }

    &:focus {
      border-color: token(colors.primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.primary) 15%, transparent);
    }

    &[aria-invalid="true"] {
      border-color: token(colors.errorFg);
      box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.errorFg) 15%, transparent);
    }

    &[disabled="true"],
    &[aria-disabled="true"] {
      cursor: not-allowed;
      background: token(colors.elevated);
    }
  }

  & > input[type="number"],
  & > div > input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
