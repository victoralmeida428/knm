-- CreateTable
CREATE TABLE if not exists client (
    "id" serial NOT NULL primary key,
    "documento" character varying(25) NOT NULL unique ,
    "email" character varying NOT NULL unique,
    "nome" character varying NOT NULL,
    "telefone" character varying(50) NOT NULL,
    "bairro" character varying NOT NULL,
    "rua" character varying NOT NULL,
    "cidade" character varying NOT NULL,
    "cep" character varying(9) NOT NULL,
    "numero" integer,
    complemento character varying,
    "criado_em" timestamp default now()
);

