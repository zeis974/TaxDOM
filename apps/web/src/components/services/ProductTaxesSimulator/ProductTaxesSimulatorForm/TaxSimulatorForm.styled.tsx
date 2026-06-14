import { styled } from "@/panda/jsx"

export const CaptchaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InputWrapper = styled.div`
  position: relative;
`

export const ConvertButton = styled.button`
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: token(fonts.nativeFont);
  color: #fff;
  background: token(colors.accent);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
