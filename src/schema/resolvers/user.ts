import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../entities/user";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(@Arg("id") id: string): Promise<User> {
    try {
      const user: User | undefined = await User.findOne({ id });
      if (user) {
        return user;
      } else {
        throw new Error("no user found.");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  @Mutation(() => User)
  async register(
    @Arg("firstname") firstname: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("lastname", { nullable: true, defaultValue: "" }) lastname?: string
  ): Promise<User> {
    // encrypt password
    const salt: string = await bcrypt.genSalt(2);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    try {
      const user: User = await User.create({
        firstName: firstname,
        lastName: lastname,
        email,
        password: hashedPassword,
      }).save();

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
