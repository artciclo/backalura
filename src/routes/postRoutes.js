import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o multer para lidar com o upload de arquivos (imagens)
import {
  listarPosts, // Função para listar todos os posts
  postarNovoPost, // Função para criar um novo post
  uploadImagem,
  atualizarNovoPost, // Função para lidar com o upload de imagens
} from "../controllers/postsController.js"; // Importa as funções de controle dos posts de outro arquivo
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configura o armazenamento para os arquivos enviados (imagens) usando o multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados (./uploads/)
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Usa o nome original do arquivo para o arquivo enviado
    cb(null, file.originalname);
  },
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de dados JSON nas requisições
  app.use(express.json());
  app.use(cors(corsOptions));

  // Define uma rota para listar todos os posts (GET /posts)
  app.get("/posts", listarPosts);

  // Define uma rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost);

  // Define uma rota para fazer upload de uma imagem (POST /upload)
  // O middleware 'upload.single("imagem")' trata o envio do arquivo, e a rota chama a função 'uploadImagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função 'routes' para ser utilizada em outros módulos
export default routes;
