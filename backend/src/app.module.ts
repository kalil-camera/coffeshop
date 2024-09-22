import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/cliente.entity';
import { Produto } from './produto/produto.entity';
import { Pedido } from './pedido/pedido.entity';
import { ItemPedido } from './item-pedido/item-pedido.entity';
import { ClienteService } from './cliente/cliente.service';
import { ClienteController } from './cliente/cliente.controller';
import { PedidoService } from './pedido/pedido.service';
import { PedidoController } from './pedido/pedido.controller';
import { ProdutoService } from './produto/produto.service';
import { ProdutoController } from './produto/produto.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'cafeteria',
      entities: [Cliente, Produto, Pedido, ItemPedido],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Cliente, Produto, Pedido, ItemPedido]),
  ],
  controllers: [ClienteController, PedidoController, ProdutoController],
  providers: [ClienteService, PedidoService, ProdutoService],
})
export class AppModule {}
