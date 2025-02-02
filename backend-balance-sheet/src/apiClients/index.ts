import axios from 'axios';
import { createXeroApiClient, XeroApiClient } from './xeroApiClient';
import { Config } from '../../config';

interface ApiClients {
  xeroClient: XeroApiClient;
}

const createApiClients = (config: Config): ApiClients => {
  const xeroAxiosInstance = axios.create({ baseURL: config.XERO_API_URL });

  return {
    xeroClient: createXeroApiClient(xeroAxiosInstance),
  };
};

export { createApiClients, ApiClients };
