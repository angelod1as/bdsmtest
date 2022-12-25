---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 0001
title: Add GPLv3 License

# These are optional elements. Feel free to remove any of them.
date: 07-12-2022
deciders: @angelod1as
---
<!-- markdownlint-disable-next-line MD025 -->
# Add GPLv3 License

## Context and Problem Statement

@bdsmtest questioned, via email, how we could shield BDSMtest.org of legal concerns. Below is an excerpt of the email:

> \[...\] with previous contributors I've always made them sign a document that they transfer intellectual property etc. so they can't use that to block their code from being used. But with anonymous strangers contributing to the GitHub repo, that sounds more difficult. Do you know anything about this, or how this is commonly dealt with?

The addition of a OSS license is the proposed solution in this ADR.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* @bdsmtest concerns with code ownership and future legal issues
* Adding a license to an Open Source project is industry standard

## Considered Options

* Permissive licenses (Apache, MIT, BSD, Unlicense, others)
* Copyleft licenses (AGPL, GPL, LGPL, EPL, Mozilla, others)
* Not adding a license

## Decision Outcome

Chosen option: "GPLv3 (Copyleft)". Reasons:

* The Copyleft license requires any code derived from this project is used under the same license.
* With GPLv3, anyone has the right to:
  * download and run the software freely
  * make changes to the software as desired
  * redistribute copies of the software
  * modify and distribute copies of new versions of the software
  * do all above as long as the license is the same: GPLv3.

About the development of this project, GPLv3 can protect the team from future legal issues:

> If a developer uses any GPL component in their software, the entire work falls under GPL’s terms and conditions. GPLv3 provides specific terms for combined works, which may apply when other source code, components, or libraries accompany the GPL software.
>
> [source](https://snyk.io/learn/what-is-gpl-license-gplv3-explained/)
