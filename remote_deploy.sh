#!/bin/bash

# Замените следующие значения на свои:
USER="root"
REMOTE_HOST="95.163.240.197"
REMOTE_DIR="messenger-backend"

# Подключение к удаленному серверу через SSH и выполнение команд
ssh -t $USER@$REMOTE_HOST "cd $REMOTE_DIR && sudo ./deploy.sh"
