import { styled } from "@/panda/jsx"

export const Container = styled.nav`
  flex: 1;
  background: token(colors.secondaryBackground);
  height: calc(100% - 10px);
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;
  color: token(colors.primary);
  max-width: 250px;
  font-family: token(fonts.nativeFont);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  & > div:first-child {
    display: inherit;
    flex-direction: column;
    gap: 20px;
  }
`

export const Logo = styled.h1`
  color: var(--primary-color);
  font-size: clamp(1.4em, 5vw, 2em);    
  font-family: token(fonts.Rowdies);
`

export const List = styled.ul`
  & li {
    margin-bottom: 10px;
    border-radius: 10px;
    color: inherit;

    &[data-active="true"] {
      background: token(colors.tertiaryBackground);
    }

    & a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: inherit;
      line-height: 1;
      width: 100%;
      height: 100%;
      padding: 10px;
    }

    &:hover  {
      background: token(colors.tertiaryBackground);
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
  width: 40px;
  height: 40px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
