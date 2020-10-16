import TodoService from './TodoService.js';

const DONE = 'done';

export default class HtmlService {

    constructor(todoService) {
        this.todoService = todoService;
        this.bindFormEvent();
        this.listCars();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addCar(form.carro.value, form.tipo.value);
            form.reset();
        });
    }

    async addCar(name, type) {
        const car = { name: name, type: type, done: false };
        const carId = await this.todoService.save(car);
        car.id = carId;
        this.addToHtmlList(car);
    }

    async listCars() {
        const cars = await this.todoService.getAll();
        cars.forEach(car => this.addToHtmlList(car));
    }

    async saveCar(carId, isDone) {
        const car = await this.todoService.get(carId);
        car.done = isDone;
        this.todoService.save(car);
    }

    async deleteCar(li) {
        const carId = +li.getAttribute('data-item-id');
        await this.todoService.delete(carId);
        li.remove();
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
        const button = document.createElement('button');

        li.setAttribute('data-item-id', car.id);
        li.addEventListener('click', () => this.toggleCar(li));

        span.textContent = car.name + ' | ' + car.type;

        button.textContent = 'x';
        button.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteCar(li);
        });

        if(car.done) {
            li.classList.add(DONE);
        }

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
    }
}