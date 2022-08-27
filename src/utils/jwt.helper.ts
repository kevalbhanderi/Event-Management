import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtTokenInterface } from '../interface/jwt.token.interface';

@Injectable()
export class JwtHelper {
  /**
   * To generate a jwt token
   * @param tokenDto
   * @returns
   */
  generateToken(tokenDto: JwtTokenInterface): string {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRED_TIME,
    });
    return token;
  }
}
