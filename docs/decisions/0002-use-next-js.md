---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 0002
title: Use NextJS
date: 10-12-2022
deciders: @angelod1as
---
<!-- markdownlint-disable-next-line MD025 -->
# Use NextJS

## Context and Problem Statement

To better integrate the website with modern technologies and allow further improvements, changing the plain HTML-and-JS approach to React and NextJS was the chosen path. NextJS offers tools that can make collaboration easier, adds more readable code, and offers Static Site Generation.

## Decision Drivers

The original structure was:

* outdated — last updated +5 years ago
* obfuscated and hard to read
* hard to update
* hard to add features

## Considered Options

* NextJS
* Remix
* Vanilla JS

## Decision Outcome

Chosen option: "NextJS", because of the following concerns:

* it is a growing library in popularity and features
* it is the library in which the current lead mantainer @angelod1as is experienced
* it offers Static Site Generation
* Has good support and documentation
* Opens up opportunity for future collaborators

## Pros and Cons of the Options

### Remix

* Good: has many useful features and a different way to do React
* Bad: only offers Server Side Rendering

### VanillaJS

* Good: makes the project framework agnostic
* Bad: bad DX and poor tooling

## More Information

In the @angelod1as' (the current maintainer) opinion, NextJS is the more advanced library for React at this moment. Remix can be a great choice — as it grows in popularity — but the Static Site Generation choice in NextJS weights a lot in such a simple site with static pages. Also, NextJS documentation and tooling is vast, being incremented greatly as time passes.
