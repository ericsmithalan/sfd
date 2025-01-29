export class AppCache<K, T> {
    private readonly collection: Map<K, T>;

    constructor() {
        this.collection = new Map();
    }

    get(key: K): T | null {
        return this.collection.get(key) || null;
    }

    set(key: K, value: T) {
        const item = this.get(key);
        if (!item) {
            this.collection.set(key, value);
        }
    }

    clear() {
        this.collection.clear();
    }

    dispose() {
        // Array.from(this.collection.entries()).forEach(([key, item]) => {
        //     if (item instanceof Material) {
        //         disposeMaterial(item);
        //     }
        //     if (item instanceof Texture) {
        //         item.dispose();
        //     }
        // });
        // this.collection.clear();
    }
}
