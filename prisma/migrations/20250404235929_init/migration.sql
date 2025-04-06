-- CreateTable
CREATE TABLE if not exists client (
    "id" serial NOT NULL primary key,
    "documento" TEXT NOT NULL unique ,
    "email" TEXT NOT NULL unique,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" timestamp default now()
);

