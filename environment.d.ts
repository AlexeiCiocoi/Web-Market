declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SQL_BD_PORT: string;
        SQL_DB_HOST: string;
        SQL_DB_PASSWORD: string;
        SQL_DB_NAME: string;
        SQL_DB_USER: string;
        SERVER_PORT: string;
      }
    }
  }
  export {}