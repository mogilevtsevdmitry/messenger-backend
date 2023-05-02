# Выполнение git pull
git pull

# stop all services
pm2 delete all

# install dependencies
npm i

# rm dist
rm -rf dist

# Сборка проекта
npm run build && npm run build auth && npm run build user

# Перезапуск всех процессов с помощью PM2
pm2 start ecosystem.config.js
