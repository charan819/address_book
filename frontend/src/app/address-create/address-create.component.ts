// Address-create.compoennt.ts

import { Component } from "@angular/core";
import { AddressService } from "../address.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { SharedService } from "../shared.service";
// import { FormsModule } from "@angular/forms";
// import { CommonModule } from "@angular/common";

@Component({
    selector: "app-address-create",
    // standalone: true,
    // imports: [FormsModule, CommonModule],
    templateUrl: "./address-create.component.html",
    styleUrl: "./address-create.component.scss",
})
export class AddressCreateComponent {
    isLoggedIn: boolean = false;
    addressCreated: any = {};
    showAddForm: boolean = false;
    errorMessage: string = "";
    constructor(
        private addressService: AddressService,
        private userService: AuthService,
        private router: Router,
        private sharedService: SharedService
    ) { }
    ngOnInit(): void { }

    createAddress(): void {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                this.addressService
                    .createAddress(this.addressCreated, token)
                    .subscribe((addressCreated) => {
                        this.addressCreated = addressCreated;
                        this.resetForm();
                        this.router.navigate(["/getAllAddress"]);
                    });
            }
        }
    }

    resetForm(): void {
        this.addressCreated = {};
    }
}