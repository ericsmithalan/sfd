# Smith Furniture Design (sfd)

Interactive 3D furniture viewer in the browser.

I am not the strongest developer you will meet. I am not a weak one either.

This app is more complex than it needs to be. That is on purpose for a proof of concept, not because every layer earned its keep. I have shipped production programs and websites within teams. This repo is a personal project. It does not use the same review, testing, or structure bar.

If you are hiring for UI design / UI development, treat this as a working prototype I designed and built myself. Several parts of it I would ask for help on in a team setting. Right now I am designing and building on the fly. The standard is: it has to work.

website: https://www.smithfurnituredesign.com/  
github: https://github.com/ericsmithalan

## What it is

sfd is a product site experiment for furniture I design and make.

There are several projects. Open the Projects dropdown to switch pieces. On a model you can orbit the view, toggle edge display, explode / implode the assembly, and go through a named parts list (legs, rails, panels, drawers, dividers, and so on).

Select a part to see its details, including dimensions. Open the image viewer to see photos of the finished piece.

Every 3D model in the app was built by me in Blender. Part dimensions are modeled precisely and were used as the reference when I built the piece. To do this I modified a Blender plugin that I downloaded and

## Why it exists

sfd is a product-site experiment I build in public.

The furniture is real work I make. The point of the website is technical: UI design and UI development I can show instead of only talking about jobs from 2000–2021.

Several product ideas sit behind this application. I am not disclosing them here. The potential is real. That is not a claim that any of them is proven, and it is not a claim that they are not. Several inovative ideas I have could turn this into a product.

So the site has three jobs:

1. Show current front-end and UI work (React, TypeScript, Three.js, layout, interaction).
2. Show how a physical product can be inspected as named parts, not one picture.
3. Give me a live place to prove I still design and implement interfaces after time away from full-time tech.

## What this demonstrates

- UI design: project switcher, parts list, part-detail panel, toolbars, image viewer, mobile nav
- UI development: React 19, TypeScript, component structure (`app`, `components`, `interface`, `context`, `hooks`, `lib`)
- 3D product UI: Three.js, orbit controls, explode / implode, edge display, view gizmo
- Part data: selecting a part shows details such as dimensions
- Finished work: image viewer for photos of the built piece
- 3D modeling: Blender models authored by me; dimensions accurate to 1/16 inch
- Product thinking: one model, many configurations, instead of a large finished inventory
- Older related work lives on GitHub, not in this repo: Ghost (WPF design overlay / measurement, 2010), HealthVault Connection Center WPF prototype (2010), React/Redux and Electron + TypeScript experiments

## What works in the UI now

- Projects dropdown to switch furniture pieces
- Rotate and inspect the 3D model
- Scroll a named parts list
- Select a part to view details, including dimensions
- Image viewer for photos of the finished work
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
- Blender (source models)

## Run locally

```bash
yarn
yarn start
```
