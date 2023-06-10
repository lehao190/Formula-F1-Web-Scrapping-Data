import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as cheerio from 'cheerio';
import { Model } from 'mongoose';
import { Race } from 'src/schemas/race.schema';
import { IRace } from './races.interface';


@Injectable()
export class RacesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Race.name) private raceModel: Model<Race>
  ) {}

   async findAll(year): Promise<IRace[]> {
    const htmlContent = await this.httpService.axiosRef.get(`https://www.formula1.com/en/results.html/${year}/races.html`);
    const $ = cheerio.load(htmlContent.data);

    const raceResults: IRace[] = [];

    $('.resultsarchive-table > tbody > tr').map(async (index, element) => {
      const grandPrix = $(element).find('td:nth-child(2) a').text().trim();
      const date = $(element).find('td:nth-child(3)').text();
      const winner = 
        $(element).find('td:nth-child(4) span:nth-child(1)').text() + ' ' +
        $(element).find('td:nth-child(4) span:nth-child(2)').text();
      const car = $(element).find('td:nth-child(5)').text();
      const laps = $(element).find('td:nth-child(6)').text();
      const time = $(element).find('td:nth-child(7)').text();

      const raceObj = {
        grand_prix: grandPrix,
        winner,
        car,
        laps,
        time,
        date,
      } as IRace

      raceResults.push(raceObj)

      const isDocumentExisted = await this.raceModel.findOne({
        grand_prix: grandPrix,
        year
      });

      // Create Race document if not existed
      if(!isDocumentExisted) {
        const createdRace = new this.raceModel({
          ...raceObj,
          year
        });

        createdRace.save();
      }
    });

    return raceResults
  }
}
