import Api from "../api/Api";
const httpMocks = require("node-mocks-http");
// const jest = require('jest-mock');

// const request = require("supertest");


Api.createSigningString = jest.fn();

describe(" Signature Authorization testing", () => {
    it("should check to have doPost funtion", () => {
        expect(typeof Api.doPost).toBe("function");        
    });

    // it(" Test to check whether the createSigningString is called", () => {
    //     let req, res, next, url;
    //     req = httpMocks.createRequest();
    //     res = httpMocks.createResponse();
    //     next = null;
    //     url = "http://localhost:1010";
    //     Api.doPost(url, req.body);
    //     Api.createSigningString();
    //     // const result = Api.createSigningString({sample:"00"});
    //     // console.log(result);
    //     // const signingString = Api.createSigningString(req.body);
    //     expect(Api.createSigningString).toBeCalled();
            
    // });
});