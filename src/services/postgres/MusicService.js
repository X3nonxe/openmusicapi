/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const mapDBModel = require('../../utils/index');

class MusicService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO music VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Music gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getMusic() {
    const result = await this._pool.query('SELECT * FROM music');

    return result.rows.map(mapDBModel);
  }

  async getMusicById(id) {
    const query = {
      text: 'SELECT * FROM music WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan');
    }

    return result.rows.map(mapDBModel)[0];
  }

  async editMusicById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE music SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, albumId = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui music. Id tidak ditemukan');
    }
  }

  async deleteMusicById(id) {
    const query = {
      text: 'DELETE FROM music WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Music gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = MusicService;
