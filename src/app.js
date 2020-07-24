const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
 const {title } = req.query
 const results = title 
 ? repositories.filter(project => project.title.includes(title))
 :repositories
 return res.json(results)
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body
  const repositorie = {id: uuid(), title, url, techs, like:0}
  repositories.push(repositorie)
  return res.json(repositorie)
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params
  const { title, url, techs,like } = req.body
  const projectIndex = repositories.findIndex(repositories => repositories.id == id)
if (projectIndex < 0){
  return res.status(400).json({ error: "Project not found"})
}
  const repositorie = {
    id,
    title,
    url,
    techs,
    like
  }
  repositories[projectIndex] = repositorie
  return res.json(repositorie)
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params
  const projectIndex = repositories.findIndex(repositories => repositories.id == id)
  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project not found" });
  }
  repositories.splice(projectIndex, 1)
  return res.status(204).send();
});
app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndex < 0 ){
    return response.status(400).json({error:'should not be able to update repository likes manually'});
  }
  else{
    var title = (repositories[repositoryIndex].title);
    var url = (repositories[repositoryIndex].url);
    var techs = (repositories[repositoryIndex].techs);
    var likes = (repositories[repositoryIndex].likes);

    like = parseInt(likes);

    if (isNaN(likes) === true || like === 'undefined') {
      likes = 0;
      likes = likes + 1;
    } 
    else {
      likes = likes + 1;
    }

  }
  
  const repository = {id, title, url, techs, likes};
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});
  
module.exports = app;
