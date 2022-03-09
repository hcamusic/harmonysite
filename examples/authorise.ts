import HarmonySite from '../src';

const username = process.env.HARMONYSITE_USERNAME || "";
const password = process.env.HARMONYSITE_PASSWORD|| "";

const main = async () => {

  // Instantiate a new choir genius instance with the url of your site
  const harmony = new HarmonySite('https://www.hcamusic.org');

  // Log into harmony site, this must be called once before the other
  // functions will work
  const result = await harmony.authorise(username, password);
  console.log(result);
};

main().catch(console.error);
