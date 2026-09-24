import { Controller, Get, Post, Put, Param, Body, BadRequestException } from '@nestjs/common';
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

  @Post('api/devices/:id/pump/:action')
  async controlPump(
    @Param('id') deviceId: string,
    @Param('action') action: string,
    @Body('duration') duration?: number,
    @Body('userName') userName?: string
  ) {
    if (action !== 'on' && action !== 'off') {
      throw new BadRequestException('Action must be "on" or "off"');
    }
    return this.appService.sendPumpCommand(deviceId, action.toUpperCase(), duration || 30, userName || 'Víctor (Admin)');
  }

  @Get('api/devices/:id/rules')
  async getDeviceRule(@Param('id') deviceId: string) {
    return this.appService.getDeviceRule(deviceId);
  }

  @Put('api/devices/:id/rules/:ruleId')
  async updateDeviceRule(
    @Param('id') deviceId: string,
    @Param('ruleId') ruleId: string,
    @Body() body: any
  ) {
    return this.appService.updateDeviceRule(ruleId, body);
  }

  @Get('api/devices/:id/events')
  async getDeviceEvents(@Param('id') deviceId: string) {
    return this.appService.getDeviceEvents(deviceId);
  }

  @Get('api/devices/:id/telemetry')
  async getDeviceTelemetry(@Param('id') deviceId: string) {
    return this.appService.getDeviceTelemetry(deviceId);
  }
}
