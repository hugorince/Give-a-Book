export const calculateDistance = async (
  coordinatesA: number[],
  coordinatesB: number[],
) => {
  try {
    const distance = getDistanceFromLatLonInKm(
      coordinatesA[0],
      coordinatesA[1],
      coordinatesB[0],
      coordinatesB[1],
    );
    console.log(coordinatesA, coordinatesB);
    console.log("distance", distance);
    return distance;
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
};

const getDistanceFromLatLonInKm = (
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
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
  return Math.floor(d / 1000);
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
