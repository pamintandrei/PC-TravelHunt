import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { init, getConnectionPool } from '../../src/mssql/index';
import { loadAppConfig } from '../utils/utils';
import * as assert from "assert";
import fetch from 'node-fetch';
const config = loadAppConfig("test_config.json");
import routes from '../routes/todos';
const url = "http://localhost:3000/Building/"

async function postFetchBuildings(building: object){
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(building),
        headers: {
          'accept': 'application/json',
          'content-Type': 'application/json'
        },
      });
      if(!response.ok){
        throw new Error(' SERVER Error');
      }
    return response
}

async function getFetchBuildings(){
    const response = await fetch(url, {
        method: 'get',
        headers: {
          'accept': 'application/json',
          'content-Type': 'application/json'
        },
    });
    if(!response.ok){
        throw new Error(' SERVER Error');
    }
    return response
}

async function deleteFetchBuildings(id: number){ 
    const response = await fetch(url+`${id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'content-Type': 'application/json'
        },
    });
    if(!response.ok){
        throw new Error(' SERVER Error');
    }
    return response
}

before(async function () {
    const app = express();
    const APP_PORT = 3000;
    app.use(json());
    app.use('/', routes);
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({ message: err.message });
    });

    async function start() {
        await init(config.database_config);
        app.listen(APP_PORT, () => {
        console.log(`Server started on port ${APP_PORT}`);
        })
    };

    start()

    await init(config.database_config);
    await getConnectionPool().query('DELETE FROM Buildings');
    await getConnectionPool().query("DBCC CHECKIDENT ('Buildings', RESEED, 0)");
});

describe("Controllers Test", () => {

    it("test if the data base is initialy empty", async function(){
        const getResponsr = getFetchBuildings()
        const jsonGetResponsr = await (await getResponsr).json();
        assert.strictEqual(jsonGetResponsr.entry.length, 0);
    })

    it("test if one building is added properly", async function (){
        const testObject = {bld_name: "building1",
            bld_location: "location1",
            x_coordinate: 11,
            y_coordinate: 22,
            bld_description: "description1",
            bld_image: "image1",
            tags: "tags1"
        }

        const postResponse = await postFetchBuildings(testObject)
        const jsonPostResponse = await postResponse.json();

        assert.strictEqual(jsonPostResponse.message, "Created the todo.")
    
        const getResponse = getFetchBuildings()
        const jsonGetResponse = await (await getResponse).json();

        assert.strictEqual(jsonGetResponse.entry.length, 1);
        assert.strictEqual(jsonGetResponse.entry[0].resource.id, 1);
        assert.strictEqual(jsonGetResponse.entry[0].resource['building name'], testObject.bld_name);
        assert.strictEqual(jsonGetResponse.entry[0].resource['location'], testObject.bld_location);
        assert.strictEqual(jsonGetResponse.entry[0].resource['x_coordinate'], testObject.x_coordinate);
        assert.strictEqual(jsonGetResponse.entry[0].resource['y_coordinate'], testObject.y_coordinate);
        assert.strictEqual(jsonGetResponse.entry[0].resource['information'], testObject.bld_description);
        assert.strictEqual(jsonGetResponse.entry[0].resource['image'], testObject.bld_image);
        assert.strictEqual(jsonGetResponse.entry[0].resource['tags'], testObject.tags);

    })

    it("test if more buildings are added properly", async function(){
        const alreadyInDataBaseBuilding = {bld_name: "building1",bld_location: "location1",x_coordinate: 11,y_coordinate: 22,bld_description: "description1",bld_image: "image1",tags: "tags1"}
        const testObject2 = {bld_name: "building2",bld_location: "location2",x_coordinate: 33,y_coordinate: 44,bld_description: "description2",bld_image: "image2",tags: "tags2"}
        const testObject3 = {bld_name: "building3",bld_location: "location3",x_coordinate: 55,y_coordinate: 66,bld_description: "description3",bld_image: "image3",tags: "tags3"}
        const testObject4 = {bld_name: "building4",bld_location: "location4",x_coordinate: 77,y_coordinate: 88,bld_description: "description4",bld_image: "image4",tags: "tags4"}
        const postResponse2 = await postFetchBuildings(testObject2)
        const jsonPostResponse2 = await postResponse2.json();
        assert.strictEqual(jsonPostResponse2.message, "Created the todo.")
        const postResponse3 = await postFetchBuildings(testObject3)
        const jsonPostResponse3 = await postResponse3.json();
        assert.strictEqual(jsonPostResponse3.message, "Created the todo.")
        const postResponse4 = await postFetchBuildings(testObject4)
        const jsonPostResponse4 = await postResponse4.json();
        assert.strictEqual(jsonPostResponse4.message, "Created the todo.")
        const getResponse = getFetchBuildings()
        const jsonGetResponse = await (await getResponse).json();
        assert.strictEqual(jsonGetResponse.entry.length, 4);
        assert.strictEqual(jsonGetResponse.entry[0].resource.id, 1);
        assert.strictEqual(jsonGetResponse.entry[0].resource['building name'], alreadyInDataBaseBuilding.bld_name);
        assert.strictEqual(jsonGetResponse.entry[0].resource['location'], alreadyInDataBaseBuilding.bld_location);
        assert.strictEqual(jsonGetResponse.entry[0].resource['x_coordinate'], alreadyInDataBaseBuilding.x_coordinate);
        assert.strictEqual(jsonGetResponse.entry[0].resource['y_coordinate'], alreadyInDataBaseBuilding.y_coordinate);
        assert.strictEqual(jsonGetResponse.entry[0].resource['information'], alreadyInDataBaseBuilding.bld_description);
        assert.strictEqual(jsonGetResponse.entry[0].resource['image'], alreadyInDataBaseBuilding.bld_image);
        assert.strictEqual(jsonGetResponse.entry[0].resource['tags'], alreadyInDataBaseBuilding.tags);

        assert.strictEqual(jsonGetResponse.entry[1].resource.id, 2);
        assert.strictEqual(jsonGetResponse.entry[1].resource['building name'], testObject2.bld_name);
        assert.strictEqual(jsonGetResponse.entry[1].resource['location'], testObject2.bld_location);
        assert.strictEqual(jsonGetResponse.entry[1].resource['x_coordinate'], testObject2.x_coordinate);
        assert.strictEqual(jsonGetResponse.entry[1].resource['y_coordinate'], testObject2.y_coordinate);
        assert.strictEqual(jsonGetResponse.entry[1].resource['information'], testObject2.bld_description);
        assert.strictEqual(jsonGetResponse.entry[1].resource['image'], testObject2.bld_image);
        assert.strictEqual(jsonGetResponse.entry[1].resource['tags'], testObject2.tags);

        assert.strictEqual(jsonGetResponse.entry[2].resource.id, 3);
        assert.strictEqual(jsonGetResponse.entry[2].resource['building name'], testObject3.bld_name);
        assert.strictEqual(jsonGetResponse.entry[2].resource['location'], testObject3.bld_location);
        assert.strictEqual(jsonGetResponse.entry[2].resource['x_coordinate'], testObject3.x_coordinate);
        assert.strictEqual(jsonGetResponse.entry[2].resource['y_coordinate'], testObject3.y_coordinate);
        assert.strictEqual(jsonGetResponse.entry[2].resource['information'], testObject3.bld_description);
        assert.strictEqual(jsonGetResponse.entry[2].resource['image'], testObject3.bld_image);
        assert.strictEqual(jsonGetResponse.entry[2].resource['tags'], testObject3.tags);

        assert.strictEqual(jsonGetResponse.entry[3].resource.id, 4);
        assert.strictEqual(jsonGetResponse.entry[3].resource['building name'], testObject4.bld_name);
        assert.strictEqual(jsonGetResponse.entry[3].resource['location'], testObject4.bld_location);
        assert.strictEqual(jsonGetResponse.entry[3].resource['x_coordinate'], testObject4.x_coordinate);
        assert.strictEqual(jsonGetResponse.entry[3].resource['y_coordinate'], testObject4.y_coordinate);
        assert.strictEqual(jsonGetResponse.entry[3].resource['information'], testObject4.bld_description);
        assert.strictEqual(jsonGetResponse.entry[3].resource['image'], testObject4.bld_image);
        assert.strictEqual(jsonGetResponse.entry[3].resource['tags'], testObject4.tags);

        assert.notStrictEqual(jsonGetResponse.entry[0].resource['building name'], jsonGetResponse.entry[1].resource['building name']);
        assert.notStrictEqual(jsonGetResponse.entry[0].resource['building name'], jsonGetResponse.entry[2].resource['building name']);
        assert.notStrictEqual(jsonGetResponse.entry[0].resource['building name'], jsonGetResponse.entry[3].resource['building name']);
        assert.notStrictEqual(jsonGetResponse.entry[1].resource['building name'], jsonGetResponse.entry[2].resource['building name']);
        assert.notStrictEqual(jsonGetResponse.entry[1].resource['building name'], jsonGetResponse.entry[3].resource['building name']);
        assert.notStrictEqual(jsonGetResponse.entry[2].resource['building name'], jsonGetResponse.entry[3].resource['building name']);
    })

    it("test if delete works", async function(){
        const testObject1 = {bld_name: "building1",bld_location: "location1",x_coordinate: 11,y_coordinate: 22,bld_description: "description1",bld_image: "image1",tags: "tags1"}
        const testObject2 = {bld_name: "building2",bld_location: "location2",x_coordinate: 33,y_coordinate: 44,bld_description: "description2",bld_image: "image2",tags: "tags2"}
        const testObject3 = {bld_name: "building3",bld_location: "location3",x_coordinate: 55,y_coordinate: 66,bld_description: "description3",bld_image: "image3",tags: "tags3"}
        const testObject4 = {bld_name: "building4",bld_location: "location4",x_coordinate: 77,y_coordinate: 88,bld_description: "description4",bld_image: "image4",tags: "tags4"}
        const deleteResponse1 = await deleteFetchBuildings(1);
        const jsonDeleteResponse1 = await deleteResponse1.json();
        assert.strictEqual(jsonDeleteResponse1.message, "Todo deleted!")
        const getResponse1 = getFetchBuildings()
        const jsonGetResponse1 = await (await getResponse1).json();
        assert.strictEqual(jsonGetResponse1.entry.length, 3);
        jsonGetResponse1.entry.forEach((element:any) => {
            assert.notStrictEqual(element.resource['building name'], testObject1.bld_name);
        });

        const deleteResponse2 = await deleteFetchBuildings(2);
        const jsonDeleteResponse2 = await deleteResponse2.json();
        assert.strictEqual(jsonDeleteResponse2.message, "Todo deleted!")
        const getResponse2 = getFetchBuildings()
        const jsonGetResponse2 = await (await getResponse2).json();
        assert.strictEqual(jsonGetResponse2.entry.length, 2);
        jsonGetResponse2.entry.forEach((element:any) => {
            assert.notStrictEqual(element.resource['building name'], testObject1.bld_name);
            assert.notStrictEqual(element.resource['building name'], testObject2.bld_name);
        });

        await deleteFetchBuildings(3);
        const getResponse3 = getFetchBuildings()
        const jsonGetResponse3 = await (await getResponse3).json();
        assert.strictEqual(jsonGetResponse3.entry.length, 1);

        await deleteFetchBuildings(4);
        const getResponse4 = getFetchBuildings()
        const jsonGetResponse4 = await (await getResponse4).json();
        assert.strictEqual(jsonGetResponse4.entry.length, 0);

        
    })

})

after(async function () {
    process.exit(0)
});