'use strict';
$(function() {
    var quiz = {
        what_test: 'Тест по ПДД',
        questions: [
            {
                question: 'Какие опасные последствия могут возникнуть при торможении автомобиля с различным износом шин правых и левых колес?',
                answers: ['Отслоение протектора.', 'Занос с возможным опрокидыванием автомобиля.', 'Перегрев тормозных механизмов.'],
                right_answer: 1
            }, {
                question: 'В какое время суток разрешается перегонять стадо животных по дороге?',
                answers: ['Разрешается в любое время суток при наличии необходимого количества погонщиков.', 'Разрешается в светлое время суток при наличии двух погонщиков.', 'Разрешается только в светлое время суток, при этом привлекается такое количество погонщиков, чтобы можно было направлять животных как можно ближе к правому краю дороги.'],
                right_answer: 2
            }, {
                question: 'Имеют ли преимущество сигналы регулировщика перед требованиями дорожных знаков?',
                answers: ['Имеют преимущество только перед требованиями дорожных знаков приоритета и являются обязательными для выполнения.', 'Имеют преимущество перед требованиями всех дорожных знаков и являются обязательными для выполнения.', 'Не имеют преимущества перед дорожными знаками.'],
                right_answer: 0
            }
        ]
    };

    localStorage.setItem('quiz', JSON.stringify(quiz));

    var html = $('#item_tmpl').html();
    var data = JSON.parse(localStorage.getItem('quiz'));
    var content = tmpl(html, data);

    $('body').append(content);

    var hideModal = function() {
        $('.modal').remove();
        $('.overlay').remove();
    };
    var showModal = function(count) {
        $('body').append('<div class="overlay"></div><div class="modal"><h1>' + count + '/3</h1></div>');
        $(':checked').prop('checked', false);
        $('.overlay').one('click', hideModal);
    };

    $('form').on('submit', function(event) {
        event.preventDefault();
        var countAnswers = 0;

        $(this).find('.question-wrap').each(function(i) {
            var radio = $(this).find('input');
            var checked = $(this).find(':checked');
            
            if (checked.length > 0) {
                if (radio.index(checked) == data.questions[i].right_answer) {
                    countAnswers++;
                }
            }
        });
        showModal(countAnswers);
    });
});
