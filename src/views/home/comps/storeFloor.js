import * as d3 from "d3";
import { bezierNodes, pointsArrFac, polygonArrFac } from "./pointFunc";

let storeFloor = ele => {
    ele
        .append("polygon")
        .attr("points", "100,100 400,100 400,400 100,400")
        .attr("fill", "#aaa");

    ele
        .append("polygon")
        .attr("points", "500,100 600,100 600,600 500,600")
        .attr("fill", "#aaa");

    // ele
    //     .append("polygon")
    //     .attr("points", basicGroundPane())
    //     .attr("fill", "#194362");
    // .style("transform", "rotateX(70deg) rotateZ(-45deg) translateZ(-15vmin)");
};

export { storeFloor };