module.exports = {
    apps: [
      {
        name: 'urm',
        script: './server.js',
        instances: 1,
        exec_mode: 'fork',
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: '8080'
        }
      }
    ]
  };
