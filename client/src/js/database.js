import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  try {
    console.log("update the DB");
    const jateDb = await openDB("jate", 1);
    const text = jateDb.transaction("jate", "readwrite");
    const store = text.objectstore("jate");
    const request = store.put({ id: id, jate: content });
    const result = await request;
    console.log("Data saved", result);
  } catch (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("get all from DB");
    const jateDb = await openDB("jate", 1);
    const text = jateDb.transaction("jate", "readonly");
    const store = text.objectstore("jate");
    const request = store.getall();
    const result = await request;
    console.log("result.value", result);
  } catch (err) {
    console.error("getDb not implemented");
  }
};

initdb();
