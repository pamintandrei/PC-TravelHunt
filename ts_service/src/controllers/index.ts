import mssql from 'mssql';
import { RequestHandler } from 'express';

import qrCode from 'qrcode';

import { getConnectionPool, getRequest } from '../mssql'


export const createBuilding: RequestHandler = async (req, res, next) => {
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
  qrCode.toDataURL('buildingUrl', { version: 10 }, function (err: any, url: any) {
    if (err) console.error(err);
    console.log(url);
    res.json(url);
  })
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
  const buldings = await getRequest().query('SELECT * FROM Buildings');
  const arr : any[] = [];
  const body = { resourceType: 'Bundle', entry : arr };
  body.entry = buldings.recordset.map((building) =>{
    return {
      resource: {
        "id": building.id_building,
        "building name": building.bld_name,
        "location": building.bld_location,
        "x_coordinate": building.x_coordinate,
        "y_coordinate": building.y_coordinate,
        "information":  building.bld_description,
        "image": building.bld_image,
        "tags": building.tags
    }
  }
  })
  res.status(200).send(body);
};