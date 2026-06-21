import { styled } from "@/panda/jsx"

export const Container = styled.nav`
  flex: 1;
  background: token(colors.secondaryBackground);
  height: calc(100% - 10px);
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;
  color: token(colors.primary);
  max-width: 220px;
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
  color: token(colors.primary);
  font-size: clamp(1.2em, 4vw, 1.6em);
  font-family: token(fonts.nativeFont);
`

export const List = styled.ul`
  & li {
    position: relative;
    margin-bottom: 6px;
    border-radius: 10px;
    color: inherit;

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

    & a:focus-visible {
      outline: 2px solid token(colors.primary);
      outline-offset: 2px;
    }

    /* Survol (hors page courante) : indice léger */
    &:not([data-active="true"]):hover > a {
      background: color-mix(in srgb, token(colors.tertiaryBackground) 55%, transparent);
    }

    /* Page courante : fond plein + texte renforcé + barre latérale */
    &[data-active="true"] > a {
      background: token(colors.tertiaryBackground);
      color: token(colors.primary);
      font-weight: 600;
    }

    &[data-active="true"]::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      border-radius: 999px;
      background: token(colors.primary);
    }
  }
`

export const UserContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: token(colors.tertiaryBackground);
  align-items: center;
  justify-content: space-between;
`

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: token(colors.primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: token(colors.secondaryBackground);
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;

  & > img {
    border-radius: 50%;
    object-fit: cover;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`

export const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UserEmail = styled.span`
  font-size: 12px;
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
  padding: 4px;
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
