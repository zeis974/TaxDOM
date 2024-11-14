import type { FieldComponent } from "@tanstack/react-form"

import { styled } from "@/panda/jsx"

import { AddIcon } from "@/components/Icons"
import { Input } from "@/components/Inputs"

export default function ParcelSimulatorCards({ Field }: { Field: FieldComponent<any, undefined> }) {
  return (
    <Field name="products" mode="array">
      {(field) => {
        return (
          <Container>
            {field.state.value.map((_: any, i: number) => (
              <Card key={i}>
                <Input
                  {...{ Field }}
                  name={`products.${i}.name`}
                  label="Produit"
                  placeholder="Ordinateur"
                />
                <Input
                  {...{ Field }}
                  name={`products.${i}.price`}
                  label="Prix € (HT)"
                  placeholder="0"
                  type="number"
                />
                <button onClick={() => field.removeValue(i)} type="button">
                  Supprimer
                </button>
              </Card>
            ))}
            <button onClick={() => field.pushValue({ name: "", price: 0 })} type="button">
              <AddIcon />
              Ajouter un produit
            </button>
          </Container>
        )
      }}
    </Field>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 20px;
  padding: 0 20px;
  overflow-y: auto;

  & > button {
    width: calc(100% / 3 - 15px);
    height: 220px;
    font-weight: bold;
    color: token(colors.primary);
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    border-radius: 10px;
    transition: border 150ms;

    &:hover {
      border: 2px solid token(colors.primary);
    }
  }

  &::-webkit-scrollbar {
  width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #2d3436; 
  }
 
  &::-webkit-scrollbar-thumb {
    background: #636e72; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b2bec3; 
  }
/* 
  &::before {
    content: "";
    position: sticky;
    top: 100vh;
    width: 100%;
    height: 30px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  } */
`

const Card = styled.div`
  width: calc(100% / 3 - 14px);
  height: 220px;
  border-radius: 10px;
  padding: 10px;
  background: token(colors.secondaryBackground);

  & > button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid transparent;
    margin-top: 15px;
    transition: 150ms;
    cursor: pointer;

    &:hover {
      border: 2px solid red;
      background: transparent;
    }
  }
`
