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
