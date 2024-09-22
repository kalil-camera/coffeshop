import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único do produto' })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Nome do produto' })
  nome: string;

  @Column('text', { nullable: true })
  @ApiProperty({ description: 'Descrição do produto', nullable: true })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Preço do produto' })
  preco: number;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ description: 'Categoria do produto', nullable: true })
  categoria: string;
}
