const request = require('request');

const fetchMyIp = function(callback) {
  request.get('http://ipwho.is/', (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const result = JSON.parse(body);
    callback(null, result.ip);
    return result;

  });
};

const fetchCoordsByIp = function(ip, callback) {
  request.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
};
