# pi-gpio-promise

This is a thin layer on top of pi-gpio package to support promises.

With pi-gpio, your code looks like this.

```js
var gpio = require("pi-gpio");
 
gpio.open(16, "output", function(err) {
  gpio.write(16, 1, function() {
    gpio.close(16);
  });
});
```

With pi-gpio-promise, yours looks like this.
```js
var gpio = require("pi-gpio-promise");
 
gpio.open(16, "output").
  then(function() {
    return gpio.write(16, 1);
  }).
  then(function() {
    return gpio.close(16);
  }).
  then(null, function(err) {
    console.log(err);
  });
```

Unlike non-promise version, you can add as many chains as you want.
