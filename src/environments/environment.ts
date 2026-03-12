
import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  useApi: false,
   apiUrl: 'http://localhost:3000'
};


