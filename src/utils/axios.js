

import axios from "axios";

const baseURL = 'http://localhost:1910/'

axios.defaults.baseURL = baseURL;

export {axios,baseURL}