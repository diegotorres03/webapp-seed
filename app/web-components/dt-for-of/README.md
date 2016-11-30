# dt-for-of




## Code Example
Fist you have to import the component.

```html
<head>
  <title></title>
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="path-to/dt-for-of/component.html" />
</head>
```

Once inported is really easy to use, just wrap the HTML that you want to be repeted with the **dt-for-of** tags and add a **data-name** attribute to name the item of each iteration.

Then add the **data-content** to the inner tags that you want to displey content.

```html

  <dt-for-of data-name="item" id="for1">
    <!-- the internal content should be repeted -->
    <h1 data-content="item"></h1>
    <hr>
  </dt-for-of>

```

The tags that has the data-content attibute and has no internal tags will be populated with the value of the iretation.

To set the array to be repeted just call the method setData() of the dt-for-of elememt.

```js

  let for1 = document.querySelector("#for1")
  for1.setData(["item1", "item2", "item3", "item4"])

```

The setData method refresh the component and it will be render again.

you can stop this behavior by passing as the second argument a false setData(data, false)

and then call the refresh() method to populate it.

This will produce the next output.

```html

  <dt-for-of data-name="item" id="for1">
    <h1 data-content="item">item1</h1>
    <hr>
    <h1 data-content="item">item2</h1>
    <hr>
    <h1 data-content="item">item3</h1>
    <hr>
    <h1 data-content="item">item4</h1>
    <hr>
  </dt-for-of>

```

**NOTE:** you can loop over an array of objects, and in the data-content spesify the path.

```html
<dt-for-of data-name="user" id="for2">
    <!-- the internal content should be repeted -->
    <div>
      <h1 data-content="item.name.last"></h1>
      <h2 data-content="user.name.first"></h2>
      <div>
        <h2 data-content="item.email"></h2>
      </div>
    </div>
    <hr>
  </dt-for-of>
```

```js
let for2 = document.querySelector("#for2")
    for2.setData([
      {name: {first: 'first', last: 'user'}, email: 'fistuser@email.com'},
      {name: {first: 'secont', last: 'user'}, email: 'seconduser@email.com'}
    ])
```


## Motivation

I found really handy the ng-for directive of AngularJS, I use it a lot, so I take the challenge of create my own component to have the "same" functionallity, off course I still have more work to do.

Web components are here to stay and they are standar, so let's play with them =D.

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


## Contributors


## License

MIT