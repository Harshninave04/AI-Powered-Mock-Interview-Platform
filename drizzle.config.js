/** @type { import("drizzle-kit").Config } */
export default {
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:0wLYrZm3oXcE@ep-super-mode-a5g8clxq.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
};