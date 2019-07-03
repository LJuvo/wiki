import * as d3 from "d3";
let FloorGUI = () => {};

FloorGUI.prototype.init = (eleId, overCallback, clickCallback) => {
    const containerWidth = document.getElementById(eleId).parentElement
        .offsetWidth;
    const containerHeight = document.getElementById(eleId).parentElement
        .offsetHeight;

    const svgEle = d3.select("#" + eleId);

    let mouseSprite = svgEle.append("g");
    mouseSprite
        .append("rect")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .attr("fill", "#fefefe")
        .on("mousemove", function() {
            overCallback(d3.event.x, d3.event.y, containerWidth, containerHeight);
        })
        .on("click", function() {
            mouseSprite
                .append("circle")
                .attr("stroke", "gray")
                .attr("fill", "red")
                .attr("r", 3)
                .attr("cx", d3.event.x)
                .attr("cy", d3.event.y);
            clickCallback(d3.event.x, d3.event.y);
        });

    let wNum = containerWidth / 6;
    let hNum = containerHeight / 6;
    for (let i = 1; i < 6; i++) {
        let lineArr = [];
        lineArr.push([wNum * i, 0]);
        lineArr.push([wNum * i, containerHeight]);
        lineDrawColor(svgEle, lineArr, "#4caf50");
    }

    // let spriteDetail = svgEle.append("g");
    // spriteDetail
    //     .append("rect")
    //     .attr("x", containerWidth - 350)
    //     .attr("y", 50)
    //     .attr("width", 300)
    //     .attr("height", 300)
    //     .attr("fill", "rgba(0,0,0,0.6)");
    // spriteDetail
    //     .append("span")
    //     .html("当前X坐标:" + mouseX)
    //     .attr("color", "#ff0000");
};
let lineDrawColor = (lEle, data, color) => {
    let lineGenerator = d3
        .line()
        .x(function(d) {
            return d[0];
        })
        .y(function(d) {
            return d[1];
        });

    lEle
        .append("path")
        .attr("stroke", color)
        .attr("stroke-width", "1")
        .attr("fill", "none")
        .attr("d", lineGenerator(data));
};
let lineDraw1 = (lEle, data) => {
    let lineGenerator = d3
        .line()
        .x(function(d) {
            return d[0];
        })
        .y(function(d) {
            return d[1];
        });

    lEle
        .append("path")
        .attr("stroke", "#333")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", lineGenerator(data));
};
let lineDraw2 = (lEle, data) => {
    let lineGenerator = d3
        .line()
        .x(function(d) {
            return d[0];
        })
        .y(function(d) {
            return d[1];
        });
    let line2 = lineGenerator.defined(function(d, i, index) {
        return d[0] > 0 && d[1] > 0;
    })(data);

    return lEle
        .append("path")
        .attr("stroke", "green")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("d", line2);
};
export default FloorGUI;