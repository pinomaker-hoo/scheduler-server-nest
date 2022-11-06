import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '../domain/user.entity'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RequestUserSaveDto } from '../dto/user.save.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async localRegister(body: RequestUserSaveDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(body.password, 5)
      const user: User = this.userRepository.create({
        name: body.name,
        id: body.id,
        password: hash,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async localLogin(id: string, password: string): Promise<User> {
    try {
      const findUser: User = await this.userRepository.findOne({
        where: { id },
      })
      await this.compareHash(password, findUser.password)
      return findUser
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async compareHash(password: string, hash: string) {
    const rs = await bcrypt.compare(password, hash)
    if (!rs) throw new HttpException('Password Error', HttpStatus.BAD_REQUEST)
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    return [hash, salt]
  }

  async signJwtWithIdx(idx: number): Promise<string> {
    return this.jwtService.sign({ idx })
  }

  async getById(idx: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
