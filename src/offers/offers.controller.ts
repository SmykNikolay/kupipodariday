import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { OfferDto } from './dto/Offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() offer: OfferDto): Promise<Offer> {
    return this.offersService.create(offer);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.find({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Offer> {
    return this.offersService.findOne({ id: Number(id) });
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateData: OfferDto,
  ): Promise<Offer> {
    return this.offersService.updateOne({ id: Number(id) }, updateData);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string): Promise<void> {
    return this.offersService.removeOne({ id: Number(id) });
  }
}
