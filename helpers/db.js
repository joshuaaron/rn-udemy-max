import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('places.db');

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                }, // success function
                (query, err) => {
                    reject(err);
                } // error function
            );
        });
    });
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
                [title, imageUri, address, lat, lng],
                (query, result) => {
                    resolve(result);
                },
                (query, err) => {
                    reject(err);
                }
            );
        });
    });
};

export const fetchPlaces = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            // * gets all columns/fields in this database
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (query, result) => {
                    resolve(result);
                },
                (query, err) => {
                    reject(err);
                }
            );
        });
    });
};

export const deletePlaceById = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM places WHERE id = ?',
                [id],
                (query, result) => {
                    resolve(result);
                },
                (query, err) => {
                    reject(err);
                }
            );
        });
    });
};
