var roomTheRobotIs = 0;
var dirtiness = [0, 0, 0, 0];
var DIRTY_AMOUNT = 15;
var greedMode = true;
var auto = true;

$(document).ready(function() {
    $('.room').click(function() {
        increaseDirty(this.id);
    });

    function increaseDirty(i){
        if (dirtiness[i] < 2) {
            dirtiness[i] += 1;
            switch (dirtiness[i]) {
                case 1:
                    $('#' + i).removeClass('button-no-dirt').addClass('button-dirt');
                    break;
                case 2:
                    $('#' + i).removeClass('button-dirt').addClass('button-dirt-2');
                    break;
            }
        }
    }

    $('#RIGHT').click(function() {
        right();
    });

    $('#LEFT').click(function() {
        left();
    });

    $('#DOWN').click(function() {
        down();
    });

    $('#UP').click(function() {
        up();
    });

    $('#SUCK').click(function() {
        cleanRoom(roomTheRobotIs);
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

    $('#MODE').click(function() {
        if(auto) {
            if(greedMode) {
                greedMode = false;
                $(this).text('Cycle Mode');
                $("#r1").css("background-color", "#6464b6");
            } else {
                greedMode = true;
                $(this).text('Greed Mode');
                $("#r1").css("background-color", "#64b664");
            }
        }
    });

    automaticMode();

});

function cleanRoom(roomId){
    if(dirtiness[roomId] === 2){
        dirtiness[roomTheRobotIs] = 0;
        $('#action').text("Cleaning...").css({'font-family': 'Arial, serif;'});
        setTimeout(
            () => {
                        $('#action').text("");
                        $("#"+roomId).removeClass(['button-dirt', 'button-dirt-2']).addClass('button-no-dirt');
                    },
            6000
        );
    }
    else if (dirtiness[roomId] === 1) {
        dirtiness[roomTheRobotIs] = 0;
        $('#action').text("Cleaning...").css({'font-family': 'Arial, serif;'});
        setTimeout(
            () => {
                $('#action').text("");
                $("#"+roomId).removeClass(['button-dirt', 'button-dirt-2']).addClass('button-no-dirt');
            },
            3000
        );
    }
}

function right() {
    if(roomTheRobotIs === 0){
        roomTheRobotIs = 1;
    }
    if(roomTheRobotIs === 2){
        roomTheRobotIs = 3;
    }

    $('#r1').animate({left: '250px'}, 2000);
}

function left() {
    if(roomTheRobotIs === 1){
        roomTheRobotIs = 0;
    }
    if(roomTheRobotIs === 3){
        roomTheRobotIs = 2;
    }

    $('#r1').animate({left: '0px'}, 2000);
}

function down() {
    if(roomTheRobotIs === 0){
        roomTheRobotIs = 2;
    }
    if(roomTheRobotIs === 1){
        roomTheRobotIs = 3;
    }

    $('#r1').animate({top: '250px'}, 2000);
}

function up() {
    if(roomTheRobotIs === 2){
        roomTheRobotIs = 0;
    }
    if(roomTheRobotIs === 3){
        roomTheRobotIs = 1;
    }

    $('#r1').animate({top: '0px'}, 2000);
}

function goToNextRoom(){
    switch(roomTheRobotIs){
        case 0:
            right();
            break;
        case 1:
            down();
            break;
        case 2:
            up();
            break;
        case 3:
            left();
            break;
    }
}

function goToPreviousRoom(){
    switch(roomTheRobotIs){
        case 0:
            down();
            break;
        case 1:
            left();
            break;
        case 2:
            right();
            break;
        case 3:
            up();
            break;
    }
}

function getNextRoom(){
    switch(roomTheRobotIs){
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

function getPreviousRoom(){
    switch(roomTheRobotIs){
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

function decideRoom(){
    if(dirtiness[roomTheRobotIs] > dirtiness[getNextRoom()] && dirtiness[roomTheRobotIs] > dirtiness[getPreviousRoom()]){
        cleanRoom(roomTheRobotIs);
        return;
    }
    if(dirtiness[getNextRoom()] > dirtiness[getPreviousRoom()]){
        goToNextRoom();
    }
    else{
        goToPreviousRoom();
    }
}

function automaticMode(){
    if(auto) {
        if(dirtiness[roomTheRobotIs] === 2){
            cleanRoom(roomTheRobotIs);
            setTimeout(
                () => {automaticMode()},
                6000
            );
        }
        else if (dirtiness[roomTheRobotIs] === 1) {
            cleanRoom(roomTheRobotIs);
            setTimeout(
                () => {automaticMode()},
                3000
            );
        }
        else{
            if(greedMode) {
                decideRoom();
            } else {
                goToPreviousRoom();
            }
            setTimeout(
                () => {automaticMode()},
                3000
        );
        }
    } else {
        setTimeout(
            () => { automaticMode() },
            2000
    );
    }
}