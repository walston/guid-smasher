# GUID Smasher

reduce the size of guids by 33% for use in URLs

## API

```javascript
const Smasher = require("guid-smasher");

Smasher.smash("50eaac8f-4477-4a29-bccd-43a4ae3c390c"); // "keGIzQhTiyCYPkeAHzMV3f"
Smasher.unsmash("keGIzQhTiyCYPkeAHzMV3f"); // "50eaac8f-4477-4a29-bccd-43a4ae3c390c"
```

that's it. Nothing complicated about it.

## Errors

We will throw an `Error("Not a GUID")` if the guid doesn't look poorly formatted.

```javascript
Smasher.smash("Alec Baldwin"); // throws Error("Not a GUID")
```
