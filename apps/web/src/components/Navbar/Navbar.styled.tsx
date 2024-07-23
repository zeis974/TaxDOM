import { styled } from "@/panda/jsx"

export const Nav = styled.nav`
  width: 100%;
  max-width: token(sizes.maxScreen);
  margin: 0 auto;
  height: token(sizes.navbarHeight);
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  top: 0;
  background: token(colors.background);

  & > a {
    color: var(--primary-color);
    font-size: clamp(1.4em, 5vw, 2em);    
    font-family: token(fonts.Rowdies);
    position: relative;

    &::before {
      content: "-Alpha";
      bottom: -10px;
      right: 0;
      font-size: 0.5em;
      position: absolute;
      color: gray;
    }
  }
`
