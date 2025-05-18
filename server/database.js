// database.js
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const { Sequelize, DataTypes } = require('sequelize');

console.log('DB_HOST:', process.env.DB_HOST, 'DB_PORT:', process.env.DB_PORT, 'DB_NAME:', process.env.DB_NAME, 'DB_USER:', process.env.DB_USER);
// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false, // Disable logging to avoid console clutter
});

// Define the Bag model
const Counter = sequelize.define('Counter', {
    count: { type: DataTypes.INTEGER, allowNull: false },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, {
    tableName: 'counters'
});

// Define the Order model
const Message = sequelize.define('Message', {
    name: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING, allowNull: true },
}, {
    timestamps: true,
    tableName: 'coopfluenced_messages'
});

// Sync database
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Database synced successfully.');
    } catch (error) {
        console.error('❌ Database sync failed:', error);
    }
})();

module.exports = { sequelize, Counter, Message };
