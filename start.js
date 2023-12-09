const express = require('express'); 
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
 
const tarefaController = require('./controllers/tarefaController'); 
const usuarioController = require('./controllers/usuarioController');
const app = express(); 
const port = 4000; 

//Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//Define o template engine
app.use(expressLayouts);
app.set('layout', './layouts/default/index')
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 
 
app.use(session({secret:'i1n2f3o4'}));

app.use((req, res, next) => {
	if(!req.session.user){
		if(req.originalUrl == "/login" || req.originalUrl == "/autenticar"){
			app.set('layout', './layouts/default/login');
			res.locals.layoutVariables = {
				url : process.env.URL,
				img : "/img/",
				style : "/css/",
				title: 'Login'

			};
			next();			
		}else{
			res.redirect('/login');
		}	
	}else{
		app.set('layout', './layouts/default/index');
		res.locals.layoutVariables = {
			url : process.env.URL,
			img : "/img/",
			style : "/css/",
			title: 'Tarefas',
			user: req.session.user, 
		};

		if(req.session.msg){
			res.locals.layoutVariables.msg = req.session.msg;
			delete req.session.msg;
		}
		next();// Continua para a próxima etapa (rota ou middleware)
	}	
});

//ROTA
app.get('/', (req,res)=>{ 
	res.render('home');	
})
app.get('/tarefas', tarefaController.getTarefas);

app.get('/tarefas/:query', tarefaController.getTarefas)
app.post('/tarefa', tarefaController.salvar);

app.get('/tarefa/:id_tarefa', async  (req,res)=>{
	var tarefa = await tarefaController.getTarefa(req.params.id_tarefa);
	res.render('tarefa', tarefa);
});

app.get('/login', (req,res)=>{ 
	usuarioController.login(res);
});

app.get('/logout', (req,res)=>{ 
	usuarioController.logout(req, res);
});

app.post('/login', (req,res)=>{ 
	usuarioController.autenticar(req, res);
});

app.get('/usuario/perfil/:idUsuario', (req,res)=>{ 
	usuarioController.mostrarPerfil(req, res);
});

app.get('/usuario/editar/:idUsuario', (req,res)=>{ 
	usuarioController.editar(req, res);
});

app.get('/tarefa/delete/:idTarefa', tarefaController.deleteTarefa);

app.get('/tarefa/update/:id_tarefa', async  (req,res)=>{
	var tarefa = await tarefaController.getTarefa(req.params.id_tarefa);
	res.render('formEdit', tarefa);
});

app.post('/tarefa/update', tarefaController.updateTarefa);


app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`);
});
