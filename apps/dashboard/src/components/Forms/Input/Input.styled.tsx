import { styled } from "@/panda/jsx"
import { token } from "@/panda/tokens"

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 0;
  font-family: ${token("fonts.nativeFont")};

  & > label {
    margin-bottom: 6px;
    font-size: clamp(0.875rem, 0.8529rem + 0.0941vw, 1rem);
    font-weight: 600;
    user-select: none;
    color: ${token("colors.primary")};

    & > span {
      color: ${token("colors.error")};
      font-size: 0.8em;
    }

    &:has(span) {
      & ~ input {
        border-color: ${token("colors.error")};
      }
    }
  }

  & > input {
    outline: none;
    height: 40px;
    border-radius: 8px;
    background: ${token("colors.background")};
    border: 1px solid ${token("colors.darkGray")};
    padding: 8px 12px;
    font-family: inherit;
    color: ${token("colors.primary")};
    font-size: 0.9375rem;
    transition:
      border-color 150ms,
      box-shadow 150ms;

    &::placeholder {
      color: ${token("colors.darkGray")};
    }

    &:focus {
      border-color: ${token("colors.blue")};
      box-shadow: 0 0 0 3px color-mix(in srgb, ${token("colors.blue")} 15%, transparent);
    }

    &[disabled="true"],
    &[aria-disabled="true"] {
      cursor: not-allowed;
      background: ${token("colors.secondaryBackground")};
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
