using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webmotors.Challenge.Model
{
    public class initDB
    {
        public static void Initialize(DbConnection context)
        {
            context.Database.EnsureCreated();

            if (context.AnuncioWebmotors.Any())
            {
                return;
            }

            context.AnuncioWebmotors.Add(new AnuncioWebmotors
            {
                ano = 2018 ,
                marca = "Honda",
                quilometragem= 2000,
                modelo= "Modelo Honda 2",
                observacao= "Inserção de Teste",
                versao = "1.0.2"
            });

            context.SaveChanges();
        }
    }
}
