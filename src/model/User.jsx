

export class User {
    constructor(id, firstName, lastName, email, role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    static fromJson(json) {
        return new User(json.id, json.firstName, json.lastName, json.email, json.role);
    }
}