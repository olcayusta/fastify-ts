import fastify, { FastifyInstance } from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import fastifyEnv from 'fastify-env'
import fastifyPostgres from 'fastify-postgres'
import fastifyCors from 'fastify-cors'
import fastifyJWT from 'fastify-jwt'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app: FastifyInstance = fastify()

/**
 * Environment
 */
app.register(fastifyEnv, {
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'number',
        default: 9090
      }
    }
  },
  dotenv: true
})

/**
 * Authenticate
 */
/*app.decorate('authenticate', async (req: any, res: any) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    res.send(err)
  }
})*/

app.register(fastifyJWT, {
  secret: 'supersecret',
  sign: {
    expiresIn: '24h'
  }
})

app.register(fastifyCors)

app.register(fastifyPostgres, {
  connectionString: 'postgres://postgres:123456@localhost/qa_beta'
})

app.register(fastifyAutoload, {
  dir: join(__dirname, 'routes')
})

export default app
