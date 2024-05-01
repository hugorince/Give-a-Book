export const calculateDistance = async (
  postalCodeA: string,
  postalCodeB: string,
) => {
  try {
    const [gpsA, gpsB] = await Promise.all([
      fetchGpsCoordinates(postalCodeA),
      fetchGpsCoordinates(postalCodeB),
    ]);

    const [gpsACoordinates, gpsBCoordinates] = [gpsA, gpsB].map(
      (gpsCoordinates: any) => gpsCoordinates.features[0].geometry.coordinates,
    );

    const distance = getDistanceFromLatLonInKm(
      gpsACoordinates[0],
      gpsACoordinates[1],
      gpsBCoordinates[0],
      gpsBCoordinates[1],
    );

    console.log("distance", distance);
    return distance;
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
};

const fetchGpsCoordinates = async (postalCode: string) => {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=&autocomplete=0`,
  );

  const data = await response.json();
  console.log(data.features[0].geometry.coordinates);
  return data;
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.floor(d);
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
