const Tarefa = require('../models/tarefaModel');
const session = require('express-session');
const { query } = require('express');
let tarefas = [];
async function getTarefas(req, res) {
	let id_usuario = req.session.user.id_usuario;
	tarefas= await Tarefa.listarTarefas(id_usuario);
	res.render('tarefas', { tarefas });
}

async function getTarefa(req, res) { 
	let tarefa= await Tarefa.buscarTarefa(req);  	
	return tarefa[0]; 
} 

async function salvar(req, res) {
  const { titulo, descricao, id_usuario } = req.body;
  const tarefa = new Tarefa(null, titulo, descricao, id_usuario);
  await tarefa.salvar();
  let msg = null;
  msg = {
    class: "alert-success",
    msg: "Tarefa adicionada com extremo sucesso!",
  };
  req.session.msg = msg;

  res.redirect("/tarefas");
} 


async function deleteTarefa(req, res){
	let msg = null;
	if(await Tarefa.deleteTarefa(req.params.idTarefa)){
		msg = {
			class: "alert-success",
			msg: "Tarefa excluida com extremo sucesso!"
		}
		req.session.msg=msg;
		res.redirect("/tarefas");
	}else{
		msg = {
			class: "alert-danger",
			msg: "A exclusão falhou miseravelmente!"
		}
		req.session.msg=msg
		res.redirect("/tarefas");
	}
}

async function updateTarefa(req, res){
	const {id_tarefa, titulo, descricao, id_usuario } = req.body; 
	const tarefa = new Tarefa(id_tarefa, titulo, descricao, id_usuario); 
	await tarefa.update();
	let msg = null;
  	msg = {
    class: "alert-success",
    msg: "Tarefa atualizada com extremo sucesso!",
  };
  req.session.msg = msg;
	res.redirect('/tarefas'); 
}

module.exports = { getTarefas, getTarefa, salvar, deleteTarefa, updateTarefa };
