import mssql from 'mssql';
import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

import fetch from 'node-fetch';

import qrCode from 'qrcode';

import { getConnectionPool, getRequest } from '../mssql'

//exemplu TO DO controllers

const TODOS: Todo[] = [];

//  async function getceva(queryString:String) :Promise<Response>{

// await POST bundle
// const url='http://localhost:3000/'
// const response = await fetch(`${url}${queryString ? '&' + queryString : ''}`, {
//     method: 'get',
//     headers: {
//         'accept': 'application/json',
//         'content-Type': 'application/json'
//     },
// });

// return await response.json();
//}

export const createBuilding: RequestHandler = async (req, res, next) => {
  //const text = (req.body as { text: string }).text;
  console.log(req.body)
  const create_building = await getRequest()
    .input('bld_name', mssql.VarChar, req.body.bld_name)
    .input('bld_location', mssql.VarChar, req.body.bld_location)
    .input('x_coordinate', mssql.Real, req.body.x_coordinate)
    .input('y_coordinate', mssql.Real, req.body.y_coordinate)
    .input('bld_description', mssql.VarChar, req.body.bld_description)
    .input('bld_image', mssql.VarChar, req.body.bld_image)
    .input('tags', mssql.VarChar, req.body.tags)
    .execute('usp_save_building');
  req.body.id = `${create_building.recordset[0].id_building}`;

  res.status(201).json({ message: 'Created the todo.' });
};

export const getTodos: RequestHandler = async (req, res, next) => {
  //req.query
  // const body = await getceva('');
  //request catre cladiri
  qrCode.toDataURL('SIUUUUUUUUUUUUUUUUUUUUUUUUU', { version: 10 }, function (err: any, url: any) {
    if (err) console.error(err);
    console.log(url);
    res.json(url);
  })
  //res.status(200).send(body);
};

export const getFromDataBase: RequestHandler = async (req, res, next) => {
  const response = await getRequest()
    .query('select * from teams');
  response.recordset[0];
  res.status(200).send(response.recordset);
};

export const updateBuilding: RequestHandler<{ id: string }> = async (req, res, next) => {
  const edit_building = getRequest();
  
  if(req.body.bld_name){
    edit_building.input('bld_name', req.body.bld_name);
  } 
  if (req.body.bld_location){
    edit_building.input('bld_location', req.body.bld_location);
  }
  if (req.body.x_coordinate){
    edit_building.input('x_coordinate', req.body.x_coordinate);
  }
  if (req.body.y_coordinate){
    edit_building.input('y_coordinate', req.body.y_coordinate);
  }
  if (req.body.bld_description){
    edit_building.input('bld_description', req.body.bld_description);
  }
  if (req.body.bld_image){
    edit_building.input('bld_image', req.body.bld_image);
  }
  if (req.body.tags){
    edit_building.input('tags', req.body.tags);
  }
  edit_building.input("id_building", req.body.id_building);
  const response = await edit_building.execute('usp_patch_building');
  
   res.json({ message: 'Updated!' });
  
};

export const deleteBuilding: RequestHandler = async(req, res, next) => {

  await getRequest()
  .input('id_building', req.params.id)
  .query('DELETE FROM Buildings WHERE id_building=@id_building');

  res.json({ message: 'Todo deleted!' });
};

export const getBuilding: RequestHandler = async (req, res, next) => {
  const body = {
    Bundle: [{
      "id": 1,
      "information": "Useless Informations ...",
      "location": "Manastur"
    },
    {
      "id": 2,
      "information": "Useless Informations2 ...",
      "location": "Baciu"
    }]
  }
  res.status(200).send(body);
};