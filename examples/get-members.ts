import HarmonySite from '../src';

const username = process.env.HARMONYSITE_USERNAME || "";
const password = process.env.HARMONYSITE_PASSWORD || "";


const main = async () => {
  // Instantiate a new harmony site instance with the url of your site
  const harmony = new HarmonySite(
      'https://www.hcamusic.org',
  );

  // Log into harmony site, this must be called once before the other
  // functions will work
  await harmony.authorise(username, password);
  const members = await harmony.browse({
    table: 'members',
  });

  console.log(JSON.stringify(members, null, 2));
};

main().catch(console.error);
