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
 organizador_id INTEGER, 
 FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
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
 data_retorno DATE,
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

INSERT INTO organizador (nome_organizador, numero_organizador) VALUES
('Organizador A', 101),
('Organizador B', 102),
('Organizador C', 103),
('Organizador D', 104),
('Organizador E', 105);

INSERT INTO sub_organizador (organizador_id, nome_suborganizador, numero_suborganizador) VALUES
(1, 'Sub A1', 201),
(1, 'Sub A2', 202),
(2, 'Sub B1', 203),
(2, 'Sub B2', 204),
(3, 'Sub C1', 205);

INSERT INTO imagens (url_imagem, descricao, sub_organizador_id) VALUES
('http://exemplo.com/imagem1.jpg', 'Imagem 1', 2),
('http://exemplo.com/imagem2.jpg', 'Imagem 2', 3),
('http://exemplo.com/imagem3.jpg', 'Imagem 3', 4),
('http://exemplo.com/imagem4.jpg', 'Imagem 4', 5),
('http://exemplo.com/imagem5.jpg', 'Imagem 5', 6);

INSERT INTO localizacoes (ambiente, organizador_id, slug) VALUES
('Manutencao', 1, 'manut'),
('Espaco Maker', 2, 'em'),
('Oficina de Eletrica', 3, 'oee'),
('Mecanica Usinagem', 4, 'ofm');

INSERT INTO ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, localizacao_id) VALUES
('Ferramenta 1', 'http://exemplo.com/ferr1.jpg', 'Conjunto A', '001', 'PATR001', 'Modelo 1', 'Descrição 1', TRUE, 1),
('Ferramenta 2', 'http://exemplo.com/ferr2.jpg', 'Conjunto B', '002', 'PATR002', 'Modelo 2', 'Descrição 2', TRUE, 2),
('Ferramenta 3', 'http://exemplo.com/ferr3.jpg', 'Conjunto C', '003', 'PATR003', 'Modelo 3', 'Descrição 3', FALSE, 3),
('Ferramenta 4', 'http://exemplo.com/ferr4.jpg', 'Conjunto D', '004', 'PATR004', 'Modelo 4', 'Descrição 4', TRUE, 4);


INSERT INTO emprestimos (ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id) VALUES
(14, 1, NOW(), '20/10/2024', 1, 4),
(15, 2, NOW(), '17/10/2024', 2, 3),
(16, 3, NOW(), '25/10/2024', 3, 2),
(17, 4, NOW(), '18/10/2024', 4, 1);


INSERT INTO conferencias (user_id, localizacao_id, data_conferencia) VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW());

INSERT INTO observacoes (conferencia_id, descricao, data_observacao) VALUES
(1, 'Observação 1', NOW()),
(2, 'Observação 2', NOW()),
(3, 'Observação 3', NOW()),
(4, 'Observação 4', NOW()),


INSERT INTO log_ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, localizacao_id, data_atualizacao) VALUES
('Log Ferramenta 1', 'http://exemplo.com/log1.jpg', 'Conjunto A', '001', 'PATR001', 'Modelo 1', 'Descrição 1', TRUE, 1, NOW()),
('Log Ferramenta 2', 'http://exemplo.com/log2.jpg', 'Conjunto B', '002', 'PATR002', 'Modelo 2', 'Descrição 2', TRUE, 2, NOW()),
('Log Ferramenta 3', 'http://exemplo.com/log3.jpg', 'Conjunto C', '003', 'PATR003', 'Modelo 3', 'Descrição 3', FALSE, 3, NOW()),
('Log Ferramenta 4', 'http://exemplo.com/log4.jpg', 'Conjunto D', '004', 'PATR004', 'Modelo 4', 'Descrição 4', TRUE, 4, NOW());