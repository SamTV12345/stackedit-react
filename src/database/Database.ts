import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
    file: {
        value: {
            name: string,
            content: string,
            lastOpened: string,
            id: string
        };
        key: string
        indexes: { 'by-name': string };
    }
}

 export const db = await openDB<MyDB>('files', 1, {
        upgrade(db) {
            const fileStore = db.createObjectStore('file', {
                keyPath:'id'
            })
            fileStore.createIndex('by-name', 'name');
        }
 })
