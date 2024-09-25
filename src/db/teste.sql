-- Inserir um usuário
INSERT INTO usuarios (nome, numero_nif, numero_qrcode, tipo_usuario) 
VALUES ('João Silva', '1234567', 'QRCODE12345', 'aluno');

-- Atualizar um usuário
UPDATE usuarios 
SET nome = 'Maria Souza', numero_nif = '7654321'
WHERE user_id = 1;

-- Deletar um usuário
DELETE FROM usuarios 
WHERE user_id = 1;
