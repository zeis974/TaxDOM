# Design du Drawer d'Origine

## Vue d'ensemble

Le drawer d'origine a été redessiné pour afficher les informations clés de manière claire et structurée, inspiré du design des factures.

## Structure actuelle

### 1. Header
- **ID de l'origine** : Affiché en gros titre (ex: `8x8x67b0c78e-1...`)
- **Nom de l'origine** : En sous-titre (ex: `Victoria Krets`)
- **Bouton de fermeture** : En haut à droite

### 2. Section "Détails de l'origine"
Affiche les informations principales dans une grille 2x2 :
- **ID Origine** : L'identifiant unique
- **Statut** : Badge coloré (Activé/Non activé)
- **Zone** : Union Européenne ou Hors UE
- **Produits liés** : Nombre de produits associés à cette origine

### 3. Section "Historique des modifications"
Zone préparée pour le futur système de logs :
- Actuellement affiche un placeholder
- Structure prête pour recevoir les logs

### 4. Sections d'édition
- **Informations générales** : Nom et activation
- **Union européenne** : Statut EU

## Prochaines étapes : Intégration des logs

### 1. Mise à jour du type `Origin`

Dans `packages/types/src/index.ts`, ajouter :

```typescript
export type OriginLog = {
  id: string
  action: "created" | "updated" | "approved" | "rejected" | "deleted"
  description: string
  timestamp: string
  user?: string
}

export type Origin = {
  originID: string
  name: string
  available: boolean
  isEU: boolean
  logs?: OriginLog[] // Nouveau champ
}
```

### 2. Mise à jour de l'API

Modifier le contrôleur `OriginsController.ts` pour inclure les logs :

```typescript
// Dans la méthode qui récupère les origines
const origins = await db.query.origins.findMany({
  with: {
    logs: {
      orderBy: (logs, { desc }) => [desc(logs.createdAt)],
    },
  },
})
```

### 3. Activation dans le composant

Dans `OriginCard/index.tsx`, décommenter le code et importer :

```typescript
import ProcessHistory from "./ProcessHistory"

// Puis dans le JSX, remplacer le placeholder par :
{origin.logs && origin.logs.length > 0 ? (
  <ProcessHistory logs={origin.logs} />
) : (
  <ProcessHistoryPlaceholder>
    <ProcessHistoryPlaceholderIcon>📋</ProcessHistoryPlaceholderIcon>
    <ProcessHistoryText>Aucune modification enregistrée</ProcessHistoryText>
  </ProcessHistoryPlaceholder>
)}
```

## Structure des logs

Chaque log contient :
- `id` : Identifiant unique
- `action` : Type d'action (`created`, `updated`, `approved`, `rejected`, `deleted`)
- `description` : Description détaillée de la modification
- `timestamp` : Date et heure (format ISO 8601)
- `user` (optionnel) : Utilisateur ayant effectué l'action

## Icônes des actions

- ✨ Création
- ✏️ Mise à jour
- ✅ Approbation
- ❌ Rejet
- 🗑️ Suppression

## Design des composants

### Styles disponibles

Tous les composants stylés sont dans `OriginCard.styled.tsx` :

- `OriginDetailsGrid` : Grille pour les détails
- `OriginDetailItem` : Élément de détail individuel
- `OriginDetailLabel` : Label du détail
- `OriginDetailValue` : Valeur du détail
- `StatusBadge` : Badge de statut coloré
- `ProcessHistoryList` : Liste des logs
- `ProcessHistoryItem` : Élément de log individuel
- `ProcessHistoryIcon` : Icône du log
- `ProcessHistoryContent` : Contenu textuel du log
- `ProcessHistoryTitle` : Titre du log
- `ProcessHistoryDescription` : Description du log
- `ProcessHistoryTimestamp` : Horodatage du log

### Variantes de statut

Le `StatusBadge` supporte 3 variantes via `data-status` :
- `approved` : Vert (activé)
- `pending` : Orange (en attente)
- `failed` : Rouge (échoué/désactivé)

## Données de test

Le fichier `ProcessHistory.tsx` contient `EXAMPLE_LOGS` avec des exemples de logs pour tester l'interface.
