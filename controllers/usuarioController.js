const Usuario = require('../models/usuarioModel'); 

let usuarios = [];

async function getUsuarios(req, res) { 
	usuarios= await Usuario.listarUsuarios();  	
	res.render('usuarios', { usuarios }); 
} 

async function login(res) { 
	res.render('login'); 
} 

async function autenticar(req,res) { 
	const resp = await Usuario.autenticar(req.body.email, req.body.senha);
	//console.log(resp)
	if (resp && resp.length > 0) {
		req.session.user = resp[0];
		res.redirect('/tarefas');
	} else {
			res.redirect('/login');
	}
} 

async function logout(req,res) {
	delete req.session.user;
	res.redirect('/login');
}

async function editar(req,res) {
	const resp = await Usuario.buscarUsuario(req.params.idUsuario);
	if (resp && resp.length > 0) {
		let usuario = resp[0];
		delete usuario.senha;
		res.render('usuario/formUsuario', { usuario });
	} else {
		msg = {
			class: "alert-danger",
			msg: "Perfil não encontrado!"
		}
		res.redirect('/usuario/perfil/'+req.params.idUsuario);
	}
}

async function mostrarPerfil(req,res) {
	const resp = await Usuario.buscarUsuario(req.params.idUsuario);
	if (resp && resp.length > 0) {
		let usuario = resp[0];
		delete usuario.senha;
		res.render('usuario/usuario', { usuario });
	} else {
		msg = {
			class: "alert-danger",
			msg: "Perfil não encontrado!"
		}
		res.redirect('/');
	}	
	
}





module.exports = { 
	getUsuarios, 
	login, 
	autenticar, 
	logout, 
	mostrarPerfil, 
	editar 
};
