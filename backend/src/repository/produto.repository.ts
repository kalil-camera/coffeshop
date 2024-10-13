import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Produto } from '../entity/produto.entity';

@Injectable()
export class ProdutoRepository extends Repository<Produto> {
  constructor(private dataSource: DataSource) {
    super(Produto, dataSource.createEntityManager());
  }
}
