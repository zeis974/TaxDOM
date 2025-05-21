import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import {
  Container,
  DutyInfo,
  Informations,
  ProductCard,
  ProductsContainer,
  TaxesContainer,
  TaxesInfo,
  TaxesInformations,
} from "./ParcelSimulatorResult.styled"

export default function ParcelSimulatorResult() {
  const result = useParcelSimulatorStore((s) => s.result)

  if (!result) return null

  const omrPrice = Math.round((result?.dutyPrice * result?.taxes?.omr) / 100)
  const omPrice = Math.round((result?.dutyPrice * result?.taxes?.om) / 100)
  const tvaPrice = Math.round((result?.dutyPrice * result?.taxes?.tva) / 100)

  const totalPrice = omrPrice + omPrice + tvaPrice + result?.carrierFee

  return (
    <Container>
      <Informations>
        <TaxesInformations data-taxes={result?.taxesInfo?.applicable}>
          {result?.taxesInfo?.applicable ? (
            <h1>
              Votre colis nécessite le règlement de droits et taxes de douane d'un montant de{" "}
              {`${totalPrice === result?.totalTaxes ? totalPrice : null}€`}
            </h1>
          ) : (
            <h1>Votre envoi ne sera pas taxés et vous recevrez le colis sans surcoût.</h1>
          )}
          <hr />
          <div>
            <h3>Comprendre la taxation</h3>
            <div>
              {result?.taxesInfo?.applicable ? (
                <>
                  <div>
                    <p>
                      Le montant se compose de <span>{omrPrice} euros</span> d'OMR,{" "}
                      <span>{omPrice} euros</span> euros d'OM et <span>{tvaPrice} euros</span> euros
                      de TVA.
                    </p>
                    {result?.taxesInfo?.privateCustomer ? (
                      <p>
                        La valeur du colis éxcede <span>400 euros</span>
                      </p>
                    ) : (
                      <p>
                        La valeur du colis éxcede <span>22 euros</span>
                      </p>
                    )}
                    <p>
                      Des <span>frais des gestions</span> de <span>{result?.carrierFee} euros</span>{" "}
                      vont seront prélevés pour le dédouanement de votre colis.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Le colis provient de la <span>Métropole</span> ou d'un autre{" "}
                    <span>territoire de l'union européene</span>.
                  </p>
                  {result?.taxesInfo?.privateCustomer && (
                    <p>
                      Envoyé entre <span>particuliers</span>
                    </p>
                  )}
                  <p>
                    La valeur du colis n'éxcede pas
                    {result?.taxesInfo?.privateCustomer ? (
                      <span>400 euros</span>
                    ) : (
                      <span>22 euros</span>
                    )}
                  </p>
                  <p>
                    Les frais sont prélevés seulement si des taxes sont dues. Si vous en êtes
                    exonéré ou que les taxes ont été payées intégralement à l’achat, alors vous ne
                    payez pas non plus de <span>frais de gestion</span>.
                  </p>
                </>
              )}
            </div>
          </div>
        </TaxesInformations>
      </Informations>
      <ProductsContainer>
        <div>
          <h1>{(result?.products?.length ?? 0) < 1 ? "Produit" : "Produits"}</h1>
          <span>
            {result?.products?.length}
            /10
          </span>
        </div>
        <div>
          {result?.products.map((product) => (
            <ProductCard key={product.name}>
              <span>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</span>
              <span>{product.price} €</span>
            </ProductCard>
          ))}
        </div>
      </ProductsContainer>
      <TaxesContainer>
        <TaxesInfo>
          <h1>Taxes</h1>
          <div>
            <div>
              <p title="TVA à l'importation">
                <span>{`${result?.taxes?.tva}%`}</span> TVA
              </p>
            </div>
            <div>
              <p title="Octroi de mer régional">
                <span>{`${result?.taxes?.omr}%`}</span> OMR
              </p>
            </div>
            <div>
              <p title="Octroi de mer">
                <span>{`${result?.taxes?.om}%`}</span> OM
              </p>
            </div>
          </div>
        </TaxesInfo>
        <DutyInfo>
          <span>
            Valeur en douane : <span>{result?.dutyPrice?.toFixed(2)} €</span>
          </span>
          <p>
            La valeur en douane affichée comprend la valeur de la marchandise. Les frais de
            transport d'assurance et emballage sont ensuite ajoutés pour déterminer l'assiette de
            taxation servant à calculer les droits et taxes de douane.
          </p>
        </DutyInfo>
      </TaxesContainer>
    </Container>
  )
}
