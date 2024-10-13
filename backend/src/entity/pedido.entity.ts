import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ItemPedido } from '../entity/item-pedido.entity';
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

  @Column({ type: 'varchar', length: 10 })
  @ApiProperty({
    description: 'Avaliação do Pedido, de 0 a 5',
    example: '5',
  })
  avaliacao: string;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido, {
    cascade: true,
  })
  itens: ItemPedido[];
}
