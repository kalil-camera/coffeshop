import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/cliente.entity';
import { Produto } from './produto/produto.entity';
import { Pedido } from './pedido/pedido.entity';
import { ItemPedido } from './item-pedido/item-pedido.entity'; // Importando a entidade ItemPedido
import { ClienteService } from './cliente/cliente.service';
import { ClienteController } from './cliente/cliente.controller';
import { PedidoService } from './pedido/pedido.service'; // Importando o serviço de Pedido
import { PedidoController } from './pedido/pedido.controller'; // Importando o controlador de Pedido

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'cafeteria',
      entities: [Cliente, Produto, Pedido, ItemPedido], // Adicione a entidade ItemPedido
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Cliente, Produto, Pedido, ItemPedido]), // Incluindo ItemPedido
  ],
  controllers: [ClienteController, PedidoController], // Adicionando PedidoController
  providers: [ClienteService, PedidoService], // Adicionando PedidoService
})
export class AppModule {}
