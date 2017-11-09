import * as jwt from "jsonwebtoken";
import { AdvicePool, beforeMethod } from 'kaop-ts';
import { UserManagement } from "./usermanagement";
import { User } from "./Models/user";

export class RoutingAdvice extends AdvicePool {

  static requireLoggedIn(meta) {
    let self = this;
    let token;

    try {
      token = meta.args[0].headers.authorization.split(" ")[1];
    } catch(e) {
      console.log(e);
      self.stop();
      self.next();
    }

    RoutingAdvice.verifyUserOfType(this, token, "User");
  }

  static requireAdmin(meta) {
    let self = this;
    let token;

    try {
      token = meta.args[0].headers.authorization.split(" ")[1];
    } catch(e) {
      console.log(e);
      self.stop();
      self.next();
    }

    RoutingAdvice.verifyUserOfType(this, token, "Admin");
  }

  static requireClient(meta) {
    let self = this;
    let token;

    try {
      token = meta.args[0].headers.authorization.split(" ")[1];
    } catch(e) {
      console.log(e);
      self.stop();
      self.next();
    }

    RoutingAdvice.verifyUserOfType(this, token, "Client");
  }

  private static verifyUserOfType(self: any, token: string, type: string): void {
    jwt.verify(token, 'tasmanianDevil', function(err, verifiedJwt) {
      if(err) {
        console.log(err);
        console.log("invalid authorization token");
        self.stop();
        self.next(); // deny access to decorated route
        return;
      } else {
        try {
          if(type == "User" || UserManagement.getInstance().getUserById(verifiedJwt.id).getType() == type) {
            self.next();
          } else {
            console.log(`invalid user id ${verifiedJwt.id}`);
            self.stop();
            self.next();
          }
        }
        catch(e) {
          console.log(e);
          self.stop();
          self.next();
          return;
        }
      }
    });
  }
}
