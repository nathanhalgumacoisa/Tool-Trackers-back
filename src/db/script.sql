
CREATE DATABASE tooltrackers;

DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS conferencias CASCADE;
DROP TABLE IF EXISTS observacoes CASCADE;
DROP TABLE IF EXISTS log_ferramentas CASCADE;
DROP TABLE IF EXISTS ferramentas CASCADE;
DROP TABLE IF EXISTS imagens CASCADE;
DROP TABLE IF EXISTS sub_organizador CASCADE;
DROP TABLE IF EXISTS organizador CASCADE;
DROP TABLE IF EXISTS localizacoes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS login CASCADE;
DROP TYPE IF EXISTS tipo_usuario_enum CASCADE;

\c tooltrackers

CREATE TYPE tipo_usuario_enum AS ENUM ('aluno', 'administracao', 'instrutor', 'manutencao');

CREATE TABLE usuarios(
 user_id SERIAL PRIMARY KEY,
 nome VARCHAR(50) NOT NULL,
 email VARCHAR(150) NOT NULL,
 numero_nif CHAR(7),
 numero_qrcode CHAR(20),
 tipo_usuario tipo_usuario_enum,
 ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE organizador(
 organizador_id SERIAL PRIMARY KEY,
 nome_organizador VARCHAR(30) NOT NULL,
 numero_organizador INTEGER
);

CREATE TABLE sub_organizador(
 sub_organizador_id SERIAL PRIMARY KEY,
 organizador_id INTEGER,
 nome_suborganizador VARCHAR(20),
 numero_suborganizador INTEGER,
 foto_url VARCHAR(255),
 FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
);


<<<<<<< HEAD
-- CREATE TYPE tipo_usuario_enum AS ENUM ('aluno', 'administracao', 'instrutor', 'manutencao');

-- CREATE TABLE usuarios(
--  user_id SERIAL PRIMARY KEY,
--  nome VARCHAR(50) NOT NULL,
--  email VARCHAR(150) NOT NULL,
--  numero_nif CHAR(7),
--  numero_qrcode CHAR(20),
--  tipo_usuario tipo_usuario_enum,
--  ativo BOOLEAN DEFAULT TRUE
-- );

-- CREATE TYPE organizador_enum AS ENUM ('carrinhos', 'armarios', 'tornos', 'paineis');

-- CREATE TABLE organizador(
--  organizador_id SERIAL PRIMARY KEY,
--  nome_organizador organizador_enum,
--  numero_organizador INTEGER
-- );

-- CREATE TYPE sub_organizador_enum AS ENUM ('gavetas', 'prateleiras', 'outros');

-- CREATE TABLE sub_organizador(
--  sub_organizador_id SERIAL PRIMARY KEY,
--  organizador_id INTEGER,
--  nome_suborganizador sub_organizador_enum,
--  numero_suborganizador INTEGER,
--  foto_url VARCHAR(255),
--  FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
-- );

CREATE TYPE ambiente_enum AS ENUM ('oficina mecanica de usinagem', 'oficina eletro eletronica', 'especo maker', 'manutenao');

CREATE TYPE slug_enum AS ENUM ('ofm', 'oee', 'em', 'manut');
=======
>>>>>>> 5d8acd44afeb1635853396260190af179f4ac100

CREATE TABLE localizacoes(
 localizacao_id SERIAL PRIMARY KEY,
 ambiente VARCHAR(20),
 organizador_id INTEGER,
 slug VARCHAR(20),
 FOREIGN KEY (organizador_id) REFERENCES organizador(organizador_id)
);

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

CREATE TABLE emprestimos (
    emprestimo_id SERIAL PRIMARY KEY,
    ferramenta_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    data_emprestimo TIMESTAMP,
    data_retorno DATE,
    local_origem_id INTEGER,
    local_destino_id INTEGER,
    FOREIGN KEY (ferramenta_id) REFERENCES ferramentas(ferramenta_id) ON DELETE CASCADE,  -- Excluir empréstimo se a ferramenta for excluída
    FOREIGN KEY (user_id) REFERENCES usuarios(user_id) ON DELETE CASCADE,  -- Excluir empréstimo se o usuário for excluído
    FOREIGN KEY (local_origem_id) REFERENCES localizacoes(localizacao_id),
    FOREIGN KEY (local_destino_id) REFERENCES localizacoes(localizacao_id)
);

CREATE TABLE conferencias (
  conferencia_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  localizacao_id INTEGER,
  data_conferencia TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(user_id) ON DELETE CASCADE,
  FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id) ON DELETE CASCADE
);

CREATE TABLE observacoes(
 observacao_id SERIAL PRIMARY KEY,
 conferencia_id INTEGER,
 descricao VARCHAR(100),
 data_observacao TIMESTAMP,
 FOREIGN KEY (conferencia_id) REFERENCES conferencias(conferencia_id) ON DELETE CASCADE
);

CREATE TABLE log_ferramentas(
 log_ferramentas SERIAL PRIMARY KEY,
 ferramenta_id INTEGER,
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
 FOREIGN KEY (ferramenta_id)  REFERENCES ferramentas(ferramenta_id),
 FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id)
);

