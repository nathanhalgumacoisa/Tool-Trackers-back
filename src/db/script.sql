CREATE DATABASE tooltrackers;

\c tooltrackers


CREATE TABLE usuarios(
 user_id SERIAL PRIMARY KEY,
 nome VARCHAR(50) NOT NULL,
 numero_nif CHAR(7),
 numero_qrcode CHAR(20),
 tipo_usuario ENUM('aluno','administracao','instrutor','manutencao')
);



CREATE TABLE organizador(
 organizador_id SERIAL PRIMARY KEY,
 nome_organizador VARCHAR(30) NOT NULL,
 nome_suborganizador VARCHAR(30),
 numero_organizador INTEGER,
);


CREATE TABLE sub_organizador(
 sub_organizador_id SERIAL PRIMARY KEY,
 organizador_id FOREIGN KEY,
 nome_suborganizador VARCHAR(20),
 numero_suborganizador INTEGER,
 FOREIGN KEY (organizador_id) REFERENCES organizador(id)
);


CREATE TABLE imagens(
 imagem_id SERIAL PRIMARY KEY,
 url_imagem VARCHAR(50) NOT NULL,
 descricao VARCHAR(50),
 sub_organizador_id FOREIGN KEY
 (sub_organizador_id) REFERENCES sub_organizador(sub_organizador_id )
);



CREATE TABLE localizacoes(
 localizacao_id SERIAL PRIMARY KEY,
 ambiente VARCHAR(20),
 organizador_id  FOREIGN KEY (localizacao_id) REFERENCES organizador(organizador_id)
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
 localizacao_id FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id) 
);

CREATE TABLE emprestimos(
 emprestimo_id SERIAL PRIMARY KEY,
 ferramenta_id FOREIGN KEY (ferramenta_id) REFERENCES ferramentas(ferramenta_id),
 usuario_id FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id),
 data_emprestimo DATETIME,
 data_retorno DATE,
 local_origem_id FOREIGN KEY(localizacao_id) REFERENCES localizacoes(localizacao_id),
 local_destino_id FOREIGN KEY(localizacao_id) REFERENCES localizacoes(localizacao_id),
);


CREATE TABLE conferencias(
 conferencia_id SERIAL PRIMARY KEY,
 usuario_id FOREIGN KEY(usuario_id) REFERENCES usuarios(usuario_id),
 localizacao_id FOREIGN KEY(localizacao_id) REFERENCES localizacoes(localizacao_id),
 data_conferencia DATETIME,
);



CREATE TABLE observacoes(
 observacao_id SERIAL PRIMARY KEY,
 conferencia_id FOREIGN KEY(conferencia_id) REFERENCES conferencias(conferencia_id),
 descricao VARCHAR(100),
 data_observacao DATETIME,
);


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
 localizacao_id FOREIGN KEY (localizacao_id) REFERENCES localizacoes(localizacao_id)
 data_atualizacao DATE
);
