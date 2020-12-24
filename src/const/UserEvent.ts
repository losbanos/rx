export const SUPPORT_TOUCH: boolean = 'ontouchstart' in window;

export const USER_EVENT = {
    START: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
    MOVE: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
    END: SUPPORT_TOUCH ? 'touchend' : 'mouseup'
};

export type UserEventType<T> = T extends TouchEvent ? TouchEvent : T extends MouseEvent ? MouseEvent : UIEvent;
