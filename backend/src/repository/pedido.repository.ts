import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Pedido } from '../entity/pedido.entity';

@Injectable()
export class PedidoRepository extends Repository<Pedido> {
  constructor(private dataSource: DataSource) {
    super(Pedido, dataSource.createEntityManager());
  }
}
