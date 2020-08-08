# HarmonySite Client

Client library to access to HarmonySite data.

## Usage

Log in and make calls

```js
const HarmonySite = require('harmonysite');

// Instantiate a new choir genius instance with the url of your site
const harmonySite = new HarmonySite('https://www.hcamusic.org');

const username = process.env.HARMONYSITE_USERNAME;
const password = process.env.HARMONYSITE_PASSWORD;

// Log into harmony site, this must be called once before the other
// functions will work
await harmonySite.login(username, password);

// Fetch all your users and their data
const members = await harmonySite.members.list();
```
