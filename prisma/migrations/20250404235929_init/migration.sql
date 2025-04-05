-- CreateTable
CREATE TABLE if not exists client (
    "id" BIGSERIAL NOT NULL primary key,
    "documento" TEXT NOT NULL unique ,
    "email" TEXT NOT NULL unique,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" timestamp default now()
);

