# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos package.json e yarn.lock para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante do código do projeto para o diretório de trabalho
COPY . .

# Compile o projeto
RUN yarn build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start:prod"]
