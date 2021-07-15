
const game = {
    username: null,
    stage: 1,
    time: 11,
    cleanScore: 5,
    loveScore: 5,
    foodScore: 5,
    start() {
        game.username = $('input').val();
        game.hideMessage();
        game.newPig();
        game.displayName();
        game.updateScores();
        game.startMeter();
        game.startTimer();
    },
    hideMessage() {
        $('#message').hide();
        $('input').remove();
        $('#start-button').remove();
    },
    newPig() {
        $('#main-image img').attr('src', './images/pig-baby.png');
    },
    displayName() {
        $('#main-image').prepend(`<h2><em>${game.username}</em></h2>`);
    },
    updateScores(){
        $('#clean-score').text(`${game.cleanScore}`);
        $('#love-score').text(`${game.loveScore}`);
        $('#food-score').text(`${game.foodScore}`);
        $('#clean-button').on('click', function() {
            $('#clean-score').text(`${game.cleanScore+=1}`);
        });
        $('#love-button').on('click', function() {
            $('#love-score').text(`${game.loveScore+=1}`);
        });
        $('#food-button').on('click', function() {
            $('#food-score').text(`${game.foodScore+=1}`);
        });
    },

    // GAME TIMER 10 SECONDS //
    timer: null,
    startTimer() {
        this.timer = setInterval(game.reduceTime, 1000);
    },
    reduceTime() {
        game.time--;
        console.log(game.time);
        if (game.cleanScore === 0 || game.foodScore === 0 || game.loveScore === 0) { //lost game
            clearInterval(game.timer);
        } else if (game.time <=0) { //advance game
            game.stage+=1;
            clearInterval(game.timer);
            game.cleanScore = 6; 
            game.loveScore = 6;
            game.foodScore = 6
            if (game.stage === 2) {
                $('#main-image img').attr('src', './images/pig-piglet.png');
                game.time = 11;
                game.startTimer();
            } else if (game.stage === 3) {
                $('#main-image img').attr('src', './images/pig-adult.svg');
                game.time = 11;
                game.startTimer();
            } else {
                console.log('you won');
                $('#clean-score').hide(); 
                $('#love-score').hide(); 
                $('#food-score').hide(); 
                game.transferStage();
            }   
        }
    },

    // METER TIMER //
    meter: null,
    startMeter(){
        this.meter = setInterval(game.reduceMeter, 1000);
    },
    reduceMeter(){
        game.cleanScore--;
        game.loveScore--;
        game.foodScore--;
        $('#clean-score').text(`${game.cleanScore}`);
        $('#love-score').text(`${game.loveScore}`);
        $('#food-score').text(`${game.foodScore}`);
        if ((game.cleanScore <=0 || game.loveScore <=0 || game.foodScore <=0 ) && game.stage !== 4) {
            clearInterval(game.meter);
            game.rip();
        } else if (game.stage === 4){
            clearInterval(game.meter);
        }
    },
    rip(){
        $('#clean-score').text(`0`);
        $('#love-score').text(`0`);
        $('#food-score').text(`0`);
        $('#main-image img').attr('src', './images/pig-rip.png');
        $('#main-image').after('<button>RESTART GAME</button>');
        $('button').on('click', function(){
            location.reload();
        });
            //     $('#restart').on('click', function(){ NEED TO TEST!!!
            // location.reload();
        
    },
    
    transferStage() {
        $('#main-image img').attr('src', './images/truck.svg');
        $('#main-image').append(`<div id="transfer"><p>CONGRATS! You did a great job. ${game.username} is now ready for her next form...</p><br><button id="next-button">NEXT</button></div>`);
        $('#next-button').on('click', game.breakfast);
        // $('#message p').text(`CONGRATS! ${game.username} is ready for transfer...`);
        // $('#message').show();
        // $(':text').hide();
        // $('#message button').attr('id','next-button');
        // $('#message button').text('NEXT');

    },

    breakfast(){
        $('#main-image img').attr('src', './images/pig-breakfast.jpg');
        $('#transfer').remove();
        $('#main-image').append(`<div><p>Yum! Breakfast was delicious. Thank you ${game.username} for supplying an unforgettable meal!</p><br><button id="restart">RESTART GAME</button></div>`);
        $('#restart').on('click', function(){
            location.reload();
        });
    }

};

$('#start-button').on("click", game.start);

$('#mode').on('click', function(){
    if ($('.game-screen').hasClass('dark')){
        $('.game-screen').removeClass('dark');
    } else {
        $('.game-screen').addClass('dark');
    }
})