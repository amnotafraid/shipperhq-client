This package is in beta.

# shipperhq-client
Access ShipperHQ API

## Install with npm

npm install shipperhq-client

## usage

### initialize

```
var shipperhq = new ShipperHQ(
  'API KEY', 
  'password'
);
```

### with Promises

```
shipperhq.getCartRates(data)
  .then (function (response) {
    console.log('response = ' + response);
  },
  function (err) {
    console.log('err = ' + err);
  });
```
Or:
```
shipperhq.getMethods()
  .then(function (response) {
    console.log('response = ' + response);
  },
  function (err) {
    console.log('err = ' + err);
  });
```

### with Callbacks
```
shipperhq.getCartRates(data, function(err, response) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('cartRates = ' + response);
});
```
Or:
```  
shipperhq.getMethods(function(err, response) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('methods = ' + response);
});
```


