import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

import fetch from 'node-fetch'; 

import qrCode from 'qrcode';

import {getConnectionPool, getRequest} from '../mssql'

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

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;

  res.status(201).json({ message: 'Created the todo.'});
};

export const getTodos: RequestHandler = async (req, res, next) => {
  //req.query
  // const body = await getceva('');
  //request catre cladiri
  qrCode.toDataURL('SIUUUUUUUUUUUUUUUUUUUUUUUUU', { version: 10 }, function (err:any, url:any) {
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

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  res.json({ message: 'Updated!' });
};

export const deleteTodo: RequestHandler = (req, res, next) => {

  const todoId = req.params.id;

  res.json({ message: 'Todo deleted!' });
};

export const getBuilding: RequestHandler = async (req, res, next) => {
  const body = {Bundle: [{
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