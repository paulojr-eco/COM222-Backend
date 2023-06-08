# Backend

- Linguagem: Typescript
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL
- Testes: Vitest

## Frontend

[Figma](https://www.figma.com/file/kTLssDnNd3bfVetOcLuadz/Project-COM222?type=design&node-id=0-1&t=ZqsHUjzJ6ePt8mLe-0)

## Roles

- Admin
- User

## Rotas

### Mensagem de boas-vindas

```http
  GET /
```

<br/>

## Alunos

### Listas todos os alunos

```http
  GET /alunos
```

### Detalhes de um aluno

```http
  GET /alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

### Criar um aluno

```http
  POST /alunos
```

| Body               | Type             | Description                                    |
| :----------------- | :--------------- | :--------------------------------------------- |
| `matricula`        | `string`         | **Required**. Registro de Matrícula do aluno   |
| `nome`             | `string`         | **Required**. Nome do aluno                    |
| `status`           | `ativo, inativo` | **Required**. Status do aluno                  |
| `serie`            | `string`         | **Required**. Série em que se encontra o aluno |
| `email`            | `string`         | **Required**. Email do aluno                   |
| `RG`               | `string`         | Documento RG do aluno                          |
| `CPF`              | `string`         | Documento CPF do aluno                         |
| `nascimento`       | `date`           | **Required**. Data de nascimento do aluno      |
| `sexo`             | `M, F , ND`      | **Required**. Sexo de Aluno                    |
| `endereço`         | `string`         | **Required**. Data de nascimento do aluno      |
| `nomePai`          | `string`         | Nome do pai do aluno                           |
| `telefonePai`      | `string`         | Telefone do pai do aluno                       |
| `nomeMae`          | `string`         | Nome da mãe do aluno                           |
| `telefoneMae`      | `string`         | Telefone da mãe do aluno                       |
| `emailResponsavel` | `string`         | **Required**. Email do responsável pelo aluno  |

### Editar um aluno

```http
  PUT /alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

| Body               | Type             | Description                      |
| :----------------- | :--------------- | :------------------------------- |
| `matricula`        | `string`         | Registro de Matrícula do aluno   |
| `nome`             | `string`         | Nome do aluno                    |
| `status`           | `ativo, inativo` | Status do aluno                  |
| `serie`            | `serie`          | Série em que se encontra o aluno |
| `email`            | `string`         | Email do aluno                   |
| `RG`               | `string`         | Documento RG do aluno            |
| `CPF`              | `string`         | Documento CPF do aluno           |
| `nascimento`       | `date`           | Data de nascimento do aluno      |
| `sexo`             | `M, F , ND`      | Sexo de Aluno                    |
| `endereço`         | `string`         | Data de nascimento do aluno      |
| `nomePai`          | `string`         | Nome do pai do aluno             |
| `telefonePai`      | `string`         | Telefone do pai do aluno         |
| `nomeMae`          | `string`         | Nome da mãe do aluno             |
| `telefoneMae`      | `string`         | Telefone da mãe do aluno         |
| `emailResponsavel` | `string`         | Email do responsável pelo aluno  |

### Deletar um aluno

```http
  DELETE /alunos/:id
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Id do aluno |

<br/>

## Funcionários

### Listas todos os funcionários

```http
  GET /funcionarios
```

### Detalhes de um funcionário

```http
  GET /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

### Criar um funcionário

```http
  POST /funcionarios
```

| Body              | Type                                                        | Description                                                  |
| :---------------- | :---------------------------------------------------------- | :----------------------------------------------------------- |
| `registro`        | `string`                                                    | **Required**. Registro do funcionário                        |
| `nome`            | `string`                                                    | **Required**. Nome do funcionário                            |
| `nomeSocial`      | `string`                                                    | Nome social do funcionário                                   |
| `status`          | `ativo, inativo`                                            | **Required**. Status do funcionário                          |
| `vinculo`         | `Contratado, Concursado, Convênio, Estatutário, Substituto` | **Required**. Vínculo empregatício do funcionário            |
| `admissao`        | `date`                                                      | **Required**. Date de admissão de Funcionário                |
| `cargo`           | `Direção, Coordenação, Secretaria, Professor, Auxiliar`     | **Required**. Cargo empregatício do funcionário              |
| `RG`              | `string`                                                    | **Required**. Documento RG do funcionário                    |
| `CPF`             | `string`                                                    | **Required**. Documento CPF do funcionário                   |
| `nascimento`      | `date`                                                      | **Required**. Data de nascimento do funcionário              |
| `sexo`            | `M, F , ND`                                                 | **Required**. Sexo de Funcionário                            |
| `estadoCivil`     | `Solteiro, Casado, Separado, Divorciado, Viúvo`             | **Required**. Estado civil do funcionário                    |
| `escolaridade`    | `Graduação, Pós-graduação, Mestrado, Doutorado`             | **Required**. Nível de escolaridade do funcionário           |
| `loginGsuite`     | `string`                                                    | **Required**. Login na plataforma G Suite do funcionário     |
| `senhaGsuite`     | `string`                                                    | **Required**. Senha na plataforma G Suite do funcionário     |
| `loginObjetivoSP` | `string`                                                    | **Required**. Login na plataforma Objetivo SP do funcionário |
| `senhaObjetivoSP` | `string`                                                    | **Required**. Senha na plataforma Objetivo SP do funcionário |
| `endereço`        | `FK`                                                        | **Required**. FK(endereco):Data de nascimento do funcionário |

### Editar um funcionário

```http
  PUT /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

| Body              | Type                                                        | Description                                    |
| :---------------- | :---------------------------------------------------------- | :--------------------------------------------- |
| `foto`            | `file`                                                      | Foto do funcionário                            |
| `registro`        | `string`                                                    | Registro do funcionário                        |
| `nome`            | `string`                                                    | Nome do funcionário                            |
| `nomeSocial`      | `string`                                                    | Nome social do funcionário                     |
| `status`          | `ativo, inativo`                                            | Status do funcionário                          |
| `vinculo`         | `Contratado, Concursado, Convênio, Estatutário, Substituto` | Vínculo empregatício do funcionário            |
| `admissao`        | `date`                                                      | Date de admissão de Funcionário                |
| `cargo`           | `Direção, Coordenação, Secretaria, Professor, Auxiliar`     | Cargo empregatício do funcionário              |
| `RG`              | `string`                                                    | Documento RG do funcionário                    |
| `CPF`             | `string`                                                    | Documento CPF do funcionário                   |
| `nascimento`      | `date`                                                      | Data de nascimento do funcionário              |
| `sexo`            | `M, F , ND`                                                 | Sexo de Funcionário                            |
| `estadoCivil`     | `Solteiro, Casado, Separado, Divorciado, Viúvo`             | Estado civil do funcionário                    |
| `escolaridade`    | `Graduação, Pós-graduação, Mestrado, Doutorado`             | Nível de escolaridade do funcionário           |
| `loginGsuite`     | `string`                                                    | Login na plataforma G Suite do funcionário     |
| `senhaGsuite`     | `string`                                                    | Senha na plataforma G Suite do funcionário     |
| `loginObjetivoSP` | `string`                                                    | Login na plataforma Objetivo SP do funcionário |
| `senhaObjetivoSP` | `string`                                                    | Senha na plataforma Objetivo SP do funcionário |
| `endereço`        | `FK`                                                        | FK(endereco):Data de nascimento do funcionário |
| `docs`            | `file[]`                                                    | Documentos relacionados ao funcionário         |

### Deletar um funcionário

```http
  DELETE /funcionarios/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Required**. Id do funcionário |

<br/>

> As rotas abaixo são autenticadas

### Listas todos os usuários

```http
  GET /users
```

### Detalhes de um usuário

```http
  GET /users/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuário |

### Criar um usuário

```http
  POST /users
```

| Body    | Type     | Description                    |
| :------ | :------- | :----------------------------- |
| `email` | `string` | **Required**. Email do usuário |
| `senha` | `string` | **Required**. Senha do usuário |

### Editar um usuário

```http
  PUT /users/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuário |

| Body    | Type     | Description      |
| :------ | :------- | :--------------- |
| `senha` | `string` | Senha do usuário |

### Deletar um usuário

```http
  DELETE /users/:id
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Id do usuário |

<br/>
