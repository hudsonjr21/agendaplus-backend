export class TransacaoDto {
  valor: number;
  tipo: string;
  descricao: string;
  caixaId: number;
  atendimentoId?: number;
  despesaId?: number;
  data: Date;
}
