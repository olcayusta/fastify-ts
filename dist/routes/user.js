import errors from 'http-errors';
export default async (app) => {
    app.get('/users', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            displayName: { type: 'string' },
                            picture: { type: 'string' },
                            signupDate: { type: 'string', format: 'date' }
                        }
                    }
                }
            }
        }
    }, async () => {
        const text = `
                SELECT id, "displayName", picture, "signupDate"
                FROM "user"
            `;
        const { rows } = await app.pg.query(text);
        return rows;
    });
    app.get('/users/:userId', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'number' }
                }
            }
        }
    }, async ({ params }) => {
        const query = {
            text: `
                    SELECT id, "displayName", picture, "signupDate", "githubUrl"
                    FROM "user"
                    WHERE id = $1
                `,
            values: [params.userId]
        };
        const { rows } = await app.pg.query(query);
        return rows[0] ? rows[0] : new errors.NotFound();
    });
    app.get('/users/:userId/questions', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'number' }
                }
            },
            response: {
                200: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    content: { type: 'string' },
                    creationTime: { type: 'string', format: 'date' },
                    userId: { type: 'number' },
                    viewCount: { type: 'number' },
                    tags: {
                        type: 'array',
                        nullable: true,
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' }
                            }
                        }
                    },
                    tags2: {
                        type: 'array',
                        nullable: true
                    },
                    acceptedAnswerId: { type: 'number' }
                }
            }
        }
    }, async ({ params }) => {
        const query = {
            text: 'SELECT * FROM question WHERE "userId" = $1',
            values: [params.userId]
        };
        const { rows } = await app.pg.query(query);
        return rows[0] ? rows[0] : errors.NotFound;
    });
};
