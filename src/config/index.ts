type ENV = 'dev' | 'stg' | 'prd'

let env: ENV = 'dev'
if (location.host.indexOf('localhost') != -1) {
  env = 'dev'
} else if (location.host.indexOf('stg') != -1) {
  env = 'stg'
} else {
  env = 'prd'
}
const config = {
  dev: {
    baseApi: '/api',
    uploadAPi: 'http://api-driver.marsview.cc',
    env: 'dev'
  },
  stg: {
    baseApi: '/stgapi',
    uploadAPi: 'http://api-driver.marsview.cc',
    env: 'stg'
  },
  prd: {
    baseApi: '/prdapi',
    uploadAPi: 'http://api-driver.marsview.cc'
  }
}
export default { env, ...config['prd'] }
