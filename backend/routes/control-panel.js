const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { apiUrl } = require('../utils/constants');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/save', upload.fields([{ name: 'favicon' }, { name: 'logo' }]), async (req, res) => {
    try {
        const { websiteName, timezone, systemEmail, systemPhone } = req.body;

        const envData = [
            `WEBSITE_NAME=${websiteName}`,
            `TIMEZONE=${timezone}`,
            `SYSTEM_EMAIL=${systemEmail}`,
            `SYSTEM_PHONE=${systemPhone}`,
        ].join('\n');

        fs.writeFileSync(path.join(__dirname, '../.env'), envData);

        if (req.files.favicon) {
            const faviconPath = path.join(__dirname, '../uploads/favicon.ico');
            fs.renameSync(req.files.favicon[0].path, faviconPath);
        }

        if (req.files.logo) {
            const logoPath = path.join(__dirname, '../uploads/logo.png');
            fs.renameSync(req.files.logo[0].path, logoPath);
        }

        res.json({ message: 'Settings saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save settings.' });
    }
});


router.get('/settings', async (req, res) => {
    try {
        const envPath = path.join(__dirname, '../.env');

        if (!fs.existsSync(envPath)) {
            return res.status(404).json({ message: '.env file not found.' });
        }

        const envContent = fs.readFileSync(envPath, 'utf8');

        const envData = {};
        envContent.split('\n').forEach((line) => {
            const [key, ...value] = line.split('=');
            if (key) {
                envData[key.trim()] = value.join('=').trim();
            }
        });

        const faviconPath = fs.existsSync(path.join(__dirname, '../uploads/favicon.ico'))
            ? `${apiUrl}/uploads/favicon.ico`
            : 'https://via.placeholder.com/40';

        const logoPath = fs.existsSync(path.join(__dirname, '../uploads/logo.png'))
            ? `${apiUrl}/uploads/logo.png`
            : 'https://via.placeholder.com/40';

        res.json({
            websiteName: envData.WEBSITE_NAME || '',
            timezone: envData.TIMEZONE || '',
            systemEmail: envData.SYSTEM_EMAIL || '',
            systemPhone: envData.SYSTEM_PHONE || '',
            favicon: faviconPath,
            logo: logoPath,
        });
    } catch (err) {
        console.error('Error fetching settings:', err.message);
        res.status(500).json({ message: 'Failed to fetch settings.' });
    }
});

module.exports = router;
