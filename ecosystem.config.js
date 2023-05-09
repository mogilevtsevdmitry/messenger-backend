module.exports = {
    apps: [
        {
            name: 'main',
            script: './dist/apps/gateaway/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_development: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'auth',
            script: './dist/apps/auth/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_development: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'user',
            script: './dist/apps/user/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_development: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
