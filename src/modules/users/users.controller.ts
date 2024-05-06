import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/users.create.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async users() {
    try {
      return await this.usersService.users();
    }
    catch (error) {
      throw new Error();
    }
  }

  @Post('register')
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ) {
    console.log(createUserDto)
    try {
      return await this.usersService.createUser({
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        salt: Date.now().toString()
      })
    }
    catch (error) {
      if(error.message.includes('Unique constraint failed on the constraint: `User_email_key`'))
        throw new ConflictException('Email already exists');
      else 
        throw new Error();
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
  ) {
    try {
      const result = await this.usersService.findByEmail(email)
      if(!result) return { message: 'User not found' }
    }
    catch (error) {
      throw new Error();
    }
  }
}