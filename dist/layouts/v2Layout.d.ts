import NT from "./../nt";
export default class v2Layout {
    private data;
    private html;
    private listenFor;
    private nt;
    constructor(data: any, nt: NT);
    build(): v2Layout;
    display(): v2Layout;
    private elemString;
    private genID;
    periodic(): void;
}
