import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'

export default registerAs('database', () => {
    return {
        type: 'sqlite',
        database: 'db.sqlite',
        destination: path.join(__dirname, './db.sqlite'),
        autoLoadEntities: true
    } as TypeOrmModuleOptions
})

