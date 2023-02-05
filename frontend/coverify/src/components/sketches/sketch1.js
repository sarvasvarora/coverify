// sketch1

import dynamic from "next/dynamic"

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

let diffusionArray;
let iter, maxIters;
let bRandom;
let colors;
let button;
let mode,modes;

export default function Sketch1(props) {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);
        diffusionArray = [];

        let colorScheme = {
            'Techno Vanilla': ['#333333', '#666A86', '#FF6700', '#E8DDB5'],
            'Retro Rainbow': ['#238DA5', '#599D6B', '#FDBC2E', '#C84A4D', '#2A303E'],
            'Halloween': ['#FA8334', '#1E3888', '#191308', '#C45AB3', '#89937C'],
            'Cooltone': ['#0081A7', '#00AFB9', '#291F1E', '#FED9B7', '#F07167'],
            'Salmon Blues': ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F'],
            'Gold Wine': ['#5F0F40', '#9A031E', '#FB8B24', '#E36414', '#0F4C5C'],
            'Japonica': ['#c9cba3', '#ffe1a8', '#e26d5c', '#723d46', '#472d30'],
            'Minimal Ice': ['#dd6e42', '#e8dab2', '#4f6d7a', '#c0d6df', '#eaeaea'],
            'Vintage Fire': ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00', '#CA6702', '#BB3E03', '#AE2012', '#9B2226'],
            'Flame Pea': ['#ee4a1b', '#61d5d4', '#3e73a2', '#bebc9e', '#060b0a'],
            'Jaguar Lavender': ["#e3170a", "#2a2b2a", "#fdb833", "#7d8491", "#c04cfd"],
            'Mandalay Glacier': ["#4f345a", "#e59500", "#7ebdc3", "#e3879e", "#f25c54"],
            'Pastel Tabasco': ['#F0B700', '#373000', '#E76C00', '#BA0000', '#CFCFC5'],
            'Guacamole': ['#85ADB3', '#BBBF45', '#A2A641', '#E7D7AD', '#BF544B'],
            'Blue Honey': ['#ABCEC0', '#F6DEB0', '#FFA034', '#26839C', '#252A2B'],
            'Red Pill Blue Pill': ['#2f4858', '#85adb3', '#e7d7ad', '#bf544b', '#2f4858'],
            'Purple Cabbage': ['#8C6582', '#8C5483', '#73246D', '#E3D3E4', '#3B0127'],
            'Highlighters': ['#565552', '#F9D400', '#FF721B', '#FF483A', '#3FD5E5', '#5F0F40', '#9A031E', '#FB8B24', '#E36414', '#0F4C5C'],
            'Grayscale': ['#000000', '#111111', '#222222', '#333333', '#444444', '#555555', '#666666', '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee', '#ffffff'],
            'Grayscale2': ['#000000', '#111111', '#222222', '#333333', '#444444'],
            'ch1': ["#722f37", "#ff7f50", "#ffc0cb", "#6495ed", "#7b68ee", "#9fa5dd", "#bfe1ed"],
            'ch2': ["#663399", "#e6e6fa", "#dda0dd", "#9370db", "#8a2be2", "#da70d6", "#d8bfd8"],
            'danc1': ["#8b0000", "#ff4500", "#ff6347", "#0000cd", "#1e90ff", "#87cefa", "#c6e6fb"],
            'trip1': ["#c10a65", "#ec2543", "#ffc0cb", "#170f0c", "#ffe600", "#add8e6", "#005fbd"],
            'h2': ["#8b0000", "#ff4500", "#ff6347", "#ff7256", "#ffa07a", "#ffdab9", "#ab9469"],
            'em5': ["#00008b", "#0000cd", "#1e90ff", "#87cefa", "#87ceeb", "#b0c4de", "#add8e6"]
        };

        const keys = Object.keys(colorScheme);
        const len = keys.length;
        const rnd = Math.floor(Math.random() * len);
        const rnd2 = Math.floor(Math.random() * len);
        var emo = (p5.random() < 0.2) ? true : false;
        if (emo) {
            colors = colorScheme['Grayscale2'].concat(colorScheme[keys[rnd2]]);
        }
        else{
            colors = colorScheme[keys[rnd]];
        }

        modes = ["s", "large", "small", "reg"]
        mode = p5.random(modes);

        // console.log(emo,mode);

        // colors = colorScheme['em5'];
        iter = 0;

        //27
        // 

        button = p5.createButton('Save');
        button.mousePressed(saveImage);
        button.class('saveButton');

        maxIters = p5.int(p5.random(1,4));
        function saveImage() {
            p5.save("MyCoverifyAlbum.png");
        }

        for (let i = 0; i < p5.width; i++) {
            diffusionArray[i] = [];
            for (let j = 0; j < p5.height; j++) {
                // diffusionArray[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    let xF, yF;
                    

                    bRandom = (p5.random() < 0.5) ? true : false;

                    switch (mode) {
                        case "s":
                            xF = p5.random(20, 25);
                            yF = p5.random(xF - 1, xF + 1);
                            break;
                        case "large":
                            xF = 100;
                            yF = 100;
                            break;
                        case "small":
                            xF = 15;
                            yF = 15;
                            break;
                        default:
                            xF = 40;
                            yF = 40;
                            break;
                    }

                    var cCol = colors[p5.int(p5.constrain(p5.noise(i / xF, j / yF), 0, 1) * colors.length)];
                    diffusionArray[i][j] = [p5.red(cCol), p5.green(cCol), p5.blue(cCol)];
                }
            }
        }

        p5.noLoop();
    };

    const draw = (p5) => {
        p5.background(20);
        let diff = 1;

        while (iter < maxIters) {
            for (let i = 0; i < p5.width; i++) {
                for (let j = 0; j < p5.height; j++) {
                    let sum = [0, 0, 0];
                    let diff = 0.05;

                    for (let k = 0; k < 3; k++) {

                        // n neighbors
                        let nN = 3;
                        for (let z = 1; z <= nN; z++) {
                            sum[k] += diffusionArray[Math.max(i - z, 0)][j][k]
                            sum[k] += diffusionArray[Math.min(i + z, p5.width - 1)][j][k]
                            sum[k] += diffusionArray[i][Math.max(j - z, 0)][k]
                            sum[k] += diffusionArray[i][Math.min(j + z, p5.height - 1)][k]
                        }

                        if (bRandom) sum[k] += (diffusionArray[p5.int(p5.random(p5.width))][p5.int(p5.random(p5.height))][k]) / 2;

                        sum[k] /= nN * 4;

                        diffusionArray[i][j][k] = sum[k] + diff;

                    }
                }
            }
            iter += 1
        }

        let col;
        for (let i = 0; i < p5.width; i++) {
            for (let j = 0; j < p5.height; j++) {
                // col.setAlpha(diffusionArray[i][j][k] * 255);
                col =p5.color(diffusionArray[i][j][0], diffusionArray[i][j][1], diffusionArray[i][j][2])
                p5.stroke(col);
                p5.point(i, j);
            }
        }
    };

    return <Sketch setup={setup} draw={draw} />;
};