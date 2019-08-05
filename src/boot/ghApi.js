import axios from "axios";
const baseURL = `https://api.github.com/repos/thelearninghouse/marketing-forms`;
const ghToken = "1a39129edb99ba6dee1e6c4211d131c9f6011143";
// headers: {
//     'Authorization': 'Bearer ' + token
//   },
const ghApi = axios.create({
  baseURL,
  timeout: 1000,
  headers: { Authorization: "Bearer " + ghToken }
});

ghApi.get("/contents/fdu").then(response => {
  console.log("data: ", response.data);

  return response.data;
});

export default ghApi;
