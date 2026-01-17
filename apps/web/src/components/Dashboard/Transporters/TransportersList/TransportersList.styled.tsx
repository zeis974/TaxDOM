import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
  padding-right: 8px;
`

export const TransportersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding-bottom: 24px;
`

export const TransporterCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 2px 8px rgba(79, 70, 229, 0.1);
    transform: translateY(-1px);
  }

  & h3 {
    margin: 0 0 8px 0;
    color: #1f2937;
    font-size: 16px;
    font-weight: 600;
  }

  & span {
    color: #6b7280;
    font-size: 12px;
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
  }
`

export const NoTransporters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px;
  padding: 48px 24px;
  text-align: center;
  color: token(colors.darkGray);
  gap: 16px;

  & svg {
    width: 64px;
    height: 64px;
    opacity: 0.3;
  }

  & h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: token(colors.primary);
  }

  & p {
    margin: 0;
    font-size: 14px;
    max-width: 400px;
    line-height: 1.6;
  }
`

export const ResultsCount = styled.div`
  margin-bottom: 1rem;
  color: token(colors.darkGray);
  font-size: 14px;
  font-family: token(fonts.nativeFont);
`
