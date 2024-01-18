-- Para monstrar banco de dados e tabelas
SHOW DATABASES 
SHOW TABLES

-- Usar um banco de dados
USE "nome do banco de dados"

-- Criação de tabelas, dentro dos parênteses informar as "colunas" junto ao tipo.
CREATE TABLE usuarios(
    nome VARCHAR(50),
    idade INT,
    email VARCHAR(100),
);

-- Para exibir informações de uma tabela
DESCRIBE "nome da tabela"

-- Inserir dados da tabela
INSERT INTO "nome da tabela" ("informa campos , ...") VALUES ("ordem dos campos , ...")

-- Listar dados
SELECT "selecao (* monstra todos)" FROM "nome da tabela"