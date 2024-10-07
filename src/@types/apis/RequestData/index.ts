export interface RDCommon {
  body?: {
    [key: string]: any;
  };
  query?:
    | {
        [key: string]: any;
      }
    | FormData;
  param?: {
    [key: string]: any;
  };
}

export interface RDGetUserInfo extends RDCommon {}

export interface RDLogin extends RDCommon {
  body: {
    email: string;
    password: string;
  };
}

export interface RDRegister extends RDCommon {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export interface RDGetAllUser extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDGetAllField extends RDCommon {
  param: {
    venueId: string;
  };
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDCreateField extends RDCommon {
  body: {
    name: string;
    sport: string;
    location: string;
    capacity: number;
    price: number;
    venueId: string;
  };
}

export interface RDDeleteField extends RDCommon {
  param: {
    fieldId: string;
  };
}

export interface RDGetAllVenue extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDCreateVenue extends RDCommon {
  body: {
    name: string;
    location: string;
  };
}

export interface RDDeleteVenue extends RDCommon {
  param: {
    venueId: string;
  };
}

export interface RDGetAllBooking extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}
export interface RDGetAllTeam extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDDeleteUser extends RDCommon {
  param: {
    userId: string;
  };
}
