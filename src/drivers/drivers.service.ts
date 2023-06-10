import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from 'src/schemas/driver.schema';
import { IDriver } from './drivers.interface';

@Injectable()
export class DriversService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Driver.name) private driverModel: Model<Driver>
  ) {}

   async findAll(year): Promise<IDriver[]> {
    const htmlContent = await this.httpService.axiosRef.get(`https://www.formula1.com/en/results.html/${year}/drivers.html`);
    const $ = cheerio.load(htmlContent.data);

    const driverResults: IDriver[] = [];

    $('.resultsarchive-table > tbody > tr').map(async (index, element) => {
      const pos = $(element).find('td:nth-child(2)').text();
      const driver = 
        $(element).find('td:nth-child(3) span:nth-child(1)').text() + ' ' +
        $(element).find('td:nth-child(3) span:nth-child(2)').text();
      const nationality = $(element).find('td:nth-child(4)').text();
      const car = $(element).find('td:nth-child(5) a').text();
      const pts = $(element).find('td:nth-child(6)').text();

      const driverObj = {
        pos,
        driver,
        nationality,
        car,
        pts
      } as IDriver;

      driverResults.push(driverObj);

      const isDocumentExisted = await this.driverModel.findOne({
        pos,
        year
      });

      // Create Driver document if not existed
      if(!isDocumentExisted) {
        const createdDriver = new this.driverModel({
          ...driverObj,
          year
        });

        createdDriver.save();
      }
    });

    return driverResults;
  }
}
