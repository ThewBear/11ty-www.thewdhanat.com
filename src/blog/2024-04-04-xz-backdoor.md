---
title: XZ Vulnerability 2024
description: Resources for XZ Vulnerability 2024 (CVE-2024-3094)
---

Resources related to [XZ Vulnerability](https://www.openwall.com/lists/oss-security/2024/03/29/4) discovered by [Andres Freund](https://twitter.com/AndresFreundTec) on Fri, 29 Mar 2024.

It was designated as [CVE-2024-3094](https://www.cve.org/CVERecord?id=CVE-2024-3094).

# Summary

[XZ Utils backdoor on tukaani](https://tukaani.org/xz-backdoor/) — [Lasse Collin](https://lkml.org/lkml/2024/3/30/188)

[FAQ on the xz-utils backdoor (CVE-2024-3094)](https://gist.github.com/thesamesam/223949d5a074ebc3dce9ee78baad9e27) — Sam James

[What we know about the xz Utils backdoor that almost infected the world](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) — Ars Technica

[Infographic 1](https://twitter.com/fr0gger_/status/1774342248437813525) [2](https://twitter.com/fr0gger_/status/1775759514249445565) — Thomas Roccia

[XZ Utils Backdoor — Everything You Need to Know, and What You Can Do](https://www.akamai.com/blog/security-research/critical-linux-backdoor-xz-utils-discovered-what-to-know) — Akamai Security Intelligence Group

[CVE-2024-3094 XZ Backdoor: All you need to know](https://jfrog.com/blog/xz-backdoor-attack-cve-2024-3094-all-you-need-to-know/) — JFrog

[Backdoor in XZ Utils allows RCE: everything you need to know](https://www.wiz.io/blog/cve-2024-3094-critical-rce-vulnerability-found-in-xz-utils) — Wiz

# Timeline

[Timeline of the xz open source attack](https://research.swtch.com/xz-timeline) — Russ Cox

# Downstream

## Affected

[Redhat Fedora](https://www.redhat.com/en/blog/urgent-security-alert-fedora-41-and-rawhide-users)

[Debian](https://lists.debian.org/debian-security-announce/2024/msg00057.html)

[OpenSUSE](https://news.opensuse.org/2024/03/29/xz-backdoor/)

[Kali Linux](https://www.kali.org/blog/about-the-xz-backdoor/)

[Arch Linux](https://archlinux.org/news/the-xz-package-has-been-backdoored/)

## Unaffected

[Red Hat Enterprise Linux](https://www.redhat.com/en/blog/urgent-security-alert-fedora-41-and-rawhide-users)

[Ubuntu](https://ubuntu.com/security/CVE-2024-3094)

[Amazon Linux](https://aws.amazon.com/security/security-bulletins/AWS-2024-002/)

[Alpine](https://www.alpinelinux.org/posts/XZ-backdoor-CVE-2024-3094.html)

[Gentoo](https://security.gentoo.org/glsa/202403-04)

[FreeBSD](https://lists.freebsd.org/archives/freebsd-security/2024-March/000248.html)

[Wolfi](https://www.chainguard.dev/unchained/chainguards-response-to-cve-2024-3094-aka-the-backdoor-in-xz-library)

[Linux Mint](https://forums.linuxmint.com/viewtopic.php?t=416756)

[Homebrew](https://github.com/Homebrew/homebrew-core/pull/167512)

[NixOS](https://github.com/NixOS/nixpkgs/issues/300055)

# Analysis

[How the XZ backdoor works](https://lwn.net/SubscriberLink/967192/6c39d47b5f299a23/) - Daroc Alden

[A Microcosm of the interactions in Open Source projects](https://twitter.com/robmen/status/1774067844785086775) — Rob Mensching

[Hacker News](https://news.ycombinator.com/item?id=39865810)

## Technical

[XZ Backdoor Analysis](https://gist.github.com/smx-smx/a6112d54777845d389bd7126d6e9f504) — smx

[The xz attack shell script](https://research.swtch.com/xz-script) — Russ Cox

[xz/liblzma: Bash-stage Obfuscation Explained](https://gynvael.coldwind.pl/?id=782) — Gynvael Coldwind

# Related projects

[xzbot](https://github.com/amlweems/xzbot) — [Anthony Weems](https://twitter.com/amlweems/status/1774819428208689241)

[xzre](https://github.com/smx-smx/xzre) — smx

[xz-malware](https://github.com/karcherm/xz-malware) — Michael Karcher

[xz.fail](https://xz.fail/) — [@binarly_io](https://twitter.com/binarly_io/status/1775217251261845830)
