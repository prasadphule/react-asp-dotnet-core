using Sample.Entity;
using System.Collections.Generic;

namespace Sample.Data.Repository
{
    public interface IObjectTypeRepository
    {
        List<ObjectType> GetAll();
        ObjectType Get(int? ObjectTypeId);
        ObjectType Save(ObjectType objectType);
        bool Update(ObjectType objectType);
        bool Delete(int? ObjectTypeId);
    }
}
