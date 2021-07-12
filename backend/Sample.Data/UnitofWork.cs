using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace Sample.Data
{
    public class UnitofWork : IUnitofWork
    {
        //The un-managed resource handle
        private MySqlConnection connection = null;
        private MySqlTransaction sqlTransaction;

        public UnitofWork(MySqlConnection sqlConnection)
        {
            connection = sqlConnection;
            connection.Open();
            sqlTransaction = connection.BeginTransaction();
        }

        public MySqlCommand CreateCommand()
        {
            var command = connection.CreateCommand();
            command.CommandTimeout = 36000;
            command.CommandType = CommandType.StoredProcedure; // by default SP you can override with text etc.
            command.Connection = connection;
            command.Transaction = sqlTransaction;
            return command;
        }

        public void SaveChanges()
        {
            if (sqlTransaction == null)
                throw new InvalidOperationException
                 ("Transaction have already been committed. Check your transaction handling.");

            sqlTransaction.Commit();
            sqlTransaction = null;
        }

        private bool disposed = false;

        //Innheritance - virtual
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (sqlTransaction != null)
                    {
                        //If for any reason code breaks and transaction not commited the we need to rollback the changes
                        sqlTransaction.Rollback();
                        sqlTransaction = null;
                    }
                    connection.Close();
                    connection = null;
                    disposed = true;
                }

            }
        }

        public void Dispose()
        {
            Dispose(true);
            //It's informing the Garbage Collector (GC) that this object was cleaned up fully.
            GC.SuppressFinalize(this);
        }

        ~UnitofWork()
        {
            Dispose(false);
        }

    }
}
