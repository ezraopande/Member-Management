const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Member = require('../models/Member');
const secret = 'supersecretkey';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profile_picture'), async (req, res) => {
    try {
        const { username, password, name, email, dob } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword, role_id:2 });

        let profilePicturePath = null;
        if (req.file) {
            profilePicturePath = req.file.path;
        }

        const member = await Member.create({
            user_id: user.id,
            role_id:2,
            name,
            email,
            date_of_birth:dob,
            photo: profilePicturePath,
        });

        res.status(201).json({
            message: 'User and member registered successfully!',
            user,
            member,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'User not Found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const member = await Member.findOne({ where: { user_id: user.id } });
        if (!member) {
            return res.status(404).json({ message: 'Member details not found' });
        }

        const token = jwt.sign({ id: user.id, role: user.role_id }, secret, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: member.email,
                role: user.role_id,
                name: member.name,
                photoUrl: member.photo,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
