const sequelize = require('./database');
const Role = require('../models/Role');
const User = require('../models/User');
const Member = require('../models/Member');
const ActivityLog = require('../models/ActivityLog');
const bcrypt = require('bcrypt');

Member.associate({ User, Role });
Role.associate({ Member });
User.associate({ Member });

const initializeDatabase = async () => {
    try {
        await sequelize.query('PRAGMA foreign_keys = OFF;');
        console.log('Synchronizing database...');
        await sequelize.sync({ alter: true });
        await sequelize.query('PRAGMA foreign_keys = ON;');
        console.log('Database synchronized.');

        console.log('Creating roles...');
        const roles = [
            { name: 'admin' },
            { name: 'user' },
        ];
        for (const roleData of roles) {
            await Role.findOrCreate({
                where: { name: roleData.name },
                defaults: roleData,
            });
        }
        console.log('Roles created.');

        const adminUserExists = await User.findOne({ where: { username: 'admin' } });
        if (!adminUserExists) {
            console.log('Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin', 10);
            const adminUser = await User.create({
                username: 'admin',
                password: hashedPassword,
                role_id: (await Role.findOne({ where: { name: 'admin' } })).id,
            });

            console.log('Creating admin member...');
            await Member.create({
                name: 'Super Admin',
                email: 'admin@example.com',
                role_id: adminUser.role_id,
                user_id: adminUser.id,
                photo: '',
                date_of_birth: '1990-01-01',
            });

            console.log('Admin member created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;
