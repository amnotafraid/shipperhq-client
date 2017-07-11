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

## Options

The options and environment variables to set them are shown below:

<table>
  <tbody>
    <tr>
      <th align="center">Environment Variable</th>
			<th align="center">Default</th>
      <th align="center">Definition</th>
    </tr>
    <tr>
      <td align="left">
				APP_VERSION
      </td>
      <td align="left">
				2.34
      </td>
      <td align="left">
				siteDetails.appVersion
      </td>
		</tr>
		<tr>
      <td align="left">
				ECOMMERCE_CART
      </td>
      <td align="left">
				Magento Community
      </td>
      <td align="left">
				siteDetails.commerceCart
      </td>
		</tr>
		<tr>
      <td align="left">
				WEBSITE_URL
      </td>
      <td align="left">
				https://example.com
      </td>
      <td align="left">
				siteDetails.websiteUrl
      </td>
		</tr>
		<tr>
      <td align="left">
				ENVIRONMENT_SCOPE
      </td>
      <td align="left">
				LIVE
      </td>
      <td align="left">
				siteDetails.environmentScope
      </td>
		</tr>
		<tr>
			<td>
				ECOMMERCE_VERSION
			</td>
			<td>
				1.9.0.1
			</td>
      <td align="left">
				siteDetails.ecommerceVersion
      </td>
    </tr>
		<tr>
      <td align="left">
				DEFAULT_VERSION
      </td>
      <td align="left">
				v1
      </td>
			<td>
				ShipperHQ API version
			</td>
		</tr>
  </tbody>
</table>

### Details

The ShipperHQ version is an option.  At the time of this writing, the ShipperHQ api is at 'v1', so the endpoint looks like this:

  * '/v1/rates'
  * '/v1/allowed_methods'

The default version in this module is set to 'v1', but you can overide it with the DEFAULT_VERSION environment variable, as in:
```
DEFAULT_VERSION=v2
```
for the (yet to be developed at the time of this writing) 'v2' endpoint.

The basic information POSTed to ShipperHQ looks like this:
(If you are trying to get the prices for a cart, you also send along the cart.)
```
{
  "credentials": {
    "apiKey": 'API KEY'
    "password": 'password'
  },
  "siteDetails": {
    "appVersion": "2.34",
    "ecommerceCart": "Magento Community",
    "websiteUrl": "https://example.com",
    "environmentScope": "LIVE",
    "ecommerceVersion": "1.9.0.1"
  }
}
```

All the values in the siteDetails are options that can be set with environment variables.  What is shown above are the default values.  To overide the defaults, just set an environment variable.

