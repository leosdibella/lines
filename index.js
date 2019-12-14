(function() {
    'use strict';

    const addLineInterval = 1;
    const lines = [];
    let paintCounter = 0;

    function generateRandomInteger(lowerBound = 0, upperBound = 1) {
        return Math.round(((upperBound - lowerBound) * Math.random()) + lowerBound);
    }

    function generateRandomColor() {
        return [
            generateRandomInteger(0, 256),
            generateRandomInteger(0, 256),
            generateRandomInteger(0, 256)
        ];
    }

    function getLineElement(dy, dx, x, color) {
        const element = document.createElement('div');

        element.classList.add('line');
        element.style.height = dy + 'px';
        element.style.width = dx + 'px';
        element.style.backgroundColor = color;
        element.style.left = x + 'px';
        element.style.top = '0px';
        element.style.position = 'absolute';
        element.style.backgroundColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';

        return element;
    }

    function Line(dy, dx, x, speed, accelration, color) {
        this.speed = speed;
        this.y = 0;
        this.frame = 0;
        this.element = getLineElement(dy, dx, x, color);

        this.isTerminal = function () {
            return this.y + dy >= window.innerHeight;
        }

        this.draw = function () {
            ++this.frame;
            this.y += this.speed + (accelration * this.frame);
            this.element.style.top = this.y + 'px';
        }
    }

    function generateRandomLine() {
        const dx = generateRandomInteger(2, 8);

        return new Line(
            generateRandomInteger(10, 50),
            dx,
            generateRandomInteger(0, window.innerWidth - dx),
            generateRandomInteger(1, 10),
            generateRandomInteger(0, 10),
            generateRandomColor()
        );
    }

    function cleanupLines() {
        for (let i = lines.length - 1; i >= 0; --i) {
            if (lines[i].isTerminal()) {
                document.body.removeChild(lines[i].element);
                lines.splice(i, 1);
            } 
        }
    }

    function addLine() {
        const line = generateRandomLine();

        lines.push(line);
        document.body.appendChild(line.element);
    }

    function paintLines() {
        cleanupLines();
        ++paintCounter;

        if (paintCounter === addLineInterval) {
            addLine();
            paintCounter = 0;
        }

        requestAnimationFrame(function () {
            for (let i = 0; i < lines.length; ++i) {
                lines[i].draw();
            }

            paintLines();
        });
    }

    function initializeLines() {
        const seed = generateRandomInteger(3, 7);

        for (let i = 0; i < seed; ++i) {
            addLine();
        }

        paintLines();
    }

    initializeLines();
})(); 