let db;

export default class TodoService {
    
    constructor() {
        this.initializeDB();
        this.getAll();
    }

    initializeDB() {
        db = new Dexie('carDB');

        db.version(1).stores({
            cars: '++id, name, type, done'
        });
        
        db.on('populate', async () => {
            await db.cars.bulkPut([
                { name: 'Gol', type: 'Simples', done: true },
                { name: 'Palio', type: 'Simples', done: false },
                { name: 'Corsa', type: 'Completa', done: true },
                { name: 'Celta', type: 'Completa', done: false },
            ]);
        });
    }
    
    getAll() {
        return db.cars.toArray();
    }

    get(id) {
        return db.cars.get(id);
    }

    save(task) {
        return db.cars.put(task);
    }

    delete(id) {
        return db.cars.delete(id);
    }
}
