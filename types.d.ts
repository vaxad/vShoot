type User = {
  id: String;
  name: String;
  email: String;
  password: String;
  dob: Date;
  profession: String?;
  country: String?;
  state: String?;
  city: String?;
  gender: String?;
  createdAt: Date;
};

type UserNull = User | null;
type location = {
  name: String;
  states: [
    {
      name: String;
      cities: [
        {
          name: String;
        },
      ];
    },
  ];
};
