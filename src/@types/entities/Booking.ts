export interface IBooking {
  _id: string;
  user: string;
  field: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  date: string;
  match: boolean;
  userDetails: [
    {
      _id: string;
      username: string;
      email: string;
      phoneNumber: string;
      name: string;
    },
  ];
  fieldDetails: [
    {
      _id: string;
      name: string;
      sport: string;
      location: string;
      capacity: number;
      price: number;
      venueID: string;
    },
  ];
}
