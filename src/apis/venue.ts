import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import {
  RDCreateVenue,
  RDDeleteVenue,
  RDGetAllVenue,
} from "../@types/apis/RequestData";
import { IVenue } from "../@types/entities/Venue";
import END_POINT from "../constants/endpoint";

export const getAllVenue = async ({
  name = "getAllField",
  query,
  successHandler,
  errorHandler,
}: {
  name?: string;
  query?: RDGetAllVenue["query"];
  successHandler?: TApiProps<
    RDGetAllVenue,
    TResponseDataArr<IVenue>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDGetAllVenue,
    TResponseDataArr<IVenue>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDGetAllVenue, TResponseDataArr<IVenue>>({
    name,
    path: END_POINT.VENUE,
    data: {
      query,
    },
    successHandler,
    errorHandler,
  });

  return result;
};

export const createVenue = async ({
  name = "createVenue",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateVenue["body"];
  successHandler?: TApiProps<
    RDCreateVenue,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateVenue,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateVenue, TResponseDataObj<any>>({
    name,
    path: END_POINT.VENUE,
    data: {
      body,
    },
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};

export const deleteVenue = async ({
  name = "deleteVenue",
  param,
  successHandler,
  errorHandler,
}: {
  name?: string;
  param: RDDeleteVenue["param"];
  successHandler?: TApiProps<
    RDDeleteVenue,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDDeleteVenue,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDDeleteVenue, TResponseDataObj<any>>({
    name,
    path: END_POINT.GET_VENUE,
    data: {
      param,
    },
    method: "DELETE",
    successHandler,
    errorHandler,
  });

  return result;
};
