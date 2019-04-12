let quartoRoboEsta = 0;
let sujeiras = [0, 0, 0, 0];
let auto = true;

$(document).ready(function() {
    $('.quarto').click(function() {
        aumentarSujeira(this.id);
    });

    $('#DIREITA').click(function() {
        direita();
    });

    $('#ESQUERDA').click(function() {
        esquerda();
    });

    $('#BAIXO').click(function() {
        baixo();
    });

    $('#CIMA').click(function() {
        cima();
    });

    $('#LIMPAR').click(function() {
        limparQuarto(quartoRoboEsta);
    });

    $('#AUTO').click(function() {
        if(auto) {
            auto = false;
            $(this).text('Auto Off');
        } else {
            auto = true;
            $(this).text('Auto On');
        }
    });

    modoAutomatico();

});

function aumentarSujeira(i){
    if (sujeiras[i] < 2) {
        sujeiras[i] += 1;
        let ind = $('#' + i);
        switch (sujeiras[i]) {
            case 1:
                ind.removeClass('button-no-dirt').addClass('button-dirt');
                break;
            case 2:
                ind.removeClass('button-dirt').addClass('button-dirt-2');
                break;
        }
    }
}

function limparQuarto(idQuarto){
    if(sujeiras[idQuarto] === 2){
        sujeiras[quartoRoboEsta] = 0;
        $('#acao').text("Limpando...");
        setTimeout(
            () => {
                        $('#acao').text("");
                        $("#"+idQuarto).removeClass(['button-dirt', 'button-dirt-2']).addClass('button-no-dirt');
                    },
            6000
        );
    }
    else if (sujeiras[idQuarto] === 1) {
        sujeiras[quartoRoboEsta] = 0;
        $('#acao').text("Limpando...");
        setTimeout(
            () => {
                $('#acao').text("");
                $("#"+idQuarto).removeClass(['button-dirt', 'button-dirt-2']).addClass('button-no-dirt');
            },
            3000
        );
    }
}

function direita() {
    if(quartoRoboEsta === 0){
        quartoRoboEsta = 1;
    }
    else if(quartoRoboEsta === 2){
        quartoRoboEsta = 3;
    }

    $('#r1').animate({left: '250px'}, 2000);
}

function esquerda() {
    if(quartoRoboEsta === 1){
        quartoRoboEsta = 0;
    }
    else if(quartoRoboEsta === 3){
        quartoRoboEsta = 2;
    }

    $('#r1').animate({left: '0'}, 2000);
}

function baixo() {
    if(quartoRoboEsta === 0){
        quartoRoboEsta = 2;
    }
    else if(quartoRoboEsta === 1){
        quartoRoboEsta = 3;
    }

    $('#r1').animate({top: '250px'}, 2000);
}

function cima() {
    if(quartoRoboEsta === 2){
        quartoRoboEsta = 0;
    }
    else if(quartoRoboEsta === 3){
        quartoRoboEsta = 1;
    }

    $('#r1').animate({top: '0'}, 2000);
}

function irProximoQuarto(){
    switch(quartoRoboEsta){
        case 0:
            direita();
            break;
        case 1:
            baixo();
            break;
        case 2:
            cima();
            break;
        case 3:
            esquerda();
            break;
    }
}

function irQuartoAnterior(){
    switch(quartoRoboEsta){
        case 0:
            baixo();
            break;
        case 1:
            esquerda();
            break;
        case 2:
            direita();
            break;
        case 3:
            cima();
            break;
    }
}

function getProximoQuarto(){
    switch(quartoRoboEsta){
        case 0:
            return 1;
        case 1:
            return 3;
        case 2:
            return 0;
        case 3:
            return 2;
    }
}

function getQuartoAnterior(){
    switch(quartoRoboEsta){
        case 1:
            return 0;
        case 3:
            return 1;
        case 0:
            return 2;
        case 2:
            return 3;
    }
}

function decidirQuarto(){
    if(sujeiras[quartoRoboEsta] > sujeiras[getProximoQuarto()] && sujeiras[quartoRoboEsta] > sujeiras[getQuartoAnterior()]){
        limparQuarto(quartoRoboEsta);
    }
    else if(sujeiras[getProximoQuarto()] < sujeiras[getQuartoAnterior()]){
        irQuartoAnterior();
    }
    else{
        irProximoQuarto();
    }
}

function modoAutomatico(){
    if(auto) {
        if(sujeiras[quartoRoboEsta] === 2){
            limparQuarto(quartoRoboEsta);
            setTimeout(
                () => {modoAutomatico()},
                6000
            );
        }
        else if (sujeiras[quartoRoboEsta] === 1) {
            limparQuarto(quartoRoboEsta);
            setTimeout(
                () => {modoAutomatico()},
                3000
            );
        }
        else{
            decidirQuarto();
            setTimeout(
                () => {modoAutomatico()},
                3000
            );
        }
    }
    else {
        setTimeout(
            () => {modoAutomatico()},
            2000
        );
    }
}