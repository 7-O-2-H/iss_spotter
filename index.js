const {fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

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


const exampleCoords = { latitude: '42.974536', longitude: '82.4065901' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("Something went wrong" , error);
    return;
  }

  console.log('Success! Your flyover times:' , passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
