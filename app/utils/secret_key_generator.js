const crypto = require('crypto');

const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);


// A9D58217E78C4342DA42EF256AB71BB840D0B13135E5462B2F51EA45464838E2
// F78DBF7C83F1A3515DC476502EA0CF815D081F9B884D8775C827E07673084D64