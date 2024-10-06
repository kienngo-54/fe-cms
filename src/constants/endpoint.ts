enum END_POINT {
  GET_CURRENT_USER = "/user/me",
  REFRESH_TOKEN = "/user/me",
  GET_ALL_USER = "/admin/user",
  FIELD = "/admin/field",
  GET_ALL_FIELD = "/admin/field/:venueId",
  DELETE_FIELD = "/admin/field/:fieldId",
  VENUE = "/admin/venue",
  GET_VENUE = "/admin/venue/:venueId",
}

export default END_POINT;
