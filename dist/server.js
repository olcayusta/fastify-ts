import app from './app.js';
await app.ready();
try {
    await app.listen(process.env.PORT);
    console.log(`App listening on http://localhost:9090`);
    console.log(`Press CTRL+C to quit.`);
}
catch (err) {
    process.exit(1);
}
