---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 0005
title: Use Formik, Yup, and Ow
date: 28-12-2022
deciders: @angelod1as
---
<!-- markdownlint-disable-next-line MD025 -->
# Use Formik, Yup, and Ow

## Context and Problem Statement

We will deal with forms in this app — which need proper state management, validation and error handling.

## Decision Drivers

Dealing natively with forms in React can bring bugs and unecessary struggles. A library for building forms and validating them would ease development greatly.

## Considered Options

* [React Hook Form](https://react-hook-form.com/)
* [Formik](https://formik.org/)

## Decision Outcome

Chosen option: Formik — and Yup, a validation library suggested by them. In the backend, Ow will do the validation.

Formik has a more opinionated syntax and a lot of possibilities for customization. `React Hook Form` might be a great contestant, but the main developer has much more experience with Formik and have been happy using it.

It suggests the usage of `Yup` as a companion library for validation, and as it has native support for it, the choice was easy.

In the backend, `Ow` is the used library for validation because of its comprehensive error messages and ease of use — although no other validation libraries were researched.
