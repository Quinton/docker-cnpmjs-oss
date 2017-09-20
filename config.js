'use strict';

module.exports = {
  version: process.env.CNPMJS_ORG_VERSION,
  dataDir: process.env.CNPMJS_ORG_DATA_DIR,
  /*
   * server configure
   */

  // session secret
  sessionSecret: process.env.CNPMJS_ORG_SESSION_SECRET || 'cnpmjs.org test session secret',

  // default system admins
  admins: {
    // name: email
    admin: 'admin@cnpmjs.org',
  },

  // email notification for errors
  // check https://github.com/andris9/Nodemailer for more informations
  mail: {
    enable: false,
    appname: 'cnpm.gnetlink.net',
    from: 'cnpm.gnetlink.net mail sender <adderss@gmail.com>',
    service: 'gmail',
    auth: {
      user: process.env.CNPMJS_ORG_EMAIL_USER || 'address@gmail.com',
      pass: process.env.CNPMJS_ORG_EMAIL_PASS || 'your password'
    }
  },

  /**
   * database config
   */

  database: {
    db: process.env.CNPMJS_ORG_DB || 'cnpmjs_test',
    username: process.env.CNPMJS_ORG_DB || 'root',
    password: process.env.CNPMJS_ORG_DB || '',

    // the sql dialect of the database
    // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
    dialect: process.env.CNPMJS_ORG_DIALECT || 'mysql',

    // custom host; default: 127.0.0.1
    host: process.env.CNPMJS_ORG_HOST || '127.0.0.1',

    // custom port; default: 3306
    port: process.env.CNPMJS_ORG_PORT || 3306,

    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 30000
    },

    logging: !!process.env.SQL_DEBUG,
  },

  // package tarball store in local filesystem by default
  nfs: require('oss-cnpm').create({
    accessKeyId: process.env.CNPMJS_ORG_OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.CNPMJS_ORG_OSS_ACCESS_KEY_SECRET || 'your secret',
    // change to your endpoint
    endpoint: process.env.CNPMJS_ORG_OSS_ENDPOINT || 'oss-cn-shenzhen.aliyuncs.com',
    bucket: process.env.CNPMJS_ORG_OSS_BUCKET || 'your bucket',
    mode: process.env.CNPMJS_ORG_OSS_MODE || 'public or private',
  }),

  // registry url name
  registryHost: process.env.CNPMJS_ORG_REGISTRY_HOST || 'r.cnpmjs.org',
};
