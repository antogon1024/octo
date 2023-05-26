jQuery(document).ready(function ($) {
    let a = $('.ttt');
    let tinymce;
    let prVideo = 0.564;
//---------------------------------------------
    let ratio = 4 / 5;
    let block = $('.ant-wrap').find('.active').attr('id');
    let activeQuestion = $('.ant-wrap').find('.active-question').attr('id');  // ?????????
    let options = {};
    let move = 0;

    $pageCaption = $('#pageCaption');
    $pageBackground = $('#pageBackground');
    $customSwitchDefaultSize = $('#customSwitchDefaultSize'); //page is active
    $fullPage = $('.full-page'); // background

    let $urlButton = $('#urlButton');
    let $labelButton = $('#labelButton');
    let $radio2 = $('#radio2');
    let $radio3 = $('#radio3');
    let $buttonBgColor = $('#buttonBgColor');
    let $buttonFontColor = $('#buttonFontColor');
    let $colorSeparator = $('#colorSeparator');
    let $labelSeparator = $('#labelSeparator');
    let wrap = $('.ant-wrap');
    let isblock = $('#isBlock');
    let $mytextarea = $('#mytextarea');
    let $urlVideo = $('#urlVideo');
    let $faqQuestion = $('#faqQuestion');
    let $faqAnswer = $('#faqAnswer');
    let $startTimer = $('#startTimer');
    let $endTimer = $('#endTimer');

    setColor = {
        palette: [
            '#000000', '#ff0000', '#00ff00', '#ec1c23', '#ff7e26', '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
            '#ffffff', '#0000ff', '#b87957', '#feaec9', '#ffc80d', '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
        ],
        uppercase: false,
        required: true,
    }

    new JSColor('#pageBackground', setColor);
    new JSColor('#buttonBgColor', setColor);
    new JSColor('#buttonFontColor', setColor);
    new JSColor('#colorSeparator', setColor);

    let myfile;
    let cropper;
    var flagUpload = '';
    // пагинация временного фото не работает - исчезает блок !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let slider = {
        cropImage: function (evt, id, w, h) {
            var event = evt || window.evt;
            var tgt = event.target || event.srcElement;
            files = tgt.files;
            var fr = new FileReader();
            fr.readAsDataURL(files[0]);

            fr.onload = function () {
                let myfile = fr.result;
                $('#ant-crop2').show();
                $('#ant-crop2').attr('src', myfile);

                var modal = new Custombox.modal({
                    content: {
                        effect: 'fadein',
                        target: '#b4',
                        close: false
                    }
                });

                var img = new Image();
                img.src = myfile;

                img.onload = function () {
                    var image = document.getElementById('ant-crop2');
                    if(img.width < w || img.height < h) {
                        let message = 'Изображение не должно быть меньше ' + w + 'x' + h;
                        ferrors.runEffect(message, 'danger');
                        return;
                    }
                    $('.indicator').show();
                    modal.open();

                    cropper = new Cropper(image, {
                        aspectRatio: w/h,
                        //cropBoxResizable: false,
                        cropBoxResizable: true,
                        crop(event) {
                            $('#' + id + '-x').val(event.detail.x);
                            $('#' + id + '-y').val(event.detail.y);
                            $('#' + id + '-w').val(event.detail.width);
                            $('#' + id + '-h').val(event.detail.height);
                        },
                    });
                }
            }
        },
        // сохраняет обрезанное фото на сервер и если успешно сохраняет страницу
        saveCrop: function () {
            if (cropper == undefined) return;
            cropper.getCroppedCanvas().toBlob((myfile) => {
                const formData = new FormData();
                formData.append('croppedImage', myfile/*, 'example.png' */);
                $.ajax('', {
                    method: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success(data) {
                        data = JSON.parse(data);
                        $('.temp').attr('src', data.dir + '/' + data.name);
                        $('.temp').attr('name', data.name);
                        $('.temp').removeClass('temp');
                        $('.nosave').removeClass('nosave');
                        flSlider = 1;
                        //savePage();
                    },
                    error(data) {
                    },
                });
            });
        },
        saveCrop2: function () {
            if (flagUpload == 'header') {
                $('#formHeader').submit();
            } else if (flagUpload == 'avatar') {
                $('#formAvatar').submit();
            } else {
                Custombox.modal.close();
                slider.addImageSlider();
            }
        },
        // добавление не сохраненного фото в определенный блок
        addImageSlider: function () {
            bl = $('#' + block);

            if (bl.find('.temp') != undefined) {
                //bl.find('.temp').remove();
            }

            if (bl.hasClass('swiper-container')) {
                el = '<img class="swiper-slide nosave temp" src="" />';
                bl.find('.swiper-wrapper').append(el);
            } else {
                $('.ant-imgstart').remove();
                bl.addClass('swiper-container');
                el = '<div class="swiper-wrapper"><img class="swiper-slide nosave temp" src="" /></div>';
                bl.append(el);

                p = block.split('-')[1];
                el = '<div id="pagin-' + p + '" class="swiper-pagination"></div>';
                bl.append(el);
            }

            cropper.getCroppedCanvas().toBlob((myfile) => {
                let reader = new FileReader();
                reader.readAsDataURL(myfile);
                reader.onload = function () {
                    bl.find('.temp').attr('src', reader.result);
                }
            })

            slider.initSlider(block, 1);
            Custombox.modal.close();
            $('.custom-file-upload').hide();
        },
        // инициализация слайдера ро id
        initSlider: function (id, fl) {
            let p = id.split('-')[1];
            let el = $('#pagin-'+p);

            l = $('#'+id).find('img').length;
            (l > 2) ? el.show() : el.hide();
            (l > 2) ? el.css('margin', '20px 0') : el.css('margin', '0px');
            let ord = (fl == 1) ? l : 0;

            let center = ($('#'+id).find('.swiper-slide').length == 1) ? true : false;

            var swiper = new Swiper('#' + id, {
                initialSlide: ord,
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: center,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: el,
                    clickable: true,
                },
            });
        },
        // инициализация всех слайдеров на странице
        initAllSlider: function () {
            $('.ant-wrap').find('.block-slider').each(function (i) {
                slider.initSlider($(this).attr('id'), 0);
            });
        },
        // удаляет фото из блока слайдера
        deleteImg: function () {
            nm = $(this).parent().find('input').val();
            id = window.location.pathname.split('/')[2];
            els = $('#' + block).find('.swiper-slide');
            leng = els.length;

            els.each(function (i) {
                if ($(this).attr('src').indexOf(nm) != -1) {
                    (leng == 1) ? $('#' + block).remove() : $(this).remove();
                }
            });
            page = $('.ant-wrap').html();

            let nameBlock = $('.ant-wrap').find('.active').attr('id') || '';
            let numBlock = $('.ant-wrap').find('.block').length;

            $('input[name="name"]').val(nm);
            $('input[name="page_id"]').val(id);
            $('input[name="page"]').val(page);

            $('input[name="block"]').val(nameBlock);
            $('input[name="num-block"]').val(numBlock);
            $('#removeImg').submit();
        }
    }

    $('.save-background').on('click', slider.saveCrop2);
    slider.initAllSlider();
    $("#setting-slider").on("click", ".img-close", slider.deleteImg);

    let faq = {
        add: function () {
            let id = addBlock.getBlockId('ant-q', 1);
            let txt = 'Вопрос' + id.split('-')[2];
            $('.blocks .ant-q').clone().appendTo("#"+block);

            $('.ant-wrap .ant-q').removeClass('active-question');
            $('#' + block + ' #new-q').addClass('active-question');
            $('#' + block + ' #new-q').text(txt);
            $('#' + block + ' #new-q').attr('id', id);
            $faqQuestion.val(txt);
            $faqQuestion.attr('data-etype', faq.changeId(id, $faqQuestion));

            id = addBlock.getBlockId('ant-a', 1);
            txt = 'Ответ' + id.split('-')[2];
            $('.blocks .ant-a').clone().appendTo( $('#'+block) );
            $('.ant-wrap .ant-a').removeClass('active-answer');
            $('#' + block + ' #new-a').addClass('active-answer');
            $('#' + block + ' #new-a').text(txt);
            $('#' + block + ' #new-a').attr('id', id);
            $faqAnswer.val(txt);
            $faqAnswer.attr('data-etype', faq.changeId(id, $faqAnswer));

            $("#" + block).accordion('refresh');
        },
        delete: function () {
            let l = $('#' + block).find('.ant-q').length;

            if(l == 1) {
                $('#' + block).remove();
            }else {
                $('.active-question').remove();
                $('.active-answer').remove();
            }
        },
        qselect: function (el, fl) {
            elem = (fl == 1) ? el : $(this);
            $('.ant-wrap .ant-q').removeClass('active-question');
            $('.ant-wrap .ant-a').removeClass('active-answer');
            elem.addClass('active-question');
            elem.find('+div').addClass('active-answer');
        },
        changeId: function (id, el) {
            id = id.replaceAll('-', '');
            el.attr('data-etype', id);
            return id;
        },
        restoreId: function (id) {
            let symbol = id[3];
            let str = id.replace('ant', 'ant-');
            return str.replace('ant-' + symbol, 'ant-' + symbol + '-');
        },
        initFaq: function () {
            $('.ant-wrap').find('.block-faq').each(function () {
                let id = $(this).attr('id');
                initAccordion(id);
            });
        }
    }

    $(".add-q").on("click", faq.add);
    $(".del-q").on("click", faq.delete);
    $(".ant-q").on("click", faq.qselect);
    faq.initFaq();

    let timer = {
        selectDate: function (id) {
            $('#' + id).daterangepicker({"locale": {
                    "format": "YYYY-MM-DD HH:mm",
                    "applyLabel": "Сохранить",
                    "cancelLabel": "Назад",
                    "daysOfWeek": [
                        "Вс",
                        "Пн",
                        "Вт",
                        "Ср",
                        "Чт",
                        "Пт",
                        "Сб"
                    ],
                    "monthNames": [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    "firstDay": 1
                },
                "timePicker24Hour": true,
                "singleDatePicker": true,
                "timePicker": true,
            });
        },
        initClock: function () {
            let current = Date.parse(new Date()) / 1000;

            $('.ant-wrap').find('.block-timer').each(function () {
                let id = $(this).attr('id');
                let idTimer = id;
                let d = $(this).attr('data-start');
                let start = Date.parse(d) / 1000;
                d = $(this).attr('data-end');
                let end = Date.parse(d) / 1000;

                if (current >= start) {
                        idTimer = setInterval(function(){
                            let remain = end - current;
                            timer.update(id, remain);
                            current = Date.parse(new Date()) / 1000;
                        if(current > end){
                            clearInterval(idTimer);
                        }
                    },1000);
                }

            });
        },
        update: function (id, remain) {
            let dd = Math.floor( remain/(60*60*24) );
            let hh = Math.floor( (remain/(60*60)) % 24 );
            let mm = Math.floor( (remain/(60)) % 60 );
            let ss = Math.floor( remain % 60 );

            dd = (dd < 10) ? '0' + dd : dd;
            hh = (hh < 10) ? '0' + hh : hh;
            mm = (mm < 10) ? '0' + mm : mm;
            ss = (ss < 10) ? '0' + ss : ss;

            $('#' + id + ' .day').text(dd);
            $('#' + id + ' .hour').text(hh);
            $('#' + id + ' .minute').text(mm);
            $('#' + id + ' .second').text(ss);
        },
        start: function () {
            $('#' + block).attr('data-start', $(this).val());
        },
        end: function () {
            $('#' + block).attr('data-end', $(this).val());
        }
    }

    $("#startTimer").on("click", timer.selectDate('startTimer'));
    $("#endTimer").on("click", timer.selectDate('endTimer'));
    //$('.wrap-header').on("click", timer.initClock());
    $startTimer.on('apply.daterangepicker', timer.start);
    $endTimer.on('apply.daterangepicker', timer.end);

    timer.initClock();

    //var t = Date.parse('2023-05-23 11:00') - Date.parse(new Date());
    //alert(t)
    //let date = new Date("2017-01-26");

    let pageOrBlock = {
        block: function () {
            $('.switch-setting').attr('name', 'block');
            $('.switch-setting span').text('Настройка блока');
            $('.set-block').show();
            $('.set-page').hide();

            $('.setting-block').hide();
            $('#setting-' + other.getNameBlock()).show();
        },
        page: function () {
            $('.switch-setting').attr('name', 'page');
            $('.switch-setting span').text('Настройки страницы');
            $('.set-block').hide();
            $('.set-page').show();
        },
        click: function () {
            if (block == undefined /*&& $('.switch-setting').attr('name') == 'page'*/) {
                ferrors.runEffect('Нет выбранного блока', 'info');
                return false;
            }

            let nameBlock = other.getNameBlock();
            $('.indicator').hide();
            $('.form-control').removeClass('is-invalid');
            $('.form-control').removeClass('is-valid');

            if($(this).attr('name') == 'block'){
                isblock.val(0);
                pageOrBlock.page();
                $(this).attr('name', 'page');
            }else{
                isblock.val(1);
                pageOrBlock.block();
                $(this).attr('name', 'block');

                select[nameBlock]();
            }

            nameBlock = nameBlock.replace(nameBlock[0], nameBlock[0].toUpperCase());

            for(let k in options){
                if(k == 'move1' || k == 'move2') continue;

                if($(this).attr('name') == 'page') {
                    for (let k1 in options[k]) {
                        $('#' + k).attr('data-' + k1, options[k][k1]);
                        prevData[k1+nameBlock](k, options[k][k1]);
                        delete options[k][k1];
                    }
                }else{
                    if (ferrors.str.indexOf(k) != -1) {
                        $('.page-block').attr('data-' + k, options[k]);
                        prevData[k](options[k]);
                        delete options[k];
                    }
                }
            }
        }
    }

    let ferrors = {
        message: '',
        error: false,
        str: 'pageBackground,pageCaption,customSwitchDefaultSize',
        runEffect: function(mes, cls){
            cls = 'toggler alert alert-' + cls;
            let el = $('#effect');
            el.removeClass();
            el.addClass(cls);
            el.html(mes);
            el.show('slide', {direction: 'up'}, 500, this.closeEffect);
        },
        closeEffect: function(){
            setTimeout(function () {
                $("#effect").hide('slide', {direction: 'up'}, 500);
            }, 2000);
        },
        setOptions: function (v, etype) {
            let v2;
            if(options[block] == undefined){
                options[block] = {};
            }

            if (this.str.indexOf(etype) != -1) {
                if(options[etype] == undefined){
                    v2 = $('.page-block').attr('data-' + etype);
                }
            }else{
                if(options[block][etype] == undefined) {
                    let v2;
                    if(other.getNameBlock() == 'faq'){
                        let id = faq.restoreId(etype);
                        v2 = $('#' + id).text();
                    }else {
                        v2 = $('#' + block).attr('data-' + etype);
                    }
                    options[block][etype] = v2;
                }
            }
        },
        compare: function(){
            let i = 0;

            for(let k in options){
                if(k == 'move1' || k == 'move2') continue;

                if (this.str.indexOf(k) != -1) {
                    if (options[k] != $('.page-block').attr('data-' + k)) {
                        i++;
                    } else {
                        delete options[k];
                    }

                }else {
                    for (let k1 in options[k]) {
                        let k11 = faq.restoreId(k1);

                        //alert(options[k][k1] +'--'+ $('#' + k).attr('data-' + k1));

                        if (options[k][k1] != $('#' + k).attr('data-' + k1)) {
                            i++;
                        } else {
                            delete options[k][k1];
                        }
                    }
                }
            }

            if(options['move1'] != options['move2']){
                i++;
            }

            (i == 0) ? $('.indicator').hide() : $('.indicator').show();
        },
        changeClass: function(el, error){
            let elem = el.parent().find('.validate');
            if(error == false){
                elem.removeClass('is-valid');
                elem.addClass('is-invalid');
            }else{
                elem.removeClass('is-invalid');
                elem.addClass('is-valid');
            }
        },
        getOrder: function () {
            let str = '';

            $('.ant-wrap').find('.block').each(function () {
                let id = $(this).attr('id');
                str += id;
            });

            return str;
        },
        pageCaption: function(v) {

            $('.page-block').attr('data-pageCaption', v);
            $('.pg-caption').text(v);
            return false;
        },
        pageBackground: function(v) {
            if(this.color(v, $pageBackground)){
                return true;
            }

            $('.page-block').attr('data-pageBackground', v);
            $('.full-page').css('backgroundColor', v);
            return false;
        },
        customSwitchDefaultSize: function(v) {
            let v2 = ($customSwitchDefaultSize.prop('checked') ==  true) ? 1 : 0;
            $('.page-block').attr('data-customSwitchDefaultSize', v2);
            return false;
        },
        labelButton: function (v, fl) {
            this.message = '';
            if(v == ''){
                let message = '<p>Поле "Текст в кнопке" не должно быть пустым</p> ';
                if(fl == 1) {this.message = message; return;}
                this.changeClass($labelButton, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                this.changeClass($labelButton, true);
                $('#'+block+' button').text(v);
                $('#'+block).attr('data-label', v);
                return false;
            }
        },
        urlButton: function (v, fl) {
            this.message = '';
            let valid = /^((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/.test(v);
            if(valid == false){
                message = '<p>Не правильный url</p>';
                if(fl == 1) {
                    this.message = message;
                    return;
                }
                this.changeClass($urlButton, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                this.changeClass($urlButton, true);
                $('#'+block).attr('data-url', v);
                return false;
            }
        },
        radio2: function(v) {
            ferrors.radio3(v);
            return false;
        },
        radio3: function(v) {
            (v == 'radio2') ? $('#'+block+' button').removeClass('btn-lg') : $('#'+block+' button').addClass('btn-lg');
            $('#'+block).attr('data-size', v);
            return false; // нет ошибок
        },
        color: function(v, el, fl) {
            this.message = '';
            let regexp = /^#[a-f0-9]{8}$/gi;

            if (!regexp.test(v)){
                message = '<p>Цвет должен быть в формате "#ffffffff" , два последних символа - прозрачность</p> ';
                if(fl == 1) this.message = message;
                this.changeClass(el, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                this.changeClass(el, true);
                return false;
            }
        },
        buttonBgColor: function(v, fl) {
            if(this.color(v, $buttonBgColor, fl)){
                return true;
            }

            $('#'+block).attr('data-bg', v);
            $('#' + block + ' button').css('backgroundColor', v);
            return false;
        },
        buttonFontColor: function(v, fl) {
            if(this.color(v, $buttonFontColor, fl)){
                return true;
            }

            $('#'+block).attr('data-color', v);
            $('#' + block + ' button').css('color', v);
            return false;
        },
        colorSeparator: function(v, fl) {
            if(this.color(v, $colorSeparator, fl)){
                return true;
            }

            $('#'+block).attr('data-color', v);
            $('#' + block + ' span').css('color', v);
            $('#' + block + ' .bg-separator').css('background', v);
            return false;
        },
        labelSeparator: function(v, fl) {
            $('#'+block).attr('data-label', v);
            $('#' + block + ' span').text(v);
            (v == '') ? $('#' + block + ' span').css('padding', 0) : $('#' + block + ' span').css('padding', '0 15px');

            return false;
        },
        faqQuestion: function(v, fl) {
            $('#'+block+' .active-question').text(v);
            $("#" + block).accordion('refresh');
            if(v == ''){
                message = '<p>Поле "Вопрос" не должно быть пустым</p> ';
                if(fl == 1) {
                    this.message = message;
                    return;
                }
                this.changeClass($faqQuestion, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                this.changeClass($faqQuestion, true);
                let tp = $faqQuestion.attr('data-etype');
                $('#'+block).attr('data-' + tp, v);
                return false;
            }
        },
        faqAnswer: function(v, fl) {
            $('#'+block+' .active-answer').text(v);
            if(v == ''){
                message = '<p>Поле "Ответ" не должно быть пустым</p> ';
                if(fl == 1) {
                    this.message = message;
                    return;
                }
                this.changeClass($faqAnswer, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                this.changeClass($faqAnswer, true);
                let tp = $faqAnswer.attr('data-etype');
                $('#'+block).attr('data-' + tp, v);
                return false;
            }
        },
        startTimer: function(v) {
            return false;
        },
        endTimer: function() {
            return false;
        },
        sizeImage: function() {

        },
        slider: function(v, e, fl) {
            flagUpload = 'slider';
            $('.save-background').text('Выбрать');
            slider.cropImage(e, 'image', 400, 500);
            return false;
        },
        header: function(v, e, fl) {
            flagUpload = 'header';
            $('.save-background').text('Сохранить');
            slider.cropImage(e, 'header', 503, 160);
            return false;
        },
        avatar: function(v, e, fl) {
            flagUpload = 'avatar';
            $('.save-background').text('Сохранить');
            slider.cropImage(e, 'ava', 160, 160);
            return false;
        },
        geoSearch: function(){
            return false;
        },
        urlVideo: function() {
            let url = $urlVideo.val();
            let str = url.substring(url.length - 11);
            let elem = $('#'+block);
            let elem2 = '<img class="screensaver" src="/web/img/youtube.png" width="100%">';
            elem.empty();

            let res = url.match(/(https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtu.be\/)([A-Za-z0-9-_]{11})/);
            if(res == null){
                $('.ant-wrap .active').css({'padding': 0, 'height': 'auto'});
                elem.append(elem2);

                message = 'Неправильный URL Видео';
                this.changeClass($urlVideo, false);
                this.runEffect(message, 'danger');
                return true;
            }else{
                $('.ant-wrap .active').css({'padding-bottom':'56.25%', 'height':'0px'});
                let urlVideo = 'https://www.youtube.com/embed/' + str;
                let elem3 = '<iframe width="100%" src="'+ urlVideo +'" frameborder="0" allowfullscreen></iframe>';
                elem.append(elem3);
                elem.append('<div class="move-block2"></div>');
                elem.attr('data-urlVideo', url);

                this.changeClass($urlVideo, true);
                return false;
            }
        },
    };

    var change = {
        input: function (e) {
            let id = $(this).attr('id');
            if (id == 'map') {
                return;
            }
            if (id == 'switch-move') {
                change.move();
                return;
            }

            let el = $(this);
            let v = $(this).val();
            let etype = $(this).attr('data-etype');
            ferrors.setOptions(v, etype); // если значение не изменилось

            if(ferrors[id](v,e) == false) { // если нет ошибок
                ferrors.compare();
            }
            console.log(options);
        },
        move: function () {
            move = 1;
            if ($('#switch-move').prop('checked') == true) {
                $('.d-block2').text('включено');

                let h = $('.block-video').first().width() * prVideo;
                $('.block-video').css({'height':h+'px', 'padding-bottom':0});


                $('.ant-wrap').find('.block').each(function () {
                    ht = $('.blocks .move-block').clone();
                    $(this).append(ht);
                });

                $("#sortable").sortable({
                    grid: [ 2000, 1 ],
                    cursor: "move",
                    opacity: 0.5,
                    stop: function (event, ui) {
                        let str = ferrors.getOrder();
                        options['move2'] = str;
                        ferrors.compare()
                    }
                });
                $("#sortable").disableSelection();

            } else {
                move = 0;
                $('.d-block2').text('выключено');
                $('.ant-wrap .move-block').remove();
                $("#sortable").sortable("destroy");
                $('.block-video').css({'height':0, 'padding-bottom':'56.25%'});
            }
            return false;
        }
    }

    $(window).resize(function () {
        if ($('#switch-move').prop('checked') == true) {
            let h = $('.block-video').first().width() * prVideo;
            $('.block-video').css({'height': h + 'px', 'padding-bottom': 0});
        }
    });

    $(window).resize();
    $('.block-setting-2, .full-page').on( 'input', 'input, textarea', change.input );

    // Установка старых значений несохраненных блоков, при переключении
    // на другой блок или на настройки страницы
    let prevData = {
        pageCaption: function (val) {
            $('.pg-caption').text(val);
            $pageCaption.val(val);
        },
        pageBackground: function (val) {
            $('.full-page').css('background', val);
            $pageBackground[0].jscolor.fromString( val );
        },
        customSwitchDefaultSize: function (val) {
            $customSwitchDefaultSize.prop('checked', val*1);
        },
        urlButton: function (bl, val) {},
        labelButton: function (bl, val) {
            $('#'+bl+' button').text(val);
        },
        bgButton: function (bl, val) {
            $('#'+bl+' button').css('background', val);
        },
        colorButton: function (bl, val) {
            $('#'+bl+' button').css('color', val);
        }
    }

    $('.switch-setting').on( 'click', pageOrBlock.click );

    let defaultRegion = 'Россия, Москва';
    let addBlock = {
        getBlockId: function (classBlock, flag) {
            let n = -1;

            $('.ant-wrap').find('.' + classBlock).each(function () {
                let n1 = $(this).attr('id').match(/\d+/) * 1;
                if (n1 > n) {
                    n = n1;
                }
            });
            n++;

            if(flag == 0) {
                return block = classBlock.replace('block-', '') + '-' + n;
            }else{
                return classBlock.replace('block-', '') + '-' + n;
            }
        },
        add: function (classBlock) {
            $('.ant-wrap .nosave').remove();
            $('.ant-wrap .block').removeClass('active');

            idBlock = this.getBlockId(classBlock, 0);
            $('.blocks .' + classBlock).clone().appendTo('.ant-wrap').attr('id', idBlock).addClass(classBlock);

            $('.setting-block').hide();
            this.settingBlock();
        },
        settingBlock: function () {
            $('.switch-setting').attr('name', 'block');
            $('.switch-setting span').text('Настройки блока');
            $('.set-block').show();
            $('.set-page').hide();
            $('.setting-block').hide();
        },
        $button: function () {
            addBlock.add('block-button');
            $('#setting-button').show();
            select.button();
        },
        $text: function () {
            addBlock.add('block-text');
            $('#setting-text').show();
            $mytextarea.tinymce().setContent('Новый текстовый блок');
        },
        $video: function () {
            addBlock.add('block-video');
            $urlVideo.val('');
            $('#setting-video').show();
        },
        $map: function () {
            addBlock.add('block-map');
            $geoSearch.val(defaultRegion);
            map.geo('55.75322', '37.622513', block);
            $('#setting-map').show();
        },
        $separator: function () {
            addBlock.add('block-separator');
            $('#setting-separator').show();
            //$colorSeparator.val('Надпись в разделителе');
            select.separator();
        },
        $faq: function () {

            addBlock.add('block-faq');
            initAccordion(block);

            let id = addBlock.getBlockId('ant-q', 1);
            let txt = 'Вопрос' + id.split('-')[2];
            let idnew = faq.changeId(id, $faqQuestion);

            $('#'+block+' #new-q').attr('id', id);
            $('#'+block).attr('data-'+idnew, txt);
            $faqQuestion.val('Вопрос1');
            $('#'+id).text(txt);
            $faqQuestion.val(txt);
            faq.qselect($('#'+id), 1);

            id = addBlock.getBlockId('ant-a', 1);
            txt = 'Ответ' + id.split('-')[2];
            idnew = faq.changeId(id, $faqAnswer);

            $('#'+block+' #new-a').attr('id', id);
            $('#'+block).attr('data-'+idnew, txt);
            $('#'+id).text(txt);
            $faqAnswer.val(txt);
            $('#setting-faq').show();
        },
        $slider: function () {
            addBlock.add('block-slider');
            $('#setting-slider').show();
            $('.wrap-input').empty();
        },
        $timer: function () {
            addBlock.add('block-timer');
            $('#setting-timer').show();
        },
        $network: function () {},
        $messenger: function () {},
    }

    $('ul.sidebar').find('li').each(function () {
        let cl = '$' + $(this).attr('class').replace('nav-item simple sb-', '');
        $(this).on( 'click', addBlock[cl] );
    });

    $('.ant-save-page').on('click', savePage);
    let test = ["pageBackground"];
    let flSlider = 0;

    function savePage() {
        res = $('.switch-setting').attr('name');
        if (res == 'page') {

        }
        if (res == 'block') {
            if(block == undefined){
                let message = 'Нет блоков или не выбран блок';
                errors.runEffect(message, 'danger');
            }else{
                let nameBlock = other.getNameBlock();

                if (nameBlock == 'slider' && flSlider == 0 && cropper != undefined) {
                    slider.saveCrop();
                    return;
                }

                if(nameBlock != 'slider') {
                    let str = '';

                    $('#setting-' + nameBlock).find('input, textarea').each(function () {
                        let id = $(this).attr('id');
                        let v = $(this).val();
                        let t = $(this).attr('type');
                        ferrors.message = '';

                        if (t == 'text') {
                            // если fl равен 1 , ошибки выводятся со всех input
                            ferrors[id](v, 1);
                            str = str + ferrors.message;
                        }
                    });

                    if (str != '') {
                        ferrors.runEffect(str, 'danger');
                        return;
                    }
                }
                //настройки какого блока показывать , на стороне сервера,
                // чтобы не дергалось при загрузке - a1
                $('input[name="block"]').val(nameBlock);
            }
        }

        $('.ant-wrap .move-block').remove();
        $('.ant-wrap .nosave').removeClass('nosave');

        ht = $('.ant-wrap').html();
        $('input[name="page"]').val(ht);

        cpt = $pageCaption.val();
        $('input[name="caption"]').val(cpt);

        bg = $('.page-block').attr('data-pageBackground');
        $('input[name="bgcolor"]').val(bg);

        showPage = ($('.toggle-switch-input').prop('checked') == true) ? 1 : 0;
        $('input[name="show-page"]').val(showPage);
        $('input[name="num-block"]').val( $('.ant-wrap').find('.block').length );

        $('#formPage').submit();
    }

    let remove = {
        action: '',
        click: function () {

        },
        clRemove: function () {
            el = $('#removePageBlock'); // форма
            action = $('.switch-setting').attr('name'); // удаление страницы или блока
            pid = id = window.location.pathname.split('/')[2];

            if (action == 'page') {
                page = '';
            } else {
                $('#' + block).remove();
                page = $('.ant-wrap').html();
            }

            el.find('input[name="action"]').val(action);
            el.find('input[name="page_id"]').val(pid);
            el.find('input[name="page"]').val(page);
            el.find('input[name="block"]').val('');
            el.find('input[name="num-block"]').val( $('.ant-wrap').find('.block').length );
            el.submit();
        },
        clConfirm: function () {
            let action = $('.switch-setting').attr('name');
            remove.action = action;

            if(action == 'block') {
                sel = '.sb-' + other.getNameBlock() + ' .label';
                nm = $(sel).text();
                $('.ant-mod-label').text('Удаление модуля');
                $('.ant-mod-text').text('Вы действительно хотите удалить блок "' + nm + '"?');
            }else{
                $('.ant-mod-label').text('Удаление страницы');
                $('.ant-mod-text').text('Вы действительно хотите удалить страницу');
            }

            let modal = new Custombox.modal({
                content: {
                    effect: 'fadein',
                    target: '#b2'
                }
            });
            modal.open();
        }
    }

    $('.ant-delete-page').on( 'click', remove.clConfirm );
    $('.bl-pg-remove').on('click', remove.clRemove );
    $('.close-custombox, .combo-remove, .ant-cancel').on('click', function () {
        closeCustombox();
    });

    let map = {
        close: function () {
            $('.geo-search').val('');
        },
        over: function () {
            $(this).css({'background':'#dddddd','color:':'#ffffff'});
        },
        leave: function () {
            $(this).css({'background':'#ffffff','color:':'#111111'});
        },
        click: function () {
            $('.map-region').empty();
            $('.setting-map, .geo-search').val($(this).text());
            let pos = $(this).attr('data');
            let ar = pos.split(' ');
            $('#'+block).empty();
            map.geo(ar[1], ar[0], block);
            let ht = '';

            if ($('#switch-move').prop('checked') == true) {
                ht = $('.blocks .move-block').clone();
                $('#' + block).append(ht);
            }
            ht = '<div class="move-block2"></div>';
            $('#' + block).append(ht);

            ferrors.setOptions(1, 'region');
            $('#'+block).attr('data-region', $(this).text());
            ferrors.compare();
        },
        geo: function (a, b, id) {
            let region = ($geoSearch.val() == '') ? 'Москва' : $geoSearch.val();
            ymaps.ready(init);
            function init() {
                let myMap = new ymaps.Map(id, {
                        center: [a, b],
                        zoom: 8,
                        controls: []
                    }, {
                        searchControlProvider: 'yandex#search'
                    }),
                    myPlacemark = new ymaps.Placemark([a, b], {});
                myMap.geoObjects.add(myPlacemark);
            }
        },
        search: function () {
            let q = $('.geo-search').val();
            $('#setting-map .map-region').empty();
            if(q == '') return false;

            let qurl = 'https://geocode-maps.yandex.ru/1.x/?apikey=b18e1a55-f988-4079-b0b6-3ae62da2676b&geocode=' + q;
            $.get(qurl, function(data) {
                $(data).find('GeoObject').each(function(ind){
                    let id = $(this).find('formatted').text();
                    let pos = $(this).find('pos').text();
                    if(ind >= 6) return false;
                    $('#setting-map .map-region').append('<div data="'+pos+'">'+id+'</div>');
                });
            });
        },
    }

    $geoClose = $('.geo-close');
    $geoClose.on( 'click', map.close );
    $mapregion = $('.map-region');
    $mapregion.on( 'mouseover', 'div', map.over );
    $mapregion.on( 'mouseleave', 'div', map.leave );
    $mapregion.on( 'click', 'div', map.click );
    $geoSearch = $('.geo-search');
    $geoSearch.on( 'keyup', map.search );

    let other = {
        init: function () {
            let h = $('.block-menu-2').height();
            $('.full-page').css('height', h + 'px');
            //str = ferrors.getOrder();
            //options['move1'] = options['move2'] = str;
            other.initSetting();
            //pageOrBlock.click();
        },
        showMove: function () {
            let l =$('.ant-wrap').find('.block').length;
            (l > 1) ? $('.wrap-move').show() : $('.wrap-move').hide();
        },
        getNameBlock: function () {
            if(block != undefined){
                return block.replace(/\-\d+/, '');
            }
        },
        initSetting: function () {
            let str = ferrors.getOrder();
            options['move1'] = options['move2'] = str;
        }
    }

    other.init();

    function closeCustombox() {
        Custombox.modal.close();
        if(cropper != undefined){
            cropper.destroy();
        }
    }

    $(document).on('click', '.wrap-header', function(e){
        let h1 = $('iframe').first().height();
        let w = $('iframe').first().width();
        prVideo = h1/w;
    });

    $mytextarea.tinymce({
        //selector: "#mytextarea",
        script_url: 'js/tinymce/tinymce.min.js',
        paste_as_text: false,
        language: 'ru',
        mode: "specific_textareas",
        menubar: false,
        statusbar: false,
        height: 200,
        fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        content_style: '#tinymce {width: 415px;}',
        setup: function (editor) {
            editor.on('input', function (e) {
                let cont = $mytextarea.tinymce().getContent();
                $('#' + block + ' .block-content').html(cont);

            });
            editor.on('init', function (e) {
                block = $('.ant-wrap .active').attr('id');
                txt = $('#' + block).find('.block-content').html();
                if (txt != undefined) {
                    $mytextarea.tinymce().setContent(txt);
                }
            });
        },
        plugins: "textcolor,colorpicker",
        toolbar: "bold italic underline alignleft aligncenter alignright | forecolor | fontselect | fontsizeselect",
    });

    // Выбор блока и блока его настроек
    let select = {
        click: function () {
            if(move == 1) return;
            block = $(this).attr('id') || $('#'+block).attr('id');
            if(block == undefined) return;

            if(!$(this).hasClass('active')) {
                $('.indicator').hide();
            }
            if(other.getNameBlock() != 'faq'){
                $('.active-question').removeClass('active-question');
                faq.initFaq();
            }
            options = {};
            other.initSetting();

            let pageBg = $fullPage.attr('data-bg');
            $pageBackground[0].jscolor.fromString( pageBg );
            $('.full-page').css('background', pageBg);

            $('.ant-wrap .active').removeClass('active');
            $('#'+block).addClass('active');
            let nameBlock = other.getNameBlock();

            if($(this).hasClass('nosave') == false && nameBlock != 'slider'){
                if ( $('.ant-wrap .nosave').hasClass('swiper-slide') == true ){
                    let actSlider = $('.ant-wrap .nosave').parent().parent().attr('id');
                    $('.ant-wrap .nosave').remove();
                    slider.initSlider(actSlider);
                }

                $('.ant-wrap .nosave').remove();
            }

            $pageCaption.val( $('.pg-caption').text() );
            $('.setting-block').hide();
            $('.set-page').hide();
            $('.set-block').show();
            /*if(!$(this).hasClass('active')) {
                $('.indicator').hide();
            }*/
            //$('.indicator').hide();
            pageOrBlock.block();
            select[nameBlock]();
        },
        button: function () {
            $('#setting-button').show();

            let obj = $('#'+block).data();

            options[block] = {};
            for (let key in obj) {
                if(key == 'url'){
                    $('#urlButton').val( $('#'+block).data('url') );
                }else if(key == 'label'){
                    $('#labelButton').val( $('#'+block).attr('data-label') );
                }else if (key == 'size'){
                    $('#' + $('#'+block).data('size')).click();
                }else if(key == 'bg'){
                    let bg = $('#'+block).data('bg');
                    $buttonBgColor[0].jscolor.fromString(bg);
                }else if(key == 'color'){
                    let color = $('#'+block).data('color');
                    $buttonFontColor[0].jscolor.fromString(color);
                }
            }
        },
        text: function () {
            let ht = $('#' + block + ' .block-content').html();
            $mytextarea.tinymce().setContent(ht);
        },
        video: function () {
            $urlVideo.focus().val( $('#'+block).attr('data-urlVideo') );
        },
        map: function () {
            $geoSearch.val( $('#'+block).attr('data-region') );
        },
        faq: function () {
            let idq = $('#'+block+' .active-question').attr('id');
            let ida = $('#'+block+' .active-answer').attr('id');

            $faqQuestion.attr('data-etype', faq.changeId(idq, $faqQuestion));
            $faqAnswer.attr('data-etype', faq.changeId(ida, $faqAnswer));

            $faqQuestion.val( $('#'+block+' .active-question').text() );
            $faqAnswer.val( $('#'+block+' .active-answer').text() );
        },
        separator: function () {
            let color = $('#'+block).attr('data-color');
            $colorSeparator[0].jscolor.fromString(color);

            let label = $('#'+block).attr('data-label');
            $labelSeparator.val(label);
        },
        slider: function () {
            $('#setting-slider').show();
            $('.wrap-input').empty();

            $('#'+block).find('.swiper-slide').each(function (i) {
                if($(this).hasClass('temp') == false) {
                    var el = $('.template .el-input').clone().appendTo('.wrap-input');
                    nm = $(this).attr('src').split('/');
                    el.find('input').val(nm[nm.length - 1]);
                }
            });
        },
        timer: function () {
            let start = $('#' + block).attr('data-start');
            let end = $('#' + block).attr('data-end');
            $startTimer.val(start);
            $endTimer.val(end);
        }
    }

    $('.block').on( 'click', select.click );
    select.click();

    function initAccordion(id) {
        $(function () {
            $("#" + id).accordion({
                collapsible: true,
                heightStyle: "content",
                active: false,
                header: ".ant-q",
                icons: {"header": "fa fa-plus", "activeHeader": "fa fa-minus"}
            });
        });
    }

    //-----------------------------
    //$("#my-accordion").accordionjs();

    $('.wrap-header').click(function () {
        sec = 1000000;
        sec = (3600 *24)+125;
        //let dd = sec / (3600 * 24);
        let dd = Math.floor( sec/(60*60*24) );
        let hh = Math.floor( (sec/(60*60)) % 24 );
        let mm = Math.floor( (sec/(60)) % 60 );
        let ss = Math.floor( sec % 60 );

        alert(dd+'-'+hh+'-'+mm+'-'+ss);
    });

    //console.log(options);
});



