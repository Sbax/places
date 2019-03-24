import config from '../config';

const loadCity = (city, callback) => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.cities[city].id,
        range: 'Sheet1!A4:T',
      })
      .then(
        response => {
          const data = response.result.values;

          const cities =
            data.map(row => {
              const [name, address, lat, lng, what, notes] = row;
              const key = `${name
                .toLowerCase()
                .split(' ')
                .join('-')}:${lat}:${lng}`;

              return {
                key,
                name,
                address,
                lat,
                lng,
                what,
                notes,
              };
            }) || [];

          callback({ data: cities });
        },
        response => {
          callback({ error: response.result.error });
        }
      );
  });
};

export default loadCity;
