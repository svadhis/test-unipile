export default class DI {
    public static map: Record<string, any> = {};

    public static instances: Record<string, any> = {};

    private constructor() {}

    public static add(key: string, impl: any) {
        this.map[key] = impl;
        delete this.instances[key];
    }

    public static get(key: string, impl?: any) {
        if (impl && !this.map[key])
            this.add(key, impl);

        if (!this.instances[key])
            this.instances[key] = new this.map[key]();

        return this.instances[key];
    }
}