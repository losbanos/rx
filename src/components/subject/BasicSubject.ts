import {IObserver} from '@components/news/IObserver';

export class BasicSubject {
    private observers: Array<any>;

    constructor() {
        this.observers = [];
    }

    public add(observer: IObserver) {
        this.observers.push(observer);
    }

    public remove(observer: IObserver) {
        const idx: number = this.observers.indexOf(observer);
        if (idx !== -1) {
            this.observers.splice(idx, 1);
        }
    }

    public notify(status: any) {
        this.observers.forEach((observer: IObserver) => {
            observer.update(status);
        });
    }
}
