class Tarefa { 
	constructor(id_tarefa, title, description, id_usuario) { 
		this.id_tarefa = id_tarefa; 
		this.title = title; 
		this.description = description;
		this.id_usuario = id_usuario; 
	} 

	static async listarTarefas(id_usuario){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa WHERE usuario_id_usuario="+id_usuario);
	}
	
	static async buscarTarefa(id_tarefa){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM tarefa WHERE id_tarefa="+id_tarefa);
	}

	static async deleteTarefa(id_tarefa){
		const Database= require('./Database');
		const resp= await Database.query("DELETE FROM tarefa WHERE id_tarefa="+id_tarefa);
		if(resp){
			if(resp.affectedRows >0)
				return true;
			else
				return false;
		}else{
			return false;
		}		
	}


	async update(){
		const Database= require('./Database');
		await Database.query( `UPDATE tarefa SET title = '${this.title}', description = '${this.description}', usuario_id_usuario = ${this.id_usuario} WHERE id_tarefa = '${this.id_tarefa}'`);
	}

	async salvar(){
		const Database= require('./Database');
		let resp = await Database.query(`INSERT INTO tarefa (title,description, usuario_id_usuario) 
			VALUES ('${this.title}','${this.description}',${this.id_usuario})`);
		this.id_tarefa=resp.insertId;
	}
} 

module.exports = Tarefa;
	