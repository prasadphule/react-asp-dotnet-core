using MySql.Data.MySqlClient;
using Sample.Common;
using Sample.Entity;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Sample.Data.Repository
{
    public class ObjectTypeRepository : IObjectTypeRepository
    {
        private readonly IUnitofWork _unitofWork;
        private readonly MySqlCommand command;

        public ObjectTypeRepository(IUnitofWork unitofWork)
        {
            _unitofWork = unitofWork;
            command = _unitofWork.CreateCommand();
        }

        public List<ObjectType> GetAll()
        {
            command.CommandText = "sample_ObjectTypeReadAll";

            var dataSet = new DataSet();
            (new MySqlDataAdapter(command)).Fill(dataSet);
            command.Parameters.Clear();

            //commit transaction
            _unitofWork.SaveChanges();

            return dataSet.Tables[0].ConvertDataTable<ObjectType>();
        }

        public ObjectType Get(int? ObjectTypeId)
        {
            command.CommandText = "sample_ObjectTypeRead";
            command.Parameters.AddWithValue("ObjectTypeId", ObjectTypeId);

            var dataSet = new DataSet();
            (new MySqlDataAdapter(command)).Fill(dataSet);
            command.Parameters.Clear();

            var ot = dataSet.Tables[0].ConvertDataTable<ObjectType>();

            //commit transaction
            _unitofWork.SaveChanges();

            return ot.FirstOrDefault();
        }

        public ObjectType Save(ObjectType objectType)
        {
            command.CommandText = "sample_ObjectTypeCreate";
            command.Parameters.AddWithValue("ObjectTypeName", objectType.ObjectTypeName);
            command.Parameters.AddWithValue("Description", objectType.Description);
            command.Parameters.AddWithValue("Level", objectType.Level);

            var dataSet = new DataSet();
            (new MySqlDataAdapter(command)).Fill(dataSet);
            command.Parameters.Clear();

            var ot = dataSet.Tables[0].ConvertDataTable<ObjectType>();

            //commit transaction
            _unitofWork.SaveChanges();

            return ot.FirstOrDefault();
        }

        public bool Update(ObjectType objectType)
        {
            command.CommandText = "sample_ObjectTypeUpdate";
            command.Parameters.AddWithValue("ObjectTypeId", objectType.ObjectTypeId);
            command.Parameters.AddWithValue("ObjectTypeName", objectType.ObjectTypeName);
            command.Parameters.AddWithValue("Description", objectType.Description);
            command.Parameters.AddWithValue("Level", objectType.Level);

            int result = command.ExecuteNonQuery(); // result != 0 then it is updated

            //commit transaction
            _unitofWork.SaveChanges();

            return result != 0;
        }

        public bool Delete(int? ObjectTypeId)
        {
            command.CommandText = "sample_ObjectTypeDelete";
            command.Parameters.AddWithValue("ObjectTypeId", ObjectTypeId);

            int result = command.ExecuteNonQuery(); // result != 0 then it is updated

            //commit transaction
            _unitofWork.SaveChanges();

            return result != 0;
        }
    }
    
}
