import { styled } from "@/panda/jsx"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
  gap: 40px;
  margin: 0 20px;
  height: calc(100vh - token(sizes.navbarHeight));
  font-family: token(fonts.nativeFont);

  @media (width < 768px) {
    flex-direction: column;
    text-align: center;
    justify-content: flex-start;
    margin-top: 40px;
    gap: 20px;
    height: auto;
    min-height: calc(100vh - token(sizes.navbarHeight));
    padding-bottom: 40px;
  }

  & button {
    margin-top: 10px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 550px;
  text-align: left;

  @media (width < 768px) {
    text-align: center;
    align-items: center;
    max-width: 100%;
  }
`

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -2px;

  @media (width < 768px) {
    font-size: 2.5rem;
  }
`

export const Illustration = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  align-self: stretch;

  @media (width < 992px) {
    max-width: 100%;
    width: 100%;
    min-height: 300px;
    flex: 0 0 auto;
  }

  @media (width < 768px) {
    min-height: 250px;
  }
`
