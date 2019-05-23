using Microsoft.EntityFrameworkCore;
using SP.MEDICAL.GROUP.WebApi.Domains;
using SP.MEDICAL.GROUP.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP.MEDICAL.GROUP.WebApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void AtualizarDados(Consultas novaConsulta, Consultas consultaCadastrada)
        {
            consultaCadastrada.Descricao = novaConsulta.Descricao ?? consultaCadastrada.Descricao;
            consultaCadastrada.IdSituacao = novaConsulta.IdSituacao ?? consultaCadastrada.IdSituacao;

            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Update(consultaCadastrada);
                ctx.SaveChanges();
            }
        }

        public Consultas BuscarPorId(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.Find(id);
            }
        }

        public void Cadastrar(Consultas consulta)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> ListarConsultas()
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                List<Consultas> listaConsultas = ctx.Consultas.Include(x => x.IdMedicoNavigation).Include(x => x.IdProntuarioNavigation).Include(x => x.IdSituacaoNavigation).ToList();

                foreach (var item in listaConsultas)
                {
                    item.IdMedicoNavigation.Consultas = null;
                    item.IdProntuarioNavigation.Consultas = null;
                    item.IdSituacaoNavigation.Consultas = null;
                }
                return listaConsultas;
            }
        }

        public List<Consultas> ListarPorIdMedico(int id)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                List<Consultas> listaMedConsultas = ctx.Consultas.Include(x => x.IdMedicoNavigation).Include(x => x.IdProntuarioNavigation).Where(x => x.IdMedico == id).Include(x => x.IdSituacaoNavigation).ToList();

                foreach (var item in listaMedConsultas)
                {
                    item.IdMedicoNavigation.Consultas = null;
                    item.IdProntuarioNavigation.Consultas = null;
                    item.IdSituacaoNavigation.Consultas = null;
                }
                return listaMedConsultas;
            }
        }

        public List<Consultas> ListarPorIdPaciente(int idPaciente)
        {
            using (SPMedGroupContext ctx = new SPMedGroupContext())
            {
                return ctx.Consultas.Include(x => x.IdMedicoNavigation).Include(x => x.IdProntuarioNavigation).Where(x => x.IdProntuario == idPaciente).Include(x => x.IdSituacaoNavigation).ToList();
            }
        }
    }
}
