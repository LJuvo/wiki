import * as d3 from "d3";
import { storeFloor } from "./storeFloor";
let FloorPane = () => {};

FloorPane.prototype.init = (eleId, data, resource) => {
    const containerWidth = document.getElementById(eleId).parentElement
        .offsetWidth;
    const containerHeight = document.getElementById(eleId).parentElement
        .offsetHeight;

    let basicRoomY = (containerHeight * 4.25) / 6;

    const svgEle = d3.select("#" + eleId);

    //地面网格绘制

    //地平面绘制
    let pop = svgEle.append("g");
    pop
        .append("polygon")
        .attr("points", basicGroundPane())
        .attr("fill", "#194362")
        .style("transform", "rotateX(70deg) rotateZ(-45deg) translateZ(-15vmin)");

    // pop
    //     .append("polygon")
    //     .attr("points", "100,100 400,100 400,400 100,400")
    //     .attr("fill", "#aaa")
    //     .style("transform", "rotateX(70deg) rotateZ(-45deg) translateZ(-15vmin)");

    let storeEle = svgEle.append("g");
    storeFloor(
        storeEle,
        containerHeight,
        containerWidth,
        "rotateX(70deg) rotateZ(-45deg) translateZ(-15vmin)"
    );
    // storeFloor(storeEle, containerHeight, containerWidth, "");
    // storeEle.style(
    //     "transform",
    //     "rotateX(70deg) rotateZ(-45deg) translateZ(-15vmin)"
    // );

    // pop
    //     .append("polygon")
    //     .attr("points", basicGroundWall())
    //     .attr("fill", "#0e2637");

    // //地面建筑
    // let basicBuild = svgEle.append("g");
    // basicBuild
    //     .append("polygon")
    //     .attr("points", basicGroundBuild())
    //     .attr("fill", "#64acd8");
    // // basicBuild.append("polygon").attr(
    // //     "points", basicGroundBWall()
    // // ).attr("fill", "#0e2637")

    // d3.svg("/ibms/static/floor/ltree.svg").then(result => {
    //     const baseroom = d3.select(result.documentElement).select("g");
    //     let tmp = basicBuild.append(baseroom.node());
    //     // tmp.setAttribute("width", 100)
    // });

    // //楼层高度
    // let roomRealHeight = (containerHeight * 3) / 6 / resource.length;
    // //A栋
    // let ABasicY = basicRoomY,
    //     ABasicX = (containerWidth * 1.5) / 6,
    //     ARoomWidth = (containerWidth * 0.75) / 6;
    // let BBasicY = (containerHeight * 4) / 6,
    //     BBasicX = (containerWidth * 3) / 6,
    //     BRoomWidth = containerWidth / 6;
    // let QBasicY = basicRoomY - (roomRealHeight + 20) / 2,
    //     QBasicX = ABasicX + ARoomWidth / 2,
    //     QRoomWidth = BBasicX + BRoomWidth / 2 - (ABasicX + ARoomWidth / 2);
    // let basicY = basicRoomY;

    // let resA = _.drop(resource, 10);
    // //A栋+B栋裙楼
    // resource.forEach(ele => {
    //     let gEle = svgEle.append("g");
    //     basicY -= roomRealHeight;
    //     // BBasicY -= roomRealHeight;

    //     switch (ele.type) {
    //         case -1:
    //             //地下
    //             underMaker(gEle);
    //             break;
    //         case 1:
    //             //一层
    //             firstMaker(gEle);
    //             break;
    //         case 2:
    //             //裙楼
    //             qunMaker(gEle);

    //             let coversEle = svgEle.append("g");
    //             coversEle
    //                 .append("polygon")
    //                 .attr(
    //                     "points",
    //                     roomQunCoverPos(
    //                         ABasicX,
    //                         basicY,
    //                         BBasicX,
    //                         basicY,
    //                         roomRealHeight,
    //                         ARoomWidth,
    //                         BRoomWidth
    //                     )
    //                 )
    //                 .attr("fill", "#a5c7e0")
    //                 .attr("stroke", "#2986b0");

    //             coversEle
    //                 .append("polygon")
    //                 .attr(
    //                     "points",
    //                     roomQunRCoverPos(
    //                         ABasicX,
    //                         basicY,
    //                         BBasicX,
    //                         basicY,
    //                         roomRealHeight,
    //                         ARoomWidth,
    //                         BRoomWidth
    //                     )
    //                 )
    //                 .attr("fill", "#a5c7e0")
    //                 .attr("stroke", "#2986b0");

    //             break;
    //         case 3:
    //             //A栋+B栋
    //             roomMaker(gEle);

    //             let BCoverEle = svgEle.append("g");
    //             BCoverEle.append("polygon")
    //                 .attr(
    //                     "points",
    //                     roomSliceBCover(ABasicX, basicY, roomRealHeight, ARoomWidth)
    //                 )
    //                 .attr("fill", "#a5c7e0")
    //                 .attr("stroke", "#2986b0");

    //             // BCoverEle.append("polygon").attr("points", roomQunRCoverPos(ABasicX, basicY, BBasicX, basicY, roomRealHeight, ARoomWidth, BRoomWidth))
    //             // .attr("fill", "#a5c7e0")
    //             // .attr("stroke", "#2986b0");

    //             break;
    //         case 4:
    //             //B栋
    //             highMaker(gEle);
    //             break;
    //         default:
    //             break;
    //     }

    //     wallMaker();
    // });

    //A栋
    // resA.forEach(ele => {
    //         let gEle = svgEle.append("g");
    //         ABasicY -= roomRealHeight;

    //         gEle.append("polygon").attr("points", roomSlicePos(ABasicX, ABasicY, roomRealHeight, ARoomWidth, "A"))
    //             .attr("fill", "#a5c7e0")
    //             .attr("stroke", "#2986b0")
    //             .attr('stroke-width', 0.5)
    //             // .attr("opacity", 0.6)
    //             .on("click", function() {
    //                 d3.select(this).style("fill", "#f15a24");
    //                 d3.selectAll(".checked-pane").style("fill", "#a5c7e0").classed("checked-pane", false);
    //                 d3.select(this).classed("checked-pane", true);
    //             })
    //             .on("mouseover", function() {
    //                 d3.select(this).attr('stroke', '#10dd23').attr('stroke-width', 4)
    //             })
    //             .on("mouseleave", function() {
    //                 d3.select(this).attr('stroke', '#2986b0').attr('stroke-width', 0.5)
    //                     // .attr("opacity", 0.6)
    //             })
    //     })
    //     //B栋
    // resource.forEach(ele => {
    //         let gEle = svgEle.append("g");
    //         BBasicY -= roomRealHeight + 1;

    //         gEle.append("polygon").attr("points", roomSlicePos(BBasicX, BBasicY, roomRealHeight, BRoomWidth, "B"))
    //             .attr("fill", "#a5c7e0")
    //             .attr("stroke", "#2986b0")
    //             .attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             .on("click", function() {
    //                 d3.select(this).style("fill", "#f15a24");
    //                 d3.selectAll(".checked-pane").style("fill", "#a5c7e0").classed("checked-pane", false);
    //                 d3.select(this).classed("checked-pane", true);
    //             })
    //             .on("mouseover", function() {
    //                 d3.select(this).attr('stroke', '#10dd23').attr('stroke-width', 4)
    //             })
    //             .on("mouseleave", function() {
    //                 d3.select(this).attr('stroke', '#2986b0').attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             })
    //     })
    //     //裙楼
    // let resQ = _.drop(resource, 20);
    // resQ.forEach(ele => {
    //         let gEle = svgEle.append("g");
    //         QBasicY -= roomRealHeight + 1;

    //         gEle.append("polygon").attr("points", roomSlicePos(QBasicX, QBasicY, roomRealHeight, QRoomWidth, "Q"))
    //             .attr("fill", "#a5c7e0")
    //             .attr("stroke", "#2986b0")
    //             .attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             .on("click", function() {
    //                 d3.select(this).style("fill", "#f15a24");
    //                 d3.selectAll(".checked-pane").style("fill", "#a5c7e0").classed("checked-pane", false);
    //                 d3.select(this).classed("checked-pane", true);
    //             })
    //             .on("mouseover", function() {
    //                 d3.select(this).attr('stroke', '#10dd23').attr('stroke-width', 4)
    //             })
    //             .on("mouseleave", function() {
    //                 d3.select(this).attr('stroke', '#2986b0').attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             })

    //         gEle.append("polygon").attr("points", roomSlicePos(QBasicX, QBasicY, roomRealHeight, QRoomWidth, "QR"))
    //             .attr("fill", "#a5c7e0")
    //             .attr("stroke", "#2986b0")
    //             .attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             .on("click", function() {
    //                 d3.select(this).style("fill", "#f15a24");
    //                 d3.selectAll(".checked-pane").style("fill", "#a5c7e0").classed("checked-pane", false);
    //                 d3.select(this).classed("checked-pane", true);
    //             })
    //             .on("mouseover", function() {
    //                 d3.select(this).attr('stroke', '#10dd23').attr('stroke-width', 4)
    //             })
    //             .on("mouseleave", function() {
    //                 d3.select(this).attr('stroke', '#2986b0').attr('stroke-width', 0.5).attr("opacity", 0.6)
    //             })
    //     })
    //楼层
    // //贝塞尔示例
    // let bezierArr = [];
    // let bezierNodesArr = [
    //     { x: 300, y: 300 },
    //     { x: 800, y: 400 },
    //     { x: 600, y: 200 },
    //     { x: 400, y: 400 },
    // ]
    // bezierNodesArr.push(bezierNodesArr[0]);
    // for (let i = 0; i < 1; i += 0.01) {
    //     bezierArr.push(bezierNodes(i, bezierNodesArr))
    // }

    // let bezierEle = svgEle.append("g");
    // bezierEle.append("polygon").attr("points", pointsArrFac(bezierArr))
    //     .attr("fill", "#a5c7e0")
    //     .attr("stroke", "#2986b0")
    //     .attr('stroke-width', 0.5).attr("opacity", 0.6)

    //封盖
    // let coverEle = svgEle.append("g").attr("title", "Cover");
    // coverEle.append("polygon").attr("points", coverGroundPos())
    //     .attr("height", roomRealHeight)
    //     .attr("fill", "#a5c7e0")
    //     .attr("stroke", "#2986b0")
    //     .attr('stroke-width', 0.5).attr("opacity", 0.6)

    //缩放
    let zoomobj = d3.zoom().scaleExtent([0.25, 4]);
    let zoom = zoomobj
        .on("zoom", function() {
            svgEle.selectAll("g").attr("transform", d3.event.transform);
        })
        .on("end", function() {});
    svgEle.call(zoom).on("wheel", () => d3.event.preventDefault());

    //封盖模型
    // let cover = svgEle.append("g").attr("x", containerWidth / 2 - 100)
    //     .attr("y", 40)
    //     // let coverGround = cover.append("g")
    // cover.append("polygon").attr("points", "810.9,207.7 769,197.2 810.9,187.4 1107.7,187.4 1149.7,197.2 1107.7,207.7").attr("fill", "#2986B0").attr("opacity", 0.3).attr("width", 300)
    //     .attr("height", 25)

    // cover.append("polygon").attr("points", "802.6,193.5 838.6,200.6 1081.4,200.6 1117.4,193.5 1117.4,164.9 1081.7,158 839,158 802.6,164.9  ").attr("fill", "#2986B0")
    //     .attr("width", 300)
    //     .attr("height", 25);

    // d3.svg("/ibms/static/floor/plane_underground.svg").then(result => {
    //     console.log(result);
    //     const baseroom = d3.select(result.documentElement)
    //         // svgEle.append(result.documentElement)
    //     let tmp = document.getElementById(eleId).appendChild(baseroom.node())
    //         // let tmp = svgEle.append(baseroom.node())

    //     // let tmp = document.getElementById(eleId).appendChild(result.documentElement)
    //     // const baseroom = d3.select(tmp);
    //     // console.log(baseroom);
    //     tmp.setAttribute("width", 300)
    // });

    //种树
    // d3.svg("/ibms/static/floor/ltree.svg").then(result => {
    //     const baseroom = d3.select(result.documentElement)
    //         // svgEle.append(result.documentElement)
    //     let tmp = document.getElementById(eleId).appendChild(baseroom.node())
    //         // let tmp = svgEle.append(baseroom.node())

    //     // let tmp = document.getElementById(eleId).appendChild(result.documentElement)
    //     // const baseroom = d3.select(tmp);
    //     // console.log(baseroom);
    //     tmp.setAttribute("width", 100)
    // });

    //基准楼层模型
    //地下空间模型

    //封盖顶

    //地平面
    function basicGroundPane() {
        let x1 = (containerWidth * 1.5) / 6,
            y1 = (containerHeight * 3) / 6,
            x2 = (containerWidth * 4.5) / 6,
            y2 = (containerHeight * 3) / 6,
            x23 = (containerWidth * 5.75) / 6,
            y23 = (containerHeight * 4) / 6,
            x3 = (containerWidth * 5.5) / 6,
            y3 = (containerHeight * 4.25) / 6 - 10,
            x4 = (containerWidth * 0.5) / 6,
            y4 = (containerHeight * 4.25) / 6 - 10;

        return (
            x1 +
            "," +
            y1 +
            " " +
            x2 +
            "," +
            y2 +
            " " +
            x23 +
            "," +
            y23 +
            " " +
            x3 +
            "," +
            y3 +
            " " +
            x4 +
            "," +
            y4 +
            " "
        );
    }

    function basicGroundWall() {
        let x1 = (containerWidth * 0.5) / 6,
            y1 = (containerHeight * 4.25) / 6 - 10,
            x2 = (containerWidth * 5.5) / 6,
            y2 = (containerHeight * 4.25) / 6 - 10,
            x3 = (containerWidth * 5.75) / 6,
            y3 = (containerHeight * 4) / 6,
            x4 = (containerWidth * 5.75) / 6,
            y4 = (containerHeight * 4) / 6 + 10,
            x5 = (containerWidth * 5.5) / 6,
            y5 = (containerHeight * 4.25) / 6,
            x6 = (containerWidth * 0.5) / 6,
            y6 = (containerHeight * 4.25) / 6;

        let mx =
            x1 +
            "," +
            y1 +
            " " +
            x2 +
            "," +
            y2 +
            " " +
            x3 +
            "," +
            y3 +
            " " +
            x4 +
            "," +
            y4 +
            " " +
            x5 +
            "," +
            y5 +
            " " +
            x6 +
            "," +
            y6 +
            " ";
        return mx;
    }
    //地面网格
    function groundBasicLineX(index, lens) {}

    function groundBasicLineY(index, lens) {}
    //地面建筑
    function basicGroundBuild() {
        let x1 = (containerWidth * 1.5) / 6 + 8,
            y1 = (containerHeight * 3) / 6 + 8,
            x2 = (containerWidth * 2) / 6,
            y2 = (containerHeight * 3) / 6 + 8,
            x3 = (containerWidth * 1.75) / 6,
            y3 = (containerHeight * 4) / 6 - 20,
            x4 = (containerWidth * 0.8) / 6 + 20,
            y4 = (containerHeight * 4) / 6,
            x5 = (containerWidth * 2) / 6 + 20,
            y5 = (containerHeight * 4) / 6,
            xea = (containerWidth * 2) / 6,
            yea = (containerHeight * 4.25) / 6 - 20,
            xe = (containerWidth * 0.5) / 6 + 20,
            ye = (containerHeight * 4.25) / 6 - 20;

        let circle = [{ x: x3, y: y3 }, { x: x4, y: y4 }, { x: x5, y: y5 }];
        let bezierCircleArr = [];
        for (let i = 0; i < 1; i += 0.01) {
            bezierCircleArr.push(bezierNodes(i, circle));
        }

        return (
            x1 +
            "," +
            y1 +
            " " +
            x2 +
            "," +
            y2 +
            " " +
            pointsArrFac(bezierCircleArr) +
            xea +
            "," +
            yea +
            " " +
            xe +
            "," +
            ye +
            " "
        );
    }

    function basicGroundBWall() {
        let x1 = (containerWidth * 1.5) / 6 + 10,
            y1 = (containerHeight * 3) / 6 + 10,
            x2 = (containerWidth * 2.5) / 6,
            y2 = (containerHeight * 3) / 6 + 10,
            x3 = (containerWidth * 2) / 6,
            y3 = (containerHeight * 5) / 6 - 20,
            x4 = (containerWidth * 0.5) / 6 + 10,
            y4 = (containerHeight * 5) / 6 - 20;

        let mx =
            x1 +
            "," +
            y1 +
            " " +
            x2 +
            "," +
            y2 +
            " " +
            x3 +
            "," +
            y3 +
            " " +
            x4 +
            "," +
            y4 +
            " ";
        return mx;
    }

    //基准定位点制片
    function roomSlicePos(x, y, sH, sW, type) {
        if (type == "A") return roomSliceA(x, y, sH, sW);
        if (type == "B") return roomSliceB(x, y, sH, sW);
        if (type == "Q") return roomSliceQ(x, y, sH, sW);
        if (type == "QR") return roomSliceQR(x, y, sH, sW);

        return "";
    }
    //地下
    function underMaker() {}

    //一层
    function firstMaker(gEle) {
        gEle
            .append("polygon")
            .attr(
                "points",
                roomFirstPos(
                    ABasicX,
                    basicY,
                    BBasicX,
                    basicY,
                    roomRealHeight,
                    ARoomWidth,
                    BRoomWidth
                )
            )
            .attr("fill", "#165f98")
            // .attr("stroke", "#2986b0")
            // .attr('stroke-width', 0.5)
            .on("click", function() {
                d3.select(this).style("fill", "#f15a24");
                d3.selectAll(".checked-pane")
                    .style("fill", "#a5c7e0")
                    .classed("checked-pane", false);
                d3.select(this).classed("checked-pane", true);
            })
            .on("mouseover", function() {
                d3.select(this)
                    .attr("stroke", "#10dd23")
                    .attr("stroke-width", 0.5)
                    .attr("opacity", 0.6);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .attr("stroke-width", 0)
                    .attr("opacity", 1);
            });
    }

    //裙楼
    function qunMaker(gEle) {
        gEle
            .append("polygon")
            .attr(
                "points",
                roomQunPos(
                    ABasicX,
                    basicY,
                    BBasicX,
                    basicY,
                    roomRealHeight,
                    ARoomWidth,
                    BRoomWidth
                )
            )
            .attr("fill", "#a5c7e0")
            .attr("stroke", "#2986b0")
            .attr("stroke-width", 0.5)
            .on("click", function() {
                d3.select(this).style("fill", "#f15a24");
                d3.selectAll(".checked-pane")
                    .style("fill", "#a5c7e0")
                    .classed("checked-pane", false);
                d3.select(this).classed("checked-pane", true);
            })
            .on("mouseover", function() {
                d3.select(this)
                    .attr("stroke", "#10dd23")
                    .attr("opacity", 0.6);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .attr("stroke", "#2986b0")
                    .attr("opacity", 1);
            });

        gEle
            .append("polygon")
            .attr(
                "points",
                roomQunRPos(
                    ABasicX,
                    basicY,
                    BBasicX,
                    basicY,
                    roomRealHeight,
                    ARoomWidth,
                    BRoomWidth
                )
            )
            .attr("fill", "#a5c7e0")
            .attr("stroke", "#2986b0")
            .attr("stroke-width", 0.5)
            .on("click", function() {
                d3.select(this).style("fill", "#f15a24");
                d3.selectAll(".checked-pane")
                    .style("fill", "#a5c7e0")
                    .classed("checked-pane", false);
                d3.select(this).classed("checked-pane", true);
            })
            .on("mouseover", function() {
                d3.select(this)
                    .attr("stroke", "#10dd23")
                    .attr("opacity", 0.6);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .attr("stroke", "#2986b0")
                    .attr("opacity", 1);
            });
    }

    //A栋+B栋
    function roomMaker(gEle) {
        gEle
            .append("polygon")
            .attr("points", roomSliceA(ABasicX, basicY, roomRealHeight, ARoomWidth))
            .attr("fill", "#a5c7e0")
            .attr("stroke", "#2986b0")
            .attr("stroke-width", 0.5)
            .on("click", function() {
                d3.select(this).style("fill", "#f15a24");
                d3.selectAll(".checked-pane")
                    .style("fill", "#a5c7e0")
                    .classed("checked-pane", false);
                d3.select(this).classed("checked-pane", true);
            })
            .on("mouseover", function() {
                d3.select(this)
                    .attr("stroke", "#10dd23")
                    .attr("opacity", 0.6);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .attr("stroke", "#2986b0")
                    .attr("opacity", 1);
            });

        gEle
            .append("polygon")
            .attr("points", roomSliceB(BBasicX, basicY, roomRealHeight, BRoomWidth))
            .attr("fill", "#a5c7e0")
            .attr("stroke", "#2986b0")
            .attr("stroke-width", 0.5)
            .on("click", function() {
                d3.select(this).style("fill", "#f15a24");
                d3.selectAll(".checked-pane")
                    .style("fill", "#a5c7e0")
                    .classed("checked-pane", false);
                d3.select(this).classed("checked-pane", true);
            })
            .on("mouseover", function() {
                d3.select(this)
                    .attr("stroke", "#10dd23")
                    .attr("opacity", 0.6);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .attr("stroke", "#2986b0")
                    .attr("opacity", 1);
            });
    }

    //B栋
    function highMaker() {}

    function roomSliceA(x, y, sH, sW) {
        let x1 = x,
            y1 = y,
            x12 = x + sW / 2,
            y12 = y - sH / 2,
            x2 = x + sW,
            y2 = y - sH - 20,
            x3 = x + sW - 2,
            y3 = y - 20,
            x34 = x + sW / 2,
            y34 = y + sH / 2,
            x4 = x - 2,
            y4 = y + sH;

        let top = [{ x: x1, y: y1 }, { x: x12, y: y12 }, { x: x2, y: y2 }],
            bottom = [{ x: x3, y: y3 }, { x: x34, y: y34 }, { x: x4, y: y4 }];

        return polygonArrFac(top, bottom);
    }

    function wallMaker() {}

    function roomSliceB(x, y, sH, sW) {
        y = y - 60;
        let x1 = x,
            y1 = y - 20,
            x12 = x + sW / 2,
            y12 = y + sH * 2,
            x2 = x + sW - 2,
            y2 = y + sH + 40,
            x3 = x + sW - 4,
            y3 = y + sH + 50,
            x34 = x + sW / 2,
            y34 = y + sH * 3,
            x4 = x - 2,
            y4 = y + sH - 20;
        let top = [{ x: x1, y: y1 }, { x: x12, y: y12 }, { x: x2, y: y2 }],
            bottom = [{ x: x3, y: y3 }, { x: x34, y: y34 }, { x: x4, y: y4 }];

        return polygonArrFac(top, bottom);
    }

    function roomSliceBCover(x, y, sH, sW) {
        let x1 = x,
            y1 = y,
            x12 = x + sW / 2,
            y12 = y - sH * 2 + 20,
            x2 = x + sW,
            y2 = y - sH - 20,
            x3 = x + sW - 10,
            y3 = y - sH - 22,
            x34 = x + sW / 2 - 35,
            y34 = y - sH * 2 - 10,
            x4 = x,
            y4 = y - sH / 2;
        let top = [{ x: x1, y: y1 }, { x: x12, y: y12 }, { x: x2, y: y2 }],
            bottom = [{ x: x3, y: y3 }, { x: x34, y: y34 }, { x: x4, y: y4 }];

        return polygonArrFac(top, bottom);
    }

    function roomSliceQ(x, y, sH, sW) {
        let x1 = x,
            y1 = y,
            x2 = sW / 2 + x,
            y2 = y - sH - 2,
            x3 = sW + x,
            y3 = y - sH - 2,
            x4 = sW + x,
            y4 = y - 2,
            x5 = sW / 2 + x,
            y5 = y - 2,
            x6 = x,
            y6 = y + sH;

        let top = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }],
            bottom = [{ x: x4, y: y4 }, { x: x5, y: y5 }, { x: x6, y: y6 }];

        return polygonArrFac(top, bottom);
    }

    function roomFirstPos(x, y, bx, by, sH, aW, bW) {
        let bc = by - y;
        let x1 = x,
            y1 = y,
            x12 = x + aW / 2,
            y12 = y - sH / 2,
            x2 = x + aW,
            y2 = y - sH - 20,
            x3 = bx - bc / 2,
            y3 = y - sH - 60,
            x4 = bx,
            y4 = y - sH - 60,
            x5 = bx + bW / 2,
            y5 = y - sH - 30,
            x6 = bx + bW,
            y6 = y,
            x7 = bx + bW - 5,
            y7 = y + sH,
            x8 = bx + bW / 2,
            y8 = y - 30,
            x9 = bx,
            y9 = y - 60,
            x10 = bx - bc / 2,
            y10 = y - 60,
            x11 = x + aW,
            y11 = y - 20,
            x1112 = x + aW / 2,
            y1112 = y + sH / 2,
            x112 = x - 5,
            y112 = y + sH;

        let top = [
                { x: x1, y: y1 },
                { x: x12, y: y12 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
                { x: x5, y: y5 },
                { x: x6, y: y6 }
            ],
            bottom = [
                { x: x7, y: y7 },
                { x: x8, y: y8 },
                { x: x9, y: y9 },
                { x: x10, y: y10 },
                { x: x11, y: y11 },
                { x: x1112, y: y1112 },
                { x: x112, y: y112 }
            ];

        return polygonArrFac(top, bottom);
    }

    function roomQunPos(x, y, bx, by, sH, aW, bW) {
        let bc = by - y;
        let x1 = x,
            y1 = y,
            x12 = x + aW / 2,
            y12 = y - sH / 2,
            x2 = x + aW,
            y2 = y - sH - 20,
            x3 = bx - bc / 2,
            y3 = y - sH - 60,
            x4 = bx,
            y4 = y - sH - 60,
            x5 = bx + bW / 2,
            y5 = y - sH - 30,
            x6 = bx + bW,
            y6 = y,
            x7 = bx + bW - 5,
            y7 = y + sH,
            x8 = bx + bW / 2,
            y8 = y - 30,
            x9 = bx,
            y9 = y - 60,
            x10 = bx - bc / 2,
            y10 = y - 60,
            x11 = x + aW,
            y11 = y - 20,
            x1112 = x + aW / 2,
            y1112 = y + sH / 2,
            x112 = x - 5,
            y112 = y + sH;

        let top = [
                { x: x1, y: y1 },
                { x: x12, y: y12 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
                { x: x5, y: y5 },
                { x: x6, y: y6 }
            ],
            bottom = [
                { x: x7, y: y7 },
                { x: x8, y: y8 },
                { x: x9, y: y9 },
                { x: x10, y: y10 },
                { x: x11, y: y11 },
                { x: x1112, y: y1112 },
                { x: x112, y: y112 }
            ];

        return polygonArrFac(top, bottom);
    }

    function roomQunRPos(x, y, bx, by, sH, aW, bW) {
        x = bx + bW + 20;
        bx = bx + bW + 60;

        let bc = by - y;
        let x1 = x,
            y1 = y,
            x12 = x + aW / 2,
            y12 = y - sH / 2,
            x2 = x + aW,
            y2 = y - sH - 20,
            x3 = x + aW + bc / 2,
            y3 = y - sH - 40,
            x4 = x + aW + bc,
            y4 = y - sH - 60,
            // x5 = bx + bW / 2,
            // y5 = y - sH - 80,
            x6 = bx + bW,
            y6 = y - 120,
            x7 = bx + bW,
            y7 = y + sH - 120,
            // x8 = bx + bW / 2,
            // y8 = y - 80,
            x9 = x + aW + bc,
            y9 = y - 60,
            x10 = x + aW + bc / 2,
            y10 = y - 40,
            x11 = x + aW,
            y11 = y - 20,
            x1112 = x + aW / 2,
            y1112 = y + sH / 2,
            x112 = x,
            y112 = y + sH;

        let top = [
                { x: x1, y: y1 },
                { x: x12, y: y12 },
                // { x: x2, y: y2 },
                // { x: x3, y: y3 },
                // { x: x4, y: y4 },
                // { x: x5, y: y5 },
                { x: x6, y: y6 }
            ],
            bottom = [
                { x: x7, y: y7 },
                // { x: x8, y: y8 },
                // { x: x9, y: y9 },
                // { x: x10, y: y10 },
                // { x: x11, y: y11 },
                { x: x1112, y: y1112 },
                { x: x112, y: y112 }
            ];

        // return polygonArrFac(top, bottom);
        return pointsArrFac(top) + pointsArrFac(bottom);
    }

    function roomQunRCoverPos(x, y, bx, by, sH, aW, bW) {
        x = bx + bW + 20;
        bx = bx + bW + 60;

        let bc = by - y;
        let x1 = x,
            y1 = y,
            x12 = x + aW / 2,
            y12 = y - sH / 2,
            x2 = x + aW,
            y2 = y - sH - 20,
            x3 = x + aW + bc / 2,
            y3 = y - sH - 40,
            x4 = x + aW + bc,
            y4 = y - sH - 60,
            // x5 = bx + bW / 2,
            // y5 = y - sH - 80,
            x6 = bx + bW,
            y6 = y - 120,
            x7 = bx + bW - bW / 6,
            y7 = y + sH - 140,
            // x8 = bx + bW / 2,
            // y8 = y - 80,
            x9 = x + aW + bc,
            y9 = y - 200,
            x10 = x + aW + bc / 2,
            y10 = y - 80,
            x11 = x + aW,
            y11 = y - 20,
            x1112 = x + aW / 2,
            y1112 = y - 100,
            x112 = x - bW,
            y112 = y - 80;

        let top = [
                { x: x1, y: y1 },
                { x: x12, y: y12 },
                // { x: x2, y: y2 },
                // { x: x3, y: y3 },
                // { x: x4, y: y4 },
                // { x: x5, y: y5 },
                { x: x6, y: y6 }
            ],
            bottom = [
                { x: x7, y: y7 },
                // { x: x8, y: y8 },
                // { x: x9, y: y9 },
                // { x: x10, y: y10 },
                // { x: x11, y: y11 },
                { x: x1112, y: y1112 },
                { x: x112, y: y112 }
            ];

        // return polygonArrFac(top, bottom);
        return pointsArrFac(top) + pointsArrFac(bottom);
    }

    function roomQunCoverPos(x, y, bx, by, sH, aW, bW) {
        let bc = by - y;
        let x1 = x,
            y1 = y,
            x12 = x + aW / 2,
            y12 = y - sH / 2,
            x2 = x + aW,
            y2 = y - sH - 20,
            x3 = bx - bc / 2,
            y3 = y - sH - 60,
            x4 = bx,
            y4 = y - sH - 60,
            x5 = bx + bW / 2,
            y5 = y - sH - 30,
            x6 = bx + bW,
            y6 = y,
            x7 = bx + bW - 5,
            y7 = y - sH - 30,
            x8 = bx + bW / 2,
            y8 = y - 60,
            x9 = bx,
            y9 = y - 60,
            x10 = bx - bc / 2,
            y10 = y - 160,
            x11 = x + aW,
            y11 = y - 120,
            x1112 = x + aW / 2,
            y1112 = y + sH / 2 - 40,
            x112 = x,
            y112 = y + sH - 40;

        let top = [
                { x: x1, y: y1 },
                { x: x12, y: y12 },
                { x: x2, y: y2 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
                { x: x5, y: y5 },
                { x: x6, y: y6 }
            ],
            bottom = [
                { x: x7, y: y7 },
                { x: x8, y: y8 },
                { x: x9, y: y9 },
                { x: x10, y: y10 },
                { x: x11, y: y11 },
                { x: x1112, y: y1112 },
                { x: x112, y: y112 }
            ];

        return polygonArrFac(top, bottom);
    }

    function roomSliceQR(x, y, sH, sW) {
        let x1 = x,
            y1 = y,
            x2 = sW / 2 + x,
            y2 = y - sH - 2,
            x3 = sW + x,
            y3 = y - sH - 2,
            x4 = sW + x,
            y4 = y - 2,
            x5 = sW / 2 + x,
            y5 = y - 2,
            x6 = x,
            y6 = y + sH;
        let top = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }],
            bottom = [{ x: x4, y: y4 }, { x: x5, y: y5 }, { x: x6, y: y6 }];

        return polygonArrFac(top, bottom);
    }

    //贝塞尔计算
    function bezierNodes(t, arr) {
        var x = 0,
            y = 0,
            bezierCtrlNodesArr = arr,
            n = bezierCtrlNodesArr.length - 1;
        arr.forEach(function(item, index) {
            if (!index) {
                x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
                y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
            } else {
                x +=
                    (factorial(n) / factorial(index) / factorial(n - index)) *
                    item.x *
                    Math.pow(1 - t, n - index) *
                    Math.pow(t, index);
                y +=
                    (factorial(n) / factorial(index) / factorial(n - index)) *
                    item.y *
                    Math.pow(1 - t, n - index) *
                    Math.pow(t, index);
            }
        });
        return {
            x: x,
            y: y
        };
    }
    //递归阶乘
    function factorial(num) {
        //递归阶乘
        if (num <= 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }

    //点组返回
    function pointsArrFac(arr) {
        let txt = "";
        arr.forEach(ele => {
            let { x, y } = ele;
            txt += x + "," + y + " ";
        });
        return txt;
    }
    //矩形点组返回
    function polygonArrFac(top, bottom) {
        let bezierTopArr = [],
            bezierBottomArr = [];
        for (let i = 0; i < 1; i += 0.01) {
            bezierTopArr.push(bezierNodes(i, top));
            bezierBottomArr.push(bezierNodes(i, bottom));
        }

        return pointsArrFac(bezierTopArr) + pointsArrFac(bezierBottomArr);
    }
};
export default FloorPane;