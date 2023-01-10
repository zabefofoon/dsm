import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions"

export const typeORMConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  //엔티티를 이용해서 DB테이블을 생성하므로, entity파일이 어디있는지 설정
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
}
