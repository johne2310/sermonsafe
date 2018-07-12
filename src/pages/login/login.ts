import { AuthProvider } from "../../providers/auth/auth.provider";
import { EmailValidator } from "../../validators/email";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  AlertController,
  Alert
} from "ionic-angular";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TabsPage } from "../tabs/tabs-page";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  // TODO: Remove loading message
  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  goToSignup(): void {
    this.navCtrl.push("SignupPage");
  }

  goToPasswordReset(): void {
    this.navCtrl.push("PasswordResetPage");
  }

  async loginUser(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log("Form is not complete");
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();
      const email: string = this.loginForm.value.email;
      const password: string = this.loginForm.value.password;

      try {
        await this.authProvider.loginUser(email, password);
        await loading.dismiss();
        console.log("Ready to change page post login");
        this.navCtrl.setRoot(TabsPage);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: "cancel"
            }
          ]
        });
        alert.present();
      }
    }
  }
}
