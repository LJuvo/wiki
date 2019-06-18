import * as d3 from "d3";

let mars = () => {};
let containerWidth, containerHeight, marSvg;

let Init = (id, devState) => {
    containerWidth = document.getElementById(id).offsetWidth;
    containerHeight = document.getElementById(id).offsetHeight;

    marSvg = d3
        .select("#" + id)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);

    if (devState) createDevRect();
};

let createDevRect = () => {
    let rect = marSvg.append("g");
    rect
        .append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "#F6F6F6")
        .attr("stroke", "#555");
};

mars.prototype.APP = (id, devState) => {
    Init(id, devState);
};

export default mars;