import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/schemas/team.schema';
import { ITeam } from './teams.interface';

@Injectable()
export class TeamsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Team.name) private teamModel: Model<Team>
  ) {}

   async findAll(year): Promise<ITeam[]> {
    const htmlContent = await this.httpService.axiosRef.get(`https://www.formula1.com/en/results.html/${year}/team.html`);
    const $ = cheerio.load(htmlContent.data);

    const teamResults: ITeam[] = [];

    $('.resultsarchive-table > tbody > tr').map(async (index, element) => {
      const pos = $(element).find('td:nth-child(2)').text();
      const team = $(element).find('td:nth-child(3) a').text();
      const pts = $(element).find('td:nth-child(4)').text();

      const teamObj = {
        pos,
        team,
        pts
      } as ITeam;

      teamResults.push(teamObj);

      const isDocumentExisted = await this.teamModel.findOne({
        pos,
        year
      });

      // Create team document if not existed
      if(!isDocumentExisted) {
        const createdteam = new this.teamModel({
          ...teamObj,
          year
        });

        createdteam.save();
      }
    });

    return teamResults;
  }
}
