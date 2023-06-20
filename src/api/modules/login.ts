import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name Auth
 */
// User login
export const loginApi = (params: Login.ReqLoginForm) => {
  // Normal post json request  ==>  application/json
  return http.post<Login.ResLogin>(PORT1 + `/login`, params, { noLoading: true });
  // Control the current request not to display loading
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { noLoading: true });
  // post request carries query parameter  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params });
  // post request carries form parameters  ==>  application/x-www-form-urlencoded
  // return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params));
  // Get requests can carry complex parameters such as arrays
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
};

// Get menu list
export const getAuthMenuListApi = () => {
  return http.get<any[]>(PORT1 + `/menu/list`, {}, { noLoading: true });
};

// Get button permissions
export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { noLoading: true });
};

// User logout
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`);
};
