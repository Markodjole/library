export interface Member {
    id: number;
    name: string;
    email: string;
    address: {
      city: string;
    };
    company: {
      bs: string;
    };
    occupation: string;
  }