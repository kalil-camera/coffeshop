import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente> {
    return this.clienteRepository.findOneBy({ id });
  }

  create(cliente: Cliente): Promise<Cliente> {
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
