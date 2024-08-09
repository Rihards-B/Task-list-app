export class Task {
    public createdOn: Date;

    constructor(
        public title: string,
        public description: string,
        public type: string,
        public status: string,
        public _id?: string,
    ) {
        this.createdOn = new Date();
    }
}