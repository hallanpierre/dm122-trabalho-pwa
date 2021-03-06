const DONE = 'done';

export default class HtmlService {
    selectedId = '';
    constructor(todoService) {
        this.todoService = todoService;
        this.bindFormEvent();
        this.listCars();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.selectedId === ''
                ? this.addCar(form.carro.value, form.tipos.value)
                : this.saveCarByType(this.selectedId, form.tipos.value);
            form.reset();
            this.selectedId = '';
        });
        form.addEventListener('reset', event => {
            const carName = document.getElementsByName('carro')[0];
            carName.disabled = false;
            const carType = document.getElementsByName('tipos')[0];
            carType.disabled = false;
            this.selectedId = '';
        });
    }

    async addCar(name, type) {
        const car = { name: name, type: type, done: false };
        const carId = await this.todoService.save(car);
        car.id = carId;
        this.addToHtmlList(car);
    }

    async listCars() {
        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        const cars = await this.todoService.getAll();
        cars.forEach(car => this.addToHtmlList(car));
    }

    async saveCar(carId, isDone) {
        const car = await this.todoService.get(carId);
        car.done = isDone;
        this.todoService.save(car);
    }

    async saveCarByType(carId, tipo) {
        const car = await this.todoService.get(carId);
        car.type = tipo;
        this.todoService.save(car);
        this.listCars();
    }

    async deleteCar(li) {
        const carId = +li.getAttribute('data-item-id');
        await this.todoService.delete(carId);
        li.remove();
    }

    async getCar(li) {
        const carId = +li.getAttribute('data-item-id');
        const car = await this.todoService.get(carId);
        this.selectedId = carId;
        
        const carName = document.getElementsByName('carro')[0];
        carName.value = car.name;
        carName.disabled = true;

        const types = document.getElementsByName('tipos')[0];
        types.disabled = car.done;
        for (let index = 0; index < types.options.length; index++) {
            const option = types[index];
            if (option.value === car.type) {
                option.selected = true;
            }
        };
        
    }

    toggleCar(li) {
        const carId = +li.getAttribute('data-item-id');
        li.classList.toggle(DONE);
        const isDone = li.classList.contains(DONE);
        this.saveCar(carId, isDone);
    }

    addToHtmlList(car) {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const span = document.createElement('span');

        li.setAttribute('data-item-id', car.id);
        li.addEventListener('click', () => this.getCar(li));

        span.textContent = car.name + ' | ' + car.type;

        const toogleButton = document.createElement('button');
        toogleButton.textContent = 'D';
        toogleButton.addEventListener('click', event => {
            event.stopPropagation();
            this.toggleCar(li)
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteCar(li);
        });

        if(car.done) {
            li.classList.add(DONE);
        }

        li.appendChild(span);
        li.appendChild(toogleButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    }
}