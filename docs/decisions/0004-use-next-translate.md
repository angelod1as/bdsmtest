---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 0004
title: Use Next Intl
date: 24-12-2022
deciders: @angelod1as
---
<!-- markdownlint-disable-next-line MD025 -->
# Use Next Intl

## Context and Problem Statement

We want to offer multiple languages in our application, so we need to add internationalization (i18n) possibilities.

## Decision Drivers

i18n:

* adds our user base, which already spans worldwide
* increases number of people helped with the app

## Considered Options

* [next-i18next](https://github.com/i18next/next-i18next)
* [react-i18next](https://github.com/i18next/react-i18next)
* [i18next](https://www.i18next.com/)
* [next-translate](https://github.com/aralroca/next-translate#1-about-next-translate)
* [next-intl](https://next-intl-docs.vercel.app/)

## Decision Outcome

Chosen option: "next-intl", because it looks as a robust yet accessible option to implement and mantain. See below for comparison.

### Consequences

* Good, because our app will be fully translatable by the community.
* Bad, because adding i18n adds complexity to management and development.

## Pros and Cons of the Options

All of the options share the "Bad: some learning curve" point.

### [next-i18next](https://github.com/i18next/next-i18next)

Built on top of i18next and react-18next, so almost all their Good and Bad apply here.

* Good: built for NextJS
* Good: many downloads in GitHub
* Bad: may bring problems with SSG

### [react-i18next](https://github.com/i18next/react-i18next)

Built on top of i18next, so almost all its Good and Bad apply here.

* Bad: not built for NextJS

### [i18next](https://www.i18next.com/)

* Good: thorough documentation
* Good: used by other high-ranking libraries
* Bad: complex setting up

### [next-translate](https://github.com/aralroca/next-translate#1-about-next-translate)

* Good: built for next
* Good: thorough documentation
* Bad: not built for Typescript

### [next-intl](https://next-intl-docs.vercel.app/)

* Good: minimal and straighforward
* Good: out-of-the-box type-safety
* Good: good and concise documentation
* Bad: its minimalism can bring issues in the future
* Bad: needs manual polyfills (the others might also need but don't say that in the docs)

## More Information

The original application already applied a manual translation system but only had an English file. This decision builds upon that system.
