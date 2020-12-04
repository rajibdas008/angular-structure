export class UriComponentBuilder {
    private uri: string;
    private params: object;
    constructor() {}
    static fromUri(uri: string): UriComponentBuilder {
        const builder: UriComponentBuilder = new UriComponentBuilder();
        builder.uri = uri;
        return builder;
    }
    withParam(params: object): UriComponentBuilder {
        this.params = params;
        return this;
    }
    build(): string {
        if (this.uri && this.uri.length > 0 && this.params) {
            for (const property in this.params) {
                if (Object.hasOwnProperty(property)) {
                    this.uri = this.uri.replace(property, this.params[property]);
                }
            }
        }
        return this.uri;
    }
}
