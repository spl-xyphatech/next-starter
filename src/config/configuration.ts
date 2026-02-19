export default () => ({
  port: parseInt(process.env.PORT || '', 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD,
    },
    index: process.env.ELASTICSEARCH_INDEX || 'app_logs',
  },
});
