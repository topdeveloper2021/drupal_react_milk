export interface ProfileInterface {
    id: string;
    role: string;
    title: string;
    avatar: string;
    job: string;
    description: string;
    link: string;
}

export default class Profile implements ProfileInterface {
    id: string;
    role: string;
    title: string;
    avatar: string;
    job: string;
    description: string;
    link: string;

    constructor(incoming: ProfileInterface) {
        Object.assign(this, incoming);
    }
}
