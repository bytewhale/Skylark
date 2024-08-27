import authAPI from "./auth";
import userAPI from "./user";
import clientAPI from "./client";
import caseAPI from "./case";
import recordAPI from "./record";

export default {
  ...authAPI,
  ...userAPI,
  ...clientAPI,
  ...caseAPI,
  ...recordAPI
}