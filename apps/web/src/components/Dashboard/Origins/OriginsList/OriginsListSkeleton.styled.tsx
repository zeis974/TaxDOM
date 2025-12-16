import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 0;
  color: token(colors.primary);
  font-family: token(fonts.nativeFont);
`

export const SkeletonContainer = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  opacity: 1;
  animation: origins-fade-out 0.3s ease-in-out forwards;
  align-content: start;

  &[data-loading="true"] {
    animation: none;
    opacity: 1;
  }
`

export const SkeletonButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-family: token(fonts.nativeFont);
  font-weight: 600;
  font-size: 14px;
  cursor: not-allowed;
  opacity: 0.5;
  transition: none;
  pointer-events: none;

  &[data-variant="filter"] {
    background: token(colors.secondaryBackground);
    border: 1px solid token(colors.darkGray);
    color: token(colors.primary);
  }

  &[data-variant="primary"] {
    background: token(colors.primary);
    border: 1px solid token(colors.primary);
    color: #ffffff;
  }

  & svg {
    opacity: 0.6;
  }
`

export const SkeletonCard = styled.div`
  background: token(colors.secondaryBackground);
  border: 1px solid token(colors.darkGray);
  border-radius: 12px;
  padding: 18px;
  width: 100%;
  height: 90px;
  opacity: 1;
  box-sizing: border-box;

  .skeleton-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 16px;
    min-width: 0;
  }

  .skeleton-title {
    height: 20px;
    width: 60%;
    max-width: 180px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.12) 0%,
      rgba(148, 163, 184, 0.22) 50%,
      rgba(148, 163, 184, 0.12) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 2s infinite ease-in-out;
  }

  .skeleton-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .skeleton-badge {
    height: 20px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.12) 0%,
      rgba(148, 163, 184, 0.22) 50%,
      rgba(148, 163, 184, 0.12) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 2s infinite ease-in-out;
  }

  .skeleton-badge-sm {
    width: 28px;
  }

  .skeleton-badge-md {
    width: 78px;
  }

  .skeleton-count {
    height: 14px;
    width: 50%;
    max-width: 120px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.12) 0%,
      rgba(148, 163, 184, 0.22) 50%,
      rgba(148, 163, 184, 0.12) 100%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 2s infinite ease-in-out;
  }
`
