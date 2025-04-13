FROM node:20

WORKDIR /opt/knm

# First copy only the files needed for installation
COPY ../package.json package-lock.json* ./

# Install dependencies including Prisma CLI
RUN npm install
RUN npm install -g prisma  # Install Prisma CLI globally

# Copy Prisma schema
COPY ../prisma ./prisma

# Copy the rest of the files
COPY .. .

RUN mv ./.env.dev ./.env
# Generate Prisma client and run migrations
# RUN npx prisma
# Command to start the application
#
CMD npx prisma migrate deploy && npx next dev