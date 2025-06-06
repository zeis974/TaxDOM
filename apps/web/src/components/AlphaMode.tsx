import { styled } from "@/panda/jsx"

export default function AlphaMode() {
  return (
    <>
      <Modal>
        <h4>ALPHA - Version mobile non disponible</h4>
        <br />
        <p>
          Pendant toute la phase alpha, l'accent est mis sur la stabilité de l'application. Par
          conséquent, la version mobile n'est pas disponible, et l'utilisation sur ordinateur est
          recommandée durant le développement. Une version native pour mobile est en cours de
          développement. 😄
        </p>
      </Modal>
      <Backdrop />
    </>
  )
}

const Modal = styled.div`
  position: absolute;
  font-family: token(fonts.nativeFont);
  color: black;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 10;
  padding: 20px;
  border-radius: 8px;
`

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff1c;
  z-index: 5;
  backdrop-filter: blur(3px);
`
