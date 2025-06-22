// app.routes.ts

import { Routes } from "@angular/router";
import { AddressComponent } from "./address/address.component";
import { AddressCreateComponent } from "./address-create/address-create.component";
import { UserComponent } from "./user/user.component";

export const routes: Routes = [
    { path: "", component: UserComponent },
    { path: "getAllAddress", component: AddressComponent },
    { path: "getAddressById/:id", component: AddressComponent },
    { path: "createAddress", component: AddressCreateComponent },
    { path: "updateAddress/:id", component: AddressComponent },
    { path: "deleteAddress/:id", component: AddressComponent },
    { path: "**", redirectTo: "/" },
];