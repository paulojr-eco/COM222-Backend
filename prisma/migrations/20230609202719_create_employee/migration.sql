-- CreateEnum
CREATE TYPE "Relation" AS ENUM ('CONTRATADO', 'CONCURSADO', 'SUBSTITUTO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DIRECAO', 'COORDENACAO', 'SECRETARIA', 'PROFESSOR');

-- CreateEnum
CREATE TYPE "Scholarity" AS ENUM ('GRADUACAO', 'POSGRADUACAO', 'MESTRADO', 'DOUTORADO');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "registro" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "vinculo" "Relation" NOT NULL,
    "admissao" TIMESTAMP(3) NOT NULL,
    "cargo" "Role" NOT NULL,
    "RG" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" "Gender" NOT NULL,
    "escolaridade" "Scholarity" NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
