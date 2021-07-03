const development = 'development';

const production = 'production';

const env = process.env.NODE_ENV || development;

let config = {
  appName: 'White Rabbit',
};

switch (env) {
  case development:
    config = {
      domainPrefix: 'dev',
      ...config,
    };
    break;

  case production:
    config = {
      domainPrefix: 'prod',
      ...config,
    };
    break;
  default:
    break;
}

export default Object.freeze(config);
