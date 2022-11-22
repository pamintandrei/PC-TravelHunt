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
        let testObject = {bld_name: "BCUCN",
            bld_location: "Str. Clinicilor nr. 2",
            x_coordinate: 1,
            y_coordinate: 2,
            bld_description: "Biblioteca Centrală Universitară „Lucian Blaga",
            bld_image: "todo",
            tags: "Cluj-Napoca|Romania|Kálmán Giergl|1906|Art Nouveau"
        }

        const postResponse = await postFetchBuildings(testObject)
        const jsonPostResponse = await postResponse.json();

        assert.strictEqual(jsonPostResponse.message, "Created the todo.")
    
        const getResponsr = getFetchBuildings()
        const jsonGetResponsr = await (await getResponsr).json();

        assert.strictEqual(jsonGetResponsr.entry.length, 1);
        assert.strictEqual(jsonGetResponsr.entry[0].resource.id, 1);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['building name'], testObject.bld_name);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['location'], testObject.bld_location);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['x_coordinate'], testObject.x_coordinate);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['y_coordinate'], testObject.y_coordinate);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['information'], testObject.bld_description);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['image'], testObject.bld_image);
        assert.strictEqual(jsonGetResponsr.entry[0].resource['tags'], testObject.tags);

    })

})

after(async function () {
    process.exit(0)
});