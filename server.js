import express from "express"; // Importa o framework Express para criar a aplicação web
import routes from "./src/routes/postRoutes.js";

// Array de posts de exemplo (será utilizado apenas para demonstração)
const posts = [
  // ... (dados dos posts)
  {
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/neo/300/200",
  },
  {
    titulo: "Gatinho fofo!",
    imagem: "https://placekitten.com/200/300",
    curtidas: 150,
    comentarios: [
      { autor: "Usuário 1", texto: "Que gracinha!" },
      { autor: "Usuário 2", texto: "Muito lindo!" },
    ],
  },
  {
    descricao: "Paisagem deslumbrante!",
    imagem: "https://picsum.photos/300/200",
    localizacao: "Alpes Suíços",
  },
  {
    titulo: "Receita de bolo de chocolate",
    imagem: "https://via.placeholder.com/300x200/87CEFA/000000?text=Bolo",
    ingredientes: ["Farinha", "Açúcar", "Ovos", "Chocolate"],
    tempoPreparo: "30 minutos",
  },
  {
    titulo: "Dicas de viagem para o Japão",
    imagem: "https://unsplash.it/300/200/?random",
    tags: ["Japão", "Viagem", "Cultura", "Comida"],
    autor: "João da Silva",
    dataPublicacao: "2024-03-08",
  },
  {
    imagem: "https://source.unsplash.com/random/300x200",
    legenda: "Uma foto incrível tirada durante a minha viagem!",
    usuario: "Maria",
    data: "2024-03-15",
  },
];
for (let i = 0; i < posts.length; i++) {
  posts[i].id = i + 1;
}

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

// Função para buscar um post por ID (no array local, não no banco de dados)
function buscarPostPorID(id) {
  // Busca o índice do post com o ID correspondente no array local
  return posts.findIndex((post) => post.id === Number(id));
}

// Rota para buscar um post por ID
app.get("/posts/:id", (req, res) => {
  // Obtém o ID do post da URL
  const id = req.params.id;
  // Busca o índice do post
  const index = buscarPostPorID(id);
  // Envia o post encontrado como resposta JSON
  res.status(200).json(posts[index]);
});
