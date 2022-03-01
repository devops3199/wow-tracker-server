import axios from 'axios';
import { BNET_URL } from '../../shared/config';

const http = axios.create({ baseURL: BNET_URL, withCredentials: true });

export { http };
