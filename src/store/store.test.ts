import store from './store';

describe('AppStore', () => {
    test('should set the hat color', () => {

        const color = '#FFFFFF';
        store.setHatColor(color);

        expect(store.hatColor).toBe(color);
    });
});