//import posts from "./tuits.js";
//let tuits = posts;

//const createTuit = (req, res) => {}
//const findTuits  = (req, res) => {}
//const updateTuit = (req, res) => {}
//const deleteTuit = (req, res) => {}

import * as tuitsDao from './tuits-dao.js'



const findTuits = async (req, res) =>{
  //console.log("IN the find tuits")
  const tuits = await tuitsDao.findTuits()
  //console.log(tuits)
  res.json(tuits);
}

const createTuit = async (req, res) => {
    const newTuit = req.body;
    //newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    //tuits.push(newTuit);
    const insertedTuit = await tuitsDao.createTuit(newTuit);

    res.json(insertedTuit);
}
  
const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
    res.sendStatus(200);
  }
  
const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
    res.sendStatus(200);
  }
  
export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}

