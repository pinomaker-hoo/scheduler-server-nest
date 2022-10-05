import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { UserRepository } from '../infrastructure/user.repository';
import * as bcrypt from 'bcryptjs';
import { ExecOptionsWithStringEncoding } from 'child_process';
import { JwtService } from '@nestjs/jwt';
import { RequestUserSaveDto } from '../dto/user.save.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async localRegister(body: RequestUserSaveDto): Promise<User> {
    const hashArr: string[] = await this.hashPassword(body.password);
    const user: User = this.userRepository.create({
      name: body.name,
      id: body.id,
      password: hashArr[0],
      salt: hashArr[1],
    });
    return await this.userRepository.save(user);
  }

  /** passport Local Login*/
  async localLogin(id: string, password: string): Promise<User> {
    try {
      const findUser: User = await this.userRepository.findOne({
        where: { id },
      });
      if (!this.compareHash(password, findUser.password))
        throw new HttpException('Password Error', HttpStatus.BAD_REQUEST);
      return findUser;
    } catch (err) {
      console.log(err);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  /** password, hash된 password를 받아서 같은 지 검증*/
  async compareHash(password: string, hash: string): Promise<boolean> {
    const rs = await bcrypt.compare(password, hash);
    return rs ? true : false;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return [hash, salt];
  }

  /** Login 후 idx를 활용한 Token 발행 */
  async signJwtWithIdx(idx: number): Promise<string> {
    return this.jwtService.sign({ idx });
  }

  /** passport Jwt Find User as idx*/
  async getById(idx: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { idx } });
    } catch (err) {
      console.log(err);
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST);
    }
  }
}
