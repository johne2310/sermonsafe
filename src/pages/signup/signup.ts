import { AuthProvider } from "./../../providers/auth/auth.provider";
import { EmailValidator } from "../../validators/email";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  LoadingController,
  Alert,
  Loading
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  signupForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.signupForm = formBuilder.group({
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

  async signupUser(): Promise<any> {
    if (!this.signupForm.valid) {
      console.log("Form not ready");
    } else {
      let loading: Loading;

      loading = this.loadingCtrl.create();

      loading.present();

      const email: string = this.signupForm.value.email;

      const password: string = this.signupForm.value.password;

      try {
        await this.authProvider.createAdminUser(email, password);
        await loading.dismiss();
        console.log("Admin user successfully created.");
      } catch (error) {
        await loading.dismiss();
        console.log("error from signup.ts");
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

  // TODO: Remove loading confirmation
  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }
}
