import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../configs";
import useSearchParams from "../../hooks/useSearchParams";
import { useAppDispatch } from "../../redux";
import ROUTE from "../../constants/routes";
import { getCurrentUser } from "../../apis/user";
import { redirectToLogin } from "../../helpers";
import { saveUserInfo } from "../../redux/slices/authSlice";
import { setLocalForageItem } from "../../utils/localForage";
import LOCAL_FORAGE_KEY from "../../constants/localForageKey";

function AuthPage() {
  const navigate = useNavigate();
  const { getAllParams } = useSearchParams();
  const dispatch = useAppDispatch();
  const params = getAllParams<{ t?: string }>({
    t: "",
  });

  useEffect(() => {
    async function getAuth() {
      if (params.t) {
        await getCurrentUser({
          token: params.t,
          successHandler: {
            callBack(data) {
              if (params.t) {
                setLocalForageItem(
                  LOCAL_FORAGE_KEY.USER_INFO,
                  JSON.stringify({
                    accessToken: params.t,
                    userId: data.data._id,
                    username: data.data.username,
                    email: data.data.email,
                  })
                );
                dispatch(
                  saveUserInfo({
                    accessToken: params.t,
                    userId: data.data._id,
                    username: data.data.username,
                    email: data.data.email,
                  })
                );
                navigate(ROUTE.HOME, { replace: true });
              }
            },
          },
          errorHandler: {
            callBack(error) {
              redirectToLogin();
            },
          },
        });
      } else {
        redirectToLogin();
      }
    }
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);
  return null;
}

export default AuthPage;
