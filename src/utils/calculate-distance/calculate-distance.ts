export const calculateDistance = async (
  coordinatesA: number[],
  coordinatesB: number[],
) => {
  try {
    const distance = getDistanceFromLatLonInKm(coordinatesA, coordinatesB);
    return distance;
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
};

const getDistanceFromLatLonInKm = (x: number[], y: number[]) => {
  const lon1 = x[0];
  const lat1 = x[1];
  const lon2 = y[0];
  const lat2 = y[1];

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
  const distance = R * c;

  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
