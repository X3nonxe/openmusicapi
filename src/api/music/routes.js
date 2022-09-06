const routes = (handler) => [
  {
    method: 'POST',
    path: '/music',
    handler: handler.postMusicHandler,
  },
  {
    method: 'GET',
    path: '/music',
    handler: handler.getMusicHandler,
  },
  {
    method: 'GET',
    path: '/music/{id}',
    handler: handler.getMusicByIdHandler,
  },
  {
    method: 'PUT',
    path: '/music/{id}',
    handler: handler.updateMusicByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/music/{id}',
    handler: handler.deleteMusicByIdHandler,
  },
];

module.exports = routes;
