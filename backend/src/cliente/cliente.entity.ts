import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Nome do cliente', example: 'KALIL CAMERA' })
  nome: string;

  @ApiProperty({
    description: 'Email deve ser único',
    example: 'kalil@emailexemplo.com',
  })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: 'senha123',
  })
  @Column({ length: 100 })
  senha: string;

  @ApiProperty({
    description: 'Endereço',
    example: 'Rua do Centro, nº 0',
    required: false,
  })
  @Column({ length: 200, nullable: true })
  endereco: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
