import authAPI from "./auth";
import userAPI from "./user";
import clientAPI from "./client";
import caseAPI from "./case";

export default {
  ...authAPI,
  ...userAPI,
  ...clientAPI,
  ...caseAPI
}