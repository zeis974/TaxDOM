import { styled } from "@/panda/jsx"

export const AddProductBtn = styled.button`
  height: 100%;
  padding: 10px;
  background: token(colors.tertiaryBackground);
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 8px;
`

export const AddProductContainer = styled.div`
  width: 50vw;
  padding: 15px;

  & h2 {
    margin-bottom: 25px;
    color: token(colors.primary);
  }
`

export const ProductActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`

export const ErrorContainer = styled.div`
  color: red;
  flex: 1;
  font-family: token(fonts.nativeFont);
  font-weight: bold;
`
