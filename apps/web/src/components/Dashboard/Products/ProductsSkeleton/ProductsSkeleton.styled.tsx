import { styled } from "@/panda/jsx"

export const LoadingContainer = styled.div`
  font-family: token(fonts.nativeFont);
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const ProductCardSkeleton = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 75px;
  animation: skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`
