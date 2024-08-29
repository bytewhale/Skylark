import authAPI from "./auth";
import userAPI from "./user";
import clientAPI from "./client";
import caseAPI from "./case";
import recordAPI from "./record";

const API = {
  ...authAPI,
  ...userAPI,
  ...clientAPI,
  ...caseAPI,
  ...recordAPI
}

export default API