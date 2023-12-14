create database Sites3MVC;
use Sites3MVC;

CREATE TABLE `tarefa` (
  `id_tarefa` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` tinytext NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'P',
  `usuario_id_usuario` int unsigned NOT NULL,
  PRIMARY KEY (`id_tarefa`),
  UNIQUE KEY `id_tarefa_UNIQUE` (`id_tarefa`),
  KEY `fk_tarefa_usuario_id_usuario_idx` (`usuario_id_usuario`),
  CONSTRAINT `fk_tarefa_usuario_id_usuario` FOREIGN KEY (`usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`)
);
drop table tarefa;

CREATE TABLE `usuario` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `imagem` varchar(60) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`)
);
drop table usuario;
insert into usuario(id_usuario, nome, email, senha, imagem) values(1,'deltrano','sim','e8d95a51f3af4a3b134bf6bb680a213a','imagem');
insert into usuario(id_usuario, nome, email, senha, imagem) values(2,'fulano','não','e8d95a51f3af4a3b134bf6bb680a213a','imagem');

drop table `tarefa`;

insert into tarefa(id_tarefa, title, description, status, usuario_id_usuario) values(1, 'Empinar pipa', 'Matar tempo', 'v',1);
insert into tarefa(id_tarefa, title, description, status,usuario_id_usuario) values(2, 'Tentar fazer', 'tentar', 'f',1);

SELECT * FROM usuario WHERE email ='sim' AND senha ='e8d95a51f3af4a3b134bf6bb680a213a';
SELECT * FROM usuario;

select * from tarefa;
