export class UserParams {
    public gender: string;
    public minAge: number;
    public maxAge: number;
    public orderBy: string;

    constructor(gender){
      this.minAge = 18;
      this.maxAge = 99;
      this.gender = gender;
      this.orderBy = 'lastActive';
    }
}
