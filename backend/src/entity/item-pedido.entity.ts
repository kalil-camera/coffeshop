import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pedido } from '../entity/pedido.entity';
import { Produto } from './produto.entity';

@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
