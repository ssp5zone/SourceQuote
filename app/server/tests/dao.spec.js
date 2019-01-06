const Dao = require("../plugins/dao");
const  { expect } = require('chai');

describe("Database Tests", () => {
    let dao, mockData, insertPromise;

    before(() => {
        dao = new Dao();
        mockData = {test: "DB"};
    });


    it("should be able to intitialize DB", () => {
        expect(dao).to.not.be.null;
    });

    it("should be able to insert a document", () => {
        insertPromise = dao.add(mockData)
            .then((newDoc) => {
                expect(newDoc).to.exist;
                expect(newDoc.test).to.be.equals(mockData.test);
                return newDoc;
            })
            .catch((err) => {
                console.log("An error occured while insertion");
                reject();
                throw new Error(err);
            });
    });

    it("should be able to update a document", async () => {
        // Wait for the insertion test to finish
        let insertedData = await insertPromise;

        // Clone the object
        let updatedDoc = Object.assign({}, insertedData);

        // make a custom mod
        updatedDoc.test = "updatedDB";

        // Try updating a record and see what happens
        let recordsModified = await dao.update(updatedDoc);

        expect(recordsModified).to.be.greaterThan(0);
    });   
    

    it("should be able to fetch all inserted documents", async () => {
        // wait for insertion to complete
        await insertPromise;

        // get all the inserted docs
        let fetchedDocs = await dao.fetch();

        expect(fetchedDocs).to.exist;
        expect(fetchedDocs.length).to.be.greaterThan(0);

    });


    it("should be able to delete documents", async () => {
        // wait for insertion to complete
        let insertedDoc = await insertPromise;

        // Try deleting a record and see what happens
        let numOfRowsRemoved = await dao.remove(insertedDoc._id);

        expect(numOfRowsRemoved).to.be.greaterThan(0);

    });

});