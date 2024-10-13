import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';
import { Pedido } from './entity/pedido.entity';
import { ItemPedido } from './entity/item-pedido.entity';
import { PedidoService } from './service/pedido.service';
import { ProdutoService } from './service/produto.service';
import { PedidoController } from './controller/pedido.controller';
import { ProdutoController } from './controller/produto.controller';
import { PedidoRepository } from './repository/pedido.repository';
import { ProdutoRepository } from './repository/produto.repository';
import { ItemPedidoRepository } from './repository/item-pedido.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'cafeteria',
      entities: [Produto, Pedido, ItemPedido],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Pedido,
      Produto,
      ItemPedido,
      PedidoRepository,
      ProdutoRepository,
      ItemPedidoRepository,
    ]),
  ],
  controllers: [PedidoController, ProdutoController],
  providers: [PedidoService, ProdutoService],
})
export class AppModule {}
