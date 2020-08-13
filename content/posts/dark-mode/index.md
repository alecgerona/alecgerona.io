---
title: Dark mode with Gatsby.js and Tailwindcss
date: 2020-08-11
description: "A brief look into implementing dark mode. Plot twist: it's not easy."
featuredImage: dark.jpg
---

## Modern dark mode
Since you're most probably a developer (let's face it you're only here because you googled "how to implement dark mode [tech stack]"),
you surely know that dark mode is fortunately prevalent in mainstream UIs. It's not unique to rated-R sites anymore. So
naturally, you'd want this feature into as many screens you're looking at.

## What we're working with
Now, [evergreen browsers](https://www.techopedia.com/definition/31094/evergreen-browser#:~:text=The%20term%20%22evergreen%20browser%22%20refers,the%20case%20with%20older%20browsers.)
have mechanisms in place to support dark mode, along with other accessibility features such as
reduced motion toggle. They expose this through a flag called [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).
This flag can only have two values: `light` or `dark`. Now you might be thinking that hey I already have a flag
which tells me which theme the user wants by default, I can just base my styling around this! And you're right.

## But what if you want to toggle it?
This is the meat of this blog post. You see, that flag _cannot_ be toggled locally. It is based on the user's
system preferences therefore only being changeable through their system. Ergo, we need to find another way
of making that logic work. So is my plot twist alert accurate here? Is it not easy? Like any self-respecting
developer would tell you: it depends. In our case, it depends on Gatsby.js and Tailwincss, the two things I
happened to build this website with. (If you want more info on _why_ I chose those, feel free to read my
[post about it](https://alecgerona.io/my-first-website/).

## Tailwindcss implementation
Let's get the easy stuff out of the way. How should we style our components with our requirement in mind? 
Again, this implementation is not unique to Tailwindcss, but if it gets you to use it, why the hell not? Tailwindcss
is awesome.

Now most guides will tell you to set your styles up with a `dark` prefix or handler. This lets you organize your site
and codebase based on separated style concerns. 

### So what prefix do I use?
It's easy to knee-jerk it with `dark`. That's what the majority uses anyway. It comes from what I believe the mobile-first
design philosophy that dictates designs should revolve around mobile and just adapt for desktop. So why not
do the same for dark mode? 

Let me propose a counter argument: dark first. 

Hear me out. Since my website's theme is primarily "dark", it makes sense to make the variant styles light.
This is also in line with how Tailwindcss' variants were designed to work: use plain utility classes for your default
design and add variant prefixes for the alternate or secondary one. So obviously your design is different so trust
your own judgment.

### Creating the variants
Creating your own mode prefix in Tailwindcss is done by adding a plugin to your `tailwind.config.js` file.
```js
// ...
plugins: [
    plugin(function ({ addVariant, e }) {
      const lightSelector = `.light`;
      addVariant(`light`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${lightSelector} .${e(`light${separator}${className}`)}`;
        });
      });
    }),
  ]
// ...
``` 

To summarize this block of code briefly, this just allows you to write Tailwincss utility classes with your
specified selector (`.light` in my case). `modifySelectors` just formats your utility classes in a way that
we can scope for when we actually implement the toggle logic. 

To actually use this variant, you have to enable it for the utility classes you actually need them for.

```js
// ...
variants: {
    backgroundColor: [`light`],
    textColor: [`light`]
}
// ...
```

This helps Tailwindcss be conservative in generating its utility classes, of which there are a lot
by default due to its design. You can read more about Tailwincss' variant implementation
[here](https://tailwindcss.com/docs/configuring-variants).


Now believe it or not, that's actually it. You can now plug classes like `text-white light:text-black` to
your components and have the class names get manipulated properly by Tailwindcss according to our
`modifySelector` logic. But at this point, it's not yet actually doing anything significant. The selector that
our variant is depending on is still not present nor toggle-able.


## Gatsby.js implementation
Full disclosure, this solution is based on Dan Abramov's implementation of dark mode in his
[blog](https://overreacted.io/) plus a few other tutorials I've read about the topic. Having said that, I believe this
implementation of the solution is more approachable for developers looking for flexibility with this feature. 

So first off, we need to structure the logic that we need. For my blog, I wanted a simple button that will toggle
the mode on and off. Like a bulb. So I made a simple component that would do this for me:

```tsx
<div
  onClick={toggleTheme}
