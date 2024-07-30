const express = require('express');
const Playlist = require('../models/playlist');

const router = express.Router();

// CRUD operations for playlists
router.post('/', async (req, res) => {
  try {
    const { name, videos, user } = req.body;
    const newPlaylist = new Playlist({ name, videos, user });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, videos } = req.body;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, { name, videos }, { new: true });
    res.json(updatedPlaylist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
