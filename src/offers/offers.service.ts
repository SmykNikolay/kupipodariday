import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  create(offer: Partial<Offer>): Promise<Offer> {
    return this.offersRepository.save(offer);
  }

  findOne(query: Partial<Offer>): Promise<Offer> {
    return this.offersRepository.findOne({ where: query });
  }

  find(query: Partial<Offer>): Promise<Offer[]> {
    return this.offersRepository.find({ where: query });
  }

  async updateOne(
    query: Partial<Offer>,
    updateData: Partial<Offer>,
  ): Promise<Offer> {
    const offer = await this.offersRepository.findOne({ where: query });
    if (!offer) {
      throw new Error('Offer not found');
    }
    return this.offersRepository.save({ ...offer, ...updateData });
  }

  async removeOne(query: Partial<Offer>): Promise<void> {
    const offer = await this.offersRepository.findOne({ where: query });
    if (!offer) {
      throw new Error('Offer not found');
    }
    await this.offersRepository.remove(offer);
  }
}
