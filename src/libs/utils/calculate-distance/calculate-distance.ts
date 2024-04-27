export const calculateDistance = async (a: string, b: string) => {
  //console.log("entered calculate distance", a, b);
  const getGpsA = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${a}&type=&autocomplete=0`,
  );
  const gpsA = await getGpsA.json();
  //console.log("gpsA", gpsA.features);
  const gpsACoordinates = gpsA.features[0].geometry.coordinates;

  const getGpsB = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${b}&type=&autocomplete=0`,
  );
  const gpsB = await getGpsB.json();
  const gpsBCoordinates = gpsB.features[0].geometry.coordinates;

  const distance = await fetch(
    `https://wxs.ign.fr/calcul/geoportail/itineraire/rest/1.0.0/route?resource=bdtopo-osrm&profile=car&optimization=fastest&start=${gpsACoordinates[0]},${gpsACoordinates[1]}&end=${gpsBCoordinates[0]},${gpsBCoordinates[1]}`,
  );

  const distanceResult = await distance.json();

  return Math.floor(distanceResult.distance / 1000);
};
