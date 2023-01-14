---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 0003
title: Use TailwindCSS
date: 10-12-2022
deciders: @angelod1as
---
<!-- markdownlint-disable-next-line MD025 -->
# Use TailwindCSS

## Context and Problem Statement

We need to choose a method of writing our CSS and styling our application. With a plethora of tools available, falling back to native CSS has massive drawbacks, so we should choose a better alternative.

## Decision Drivers

A traditional CSS approach has time-consuming workflows and decisions that take too long and are complex to get to a common point — for instance, deciding on a naming convention, or making sure the class names won't clash between different components.

[TailwindCSS](https://tailwindcss.com/) has a different approach. With it:

* development moves fast — more time on markup and less on stylesheet files
* we can be sure the outputted CSS files on build will only have the utilized styles
* no need to worry about class naming conventions (e.g. BEM)
* scoped styles won't change what they shouldn't

It is a debatable decision — as any — especially when comparing its pros and cons against Styled-JSX, but for the moment it's the best decision thinking time and complexity.

## Considered Options

* TailwindCSS
* Vanilla CSS
* SCSS
* Styled-JSX

## Decision Outcome

Chosen option: **TailwindCSS**, because of the concerns previously stated, with **Styled-JSX** as fallback when styles are too complex to be handled by TailwindCSS.

## Pros and Cons of the Options

### TailwindCSS

* Good: All of the mentioned above
* Good: really quick to develop with
* Bad: mixing of styling and markup in the same file
* Bad: verbose classnames — they can get huge
* Bad: some learning curve

### Styled-JSX

* Good: scoped CSS make sure things don't clash
* Good: bundled with NextJS by default
* Good: good performance: only the components on screen are styled (no  extra unused styles in a CSS file)
* Bad: some learning curve
* Bad: no autocompletion

### Vanilla CSS

* Bad: manually caring about class naming
* Bad: bad support for modules and file-splitting
* Bad: manually adding failsafes and polyfills

### SCSS

* Good: can be used in modules using `module.scss`
* Good: has several features, like mixins and functions
* Good: can be extended with tools — like naming helpers
* Bad: have complex compatibility issues
* Bad: modules not always work as they should — making the use of workarounds constant
* Bad: tools like naming helpers require too much boilerplate and constant code repetition

## More Information

In the @angelod1as' (the current maintainer) opinion, Styled-JSX is a great competitor in this project. It is really good and, in the end, it's just CSS-in-JS, so you can have the best of both worlds.

But, in the matter of speed, TailwindCSS wins. It's faster to write and test, the DX is amazing — you don't need to write a single CSS line most of the times — and the output is a plain CSS file with only the necessary inside.

@angelod1as chose to have TailwindCSS as a primary CSS tool, but when need arrives (e.g.: using `:before`), Styled-JSX is a perfect fallback, with great pros.
