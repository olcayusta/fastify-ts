import { PostgresDb } from 'fastify-postgres'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number
    }
    pg: PostgresDb
  }
}
