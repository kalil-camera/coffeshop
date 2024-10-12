import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../produto/produto.entity';
import { ItemPedido } from '../item-pedido/item-pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(ItemPedido)
    private readonly itemPedidoRepository: Repository<ItemPedido>,
  ) {}

  async create(pedido: Pedido): Promise<Pedido> {
    let totalPedido = 0;

    for (const item of pedido.itens) {
      const produto = await this.produtoRepository.findOneBy({
        id: item.produto.id,
      });
      if (!produto) {
        throw new Error(`Produto com ID ${item.produto.id} não encontrado`);
      }

      const subtotal = produto.preco * item.quantidade;
      totalPedido += subtotal;

      item.subtotal = subtotal;
      item.produto = produto;
    }

    pedido.total = totalPedido;
    pedido.status_pedido = 'Pendente';
    return this.pedidoRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['itens', 'itens.produto'],
      order: {
        data_pedido: 'DESC', // Ordenar por coluna `data_pedido em decrescente
      },
    });
  }

  async findOne(id: number): Promise<Pedido> {
    return this.pedidoRepository.findOne({
      where: { id },
      relations: ['itens', 'itens.produto'],
    });
  }
}
