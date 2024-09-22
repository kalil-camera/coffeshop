import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { ItemPedido } from '../item-pedido/item-pedido.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'Data do Pedido',
    example: '2024-09-25T18:25:43.511Z',
  })
  data_pedido: Date;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({
    description: 'Status do Pedido',
    example: 'EM ROTA DE ENTREGA',
  })
  status_pedido: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Valor Total',
    example: '52.95',
  })
  total: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido, {
    cascade: true,
  })
  itens: ItemPedido[];
}
