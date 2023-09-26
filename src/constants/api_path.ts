export const API_PATH = {
  auth: {
    login: "auth/login",
    me: "auth/me",
  },
  customer: {
    getAll: "customer/get-all",
    create: "customer/create",
    getById: "customer/get-by-id",
    patchById: "customer/update-personalInfo-by-id", // ? update by staff id
    multipleDelete: "customer/delete-multiple", // ? update by user id
  },
  staff: {
    getAll: "staff/get-all",
  },
  tag: {
    getAll: "tag/get-all",
  },
  debt: {
    getAll: "debt/get-change-logs",
  },
  branch: {
    getAll: "agency-branch/get-all",
  },
};
