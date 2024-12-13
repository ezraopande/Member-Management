const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Role name is required' });
        }

        const newRole = await Role.create({ name });
        res.status(201).json(newRole);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create role' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Role name is required' });
        }

        role.name = name;
        await role.save();

        res.json({ message: 'Role updated successfully', role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update role' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        await role.destroy();

        res.json({ message: 'Role deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete role' });
    }
});

module.exports = router;