CREATE TABLE login(
    login_id SERIAL PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    numero_nif_qrcode VARCHAR(50) NOT NULL,
    senha VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL
);


INSERT INTO usuarios (nome, email, numero_nif, numero_qrcode, tipo_usuario) VALUES
('Alice','alice@gmail.com', '1234567', '12345678901234567890', 'aluno'),
('Bob','bob@gmail.com', '2345678', '23456789012345678901', 'administracao'),
('Charlie','charlie@gmail.com', '3456789', '34567890123456789012', 'instrutor'),
('Diana','diana@gmail.com', '4567890', '45678901234567890123', 'manutencao'),
('Eve','eve@gmail.com', '5678901', '56789012345678901234', 'aluno');

INSERT INTO organizador (nome_organizador, numero_organizador) VALUES
('Organizador A', 101),
('Organizador B', 102),
('Organizador C', 103),
('Organizador D', 104),
('Organizador E', 105);

INSERT INTO sub_organizador (organizador_id, nome_suborganizador, numero_suborganizador, foto_url) VALUES
(1, 'Sub A1', 201,  'http://exemplo.com/ferr1.jpg'),
(2, 'Sub A2', 202, 'http://exemplo.com/ferr1.jpg'),
(3, 'Sub B1', 203, 'http://exemplo.com/ferr1.jpg'),
(4, 'Sub B2', 204, 'http://exemplo.com/ferr1.jpg'),
(5, 'Sub C1', 205, 'http://exemplo.com/ferr1.jpg');



INSERT INTO localizacoes (ambiente, organizador_id) VALUES
('Sala A', 1),
('Sala B', 2),
('Sala C', 3),
('Sala D', 4),
('Sala E', 5);

INSERT INTO ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, localizacao_id) VALUES
('Ferramenta 1', 'http://exemplo.com/ferr1.jpg', 'Conjunto A', '001', 'PATR001', 'Modelo 1', 'Descrição 1', TRUE, 1),
('Ferramenta 2', 'http://exemplo.com/ferr2.jpg', 'Conjunto B', '002', 'PATR002', 'Modelo 2', 'Descrição 2', TRUE, 2),
('Ferramenta 3', 'http://exemplo.com/ferr3.jpg', 'Conjunto C', '003', 'PATR003', 'Modelo 3', 'Descrição 3', FALSE, 3),
('Ferramenta 4', 'http://exemplo.com/ferr4.jpg', 'Conjunto D', '004', 'PATR004', 'Modelo 4', 'Descrição 4', TRUE, 4),
('Ferramenta 5', 'http://exemplo.com/ferr5.jpg', 'Conjunto E', '005', 'PATR005', 'Modelo 5', 'Descrição 5', TRUE, 5);

INSERT INTO emprestimos (ferramenta_id, user_id, data_emprestimo, data_retorno, local_origem_id, local_destino_id) VALUES
(1, 1, NOW(), NOW() + INTERVAL '7 days', 1, 2),
(2, 2, NOW(), NOW() + INTERVAL '5 days', 2, 3),
(3, 3, NOW(), NOW() + INTERVAL '10 days', 3, 1),
(4, 4, NOW(), NOW() + INTERVAL '3 days', 4, 5),
(5, 5, NOW(), NOW() + INTERVAL '14 days', 5, 4);


INSERT INTO conferencias (user_id, localizacao_id, data_conferencia) VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW()),
(5, 5, NOW());

INSERT INTO observacoes (conferencia_id, descricao, data_observacao) VALUES
(1, 'Observação 1', NOW()),
(2, 'Observação 2', NOW()),
(3, 'Observação 3', NOW()),
(4, 'Observação 4', NOW()),
(5, 'Observação 5', NOW());

INSERT INTO log_ferramentas (nome, imagem_url, conjunto, numero, patrimonio, modelo, descricao, disponivel, localizacao_id, data_atualizacao) VALUES
('Log Ferramenta 1', 'http://exemplo.com/log1.jpg', 'Conjunto A', '001', 'PATR001', 'Modelo 1', 'Descrição 1', TRUE, 1, NOW()),
('Log Ferramenta 2', 'http://exemplo.com/log2.jpg', 'Conjunto B', '002', 'PATR002', 'Modelo 2', 'Descrição 2', TRUE, 2, NOW()),
('Log Ferramenta 3', 'http://exemplo.com/log3.jpg', 'Conjunto C', '003', 'PATR003', 'Modelo 3', 'Descrição 3', FALSE, 3, NOW()),
('Log Ferramenta 4', 'http://exemplo.com/log4.jpg', 'Conjunto D', '004', 'PATR004', 'Modelo 4', 'Descrição 4', TRUE, 4, NOW()),
('Log Ferramenta 5', 'http://exemplo.com/log5.jpg', 'Conjunto E', '005', 'PATR005', 'Modelo 5', 'Descrição 5', TRUE, 5, NOW());

INSERT INTO login (nome, numero_nif_qrcode, senha, email) VALUES 
('Leanne Graham', '1234567', 'senhaSegura1', 'leanne@gmail.com'),
('Bret', '9876543', 'senhaSegura2', 'bret@gmail.com'),
('Edward', '12345678901234567890', 'senhaSegura3', 'edward@gmail.com');

