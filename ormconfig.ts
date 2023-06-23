// {
//     "type": "mysql",
//     "host": "${process.env.HOST}",
//     "port": 8889,
//     "username": "${process.env.USERNAME}",
//     "password": "${process.env.PASSWORD}",
//     "database": "${process.env.DATABASE}",
//     "synchronize": true,
//     "logging":true,
//     "entities": [
//       "src/entity/*.ts"
//     ],
//     "migrationsTableName": "migrations",  
//     "migrations": [
//       "src/migration/*.ts"
//     ],
//     "cli": {
//       "entitiesDir": "src/entity",
//       "migrationsDir": "src/migration"
//     }
//   }


  module.exports  = {
    "type": "mysql",
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "synchronize": true,
    "logging": true,
    "entities": [
      "src/entity/*.ts"
    ],
    "migrationsTableName": "migrations",  
    "migrations": [
      "src/migration/*.ts"
    ],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration"
    }
};