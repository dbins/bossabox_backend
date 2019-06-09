# Usa uma imagem do docker hub com a versão carbon do Node.js
FROM node:carbon
# Define qual diretório será usado para nossa aplicação dentro do container
WORKDIR /usr/src/app
# Copia todos os arquivos que começam com package e tem extensão .json para o diretório definido acima
COPY package*.json ./
# Instala todas as dependências declaradas no package.json
RUN npm install
# Copia todos os arquivos da raiz da nossa aplicação para a pasta deinida no WORKDIR
COPY . .
# Expõe a porta 3000 do container
EXPOSE 3000

ADD waitForMySQL.sh /usr/local/bin/waitForMySQL.sh
RUN chmod 777 /usr/local/bin/waitForMySQL.sh

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm start