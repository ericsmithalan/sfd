# Smith Furniture Design (sfd)

Personal project. Public as of September 2026. One piece is wired up (the sideboard). Not a live store.

Interactive 3D furniture viewer in the browser.

Live: https://www.smithfurnituredesign.com

## What it is

sfd is a product site experiment for furniture I build.

There are several projects. Open the Projects dropdown to switch pieces. On a model you can orbit the view, toggle edge display, explode / implode the assembly, and go through a named parts list (legs, rails, panels, drawers, dividers, and so on).

## Why it exists

I wanted a public place to show the woodworking — not just a photo of a finished piece.

I also did not want to build a large inventory of items in order to sell. The idea was to let a customer customize a design: different woods, different metal, same underlying piece. This app is where I try those features in the browser before they belong on a storefront.

So the project has two jobs:

1. Show how the furniture is made.
2. Test UI that would matter on a site that sells made-to-order work (part views, finishes, materials) instead of a warehouse of SKUs.

It is also current UI / front-end work I can point to.

## What works in the UI now

- Project dropdown to switch between projects
- Rotate and inspect the 3D model
- Scroll a parts list for the sideboard
- Toggle Edges
- Explode / implode the assembly
- View gizmo for axis orientation

Material / finish customization (wood species, metal) is the intended store feature. Do not treat it as a shipped catalog until that UI is in the app.

## Stack

- React 19
- TypeScript
- Three.js (`three`, `three-viewport-gizmo`)
- React Router
- Sass / LESS
- Tween.js
- Create React App (`react-scripts`)

## Run locally

```bash
yarn
yarn start
```
