# HarmonySite Client

Client library for the [HarmonySite API](https://harmonysite.freshdesk.com/support/solutions/articles/43000590537-api-application-programming-interface).

## Usage

Work with [HarmonySite support](https://harmonysite.freshdesk.com/support/solutions/articles/43000590537-api-application-programming-interface) to enable the API for your group.

It's use the api browser (https://myharmonysite.com/dbpage.php?pg=api) to create a token, select the `authorise` option. You can also use `client.authorise` once to get a token, but it's not recommended for normal use.

```js
const HarmonySite = require('harmonysite');

// Instantiate a new choir genius instance with the url of your site
const harmonySite = new HarmonySite('https://www.hcamusic.org');

const username = process.env.HARMONYSITE_USERNAME;
const password = process.env.HARMONYSITE_PASSWORD;

// Log into harmony site, this must be called once before the other
// functions will work. The documentation references a `token` instead of
// usernames and passwords, but the API requires tracking cookies as well,
// so this must be called before any other calls.
await harmony.authorise(username, password);

// Fetch all your users
const members = await harmony.browse({
  table: 'members',
});
```
