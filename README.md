# shipperhq-client
Access ShipperHQ API

## Install with npm

npm install shipperhq-client

## usage

### initialize

```
var client = new ShipperHQ(
  'API KEY', 
  'password'
);
```

### with Promises

```
client.getCartRates(data)
  .then (function (response) {
    console.log('response = ' + response);
  },
  function (err) {
    console.log('err = ' + err);
  });
```
Or:
```
client.getMethods()
  .then(function (response) {
    console.log('response = ' + response);
  },
  function (err) {
    console.log('err = ' + err);
  });
```

### with Callbacks
```
client.getCartRates(data, function(err, response) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('cartRates = ' + response);
});
```
Or:
```  
client.getMethods(function(err, response) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('methods = ' + response);
});
```


