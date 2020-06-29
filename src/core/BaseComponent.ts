import {Component, Vue} from 'vue-property-decorator';
import {Observable, Subscription} from 'rxjs';

@Component
export default class Basecomponent extends Vue {
    private subscription: Subscription = new Subscription();

    protected subscribe<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void ): Subscription {
        return this.addSubscription(observable.subscribe(
            next,
            error,
            complete
        ));
    }

    protected destroyed() {
        this.subscription.unsubscribe();
    }

    private addSubscription(subscription: Subscription): Subscription {
        return this.subscription.add(subscription);
    }
}
