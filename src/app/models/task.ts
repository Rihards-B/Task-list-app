export class Task {
    public createdOn: Date;

    constructor(
        public id: string,
        public _id: string,
        public title: string,
        public description: string,
        public type: string,
        public status: string,) {
        this.createdOn = new Date();
    }
}