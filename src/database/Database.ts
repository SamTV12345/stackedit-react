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

interface PushSource extends DBSchema{
    account:{
        value:{
            username:string,
            password?:string,
            type: "github"| "gitlab",
            id: string
        },
        key:string
        indexes: {'by-username':string}
    }
}

 export const db = await openDB<MyDB>('files', 1, {
        upgrade(db) {
            const fileStore = db.createObjectStore('file', {
                keyPath: 'id'
            })
            fileStore.createIndex('by-name', 'name');
        }
 })

export const pushStore = await openDB<PushSource>('account', 1, {
    upgrade(db) {
        const fileStore = db.createObjectStore('account', {
            keyPath: 'id'
        })
        fileStore.createIndex('by-username', 'username');
    }
})
