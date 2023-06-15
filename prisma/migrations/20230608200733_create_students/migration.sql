-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'NAODEFINIDO');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "matricula" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "serie" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "RG" TEXT,
    "CPF" TEXT,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "Gender" NOT NULL,
    "endereco" TEXT NOT NULL,
    "emailResponsavel" TEXT NOT NULL,
    "nomePai" TEXT,
    "telefonePai" TEXT,
    "nomeMae" TEXT,
    "telefoneMae" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
