
export class UserEntity {

    constructor(
      public id: string,
      public name: string,
      public email: string,
      public password: string,
    ) { }
  
    static fromObject( object: { [ key: string ]: any; } ) :[string?, UserEntity?] {
      const { id, _id, name, email, password } = object;
  
      if ( !_id && !id ) {
        return ['Missing id', undefined];
      }
  
      if ( !name ) return['Missing name', undefined];
      if ( !email ) return['Missing email', undefined];
      if ( !password ) return ['Missing password', undefined];
      
  
  
      return  [undefined, new UserEntity( _id || id, name, email, password )];
  
    }
  
  
  }