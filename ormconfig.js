const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build'
module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  },
  logging: process.env.NODE_ENV === 'development',
  entities: ['build/models/**/*.js'],
  migrations: [rootDir + '/migrations/**/*{.ts,.js}'],
  subscribers: [rootDir + '/subscribers/**/*{.ts,.js}'],
  seeds: [rootDir + '/seeds/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'build' + '/models',
    migrationsDir: rootDir + '/migrations',
    subscribersDir: rootDir + '/subscribers',
  },
}