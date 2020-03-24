import {IObserver} from '@components/news/IObserver';

export class NewsPaper {

    private observers: Array<IObserver>;

    constructor() {
        this.observers = [];
    }

    public set news(news: any) {
        this.notify(news);
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

    private notify(news: any) {
        this.observers.forEach((o: IObserver) => {
            o.update(news);
        });
    }
}
