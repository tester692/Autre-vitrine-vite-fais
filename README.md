# NOVA — École Supérieure · Site vitrine

Site vitrine statique, moderne et responsive pour une école supérieure (fictive : « NOVA »).
HTML / CSS / JavaScript natifs : aucune dépendance ni étape de compilation.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : héros, chiffres clés, présentation, formations, témoignage, actualités, partenaires |
| `ecole.html` | Histoire, chiffres, valeurs, campus, gouvernance |
| `formations.html` | 7 programmes détaillés avec filtres par domaine, parcours pédagogique |
| `admission.html` | Prérequis, procédure en 4 étapes, calendrier, frais et bourses, FAQ |
| `actualites.html` | Article à la une, actualités, agenda des événements |
| `contact.html` | Coordonnées, formulaire avec validation, plan d'accès |

## Fonctionnalités

- Design haut de gamme : palette bleu nuit / ivoire / or, typographies Fraunces + Inter
- Animations discrètes : apparition au défilement, compteurs, en-tête qui se réduit, survols
- Responsive mobile / tablette / ordinateur, menu mobile plein écran
- Accessibilité : lien d'évitement, navigation au clavier, ARIA, respect de `prefers-reduced-motion`
- Illustrations en SVG intégrées (aucune image externe)

## Lancer le site

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

> Les formulaires (contact, lettre d'information) sont validés côté client uniquement :
> branchez-les sur un service d'envoi (Formspree, backend, etc.) avant la mise en ligne.
> Les noms, chiffres et coordonnées sont fictifs et à remplacer.
