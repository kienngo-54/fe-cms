import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import { RDDeleteUser, RDGetAllUser } from "../@types/apis/RequestData";
import { ICurrentUser, IUser } from "../@types/entities/User";
import END_POINT from "../constants/endpoint";

export interface IGetAllUserParameters {
  name?: string;
  query?: RDGetAllUser["query"];
  successHandler?: TApiProps<
    RDGetAllUser,
    TResponseDataArr<IUser>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDGetAllUser,
    TResponseDataArr<IUser>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}

export const getAllUser = async ({
  name = "getAllUser",
  query,
  successHandler,
  errorHandler,
}: IGetAllUserParameters) => {
  const result = await callApi<RDGetAllUser, TResponseDataArr<IUser>>({
    name,
    path: END_POINT.GET_ALL_USER,
    data: {
      query,
    },
    successHandler,
    errorHandler,
  });

  return result;
};

export const getCurrentUser = async ({
  token,
  successHandler,
  errorHandler,
}: {
  token: string;
  successHandler?: TApiProps<
    any,
    TResponseDataObj<ICurrentUser>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    any,
    TResponseDataObj<ICurrentUser>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<any, TResponseDataObj<ICurrentUser>>({
    path: END_POINT.GET_CURRENT_USER,
    token,
    successHandler,
    errorHandler,
  });

  return result;
};

export const deleteUser = async ({
  param,
  successHandler,
  errorHandler,
}: {
  param: {
    userId: string;
  };
  successHandler?: TApiProps<
    RDDeleteUser,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDDeleteUser,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDDeleteUser, TResponseDataObj<any>>({
    path: END_POINT.DELETE_USER,
    data: {
      param,
    },
    method: "DELETE",
    successHandler,
    errorHandler,
  });

  return result;
};
