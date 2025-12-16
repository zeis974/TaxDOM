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

export const OriginsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  opacity: 0;
  animation: origins-fade-in 0.4s ease-in-out forwards;
  padding-bottom: 24px;

  /* background: yellow; */

  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);

  & > div {
    opacity: 0;
    animation: fadeInUp 0.4s ease-out forwards;
  }

  & > div:nth-child(1) { animation-delay: 0.05s; }
  & > div:nth-child(2) { animation-delay: 0.1s; }
  & > div:nth-child(3) { animation-delay: 0.15s; }
  & > div:nth-child(4) { animation-delay: 0.2s; }
  & > div:nth-child(5) { animation-delay: 0.25s; }
  & > div:nth-child(6) { animation-delay: 0.3s; }
  & > div:nth-child(7) { animation-delay: 0.35s; }
  & > div:nth-child(8) { animation-delay: 0.4s; }
  & > div:nth-child(9) { animation-delay: 0.45s; }
  & > div:nth-child(n+10) { animation-delay: 0.5s; }
`

export const SkeletonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  opacity: 1;
  animation: origins-fade-out 0.3s ease-in-out forwards;
  padding-bottom: 24px;

  &[data-loading="true"] {
    animation: none;
    opacity: 1;
  }
`

export const OriginCard = styled.div`
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

export const NoOrigins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  flex: 1;
`
