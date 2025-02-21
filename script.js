class Calculatrice {
    constructor() {
        this.ecran = document.getElementById('ecran');
        this.resultat = document.getElementById('resultat');
        this.operation = '';
        this.lastResult = null;
        this.newNumber = true;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Ajout des événements pour les nombres
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.value);
            });
        });

        // Ajout des événements pour les opérateurs
        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                this.appendOperator(button.dataset.value);
            });
        });

        // Ajout de l'événement pour le bouton égal
        document.querySelector('.equal').addEventListener('click', () => {
            this.calculate();
        });

        // Ajout de l'événement pour le bouton clear
        document.querySelector('.clear').addEventListener('click', () => {
            this.clear();
        });
    }

    // Méthode pour vérifier si l'entrée est un nombre
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Méthode d'addition
    add(a, b) {
        if (!this.isNumber(a) || !this.isNumber(b)) return false;
        return a + b;
    }

    // Méthode de soustraction
    sous(a, b) {
        if (!this.isNumber(a) || !this.isNumber(b)) return false;
        return a - b;
    }

    // Méthode de multiplication
    multiplication(a, b) {
        if (!this.isNumber(a) || !this.isNumber(b)) return false;
        return a * b;
    }

    // Méthode de division
    division(a, b) {
        if (!this.isNumber(a) || !this.isNumber(b)) return false;
        if (b === 0) {
            alert("Division par zéro impossible!");
            return false;
        }
        return a / b;
    }

    // Méthode de modulo
    modulo(a, b) {
        if (!this.isNumber(a) || !this.isNumber(b)) return false;
        if (b === 0) {
            alert("Modulo par zéro impossible!");
            return false;
        }
        return a % b;
    }

    // Méthode pour ajouter un nombre à l'écran
    appendNumber(number) {
        if (this.lastResult !== null && this.newNumber) {
            this.operation = '';
            this.lastResult = null;
            this.newNumber = false;
        }
        this.operation += number;
        this.ecran.textContent = this.operation;
        this.resultat.textContent = '';
    }

    // Méthode pour ajouter un opérateur à l'écran
    appendOperator(operator) {
        if (this.lastResult !== null) {
            this.operation = this.lastResult + operator;
            this.newNumber = false;
            this.lastResult = null;
        } else if (this.operation !== '' &&
            !['+', '-', '*', '/', '%', '(', ')'].includes(this.operation[this.operation.length - 1])) {
            this.operation += operator;
        }
        this.ecran.textContent = this.operation;
        this.resultat.textContent = '';
    }

    // Méthode pour effacer l'écran
    clear() {
        this.operation = '';
        this.lastResult = null;
        this.newNumber = true;
        this.ecran.textContent = '';
        this.resultat.textContent = '';
    }

    // Méthode globale pour gérer les opérations
    calculate() {
        try {
            // Vérification de la présence d'opérateurs valides
            if (!/[+\-*/%]/.test(this.operation)) {
                throw new Error("Opération invalide");
            }

            // Évaluation sécurisée de l'expression
            let result = this.evaluateExpression(this.operation);

            // Vérification du résultat
            if (result === false || !this.isNumber(result)) {
                throw new Error("Résultat invalide");
            }

            // Affichage du résultat
            this.lastResult = result;
            this.newNumber = true;
            this.resultat.textContent = "= " + result;
        } catch (error) {
            alert("Erreur de calcul : " + error.message);
            this.clear();
        }
    }

    // Méthode pour évaluer l'expression de manière sécurisée
    evaluateExpression(expression) {
        let numbers = expression.split(/[+\-*/%]/).map(Number);
        let operators = expression.split(/[0-9.]+/).filter(op => op !== '');

        if (numbers.some(n => !this.isNumber(n))) {
            return false;
        }

        let result = numbers[0];
        for (let i = 0; i < operators.length; i++) {
            const nextNumber = numbers[i + 1];
            switch (operators[i]) {
                case '+':
                    result = this.add(result, nextNumber);
                    break;
                case '-':
                    result = this.sous(result, nextNumber);
                    break;
                case '*':
                    result = this.multiplication(result, nextNumber);
                    break;
                case '/':
                    result = this.division(result, nextNumber);
                    break;
                case '%':
                    result = this.modulo(result, nextNumber);
                    break;
                default:
                    return false;
            }

            if (result === false) {
                return false;
            }
        }

        return result;
    }
}

// Initialisation de la calculatrice
document.addEventListener('DOMContentLoaded', () => {
    new Calculatrice();
});