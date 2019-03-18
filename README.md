# Docs

## Who is this for?

This project is mostly for me, because I'm a weirdo who likes making stuff. The
eventual goal is that this will replace my site at [ash.ms](https://ash.ms/)
and look real cool.

But you might find it interesting if you have a burning need to implement an
old-school interface, maybe in a game or something.

## Using ui95

### In your app

Consider this alpha quality. But if you want to implement something, you
can directly require the Preact components into your app.

For examples, see the [Storybook](/storybook/) components.

### As a desktop

To run a full desktop, you can mount the `Shell` component in your Preact app.

```
<Shell
  fs={fs}
  startMenu={startMenu}
  desktopIcons={desktopIcons}
  apps={apps}
  ref={shell => (this.shell = shell)}
  site={site}
/>
```

| Prop         | Description                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fs           | An instance of the filesystem. This is a kind of rudimentary state the Explorer uses to navigate and can be found in `src/lib/filesystem`.                |
| startMenu    | An object of items to include in the Start menu. Takes the form `{ "Menu entry": { icon: "default", appProps: {…} }`                                      |
| desktopIcons | An object of items to show on the desktop. Takes the form `{ "My Computer": {filename:"My Computer",icon:"default",appProps:{app:"Explorer",path:"/"}} }` |
| apps         | Object containing the list of apps imported from the `apps/` folder, or created yourself.                                                                 |
| site         | Object containing site-wide config. Presently only requires the title field. Eg. `{ title: "Example ui95 app" }`                                          |

### Developing

Develop new components against Storybook:

```
npm i
npm run start
```

### Developing a new app

Apps are a weird case in React because they require bidirectional data flow. This could be handled a multitude of ways but I wanted to keep them componentised and standalone rather than bringing onboard something heavy like Redux.

Apps are responsible for maintaining their position when dragged or resized, as well as communicating events such as minimize, close and focus back to the shell. Apps also receive focus & minimized state from the shell.

The simplest implementation of an app can be found in the functional webview component:

```js
import { h, render, Component } from "preact";
import Window from "../../components/window/index.js";

function Webview({ title, src, onClose, onFocus, isMinimized, zIndex }) {
  return (
    <Window
      title={title}
      zIndex={zIndex}
      classNames="webview"
      width={800}
      height={600}
      isMinimized={isMinimized}
      onClose={onClose}
      onFocus={onFocus}
    >
      <iframe class="ui95-webview" src={src} />
    </Window>
  );
}

export default Webview;
```

This component largely passes props from the shell into the window, then fills the window with an iframe. The props are all fairly self-explanatory, and are used to maintain the desktop.
