export const healthRoutes = [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Check health',
            tags: ['api'],
        },
        handler: function () {
            return 'OK'
        },
    },
]
