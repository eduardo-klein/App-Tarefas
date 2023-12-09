class Usuario { 
	constructor(id, title, description) { 
		this.id = id; 
		this.title = title; 
		this.description = description; 
	} 
	static async autenticar(email, senha){
		const md5 = require('md5');
		const Database= require('./Database');
		let sql=`SELECT * FROM usuario WHERE email ='${email}' AND senha ='${md5(senha)}'`;
		//console.log(sql);
		return await Database.query(sql);
		
	}

	static async listarUsuarios(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM usuario");
		
	}

	static async buscarUsuario(idUsuario) {
		const Database= require('./Database');
		return await Database.query(`SELECT * FROM usuario WHERE id_usuario=${idUsuario}`);
		
	}

	async salvar(){
		const Database= require('./Database');
		let resp = await Database.query(`INSERT INTO usuario () VALUES ()`);
		
		this.id=resp.insertId;
	}

} 

module.exports = Usuario;
	