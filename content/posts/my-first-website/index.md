---
title: My first website
date: "2020-07-20"
description: "Trials and tribulations."
featuredImage: computer.jpg
caption: Obligatory this is not even my setup.
---

### I've never had a website before
I've been a programmer for years now, and I've never had my own personal
website. Why? Probably due to a lot of factors. Never really been into frontend development
for one. Javascript is [hell](http://mauricio.github.io/javascript-from-hell/) for two. 
And I'm just not a fan of publicly sharing my thoughts. 
### But I need one
I basically needed a place to write blogs (or self-tutorials since no one will read this blog
but me if we're being honest)
on a place I control and won't place a paywall for.
Unlike \*cough\* [Medium](https://www.reddit.com/r/Blogging/comments/b0vaat/what_are_you_doing_about_the_medium_paywall/) \*cough\*.

### I also dislike long-form articles
So let's get down to the nitty gritty. This article is meant to remind me of why the hell I decided
to build this website this way while it's still fresh in my mind. I'll try to (hopefully) make sense
of it all not just for me, but for you who must have mistakenly stumbled upon this site. Succeeding
articles will be the bits that go deeper with code snippets regarding the tricky parts in developing
this website. 

### Gatsby.js, Tailwindcss, and Typescript
That's one SEO to-do out of the way. For a quick TLDR, here's the [source code](https://github.com/alecgerona/alecgerona.io).

Let's go one-by-one as to why I chose the stack I did. 

### Gatsby.js
Personally, I just wanted to try React. My frontend experience up to this point was limited to
Angular and Vue.js frameworks. Seeing that I didn't want to spend a staggering amount of time
boilerplating and benchmarking my website, I went with Gatsby.js. It has built-in features that
I really wanted to try like GraphQL along with its claim that it's *blazing fast*™. So when I was searching for a
React framework, it boiled down to Gatsby vs Next since my website fit the case for [JAMstack](https://jamstack.org/).
And between the two of them? Gatsby's documentation and community simply ran circles around Next's. 

### Tailwindcss
When I first encountered Tailwind, proponents were claiming that it's the CSS framework to use
for devs who don't want to get down with CSS. Now frankly this actually is underrating Tailwind. 
You even hear this kind of sentiment all the time.

> Instead of learning X, use Y.

This train of thought has always been a popular if not detrimental trope for new tech. Current thing
too complicated or low-level to learn? Invent a new tool or solution to abstract it. In fact,
this is the main push of CSS frameworks in general like Bootstrap or Foundation. Just use their components 
masquerading as classes and you're off. But in my experience with Tailwind, it actually works both ways.
Sure, you don't need to write CSS. Sure, it's practically inline styles. Sure, it may look "ugly" looking
at it the first time. 

**But it actually teaches you how CSS inherently work**. By combining the various utility classes
you begin to understand why certain CSS styles work the way they do. Perennial questions such as 
how to center a `div` both horizontally and vertically, done. How to align contents along its axis, done.
How to use flex for various spacings, done.

And when you're done? Not only do you know how to style websites with Tailwind, you also know
how to style it with just CSS.

### Typescript
You may be surprised to know that this one was a bit harder to justify. I've always been a fan of typed
languages' type checking. It simply helps you avoid common coding mistakes and have you really think about
what your code does and what it needs or returns. Having Angular 2+ with built-in Typescript experience, this should be
an easy choice for me. 

So what made it difficult?

Community adoption. Loads of React tutorials or even Gatsby tutorials are written in plain Javascript.
Naturally this presents a barrier for adoption as the very guides you read are not like your codebase.
Having the latest and bleeding edge isn't all rainbows and butterflies if you can't maintain it.

Nevertheless, I still want Typescript to be treated as a first-class citizen for frameworks such as
Gatsby and similar frameworks. Its benefits still outweigh its cons, albeit barely. So I went ahead.


### DevOps
Nothing too fancy for this. I just wanted a development and release flow that's cheap if not free, great with opensource,
and easily maintainable. Furthermore, I would want to go back to this project not just to write articles,
but to take as basis for my future frontend work. To that end, the following flow may be overkill.

1. CI/CD is handled by Github's Workflow.
2. Commit formatting is handled by [Commitizen](https://github.com/commitizen/cz-cli). 
3. Versioning is handled by [semantic-release](https://github.com/semantic-release/semantic-release).
4. Dependency maintenance is handled by [Renovate](https://github.com/renovatebot/renovate).
4. Hosting is with [Netlify](https://www.netlify.com/). I've debated going with AWS, and I might, when I get around to developing
my own comment section.

### Conclusion
I think that covers just about everything for this site. I'll periodically update this article
as I iterate over its development.

So if you've made it this far and you're not me, wow. 
