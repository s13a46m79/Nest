import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  users() {
    return this.prisma.user.findMany();
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: data
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
  }
}