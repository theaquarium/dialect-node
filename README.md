Diax Dialect for Node
=========

NPM module for using the Diax Dialect API.

## Installation

`npm install diax-dialect --save`

## Usage

The node module can be installed by typing `npm install diax-dialect --save` in your project directory. Then you can include the module with `const Dialect = require('diax-dialect');`.

Then to create your Dialect instance, declare a global variable without initializing it (`var myDialect;`) and then call: 
```javascript
Dialect.create("my-token", function(thisDialect) { myDialect = thisDialect; });
```
This sets that variable you declared earlier to your dialect instance.

After you do that, you can simply use the dialect api by doing: 
```javascript
myDialect.ask("something to ask the dialect", function(response) { console.log(response); });
```
This calls your dialect instance's ask method and runs the callback.

You can also train the api with the node module by running: 
```javascript
myDialect.train("something to ask the dialect", "what the dialect should respond");
```

## Example
```javascript
const Dialect = require('diax-dialect');
var myDialect;
Dialect.create("token", function(dialect) {
	myDialect = dialect;
});
// ask
myDialect.ask("Hello", function(response) {
	console.log(response);
});
// train
myDialect.train("Hello", "Hi there!");
```

## Release History

* 1.0.0 Initial release
