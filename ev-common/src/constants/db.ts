export const DB = {
  DATABASE_NAME: process.env.MYSQL_DATABASE,
} as const;

export const options = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: DB.DATABASE_NAME,
  charset: 'utf8mb4',
  // autoLoadEntities: true,
  // synchronize: process.env.NODE_ENV === "local" ? true : false,
  // logging: false,
  // subscribers: [],
};
