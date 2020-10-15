let db;

export default class TodoService {

    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie('todoDB');

        db.version(1).stores({
            cars: `++id,name,value,priority`
          });
          
        db.on('populate', async () => {
            await db.cars.bulkPut([
                { name: 'Gol', value: 1000, priority: 1 },
                { name: 'Palio', value: 2000, priority: 2 },
                { name: 'Corsa', value: 3000, priority: 3 },
                { name: 'Celta', value: 4000, priority: 4 },
            ]);
        });
    }
    
    getAll() {
        return db.tasks.toArray();
    }

    get(id) {
        return db.tasks.get(id);
    }

    save(task) {
        return db.tasks.put(task);
    }

    delete(id) {
        return db.tasks.delete(id);
    }
}
