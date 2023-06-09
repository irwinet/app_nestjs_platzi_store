import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService2: ConfigType<typeof config>,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    console.log(this.tasks);
    // const apiKey = this.configService.get<string>('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    const apiKey = this.configService2.apiKey;
    const dbName = this.configService2.database.name;
    return `Hello World! ${apiKey} - ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
