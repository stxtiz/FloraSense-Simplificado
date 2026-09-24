import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Get('api/devices/demo')
  async getDemoDevice(): Promise<any> {
    return this.appService.getDemoDevice();
  }
}
