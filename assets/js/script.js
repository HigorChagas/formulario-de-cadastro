class ValidaFormulario {
    constructor() {
        this.form = document.querySelector('.formulario');

        this.eventos();
    }

    eventos() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.isValid();
        const validPasswords = this.validPasswords();

        if(validFields && validPasswords) {
            alert('Formulário enviado');
            this.form.submit();
        } 
    }

    validPasswords() {
        let valid = true;

        const password = this.form.querySelector('#senha');
        const confirmPassword = this.form.querySelector('#repetir-senha');

        if(password.value !== confirmPassword.value) {
            valid = false;
            this.createError(password, 'Campos de senha e repetir senha precisam ser iguais.');
            this.createError(confirmPassword, 'Campos de senha e repetir senha precisam ser iguais.');
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres');
        }

        return valid;
    }

    isValid() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText;

            if(!field.value) {
                this.createError(field, `Campo ${label} não pode estar em branco`);
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.confirmCPF(field)) valid = false;
            }

            if(field.classList.contains('usuario')) {
                if(!this.confirmUser(field)) valid = false;
            }
        };

        return valid;
    }

    confirmUser(field) {
        const user = field.value;

        let valid = true;

        if(user.length < 3 || user.length > 12) {
            this.createError(field, 'O nome de usuário precisa ter entre 3 e 12 caracteres');
            valid =  false;
        }

        if(!user.match(/^[a-zA-Z0-9]+/g)) {
            this.createError(field, 'O nome de usuário precisa conter apenas letras e/ou números');
            valid = false;
        }

        return valid;
    }

    confirmCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if(!cpf.valida()) {
            this.createError(field, 'CPF inválido');
            return false;
        }

        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
    
}

const valida = new ValidaFormulario();