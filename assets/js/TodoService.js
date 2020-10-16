let db;

export default class TodoService {

    constructor() {
        this.initializeDB();
        this.getAll();
    }

    initializeDB() {
        db = new Dexie('carDB');

        db.version(1).stores({
            cars: '++id, name, type, priority'
        });
        
        db.on('populate', async () => {
            await db.cars.bulkPut([
                { name: 'Gol', type: 'Simples', priority: '1' },
                { name: 'Palio', type: 'Simples', priority: '2' },
                { name: 'Corsa', type: 'Completa', priority: '3' },
                { name: 'Celta', type: 'Completa', priority: '4' },
            ]);
        });
    }
    
    async getAll() {
        return await db.cars.toArray();
    }
}
