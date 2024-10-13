import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ItemPedido } from '../entity/item-pedido.entity';

@Injectable()
export class ItemPedidoRepository extends Repository<ItemPedido> {
  constructor(private dataSource: DataSource) {
    super(ItemPedido, dataSource.createEntityManager());
  }
}
