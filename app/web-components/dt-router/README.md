# dt-router

Add routing functionallity to your web applications in a very simple way without complex framewors or libraries.
Use the power of Web Components to enhance your application behaviour.


## Code Example
Fist you have to import the component.

```html
<head>
  <title></title>
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="path-to/dt-router/component.html" />
</head>
```

Once inported is really easy to use, just wrap the views you want to switch with **dt-router** tags and add
a **data-path** attribute to each view that match with the respective path.

If an element does not contains the data-path attribute will not be hided when the url change.

**NOTE:** the url path to be encode start after the hash and must have a slash '/'.

**NOTE:** if the url does not content a hash yet, just the first view will be displayed.

```html
<nav>
  <a href="#/home">home</a>
  <a href="#/page1">page1</a>
  <a href="#/page2">page2</a>
  <a href="#/page3">page3</a>
</nav>

<dt-router>
  
  <!-- this header will remain visible always -->
  <h1>Available views</h1>

  <section data-path="home">
    <h1>Home</h1>
  </section>

  <section data-path="page1">
    <h1>Page 1</h1>
  </section>

  <section data-path="page2">
    <h1>Page 2</h1>
  </section>

  <section data-path="page3">
    <h1>Page 3</h1>
  </section>

</dt-router>
```

## Motivation

I see the potential of the JS frameworks, the handle routing, templating and so on, but is also good to see
a more standar way to do the same, without relying on heavy libraries.

Web components are here to stay and the are standar, so lest play with them =D.

## Installation

Web Components are a new standar but there are not yet supported in every web browser, so for this moment we will need a polifill, I'm using webcomponents.js

Install via bower

```js
bower install --save webcomponentsjs
```

Install via npm

```js
npm install --save webcomponentsjs
```

Install via yarn

```js
yarn add webcomponentsjs
```

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.


## Contributors


## License

MIT