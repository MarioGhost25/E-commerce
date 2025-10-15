
export class UserEntity {

    constructor(
      public id: string,
      public name: string,
      public email: string,
      public password: string,
      public contactPhone: string,
      public role: string
    ) { }
  
    public static fromObject( object: { [ key: string ]: any; } ): UserEntity {
      const { id, _id, name, email, password, contactPhone, role } = object;
  
      const userEntity = new UserEntity(
        _id ? _id : id,
        name, 
        email, 
        password,
        contactPhone,
        role,
      );
      
      return userEntity;
  
    }
  
  }