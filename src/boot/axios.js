import axios from "axios";

// const baseURL = `https://api.github.com/repos/thelearninghouse/marketing-forms`;
const ghToken = "1a39129edb99ba6dee1e6c4211d131c9f6011143";

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({
  baseURL: `https://api.github.com/repos/thelearninghouse/marketing-forms`,
  headers: { Authorization: "Bearer " + ghToken }
});
// NEWW
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance };
