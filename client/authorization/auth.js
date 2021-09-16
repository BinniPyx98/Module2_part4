"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var get_gallery_js_1 = require("../gallery/get_gallery.js");
/*
Catch click on button "LogIn" and start function LogIn
 */
var clickOnButtonLogIn = document.getElementById('logIn');
if (clickOnButtonLogIn) {
    clickOnButtonLogIn.addEventListener('click', function (ev) {
        ev.preventDefault();
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LogIn()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
/*
Main function for authorization.Run after click
 */
function LogIn() {
    return __awaiter(this, void 0, void 0, function () {
        var result, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, control_validation_authorization()];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 3];
                    hidden_auth_form();
                    return [4 /*yield*/, get_gallery_js_1.getGallery()];
                case 2:
                    a = _a.sent();
                    setTimeout(reset_gallery, 60000);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function control_validation_authorization() {
    return __awaiter(this, void 0, void 0, function () {
        var validationResult, authorizationResult, regexp, regexpPass, userPassword, userEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validationResult = null;
                    authorizationResult = null;
                    regexp = /^.+@.+\..+$/igm;
                    regexpPass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
                    userPassword = getElement('pass');
                    userEmail = getElement('email');
                    if (!(userPassword && userEmail)) return [3 /*break*/, 3];
                    if (!(regexp.test(userEmail) && regexpPass.test(userPassword))) return [3 /*break*/, 2];
                    validationResult = true;
                    return [4 /*yield*/, authorization(userEmail, userPassword)];
                case 1:
                    authorizationResult = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    alert('некорректные данные');
                    _a.label = 3;
                case 3: return [2 /*return*/, validationResult && authorizationResult];
            }
        });
    });
}
function getElement(tagId) {
    var Element = document.getElementById(tagId);
    return Element ? Element.value : alert("don't find tag");
}
function authorization(userEmail, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var resolve, token, result, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sendAuthData(userEmail, userPassword)];
                case 1:
                    resolve = _a.sent();
                    return [4 /*yield*/, resolve.json()];
                case 2:
                    token = _a.sent();
                    if (resolve.status === 200) {
                        result = token;
                        save_token(result);
                        return [2 /*return*/, true];
                    }
                    else {
                        result = token;
                        console.log(("error " + result));
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function sendAuthData(userEmail, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var userJsonDate, resolve;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userJsonDate = JSON.stringify({
                        email: userEmail,
                        password: userPassword
                    });
                    return [4 /*yield*/, fetch('http://localhost:5400/auth', {
                            method: 'POST',
                            headers: {
                                'Access-Control-Allow-Methods': 'POST',
                                "Content-Type": "application/json"
                            },
                            body: userJsonDate
                        })];
                case 1:
                    resolve = _a.sent();
                    return [2 /*return*/, resolve];
            }
        });
    });
}
function save_token(token) {
    localStorage.setItem('tokenData', token.token);
    console.log(token.token);
}
function removeToken() {
    localStorage.removeItem('tokenData');
}
function remove_gallery() {
    var divGallery = document.getElementById('gallery');
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}
function hidden_auth_form() {
    var authForm = document.getElementById('form');
    authForm.classList.toggle('hidden');
}
function reset_gallery() {
    removeToken();
    remove_gallery();
    hidden_auth_form();
}
