import { Module, Global } from '@nestjs/common';

const API_KEY = '12345';
const API_KEY_POD = '54321';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_POD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
