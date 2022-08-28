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

  /**
   * To verify the token
   * @param token
   * @returns
   */
  async verify(token: string): Promise<false | JwtTokenInterface> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtTokenInterface;
      return { user_id: payload.user_id };
    } catch (e) {
      return false;
    }
  }

  /**
   * to get token from the header
   * @param request
   * @returns
   */
  getTokenFromHeader(request: Request): string {
    let token = request.headers['x-access-token'] as string;

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return (token = token.slice(7, token.length));
    }
    return token;
  }
}
