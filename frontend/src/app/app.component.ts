// app.component.ts

import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { SharedService } from "./shared.service";
import { AuthService } from "./auth.service";
// import { FormsModule } from "@angular/forms";
// import { CommonModule } from "@angular/common";

@Component({
    selector: "app-root",
    // standalone: true,
    // imports: [RouterOutlet, FormsModule, CommonModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    title = "GeeksForGeeks Address Book";
    isLoggedIn: boolean = false;
    constructor(
        private router: Router,
        private userService: AuthService,
        private sharedService: SharedService
    ) { }
    ngOnInit(): void {
        this.userService.loggedInEvent.subscribe((data: any) => {
            this.isLoggedIn = true;
        });
        if (typeof localStorage !== "undefined" && localStorage.getItem("token")) {
            this.isLoggedIn = true;
        }
    }

    login(): void {
        this.sharedService.triggerLoginEvent();
        this.router.navigate(["/"]);
    }

    register(): void {
        this.sharedService.triggerRegisterEvent();
        this.router.navigate(["/"]);
    }

    logout(): void {
        this.userService.setAuthenticationStatus(false);
        this.isLoggedIn = false;
        localStorage.removeItem("token");
        this.router.navigate(["/"]);
    }
}