---
description: Designing for API security from the ground up.
---

# Designing for API security

Creating an API is like opening a door to the outside world. Who is allowed
through, what they can carry, and where they're allowed to go is incredibly
important. In this guide we'll see how design choices made early on impact the
security of an API once it's built. 

Many API security problems come down to coding errors or misconfigured
infrastructure, but this guide focuses more on the foundational API design
decisions that affect the security of an API from day one.

## Why care about API security

APIs often protect sensitive data or critical functionality. Whether it's a
payment gateway, a medical records system, or a social media app, an API needs
to be designed with security in mind to protect both the organization and its
users.

API security breaches in 2022 caused losses worth [$12–$23
billion](https://www.darkreading.com/application-security/api-security-losses-billions-complicated)
in the US and [$41–$75 billion
globally](https://techwireasia.com/2022/06/api-vulnerabilities-costing-businesses-up-to-us75-billion-annually/).

To pick just a few examples, since the introduction of General Data Protection
Regulation (GDPR), Amazon Europe were fined €746m in 2021, Meta was fined €1.2bn
in 2023, and - to show it's not just tech giants - Marriott International (a
hotel chain) got stuck with a £20m fine in 2022.

More countries and regions strengthening privacy laws along the lines of GDPR:
California Consumer Privacy Act (CCPA), Canada's Personal Information Protection
and Electronic Documents Act (PIPEDA), and Brazilian General Data Protection Law
(LGPD).

Even if data breaches and leaks don't result in hefty fines, the reputational
damage that comes with leaking customers private information can be a big issue,
so it's important to do everything possible to keep APIs secure.

Let's walk through some key security concepts in API design to see how
decisions can make or break an API's defenses before it's even built.

[The rest of the content remains unchanged]