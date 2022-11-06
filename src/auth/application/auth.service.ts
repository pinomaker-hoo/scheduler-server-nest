import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from '../domain/user.entity'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RequestUserSaveDto } from '../dto/user.save.dto'
import { decode } from 'node-base64-image'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async localRegister(body: RequestUserSaveDto): Promise<User> {
    try {
      const path = await this.baseToImg(body.base)
      const hash = await bcrypt.hash(body.password, 5)
      const user: User = this.userRepository.create({
        name: body.name,
        id: body.id,
        password: hash,
        image: path,
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

  async baseToImg(encode: string) {
    try {
      const path: string = `./src/source/img/${await this.getNumber()}-${Date.now()}`
      const image = await this.decodeBase(encode, path, 'jpg')
      return path
    } catch (err) {
      console.log(err)
    }
  }

  async getNumber() {
    let number = Math.floor(Math.random() * 1000000) + 100000
    if (number > 1000000) number -= 100000
    return number
  }

  async decodeBase(image: string, fileName: string, ext: string) {
    return await decode(image, { fname: fileName, ext: ext })
  }

  async updateImage(user: User, base: string) {
    try {
      const path = await this.baseToImg(base)
      return await this.userRepository.update(user.idx, { image: path })
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found!!', HttpStatus.BAD_REQUEST)
    }
  }
}
