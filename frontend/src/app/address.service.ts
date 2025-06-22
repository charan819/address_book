// Address.service.ts

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AddressService {
    private baseUrl = "http://localhost:5000/api/address";
    constructor(private httpClient: HttpClient) { }

    getAllAddress(token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.httpClient.get<any>(`${this.baseUrl}/getAllAddress`, {
            headers,
        });
    }

    getAddressById(id: string, token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.httpClient.get<any>(`${this.baseUrl}/getAddressById/${id}`, {
            headers,
        });
    }

    createAddress(address: any, token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<any>(`${this.baseUrl}/createAddress`, address, {
            headers,
        });
    }

    updateAddress(address: any, token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.httpClient.put<any>(
            `${this.baseUrl}/updateAddress/${address._id}`,
            address,
            { headers }
        );
    }

    deleteAddress(id: string, token: string): Observable<void> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.httpClient.delete<void>(`${this.baseUrl}/deleteAddress/${id}`, {
            headers,
        });
    }
}