>
  {theme === `light` ? <Night /> : <Day />}
</div>
```

Simple enough. Then, I have to define what `toggleTheme` does. 

```tsx
function toggleTheme() {
    window.__setPreferredTheme(theme === `light` ? "dark" : "light");
}
```

Okay hold up. Why are we suddenly accessing window functions? What exactly is this `__setPreferredTheme()`?

This is actually the trick to this feature. To give you a brief idea of the issues this approach solves,
implementing dark mode, or really any theme picker feature, presents the web developer with the flicker problem.
We have to execute (and set) our function early enough the browser is forced to evaluate its result before 
first paint happens aka that brief flicker of white (or your default bg color) you see before the browser
applies the user-preferred theme.

So how and where do we place this function? The how of course is by hooking it to `window`. It's global
and easily set via script. As to where? Remember that we have to execute this function _before_ anything
visible is rendered. Gatsby.js offers a way to do this via their `setPreBodyComponents` hook. As the name
suggests, this allows us to set a component before our html body. And as you may have guessed, we're gonna
put a script tag. 

Since this Gatsby.js hook is trigered in the `gatsby-ssr.js` file, we should edit it like so:

```js
const React = require("react");

exports.onRenderBody = function ({ setPreBodyComponents }) {
  setPreBodyComponents([
    React.createElement("script", {
      key: "gatsby-dark-mode",
      dangerouslySetInnerHTML: {
        __html: `
void function() {
  window.__onThemeChange = function() {}
  var preferredTheme
  try {
    preferredTheme = localStorage.getItem('theme')
  } catch (err) { }
  function setTheme(newTheme) {
    if (preferredTheme && document.documentElement.classList.contains(preferredTheme)) {
      document.documentElement.classList.replace(preferredTheme, newTheme)
    } else {
      document.documentElement.classList.add(newTheme)
    }
    window.__theme = newTheme
    preferredTheme = newTheme
    window.__onThemeChange(newTheme)
  }
  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (err) {}
  }
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
  })
  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
}()
    `,
      },
    }),
  ]);
};
```

A bit of an eyeful to be sure, but let's just focus on the important parts there. First,
we define `window.__onThemeChange` as a utility to be overridden by our component later. Next,
we check `localStorage` whether we already have the user's preference locally. We just
wrap it under a try-catch to silence any issues that may arise. You can improve this if
you want. Then we just define a simple function that replaces the class defined in our `html`
tag with the theme the user chose. This function is wrapped globally with `window.setPreferredTheme`.

Next is just some quality-of-life line that gets and listens for the value of `prefers-color-scheme`. 
So even if the user does change the setting on a system level, we can catch it. Finally, the
`setTheme()` at the end just initializes the theme for the first paint.

With the above hook set, the pieces are now complete. We can top off our toggler component with the
hooks it'd need to function as we'd like it to.

```jsx
const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState(undefined);
  useEffect(() => {
    // @ts-ignore
    setTheme(window.__theme);
    // @ts-ignore
    window.__onThemeChange = () => {
      // @ts-ignore
      setTheme(window.__theme);
    };
  });
  function toggleTheme() {
    // @ts-ignore
    window.__setPreferredTheme(theme === `light` ? "dark" : "light");
  }
  return (
    <div
      className={!theme ? `invisible` : `visible cursor-pointer`}
      onClick={toggleTheme}
    >
      {theme === `light` ? <Night /> : <Day />}
    </div>
  );
}
```

So by using React hooks, we now have a component that will load the theme on render via `useEffect()` and
set its displayed icon depending on the selector and use of `useState()`.

And there you have it. Once you load this component up, clicking on it should load the proper selector in our
html tag which in turn triggers the loadout our variant requires which shows the correct styles. In short,
we now have dark mode.

To see all these components and logic written out in all their glory, take a quick look at _this_ website's 
[source code](https://github.com/alecgerona). It contains bonus content such as implementing dark mode on
code that is effectively unreachable by your Tailwindcss variants such as this blog section that is styled
by the Tailwindcss [typography plugin](https://tailwindcss.com/docs/typography-plugin). 
You can star or help improve it if you want. Or not. I'm not
telling you what to do. Well, except for this tutorial. 

Again, if you've read up to this point and you're not me, wow. And thank you. I hope you've found this helpful.
