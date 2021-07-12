using MySql.Data.MySqlClient;
using System;

namespace Sample.Data
{
    public interface IUnitofWork : IDisposable
    {
        public MySqlCommand CreateCommand();
        public void SaveChanges();
    }
}
