module.exports = {
    apps: [
      {
        name: 'urm',
        script: './server.js',
        instances: 1,
        exec_mode: 'fork',
        watch: false, // If true, pm2 will restart when there is a file change, even log files
        env: {
          NODE_ENV: 'production',
          PORT: '8080'
        }
      }
    ]
  };
