export type BookData = {
  id: number;
  title: string;
  author: string;
  image: string | null;
  description: string;
  user: string | null | undefined;
  userId: number;
  exchange: boolean;
  give: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number[];
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
};

export type BookedBook = BookData & { distance: number };
