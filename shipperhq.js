/**
 * ShipperHQ
 */

var http = require('http');

var DEFAULT_HOST = 'dev-api.shipperhq.com';
var DEFAULT_PORT = 80;
var DEFAULT_VERIFY_CERT = false;

var APP_VERSION = '2.34';
var ECOMMERCE_CART = 'Magento Community';
var WEBSITE_URL = 'https://example.com';
var ENVIRONMENT_SCOPE = 'LIVE';
var ECOMMERCE_VERSION = '1.9.0.1';
var DEFAULT_VERSION = 'v1';
var PUBLIC_URL = 'http://dev-api.shipperhq.com';

/**
 * ShipperHQ constructor
 *
 * @param  string apiKey
 * @param  string password
 * @param  object options
 * @param  function callback
 */
var ShipperHQ = function(apiKey, password, options) {

  if (apiKey) {
    this.init(apiKey, password, options);
  }
};

/**
 * Initialize client parameters
 *
 * @param  string apiKey
 * @param  string password
 * @param  object options
 */
ShipperHQ.prototype.init = function(apiKey, password, options) {

  options = options || {};

  if (typeof apiKey === 'object') {
    options = apiKey;
    apiKey = options.apiKey;
    password = options.password;
  } else if (typeof password === 'object') {
    options = password;
    password = options.password;
  }

  this.params = {
		credentials: {
			apiKey: apiKey,
			password: password
		},
		siteDetails: {
			appVersion: options.appVersion || APP_VERSION,
			ecommerceCart: options.ecommerceCart || ECOMMERCE_CART,
			websiteUrl: options.websiteUrl || WEBSITE_URL,
			environmentScope: options.environmentScope || ENVIRONMENT_SCOPE,
			ecommerceVersion: options.ecommerceVersion || ECOMMERCE_VERSION,
		},
    version: options.version || DEFAULT_VERSION,
    publicUrl: options.publicUrl || PUBLIC_URL,
    host: options.host || DEFAULT_HOST,
    port: options.port || DEFAULT_PORT,
    verifyCert: options.verifyCert !== undefined ? options.verifyCert : DEFAULT_VERIFY_CERT,
    defaultVersion: options.defaultVersion || DEFAULT_VERSION,
  };

  if (!this.params.credentials.password) {
    throw new Error('ShipperHQ `password` (Authentication Code) is required to initialize');
  }
  if (!this.params.credentials.apiKey) {
    throw new Error('ShipperHQ `apiKey` is required to initialize');
  }
};

/**
 * ShipperHQ request handler
 *
 * @param  string method
 * @param  string url
 * @param  mixed data
 * @param  function callback
 */
ShipperHQ.prototype.request = function(method, url, data, callback) {

  var options = {
    host: this.params.host,
    port: this.params.port,
    path: url,
    method: method,
    headers: {'Content-Type': 'application/json'}
  };
  var req;

  if (callback) {
    req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        let obj = JSON.parse(chunk);
        callback(null, obj);
      });
    });

    req.on('error', function(e) {
      callback(e.message);
    });

    req.write(JSON.stringify(data));
    req.end();
  }
  else {
    return new Promise(function (resolve, reject) {
      req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          let obj = JSON.parse(chunk);
          resolve(obj);
        });
      });

      req.on('error', function(e) {
        reject(e.message);
      });

      req.write(JSON.stringify(data));
      req.end();
    });
  }
};

/**
 * ShipperHQ getMethods
 *
 * @param function callback (optional if using promises)
 */
ShipperHQ.prototype.getMethods = function(callback) {
  var obj = {};
  obj.credentials = this.params.credentials;
  obj.siteDetails = this.params.siteDetails;

  console.log('request = ' + JSON.stringify(obj, null, 2));
  var url = '/' + this.params.defaultVersion + '/allowed_methods';
  return this.request('post', url, obj, callback);
};

/**
 * ShipperHQ getCartRates
 *
 * @param object data is cartData
 * @param function callback (optional if using promises)
 */
ShipperHQ.prototype.getCartRates = function(data, callback) {
  var obj = data;
  obj.credentials = this.params.credentials;
  obj.siteDetails = this.params.siteDetails;
  obj.customerDetails = {customerGroup: 'NOT LOGGED IN'};

  var url = '/' + this.params.defaultVersion + '/rates';
  return this.request('post', url, obj, callback);
};

/**
 * ShipperHQ create/init helper
 *
 * @param  string apiKey
 * @param  string password
 * @param  function callback
 * @return ShipperHQ
 */
ShipperHQ.create = function(apiKey, password, callback) {
  return new ShipperHQ(apiKey, password, callback);
};

// Exports
module.exports = ShipperHQ;
module.exports.createShipperHQ = ShipperHQ.create;
