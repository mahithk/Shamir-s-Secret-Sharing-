const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let c = 0;

    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let li = 1;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj] = points[j];
                li *= (-xj) / (xi - xj);
            }
        }

        c += yi * li;
    }

    return c;
}

function findSecretConstant(jsonInput) {
    const { keys, ...roots } = jsonInput;
    const n = keys.n;
    const k = keys.k;

    let points = [];

    for (let key in roots) {
        let x = parseInt(key);
        let base = parseInt(roots[key].base);
        let value = roots[key].value;
        let y = decodeValue(base, value);

        points.push([x, y]);

        if (points.length === k) {
            break;
        }
    }

    const constant = lagrangeInterpolation(points);
    return constant;
}

const jsonInput1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const jsonInput2 = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

console.log("Constant c for Test Case 1:", findSecretConstant(jsonInput1));
console.log("Constant c for Test Case 2:", findSecretConstant(jsonInput2));
