import { userProfile } from "../../models/user.interface";

import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import firebase from "firebase";

@Injectable()
export class AuthProvider {
  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore
  ) {
    console.log("Hello AuthProvider Provider");
  }

  // log user in using firebase
  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);

    // signInWithEmailAndPassword(email, password);
  }

  // reset password function
  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  // log out user
  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  //create admin userProfile
  async createAdminUser(
    email: string,
    password: string
  ): Promise<firebase.User> {
    // try {
    const adminUser: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const userProfileDocument: AngularFirestoreDocument<
      userProfile
    > = this.fireStore.doc(`userProfile/${adminUser.user.uid}`);

    const teamId: string = this.fireStore.createId();

    await userProfileDocument.set({
      userId: adminUser.user.uid,
      email: email
      // teamId: teamId,
      // teamAdmin: true
    });

    // const teamProfile: AngularFirestoreDocument<
    //   teamProfile
    // > = this.fireStore.doc(`teamProfile/${teamId}`);

    // await teamProfile.set({
    //   id: teamId,
    //   teamAdmin: adminUser.user.uid,
    //   groceryList: null
    // });

    return adminUser.user;
    // } catch (error) {
    //   console.log("Error from provider");
    //   console.log(error.message);
    // }
  }

  async createRegularUser(email: string): Promise<any> {
    // const teamId: string = await this.inventoryProvider.getTeamId();
    // const userCollection: AngularFirestoreCollection<
    //   any
    // > = this.fireStore.collection(`teamProfile/${teamId}/teamMemberList`);
    // const id: string = this.fireStore.createId();
    // const regularUser = {
    //   id: id,
    //   email: email,
    //   teamId: teamId
    // };
    // return userCollection.add(regularUser);
  }
}
