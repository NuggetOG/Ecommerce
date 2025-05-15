const app = require('./app');  // import express app
const { prisma } = require('./prisma');

app.listen(5000, () => console.log("Server running"));

async function testDB() {
    try {
        await prisma.$connect();
        console.log('✅ Connected to Postgres DB!');
    } catch (err) {
        console.error('❌ Failed to connect to DB:', err);
    }
}

testDB();
