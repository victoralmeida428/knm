FROM node:20

WORKDIR /opt/knm

# Primeiro copia apenas os arquivos necessários para instalação
COPY package.json package-lock.json* ./

# Instala dependências incluindo Prisma CLI
RUN npm install
RUN npm install -g prisma

# Copia schema do Prisma
COPY prisma ./prisma

# Copia arquivos .env separadamente
COPY .env.dev .env

# Copia o resto dos arquivos (excluindo o que já foi copiado)
COPY . .

# Gera cliente Prisma e executa migrações
CMD npx prisma generate && npx prisma migrate deploy && npx next dev