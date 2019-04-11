import config from '../config';
import { categories as categoriesObject, categoryIcons } from './constants';

const categories = Object.values(categoriesObject);

const loadCity = (city, callback) => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.cities[city].id,
        range: 'Sheet1!A2:T',
      })
      .then(
        response => {
          const data = response.result.values;

          const cities = data
            .map(row => {
              const [name, address, lat, lng, what, notes] = row;

              if (!name || !address || !lat || !lng || !what) return false;
              if (!categories.includes(what)) return false;

              const key = `${name
                .toLowerCase()
                .split(' ')
                .join('-')}:${lat}:${lng}`;

              const [category] = Object.entries(categoriesObject).find(
                el => el[1] === what
              );
              const icon = categoryIcons[category];

              return {
                key,
                name,
                address,
                lat,
                lng,
                category,
                icon,
                notes,
              };
            })
            .filter(Boolean)
            .sort(
              (a, b) => categories.indexOf(a.what) - categories.indexOf(b.what)
            );

          callback({ data: cities });
        },
        response => {
          callback({ error: response.result.error });
        }
      );
  });
};

export default loadCity;
