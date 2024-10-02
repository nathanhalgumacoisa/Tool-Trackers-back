CREATE DATABASE tooltrackers;

\c tooltrackers


CREATE TYPE tipo_usuario_enum AS ENUM ('aluno', 'administracao', 'instrutor', 'manutencao');

-- Tabela usuarios
CREATE TABLE usuarios(
 user_id SERIAL PRIMARY KEY,
 nome VARCHAR(50) NOT NULL,
 numero_nif CHAR(7),
 numero_qrcode CHAR(20),
 tipo_usuario tipo_usuario_enum
);

-- Tabela organizador
CREATE TABLE organizador(
 organizador_id SERIAL PRIMARY KEY,
 nome_organizador VARCHAR(30) NOT NULL,
 numero_organizador INTEGER
);

-- Tabela sub_organizador
CREATE TABLE sub_organizador(
 sub_organizador_id SERIAL PRIMARY KEY,
 organizador_id INTEGER,
 nome_suborganizador VARCHAR(20),
 numero_suborganizador INTEGER,
 FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
);

-- Tabela imagens
CREATE TABLE imagens(
 imagem_id SERIAL PRIMARY KEY,
 url_imagem VARCHAR(50) NOT NULL,
 descricao VARCHAR(50),
 sub_organizador_id INTEGER,
 FOREIGN KEY (sub_organizador_id) REFERENCES sub_organizador(sub_organizador_id)
);

-- Tabela localizacoes
CREATE TABLE localizacoes(
 localizacao_id SERIAL PRIMARY KEY,
 ambiente VARCHAR(20),
 organizador_id FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
);

-- Tabela ferramentas
CREATE TABLE ferramentas(
 ferramenta_id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 imagem_url VARCHAR(255) NOT NULL,
 conjunto VARCHAR(30),
 numero VARCHAR(30),
 patrimonio VARCHAR(50),
 modelo VARCHAR(20),
 descricao VARCHAR(20),
 disponivel BOOLEAN DEFAULT TRUE,  
 conferido BOOLEAN DEFAULT FALSE,    
 emprestado BOOLEAN DEFAULT FALSE,    
 manutencao BOOLEAN DEFAULT FALSE,
 localizacao_id INTEGER,
 FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id)
);

-- Tabela emprestimos
CREATE TABLE emprestimos(
 emprestimo_id SERIAL PRIMARY KEY,
 ferramenta_id INTEGER,
 user_id INTEGER,
 data_emprestimo TIMESTAMP,
 data_retorno VARCHAR(10),
 local_origem_id INTEGER,
 local_destino_id INTEGER,
 FOREIGN KEY (ferramenta_id) REFERENCES ferramentas(ferramenta_id),
 FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
 FOREIGN KEY (local_origem_id) REFERENCES localizacoes(localizacao_id),
 FOREIGN KEY (local_destino_id) REFERENCES localizacoes(localizacao_id)
);

-- Tabela conferencias
CREATE TABLE conferencias(
 conferencia_id SERIAL PRIMARY KEY,
 user_id INTEGER,
 localizacao_id INTEGER,
 data_conferencia TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
 FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id)
);

-- Tabela observacoes
CREATE TABLE observacoes(
 observacao_id SERIAL PRIMARY KEY,
 conferencia_id INTEGER,
 descricao VARCHAR(100),
 data_observacao TIMESTAMP,
 FOREIGN KEY (conferencia_id) REFERENCES conferencias(conferencia_id)
);

-- Tabela log_ferramentas
CREATE TABLE log_ferramentas(
 ferramenta_id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 imagem_url VARCHAR(255) NOT NULL,
 conjunto VARCHAR(30),
 numero VARCHAR(30),
 patrimonio VARCHAR(50),
 modelo VARCHAR(20),
 descricao VARCHAR(20),
 disponivel BOOLEAN DEFAULT TRUE,
 conferido BOOLEAN DEFAULT FALSE,    
 emprestado BOOLEAN DEFAULT FALSE,    
 manutencao BOOLEAN DEFAULT FALSE,
 localizacao_id INTEGER,
 data_atualizacao DATE,
 FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id)
);