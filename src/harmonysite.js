const axios = require('axios');
const { Cookie } = require('tough-cookie');
const qs = require('qs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');

class HarmonySite {
  constructor(baseURL) {
    this._axios = axios.create({ baseURL });
  }

  async _dbAction(data, options) {
    return await this._axios({
      url: '/dbaction.php',
      method: 'post',
      data: qs.stringify(data),
      ...options,
    });
  }

  async login(username, password) {
    const result = await this._dbAction({
      action: 'Login',
      username,
      password,
    });

    const cookies = result.headers['set-cookie']
      .map(Cookie.parse)
      .map((cookie) => cookie.cookieString());

    this._axios.defaults.headers.common['Cookie'] = cookies.join('; ');
  }

  members = {
    list: async (grouping = 1) => {
      const result = await this._dbAction({
        action: 'ExportMembers',
        dbase: 'members',
        grouping,
      });

      const csvData = parse(result.data, {
        columns: true,
      });

      return csvData.map((csvUser) => {
        const user = {};

        Object.entries(csvUser).forEach(([key, value]) => {
          user[_.camelCase(key)] = value.replace('\r', '\n');
        });

        return user;
      });
    },
  };
}

module.exports = HarmonySite;
