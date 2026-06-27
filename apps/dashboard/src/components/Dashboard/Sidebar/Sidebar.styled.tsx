import { styled } from "@/panda/jsx"

export const Container = styled.nav`
  flex: 1;
  background: token(colors.surface);
  height: calc(100% - 10px);
  padding: 10px;
  margin: 0 10px;
  border-radius: token(radii.lg);
  color: token(colors.foreground);
  max-width: 250px;
  font-family: token(fonts.nativeFont);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  & > div:first-child {
    display: inherit;
    flex-direction: column;
    gap: 16px;
  }
`

export const Logo = styled.h1`
  color: token(colors.foreground);
  font-size: clamp(1.4em, 5vw, 2em);
  font-family: token(fonts.nativeFont);
`

export const List = styled.ul`
  & li {
    margin-bottom: 10px;
    border-radius: token(radii.lg);
    color: inherit;

    &[data-active="true"] {
      background: token(colors.surface);
    }

    & a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: inherit;
      line-height: 1;
      width: 100%;
      height: 100%;
      padding: 8px 10px;
      border-radius: 10px;
      font-weight: 500;
      transition: background 150ms ease;
    }

    &:hover {
      background: token(colors.surface);
    }
  }
`

export const UserContainer = styled.div`
  display: flex;
  gap: token(spacing.sm);
  padding: 12px;
  border-radius: token(radii.lg);
  background: token(colors.surface);
  align-items: center;
  justify-content: space-between;
`

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: token(colors.foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  color: token(colors.surface);
  font-weight: 600;
  font-size: token(fontSizes.body-md);
  flex-shrink: 0;

  & > img {
    border-radius: 50%;
    object-fit: cover;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: token(spacing.xs);
  overflow: hidden;
`

export const UserName = styled.span`
  font-weight: 600;
  font-size: token(fontSizes.body-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UserEmail = styled.span`
  font-size: token(fontSizes.label-md);
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UserContentWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
  overflow: hidden;
`

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: token(spacing.xs);
  flex-shrink: 0;
  transition: opacity 0.2s;

  & svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid token(colors.primary);
    outline-offset: 2px;
    border-radius: 6px;
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
