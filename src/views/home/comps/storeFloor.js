import * as d3 from "d3";
import { bezierNodes, pointsArrFac, polygonArrFac } from "./pointFunc";

let storeFloor = (ele, containHeight, containerWidth, rotateStyle) => {
    // ele
    //     .append("polygon")
    //     .attr("points", "100,100 400,100 400,400 100,400")
    //     .attr("fill", "#aaa");

    ele
        .append("polygon")
        .attr("points", "500,100 600,100 600,600 500,600")
        .attr("fill", "#aaa")
        .style("transform", rotateStyle);

    ele
        .append("polygon")
        .attr("points", squareShape(100, 500, 200, 200))
        .attr("fill", "#aaa")
        .style("transform", rotateStyle);

    ele
        .append("polygon")
        .attr("points", triangleShape(300, 500, 200, 200))
        .attr("fill", "#aaa")
        .style("transform", rotateStyle);
    ele
        .append("polygon")
        .attr("points", triangleUpShape(300, 500, 200, 200))
        .attr("fill", "#aaa")
        .style("transform", rotateStyle);
};

let squareShape = (x, y, sH, sW) => {
    let arr = [
        { x: x, y: y },
        { x: x + sW, y: y },
        { x: x + sW, y: y + sH },
        { x: x, y: y + sH }
    ];

    return pointsArrFac(arr);
};
let triangleShape = (x, y, sH, sW) => {
    let arr = [{ x: x, y: y }, { x: x + sW / 2, y: y + sH }, { x: x + sW, y: y }];

    return pointsArrFac(arr);
};
let triangleUpShape = (x, y, sH, sW) => {
    let arr = [{ x: x, y: y }, { x: x + sW / 2, y: y - sH }, { x: x + sW, y: y }];

    return pointsArrFac(arr);
};

let trapezoidShape = (x, y, sH, sW) => {};
export { storeFloor };