type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: Date;
  profession: string?;
  country: string?;
  state: string?;
  city: string?;
  gender: string?;
  createdAt: Date;
  role: string?;
  verified: Boolean?;
};

type UserNull = User | null;
type location = {
  name: string;
  states: [
    {
      name: string;
      cities: [
        {
          name: string;
        },
      ];
    },
  ];
};

type LocationType = {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
};