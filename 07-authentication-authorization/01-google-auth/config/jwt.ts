import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '5m' },
    refreshTokenExpores: '1h'
}))

