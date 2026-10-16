import { IconeLapis, IconeLixeira, IconeUsuario } from '../../../shared/components/icones'
import Botao from '../../../shared/components/Botao'
import { ROTULOS_PAPEL, type UsuarioCadastro } from '../types'

interface Propriedades {
  usuarios: UsuarioCadastro[]
  setores: Map<string, string>
  edicaoDisponivel: boolean
  aoEditar: (usuario: UsuarioCadastro) => void
  aoExcluir: (usuario: UsuarioCadastro) => void
}

export default function TabelaUsuarios({ usuarios, setores, edicaoDisponivel, aoEditar, aoExcluir }: Propriedades) {
  return (
    <div className="surface overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Usuários da Intranet Decós</caption>
        <thead className="tabela-cabecalho text-xs font-medium uppercase liquido:normal-case">
          <tr>{['Colaborador', 'Setor', 'Perfil', 'Ações'].map(titulo => <th key={titulo} scope="col" className={`px-6 py-3 ${titulo === 'Ações' ? 'text-right' : ''}`}>{titulo}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-brand-100/50">
          {usuarios.map(usuario => <tr key={usuario.id} className="tabela-linha even:bg-slate-50/50">
            <td className="px-6 py-3"><div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-8 shrink-0 items-end justify-center overflow-hidden rounded-full bg-slate-300 text-slate-50"><IconeUsuario tamanho={30} /></span>
              <div className="min-w-0"><span className="block font-semibold text-slate-800">{usuario.nome}</span><span className="block text-xs text-slate-500">{usuario.email}</span><span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] ${usuario.ativo ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{usuario.ativo ? 'Ativo' : 'Inativo'}</span></div>
            </div></td>
            <td className="px-6 py-3 text-slate-700">{usuario.setorId ? setores.get(usuario.setorId) ?? 'Setor indisponível' : 'Sem setor'}</td>
            <td className="px-6 py-3"><span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs ${usuario.role === 'superadmin' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'}`}>{ROTULOS_PAPEL[usuario.role]}</span></td>
            <td className="px-6 py-3"><div className="flex justify-end gap-1">
              <Botao variante="icone" disabled={!edicaoDisponivel} title={edicaoDisponivel ? "Editar usuário" : "Aguarde o carregamento dos setores"} aria-label={`Editar ${usuario.nome}`} onClick={() => aoEditar(usuario)}><IconeLapis tamanho={18} /></Botao>
              <Botao variante="icone" className="hover:text-critical" title="Excluir (desativar) usuário" aria-label={`Excluir ${usuario.nome}`} disabled={!usuario.ativo} onClick={() => aoExcluir(usuario)}><IconeLixeira tamanho={18} /></Botao>
            </div></td>
          </tr>)}
          {!usuarios.length && <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-500">Nenhum usuário encontrado com esses filtros.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
