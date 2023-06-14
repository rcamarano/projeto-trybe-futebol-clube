import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAll();

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(500).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.findById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(500).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
