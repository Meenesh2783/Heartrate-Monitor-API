const convertUserDbObjectToResponseObject = (dbObject) => {
    return {
      id: dbObject.id,
      name: dbObject.name,
      email: dbObject.email,
      created_at: dbObject.created_at,
    };
  };
  
module.exports = { convertUserDbObjectToResponseObject };
  