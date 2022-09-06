/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicService {
  constructor() {
    this._music = [];
  }

  addMusic({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);
    const newMusic = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };

    this._music.push(newMusic);

    const isSuccess = this._music.filter((m) => m.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Music gagal ditambahkan');
    }

    return id;
  }

  getMusic() {
    return this._music;
  }

  getMusicById(id) {
    const music = this._music.filter((m) => m.id === id)[0];
    if (!music) {
      throw new NotFoundError('Music tidak ditemukan');
    }

    return music;
  }

  updateMusicById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const index = this._music.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui music. Id tidak ditemukan');
    }

    this._music[index] = {
      ...this._music[index], title, year, genre, performer, duration, albumId,
    };
  }

  deleteMusicById(id) {
    const index = this._music.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new NotFoundError('Music gagal dihapus. Id tidak ditemukan');
    }

    this._music.splice(index, 1);
  }
}

module.exports = MusicService;
