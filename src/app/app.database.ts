/*import {
  Injectable
} from '@angular/core';
declare let require: Function;

let PouchDB = require('pouchdb');

@Injectable()
export class Database {
  private _db;
  private _profiles;

  initDB() {
    this._db = new PouchDB('profile', {
      adapter: 'websql'
    });
  }

  add(profile) {
    return this._db.post(profile);
  }

  delete(profile) {
    return this._db.remove(profile);
  }

  getAll() {

    if (!this._profiles) {
      return this._db.allDocs({
          include_docs: true
        })
        .then(docs => {

          // Each row has a .doc object and we just want to send an 
          // array of profile objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._profiles = docs.rows.map(row => {
            return row.doc;
          });
          return this._profiles;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._profiles);
    }
  }
}*/
