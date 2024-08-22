import authAPI from "./auth";
import userAPI from "./user";
import clientAPI from "./client";

export default {
  ...authAPI,
  ...userAPI,
  ...clientAPI,
}