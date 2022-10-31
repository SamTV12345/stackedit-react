import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
    file: {
        value: {
            name: string,
            content: string,
            lastOpened: Date
        };
        key: string
        indexes: { 'by-name': string };
    }
}

 export const db = await openDB<MyDB>('my-db', 1, {
        upgrade(db) {
            const fileStore = db.createObjectStore('file')
            fileStore.createIndex('by-name', 'name');
        }
 })
