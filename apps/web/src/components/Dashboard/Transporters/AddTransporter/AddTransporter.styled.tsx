import { styled } from "@/panda/jsx"

export const AddTransporterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: token(colors.primary);
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  color: token(colors.background);
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  transition: all 150ms ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
  }

  & svg {
    flex-shrink: 0;
  }
`

export const AddTransporterContainer = styled.div`
  width: min(500px, 90vw);
  padding: 24px;
  font-family: token(fonts.nativeFont);
  
  & h2 {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: token(colors.primary);
  }

  & hr {
    height: 1px;
    background: token(colors.secondaryBackground);
    border: none;
    margin-bottom: 24px;
  }
`

export const TransporterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid token(colors.secondaryBackground);
`

export const ErrorContainer = styled.div`
  color: #ef4444;
  font-family: token(fonts.nativeFont);
  font-size: 14px;
  font-weight: 500;
  
  & span {
    display: block;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`
