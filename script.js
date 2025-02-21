class Calculatrice {
    constructor() {
        this.resultat = 0;
        this.historique = [];
    }

    verifierNombre(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
            throw new Error("Les entrées doivent être des nombres valides");
        }
        return true;
    }

    add(a, b) {
        if (this.verifierNombre(a, b)) {
            this.resultat = a + b;
            this.historique.push(`${a} + ${b} = ${this.resultat}`);
            return this.resultat;
        }
    }

    sous(a, b) {
        if (this.verifierNombre(a, b)) {
            this.resultat = a - b;
            this.historique.push(`${a} - ${b} = ${this.resultat}`);
            return this.resultat;
        }
    }

    multiplication(a, b) {
        if (this.verifierNombre(a, b)) {
            this.resultat = a * b;
            this.historique.push(`${a} × ${b} = ${this.resultat}`);
            return this.resultat;
        }
    }

    division(a, b) {
        if (this.verifierNombre(a, b)) {
            if (b === 0) {
                throw new Error("Division par zéro impossible");
            }
            this.resultat = a / b;
            this.historique.push(`${a} ÷ ${b} = ${this.resultat}`);
            return this.resultat;
        }
    }

    modulo(a, b) {
        if (this.verifierNombre(a, b)) {
            if (b === 0) {
                throw new Error("Modulo par zéro impossible");
            }
            this.resultat = a % b;
            this.historique.push(`${a} % ${b} = ${this.resultat}`);
            return this.resultat;
        }
    }

    getResultat() {
        return this.resultat;
    }

    getHistorique() {
        return this.historique;
    }
}

const calc = new Calculatrice();
let expression = '';
let operateur = '';
let nombre1 = null;
let nombre2 = null;

function handleClick(valeur) {
    if (['+', '-', '×', '÷', '%'].includes(valeur)) {
        if (nombre1 === null) {
            nombre1 = parseFloat(expression);
            operateur = valeur;
            expression = '';
        }
    } else {
        expression += valeur;
    }
    actualiserAffichage();
}

function calculer() {
    if (nombre1 !== null && expression !== '') {
        nombre2 = parseFloat(expression);
        try {
            let resultat;
            switch (operateur) {
                case '+': resultat = calc.add(nombre1, nombre2); break;
                case '-': resultat = calc.sous(nombre1, nombre2); break;
                case '×': resultat = calc.multiplication(nombre1, nombre2); break;
                case '÷': resultat = calc.division(nombre1, nombre2); break;
                case '%': resultat = calc.modulo(nombre1, nombre2); break;
            }
            document.getElementById('resultat').innerHTML = `= <span class="text-orange-500">${resultat}</span>`;
            nombre1 = resultat;
            expression = '';
            operateur = '';
        } catch (error) {
            document.getElementById('resultat').innerHTML = `<span class="text-red-500">${error.message}</span>`;
        }
    }
}

function actualiserAffichage() {
    let affichage = '';
    if (nombre1 !== null) {
        affichage += nombre1 + ' ' + operateur + ' ';
    }
    affichage += expression;
    document.getElementById('operation').textContent = affichage;
}

function effacer() {
    expression = '';
    operateur = '';
    nombre1 = null;
    nombre2 = null;
    document.getElementById('operation').textContent = '';
    document.getElementById('resultat').innerHTML = '= <span class="text-orange-500">0</span>';
}