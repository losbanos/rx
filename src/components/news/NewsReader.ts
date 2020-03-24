import {IObserver} from '@components/news/IObserver';

export class NewsReader implements IObserver {
    public update(news: any) {
        console.log(`뉴스를 읽자 - ${news}`);
    }
}
