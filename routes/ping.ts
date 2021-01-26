import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export default async (app: FastifyInstance) => {
  app.get('/ping', async (req: FastifyRequest, res: FastifyReply) => {
    const { rows } = await app.pg.query('SELECT * FROM "user"')
    return rows
  })
}
