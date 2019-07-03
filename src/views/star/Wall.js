import { Shape, Vector2, MeshBasicMaterial, BoxGeometry, Mesh, Geometry } from 'three';

export default class Wall {
    constructor(result) {
        this.DEGS_TO_RADS = Math.PI / 180;
        this.DIGIT_0 = 48;
        this.DIGIT_9 = 57;
        this.COMMA = 44;
        this.SPACE = 32;
        this.PERIOD = 46;
        this.MINUS = 45;
        this.idx = 1;
        this.len = result.getAttribute('d').length;
        this.pathStr = result.getAttribute('d');
        this.Geometry = [];
        this.getWall = this.getWall.bind(this);
    }
    transformSVGPath() {
        let paths = [];
        let path = new Shape();
        let x = 0;
        let y = 0;
        let nx = 0;
        let ny = 0;
        let firstX = null;
        let firstY = null;
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;
        let rx = 0;
        let ry = 0;
        let xar = 0;
        let laf = 0;
        let sf = 0;
        let cx;
        let cy;
        let canRepeat;
        let enteredSub = false;
        let zSeen = false;
        let activeCmd = this.pathStr[0];
        while (this.idx <= this.len) {
            canRepeat = true;
            switch (activeCmd) {
                case 'M':
                    enteredSub = false;
                    x = this.getIndex();
                    y = this.getIndex();
                    path.moveTo(x, y);
                    activeCmd = 'L';
                    break;
                case 'm':
                    x += this.getIndex();
                    y += this.getIndex();
                    path.moveTo(x, y);
                    activeCmd = 'l';
                    break;
                case 'Z':
                case 'z':
                    canRepeat = false;
                    if (x !== firstX || y !== firstY) path.lineTo(firstX, firstY);
                    paths.push(path);
                    firstX = null;
                    firstY = null;
                    enteredSub = true;
                    path = new Shape();
                    zSeen = true;
                    break;
                case 'L':
                case 'H':
                case 'V':
                    nx = (activeCmd === 'V') ? x : this.getIndex();
                    ny = (activeCmd === 'H') ? y : this.getIndex();
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'l':
                case 'h':
                case 'v':
                    nx = (activeCmd === 'v') ? x : (x + this.getIndex());
                    ny = (activeCmd === 'h') ? y : (y + this.getIndex());
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'C':
                    x1 = this.getIndex();
                    y1 = this.getIndex();
                case 'S':
                    if (activeCmd === 'S') {
                        x1 = 2 * x - x2;
                        y1 = 2 * y - y2;
                    }
                    x2 = this.getIndex();
                    y2 = this.getIndex();
                    nx = this.getIndex();
                    ny = this.getIndex();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'c':
                    x1 = x + this.getIndex();
                    y1 = y + this.getIndex();
                case 's':
                    if (activeCmd === 's') {
                        x1 = 2 * x - x2;
                        y1 = 2 * y - y2;
                    }
                    x2 = x + this.getIndex();
                    y2 = y + this.getIndex();
                    nx = x + this.getIndex();
                    ny = y + this.getIndex();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'Q':
                    x1 = this.getIndex();
                    y1 = this.getIndex();
                case 'T':
                    if (activeCmd === 'T') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = this.getIndex();
                    ny = this.getIndex();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'q':
                    x1 = x + this.getIndex();
                    y1 = y + this.getIndex();
                case 't':
                    if (activeCmd === 't') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = x + this.getIndex();
                    ny = y + this.getIndex();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'A':
                    rx = this.getIndex();
                    ry = this.getIndex();
                    xar = this.getIndex() * this.DEGS_TO_RADS;
                    laf = this.getIndex();
                    sf = this.getIndex();
                    nx = this.getIndex();
                    ny = this.getIndex();
                    if (rx !== ry) {
                        console.warn('Forcing elliptical arc to be a circular one :(',
                            rx, ry);
                    }
                    x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
                    y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
                    let norm = Math.sqrt(
                        (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) /
                        (rx * rx * y1 * y1 + ry * ry * x1 * x1));
                    if (laf === sf) {
                        norm = -norm;
                    }
                    x2 = norm * rx * y1 / ry;
                    y2 = norm * -ry * x1 / rx;
                    cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
                    cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;
                    let u = new Vector2(1, 0);
                    let v = new Vector2((x1 - x2) / rx, (y1 - y2) / ry);
                    let startAng = Math.acos(u.dot(v) / u.length() / v.length());
                    if (u.x * v.y - u.y * v.x < 0) startAng = -startAng;
                    u.x = (-x1 - x2) / rx;
                    u.y = (-y1 - y2) / ry;
                    let deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
                    if (v.x * u.y - v.y * u.x < 0) deltaAng = -deltaAng;
                    if (!sf && deltaAng > 0) deltaAng -= Math.PI * 2;
                    if (sf && deltaAng < 0) deltaAng += Math.PI * 2;
                    path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
                    x = nx;
                    y = ny;
                    break;
                case ' ':
                    break;
                default:
                    throw new Error('weird path command: ' + activeCmd);
            }
            if (firstX === null && !enteredSub) {
                firstX = x;
                firstY = y;
            }
            if (canRepeat && this.nextIsNum()) continue;
            activeCmd = this.pathStr[this.idx++];
        }
        if (zSeen) {
            return paths;
        } else {
            paths.push(path);
            return paths;
        }
    }
    getIndex() {
        let index;
        let c;
        let isFloat = false;
        let s;
        while (this.idx < this.len) {
            c = this.pathStr.charCodeAt(this.idx);
            if (c !== this.COMMA && c !== this.SPACE) break;
            this.idx++;
        }
        if (c === this.MINUS) {
            index = this.idx++;
        } else {
            index = this.idx;
        }
        while (this.idx < this.len) {
            c = this.pathStr.charCodeAt(this.idx);
            if (this.DIGIT_0 <= c && c <= this.DIGIT_9) {
                this.idx++;
                continue;
            } else if (c === this.PERIOD) {
                this.idx++;
                isFloat = true;
                continue;
            }
            s = this.pathStr.substring(index, this.idx);
            return isFloat ? parseFloat(s) : parseInt(s);
        }
        s = this.pathStr.substring(index);
        return isFloat ? parseFloat(s) : parseInt(s);
    }
    nextIsNum() {
        let c;
        while (this.idx < this.len) {
            c = this.pathStr.charCodeAt(this.idx);
            if (c !== this.COMMA && c !== this.SPACE) break;
            this.idx++;
        }
        c = this.pathStr.charCodeAt(this.idx);
        return (c === this.MINUS || (this.DIGIT_0 <= c && c <= this.DIGIT_9));
    }
    getWall() {
        let res = this.transformSVGPath();
        for (let i = 0; i < res.length; i++) {
            let mesh = this.combinedVolume(this.createVolume(this.getNumberPoints(res[i])));
            return mesh;
        }
    }
    getNumberPoints(result) {
        const curves = result.curves;
        const vertices = [];
        for (let i = 0, len = curves.length; i < len; i++) {
            if (Math.abs(curves[i].v1.x - curves[i].v2.x) > Math.abs(curves[i].v1.y - curves[i].v2.y)) {
                for (let j = 1; j <= Math.abs(curves[i].v1.x - curves[i].v2.x); j++) {
                    if (curves[i].v1.x - curves[i].v2.x < 0 && curves[i].v1.y - curves[i].v2.y < 0) {
                        vertices.push({ x: curves[i].v1.x + j, y: 1, z: curves[i].v1.y + (j / (Math.abs(curves[i].v2.x - curves[i].v1.x) / Math.abs(curves[i].v2.y - curves[i].v1.y))) });
                    } else if ((curves[i].v1.x - curves[i].v2.x) > 0 && (curves[i].v1.y - curves[i].v2.y) < 0) {
                        vertices.push({ x: curves[i].v1.x, y: 1, z: curves[i].v1.y + (j / (Math.abs(curves[i].v2.x - curves[i].v1.x) / Math.abs(curves[i].v2.y - curves[i].v1.y))) });
                    } else if ((curves[i].v1.x - curves[i].v2.x) > 0 && (curves[i].v1.y - curves[i].v2.y) > 0) {
                        vertices.push({ x: curves[i].v1.x - j, y: 1, z: curves[i].v1.y - (j / (Math.abs(curves[i].v2.x - curves[i].v1.x) / Math.abs(curves[i].v2.y - curves[i].v1.y))) });
                    }
                }
            } else {
                for (let k = 1; k <= Math.abs(curves[i].v1.y - curves[i].v2.y); k++) {
                    if (curves[i].v1.x - curves[i].v2.x > 0 && curves[i].v1.y - curves[i].v2.y < 0) {
                        vertices.push({ x: curves[i].v1.x - (k / (Math.abs(curves[i].v2.y - curves[i].v1.y) / Math.abs(curves[i].v2.x - curves[i].v1.x))), y: 1, z: curves[i].v1.y + k });
                    } else if (curves[i].v1.x - curves[i].v2.x > 0 && curves[i].v1.y - curves[i].v2.y > 0) {
                        vertices.push({ x: curves[i].v1.x - (k / (Math.abs(curves[i].v2.y - curves[i].v1.y) / Math.abs(curves[i].v2.x - curves[i].v1.x))), y: 1, z: curves[i].v1.y - k });
                    } else if (curves[i].v1.x - curves[i].v2.x < 0 && curves[i].v1.y - curves[i].v2.y > 0) {
                        vertices.push({ x: curves[i].v1.x + (k / (Math.abs(curves[i].v2.y - curves[i].v1.y) / Math.abs(curves[i].v2.x - curves[i].v1.x))), y: 1, z: curves[i].v1.y - k });
                    }
                }
            }
        }
        return vertices;
    }
    createVolume(result) {
        let boxGeometry = new BoxGeometry(1, 100, 10);
        let material = new MeshBasicMaterial({ color: 'red' });
        let mesh = new Mesh(boxGeometry, material);
        for (let i = 0; i < result.length; i++) {
            let meshs = mesh.clone();
            meshs.name = 'wall';
            meshs.position.set(result[i].x, result[i].y, result[i].z);
            this.Geometry.push(meshs);
        }
        return this.Geometry;
    }
    combinedVolume(result) {
        let len = result.length;
        let geometry = new Geometry();
        for (let i = 0; i < len; i++) {
            result[i].updateMatrix();
            geometry.merge(result[i].geometry, result[i].matrix);
        }
        let material = new MeshBasicMaterial({ color: 'red' });
        let mesh = new Mesh(geometry, material);
        return mesh;
    }
}