//'use strict';
$(function() {
    var quiz = [
        {
            question: 'Какие опасные последствия могут возникнуть при торможении автомобиля с различным износом шин правых и левых колес?',
            answers: ['Отслоение протектора.', 'Занос с возможным опрокидыванием автомобиля.', 'Перегрев тормозных механизмов.'],
        }, {
            question: 'В какое время суток разрешается перегонять стадо животных по дороге?',
            answers: ['Разрешается в любое время суток при наличии необходимого количества погонщиков.','Разрешается в светлое время суток при наличии двух погонщиков.', 'Разрешается только в светлое время суток, при этом привлекается такое количество погонщиков, чтобы можно было направлять животных как можно ближе к правому краю дороги.']
        }, {
            question: 'Имеют ли преимущество сигналы регулировщика перед требованиями дорожных знаков?',
            answers: ['Имеют преимущество только перед требованиями дорожных знаков приоритета и являются обязательными для выполнения.', 'Имеют преимущество перед требованиями всех дорожных знаков и являются обязательными для выполнения.', 'Не имеют преимущества перед дорожными знаками.']
        }
    ];

    // localStorage.setItem('quiz', JSON.stringify(quiz));
    var str = localStorage.getItem('quiz');
    var data = JSON.parse(str);
    console.dir(data);

    var addAttrs = function(obj, attributes) {
        for (var key in attributes) {
            obj.setAttribute(key, attributes[key]);
        }
    };

    var createElem = function(tag, parent, text, attrs) {
        var elem = document.createElement(tag);
        elem.innerHTML = text || '';
        if (attrs) {
            addAttrs(elem, attrs);
        }
        return parent.appendChild(elem);
    };

    var wrap = document.createElement('div');
    var h1 = createElem('h1', wrap, 'Тест по ПДД');
    var form = createElem('form', wrap);
    var ol = createElem('ol', form);

    for (var i = 0; i < 3; i++) {
        var li = createElem('li', ol);
        var span = createElem('span', li, data[i].question);

        for (var n = 0; n < 3; n++) {
            var label = createElem('label', li, data[i].answers[n]);
            var radio = createElem('input', label, null, {'type': 'radio', 'name': 'radio-' + i});
            var span = createElem('span', label);
        }
    }

    var submit = createElem('input', form, null, {type: 'submit', value: 'Проверить мои результаты'});

    var html = wrap.innerHTML;
    var content = tmpl(html, data);
    $('body').append(content);
});
