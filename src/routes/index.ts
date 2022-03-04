import {FastifyInstance} from 'fastify';

export default async (app: FastifyInstance) => {
    app.get('/', async function (req, res) {
        return 'Index Page!'
    })
}