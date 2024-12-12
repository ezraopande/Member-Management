const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const Member = require('../models/Member');
const User = require('../models/User');
const Role = require('../models/Role');
const authenticate = require('../middleware/auth');

router.use(authenticate);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const members = await Member.findAll({
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: [['name', 'role_name']],
                    required: false,
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['username'],
                    required: false,
                },
            ]
            
        });
        console.log(members.user);
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, password, name, email, dob } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword, role_id: 2 });

        let profilePicture = null;
        if (req.file) {
            profilePicture = req.file.path;
        }

        const member = await Member.create({
            user_id: user.id,
            role_id: 2,
            name,
            email,
            date_of_birth: dob,
            photo: profilePicture,
        });

        res.status(201).json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id;

        const member = await Member.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username'],
                },
                {
                    model: Role,
                    as: 'role',
                    attributes: ['name'],
                },
            ],
        });

        if (!member) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json({
            name: member.name,
            username: member.user.username,
            email: member.email,
            dob: member.date_of_birth,
            photo: member.photo,
            role: member.role ? member.role.name : null,
        }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/profile', upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, username, email, dob } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        await user.save();

        const member = await Member.findOne({ where: { user_id: userId } });
        if (!member) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        member.name = name || member.name;
        member.email = email || member.email;
        member.date_of_birth = dob || member.date_of_birth;

        if (req.file) {
            member.photo = req.file.path;
        }

        await member.save();

        res.json({ 
            message: 'Profile updated successfully', 
            profile: {
                name: member.name,
                username: user.username,
                email: member.email,
                dob: member.date_of_birth,
                photo: member.photo,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});


router.put('/profile/change-password', authenticate, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Old password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to change password' });
    }
});


router.put('/:id', upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, email, dob } = req.body;
        const memberId = req.params.id;

        const member = await Member.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        let profilePicture = member.photo;
        if (req.file) {
            profilePicture = req.file.path;
        }

        await member.update({
            name,
            email,
            date_of_birth: dob,
            photo: profilePicture,
        });

        res.json({ message: 'Member updated successfully', member });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const memberId = req.params.id;

        const member = await Member.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        await member.destroy();

        const user = await User.findByPk(member.user_id);
        if (user) {
            await user.destroy();
        }

        res.json({ message: 'Member deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;