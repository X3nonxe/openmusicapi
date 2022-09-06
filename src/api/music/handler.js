/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class MusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMusicHandler = this.postMusicHandler.bind(this);
    this.getMusicHandler = this.getMusicHandler.bind(this);
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
    this.updateMusicByIdHandler = this.updateMusicByIdHandler.bind(this);
    this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
  }

  async postMusicHandler(request, h) {
    try {
      this._validator.validateMusicPayload(request.payload);
      const {
        title, year, genre, performer, duration = 0, albumId = '',
      } = request.payload;
      const musicId = await this._service.addMusic({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      const response = h.response({
        status: 'success',
        message: 'Menambahkan lagu',
        data: {
          songId: musicId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);

        return response;
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);

      return response;
    }
  }

  async getMusicHandler() {
    const music = await this._service.getMusic();
    return {
      status: 'success',
      data: { music },
    };
  }

  async getMusicByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const music = await this._service.getMusicById(id);
      return {
        status: 'success',
        data: { music },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.code);

        return response;
      }
    }

    // server error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);

    return response;
  }

  async updateMusicByIdHandler(request, h) {
    try {
      this._validator.validateMusicPayload(request.payload);
      const { id } = request.params;
      await this._service.updateMusicById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.code);

        return response;
      }
    }

    // server error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);

    return response;
  }

  async deleteMusicByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteMusicById(id);

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);

        return response;
      }
    }

    // server error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);

    return response;
  }
}

module.exports = MusicHandler;
