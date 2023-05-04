@echo off

REM Замените следующие значения на свои:
set USER=root
set REMOTE_HOST=95.163.240.197
set KEY_PATH="C:\Users\mogil\.ssh\messenger.ppk"

REM Подключение к удаленному серверу через PuTTY и выполнение команд
"C:/Program Files/PuTTY/putty.exe" -ssh %USER%@%REMOTE_HOST% -m remote_deploy.txt
