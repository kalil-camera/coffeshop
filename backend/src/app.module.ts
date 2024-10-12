import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';
import { Pedido } from './entity/pedido.entity';
import { ItemPedido } from './entity/item-pedido.entity';
import { PedidoService } from './service/pedido.service';
import { PedidoController } from './controller/pedido.controller';
import { ProdutoService } from './service/produto.service';
import { ProdutoController } from './controller/produto.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'cafeteria',
      entities: [, Produto, Pedido, ItemPedido],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Produto, Pedido, ItemPedido]),
  ],
  controllers: [PedidoController, ProdutoController],
  providers: [PedidoService, ProdutoService],
})
export class AppModule {}
