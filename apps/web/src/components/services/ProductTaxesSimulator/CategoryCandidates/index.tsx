"use client"

import type { ResolvedCategoryCandidate } from "@taxdom/types"

import {
  Card,
  Container,
  Header,
  List,
  Rate,
  Rates,
  ResetButton,
} from "./CategoryCandidates.styled"

interface CategoryCandidatesProps {
  query: string
  candidates: ResolvedCategoryCandidate[]
  onSelect: (candidate: ResolvedCategoryCandidate) => void
  onReset: () => void
}

export default function CategoryCandidates({
  query,
  candidates,
  onSelect,
  onReset,
}: CategoryCandidatesProps) {
  return (
    <Container>
      <Header>
        <span>TaxDOM</span>
        <h2>Plusieurs catégories correspondent</h2>
        <p>Choisissez la catégorie qui décrit le mieux «&nbsp;{query}&nbsp;».</p>
      </Header>
      <List>
        {candidates.map((candidate) => (
          <Card key={candidate.categoryID} type="button" onClick={() => onSelect(candidate)}>
            <strong>{candidate.categoryName}</strong>
            <Rates>
              <Rate>
                <span>{candidate.taxes.tva} %</span>
                <span>TVA</span>
              </Rate>
              <Rate>
                <span>{candidate.taxes.om} %</span>
                <span>OM</span>
              </Rate>
              <Rate>
                <span>{candidate.taxes.omr} %</span>
                <span>OMR</span>
              </Rate>
            </Rates>
          </Card>
        ))}
      </List>
      <ResetButton type="button" onClick={onReset}>
        Nouvelle recherche
      </ResetButton>
    </Container>
  )
}
