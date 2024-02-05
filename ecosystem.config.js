module.exports = {
  apps: [
    {
      name: 'web-dev-4101',
      watch: ['build'],
      autorestart: true,
      // exp_backoff_restart_delay: 30000,
      max_restarts: 100,
      exec_mode: 'cluster',
      restart_delay: 30000,
      instances: 2,
      interpreter: 'node',
      script: './server.js',
      interpreter_args: '',
      args: '',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'production',
        PORT: 4101,
      },
    },
  ],
};
