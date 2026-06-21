import { styled } from "@/panda/jsx"

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 0;
  font-family: token(fonts.nativeFont);

  & > label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 6px;
    font-size: clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem);
    font-weight: 600;
    user-select: none;
    color: token(colors.foreground);

    & > span {
      color: token(colors.error);
      font-size: 0.8em;
    }
  }

  & > input {
    outline: none;
    height: 40px;
    border-radius: token(radii.md);
    background: token(colors.bg);
    border: 1px solid transparent;
    padding: 8px 12px;
    font-family: inherit;
    color: token(colors.foreground);
    font-size: 0.9375rem;
    transition:
      border-color 150ms ease-in,
      box-shadow 150ms ease-in;

    &::placeholder {
      color: token(colors.surface);
    }

    &:focus {
      border-color: token(colors.peterRiver);
      box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.peterRiver) 15%, transparent);
    }

    &:disabled,
    &[disabled="true"],
    &[aria-disabled="true"] {
      cursor: not-allowed;
      background: token(colors.surface);
    }
  }

  &:has(> label > span) > input {
    border-color: token(colors.error);
  }

  & > input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
