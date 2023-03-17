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

const fetchISSFlyOverTimes = function(coords, callback) {
  

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
      if (error) {
        return callback(error);
      }
      
      fetchCoordsByIp(ip, (error, geoCoords) => {
          if (error) {
            
            return callback(error);;
          }

          fetchISSFlyOverTimes(geoCoords, (error, nextPass) => {
            if (error) {
              return callback(error);
            }
    
            callback(null, nextPass);

            
          });
      });
  });
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
