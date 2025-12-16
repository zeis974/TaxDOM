import { styled } from "@/panda/jsx"

export const AddOriginBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.tertiaryBackground);
  font-weight: 500;
  border: 1px solid token(colors.darkGray);
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &:hover {
    background: token(colors.secondaryBackground);
    border-color: token(colors.primary);
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }
`

export const AddOriginContainer = styled.div`
  width: min(480px, 90vw);
  padding: 24px;
  background: token(colors.background);
  border-radius: 12px;
  box-shadow: 0 4px 20px token(colors.shadow);
  
  & h2 {
    margin-bottom: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    color: token(colors.primary);
  }

  & hr {
    height: 1px;
    background: token(colors.secondaryBackground);
    border: none;
    margin: 16px 0 24px;
  }
`

export const FieldDescription = styled.p`
  font-size: 0.875rem;
  color: token(colors.darkGray);
  margin: 0 0 8px 0;
  line-height: 1.5;
`

export const OriginActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid token(colors.secondaryBackground);
  gap: 12px;
`

export const ErrorContainer = styled.div`
  color: token(colors.error);
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
`

export const SwitchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`

export const SwitchTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  padding-right: 16px;

  & label {
    font-weight: 600;
    color: token(colors.primary);
    cursor: pointer;
    font-size: 0.95rem;
  }
`

export const SwitchInput = styled.input`
  appearance: none;
  width: 44px;
  height: 24px;
  background: token(colors.darkGray);
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  &:checked {
    background: token(colors.blue);
  }

  &:checked::after {
    transform: translateX(20px);
  }
`
