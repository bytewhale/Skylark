import authAPI from "./auth";
import userAPI from "./user";

export default {
  ...authAPI,
  ...userAPI,
}