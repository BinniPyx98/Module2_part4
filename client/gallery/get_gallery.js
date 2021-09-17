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
exports.getGallery = void 0;
/*
Загрузка изображения. Ловим клик по кнопке Upload и запускаем функцию Upload
 */
var inputFile = document.getElementById('uploadFile');
var clickOnButtonUpload = document.getElementById('uploadButton');
if (clickOnButtonUpload) {
    clickOnButtonUpload.addEventListener('click', function (ev) {
        ev.preventDefault();
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Upload(inputFile)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
function Upload(file) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, resolve;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append('img', file.files[0]);
                    if (!!file) return [3 /*break*/, 1];
                    console.log('not file');
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, fetch("http://localhost:5400/gallery?page=" + getPage(), {
                        method: 'POST',
                        headers: {
                            'Access-Control-Allow-Methods': 'POST'
                        },
                        body: formData
                    })];
                case 2:
                    resolve = _a.sent();
                    if (resolve.status == 200) {
                        //window.location.reload()
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/*
 Create Gallery
 */
function getGallery() {
    return __awaiter(this, void 0, void 0, function () {
        var token, resolve, galleryObject, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("gal");
                    token = (localStorage.getItem('tokenData'));
                    console.log('token');
                    return [4 /*yield*/, fetch(getUrl(), {
                            method: "GET",
                            headers: {
                                'Authorization': token
                            }
                        })];
                case 1:
                    resolve = _a.sent();
                    galleryObject = null;
                    return [4 /*yield*/, resolve.json()];
                case 2:
                    data = _a.sent();
                    if (data) {
                        galleryObject = data;
                    }
                    createGallery(galleryObject);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getGallery = getGallery;
function createGallery(galleryObject) {
    clearGallery();
    createImg(galleryObject);
}
function createImg(galleryObject) {
    var divGallery = document.getElementById('gallery');
    for (var _i = 0, _a = galleryObject.objects; _i < _a.length; _i++) {
        var url = _a[_i];
        var img = document.createElement('img');
        img.src = url;
        divGallery.appendChild(img);
    }
}
/*
Delete gallery
 */
function clearGallery() {
    var divGallery = document.getElementById('gallery');
    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}
/*
Get function
 */
function getPage() {
    return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
}
function getUrl() {
    return "http://localhost:5400/gallery?page=" + getPage();
}
/*
Update function
 */
function updateURL(page) {
    window.history.pushState(window.location.href, null, "gallery?page=" + page);
}
/*
Set function
 */
function setPage(num) {
    localStorage.setItem('page', num);
}
/*
Catch click button "Next"
 */
var clickButtonNext = document.getElementById('next');
if (clickButtonNext) {
    clickButtonNext.addEventListener('click', function (ev) {
        ev.preventDefault();
        var page = Number(getPage());
        if (page >= 3) {
            setPage(String(3));
            updateURL(page);
            alert("It's last page");
        }
        else {
            updateURL(page + 1);
            setPage(String(page + 1));
            (function () { return getGallery(); })();
        }
    });
}
/*
Catch click button "Back"
 */
var clickButtonBack = document.getElementById('back');
if (clickButtonBack) {
    clickButtonBack.addEventListener('click', function (ev) {
        ev.preventDefault();
        var page = Number(getPage());
        if (page === 1) {
            updateURL(page);
            setPage(String(1));
            alert("It's first page");
        }
        else {
            updateURL(page - 1);
            setPage(String(page - 1));
            (function () { return getGallery(); })();
        }
    });
}
