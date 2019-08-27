using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Webmotors.Challenge.Model
{
    public class DbConnection : DbContext
    {
        public DbConnection(DbContextOptions<DbConnection> options) : base(options)
        {
            
        }

        public virtual DbSet<AnuncioWebmotors> AnuncioWebmotors { get; set; }
    }
}
