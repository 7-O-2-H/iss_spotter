const {fetchMyIp, fetchCoordsByIp} = require('./iss');

fetchMyIp((error, IP) => {
  if (error) {
    console.log("Something went wrong: ", error);
    return;
  }
  console.log('The IP is: ', IP);
});

fetchCoordsByIp('76.69.60.169', (error, coords) => {
  if (error) {
    console.log("Something went wrong: ", error);
    return;
  }
  console.log('The lat/long co-ordinates are: ', coords);
});

