const { XERO_API_URL, SERVICE_PORT } = process.env;

type Config = {
  PORT: number;
  XERO_API_URL: string;
};

const config: Config = {
  PORT: Number(SERVICE_PORT) || 4000,
  XERO_API_URL: XERO_API_URL || 'http://xero-api:3000/api.xro/2.0',
};

export { config, type Config };
