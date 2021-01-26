export default async (app) => {
    app.get('/ping', async (req, res) => {
        const { rows } = await app.pg.query('SELECT * FROM "user"');
        return rows;
    });
};
