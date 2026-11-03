# Complexe scolaire Sainte-Marie Saint-Georges · Site vitrine (maquette)

Maquette de site vitrine statique, moderne et responsive pour le complexe scolaire Sainte-Marie Saint-Georges (Conakry) : maternelle, primaire, collège et lycée.
HTML / CSS / JavaScript natifs : aucune dépendance ni étape de compilation.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : bannière, chiffres clés, présentation, cycles, mot de la direction, actualités |
| `ecole.html` | Projet, photos en classe, valeurs, infrastructures, vie scolaire |
| `formations.html` | Maternelle, primaire, collège, lycée (SM, SE, SS) avec filtres par cycle |
| `admission.html` | Conditions, procédure d'inscription, calendrier, frais, FAQ |
| `actualites.html` | Article à la une, actualités, agenda des événements |
| `contact.html` | Coordonnées, formulaire avec validation, plan d'accès |

## Fonctionnalités

- Design haut de gamme : bleu de l'établissement, or, liseré rouge-jaune-vert ; typographies Fraunces + Inter
- Animations discrètes : apparition au défilement, compteurs, en-tête qui se réduit, survols
- Responsive mobile / tablette / ordinateur, menu mobile plein écran
- Accessibilité : lien d'évitement, navigation au clavier, ARIA, respect de `prefers-reduced-motion`
- Photos de l'établissement dans `assets/img/`

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

> Les formulaires (contact, lettre d'information) sont validés côté client uniquement :
> branchez-les sur un service d'envoi (Formspree, backend, etc.) avant la mise en ligne.
> **À compléter avant mise en ligne** : téléphone, e-mail, adresse précise, dates des actualités
> et de l'agenda, frais, horaires et mot de la direction sont des textes d'exemple à faire valider par l'établissement.
