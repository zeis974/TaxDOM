import { styled } from "@/panda/jsx"

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  height: token(sizes.navbarHeight);

  & > div:first-of-type {
    display: flex;
    position: relative;

    & > a {
      color: token(colors.primary);
      font-size: clamp(1.4em, 5vw, 2em);    
      font-family: token(fonts.rowdies);
      position: relative;

      &::before {
        content: "-Alpha";
        bottom: -10px;
        right: 0;
        font-size: 0.5em;
        position: absolute;
        color: token(colors.textMuted);
      }  
    }
  }

  & > div:last-of-type {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`
