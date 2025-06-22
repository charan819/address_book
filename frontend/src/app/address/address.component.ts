// Address.component.ts

import { Component, OnInit } from "@angular/core";
import { AddressService } from "../address.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { SharedService } from "../shared.service";
// import { FormsModule } from "@angular/forms";
// import { CommonModule } from "@angular/common";

@Component({
    selector: "app-address",
    // standalone: true,
    // imports: [FormsModule, CommonModule],
    templateUrl: "./address.component.html",
    styleUrl: "./address.component.scss",
})
export class AddressComponent implements OnInit {
    isLoggedIn: boolean = false;
    addressList: any[] = [];
    displayedAddressList: any[] = [];
    addressById: any = {};
    addressUpdated: any = {};
    showUpdateForm: boolean = false;
    errorMessage: string = "";
    constructor(
        private addressService: AddressService,
        private userService: AuthService,
        private router: Router,
        private sharedService: SharedService
    ) { }
    ngOnInit(): void {
        if (typeof localStorage !== "undefined" && localStorage.getItem("token")) {
            this.getAllAddresses();
        }
    }

    ifLoggedIn(): boolean {
        this.userService.isAuthenticated().subscribe((isAuthenticated: boolean) => {
            this.isLoggedIn = isAuthenticated;
        });
        return this.isLoggedIn;
    }

    getUserId(): string | null {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                const tokenPayload = JSON.parse(atob(token.split(".")[1]));
                console.log(tokenPayload);
                return tokenPayload.user.id;
            }
        }
        return null;
    }

    getAllAddresses(): void {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                this.addressService
                    .getAllAddress(token)
                    .subscribe((addressList: any) => {
                        this.addressList = addressList;
                        this.displayedAddressList = [...this.addressList];
                    });
            }
        }
    }

    getAddressById(id: string): void {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                this.showUpdateForm = false;
                this.addressService
                    .getAddressById(id, token)
                    .subscribe((addressById: any) => {
                        this.addressById = addressById;
                        this.addressById.dob = this.addressById.dob.toString().slice(0, 10);
                    });
            }
        }
    }

    closeView(): void {
        this.addressById = {};
    }

    showAddFormFunction(): void {
        this.router.navigate(["/createAddress"]);
    }

    populateUpdateForm(address: any) {
        this.addressUpdated = { ...address };
        this.addressUpdated.dob = this.addressUpdated.dob.toString().slice(0, 10);
        this.showUpdateForm = true;
    }

    updateAddress(id: string): any {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                this.addressService.updateAddress(this.addressUpdated, token).subscribe(
                    (addressUpdated: any) => {
                        const index = this.displayedAddressList.findIndex(
                            (p) => p._id === id
                        );
                        if (index !== -1) {
                            this.addressList[index] = addressUpdated;
                            this.displayedAddressList[index] = addressUpdated;
                            this.getAllAddresses();
                            this.showUpdateForm = false;
                            this.router.navigate(["/getAllAddress"]);
                        }
                        this.cancelUpdate();
                    },
                    (error) => {
                        this.errorMessage = "Error Updating Activity";
                    }
                );
            }
        }
        return this.addressUpdated;
    }

    cancelUpdate(): void {
        this.showUpdateForm = false;
        this.addressUpdated = {};
        this.addressById = {};
    }

    confirmDelete(addressId: string): void {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this address?"
        );
        if (confirmDelete) {
            this.deleteAddress(addressId);
        }
    }

    deleteAddress(id: string): void {
        if (typeof localStorage !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                this.addressService.deleteAddress(id, token).subscribe(
                    () => {
                        this.addressList = this.addressList.filter(
                            (address: any) => address._id !== id
                        );
                        this.displayedAddressList = [...this.addressList];
                    },
                    (error) => {
                        this.errorMessage = "Error Deleting Address";
                    }
                );
            }
        }
    }
}