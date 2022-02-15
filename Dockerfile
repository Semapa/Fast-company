# инструкции для клиента указываем какую платформу используем
FROM node:14 as client

# указываем рабочий каталог
WORKDIR /app/client

# копируем файл package.json
COPY client/package.json /app/client/

# устанавливаем все зависимости
RUN npm install

# копируем все остальные файлы
COPY client /app/client/

# собираем билд
RUN npm run build

# инструкции для сервера используем последнюю версию alpine
FROM node:16-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

# переносим build из client в server
# --from=client /app/client/build(папка на клиенте) /app/client(папка на сервере)
COPY  --from=client /app/client/build /app/client

# говорим какой порт будем юзать в докер контейнере
EXPOSE 8080

# запускаем продакшт мод нашего приложения
CMD ["npm", "start"]




