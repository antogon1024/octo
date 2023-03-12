jQuery(document).ready(function ($) {
    let ratio = 4 / 5;

    let block = $('.ant-wrap').find('.active').attr('id');
    /*if(block != undefined) {
        let nameBlock = block.replace(/\-\d+/, '');
        select[nameBlock]();
    }*/


    json = $('div[name="getsetting"]').text();
    let setting = (json == '') ? {} : JSON.parse(json);
    console.log(setting);


    //$urlPage = $('#url-page');
    $pageCaption = $('#page-caption');
    //$pageBackground = $('#page-background');
    $customSwitchDefaultSize = $('#customSwitchDefaultSize');
    //$switchMove = $('#switch-move');

    $urlButton = $('#urlButton');
    let $labelButton = $('#labelButton');
    //$radio2 = $('#radio2');
    //$radio3 = $('#radio3');
    $buttonBgColor = $('#buttonBgColor');
    $buttonFontColor = $('#buttonFontColor');

    $urlVideo = $('#url-video');

    $('.sidebar .nav-item').click(function () {
        $(this).css('background', '#007bff');
    });

    $('.sidebar .nav-item').mouseover(function () {
        $('.label').css('color', '#132144');
        $(this).find('.label').css('color', '#007bff');
    });

    let blContent = $('.block-content-2');
    let blMenu = $('.block-menu-2');
    let blSetting = $('.block-setting-2');

    $('.block-menu-1').click(function () {
        button($(this), blMenu);
    });
    $('.block-content-1').click(function () {
        button($(this), blContent);
    });
    $('.block-setting-1').click(function () {
        button($(this), blSetting);
    });

    function button(elem, block){
        $('.block-type').hide();
        block.show();

        $('.block-buttons button').removeClass('btn-primary');
        $('.block-buttons button').addClass('btn-outline-primary');
        elem.addClass('btn-primary');
    }

    $(window).resize(function () {
        $('.block-video').css({'height':0, 'padding-bottom':'56.25%'});
        if ($(window).width() < 992) {
            $('.block-buttons').show();
        } else {
            $('.block-buttons').hide();
            blMenu.show();
            blContent.show();
            blSetting.show();
        }
    });

    $(window).resize();

    $('.block-switch').click(function () {
        if ($('.adv2').is(':visible')) {
            $('.adv').hide();
            $('.simple').show();
            $('.block-switch').text('Простые блоки');
        } else {
            $('.adv').show();
            $('.simple').hide();
            $('.block-switch').text('Рекламные блоки');
        }
    });

    let myfile;
    let cropper;
    function closeCustombox() {
        Custombox.modal.close();
        if(cropper != undefined){
            cropper.destroy();
        }
    }

    $('.close-custombox, #b4 .fa-remove, .ant-cancel').click(function () {
        closeCustombox();
    });

    function cropImage(evt, id, ratio) {
        //aaa event.srcElement for IE
        let event = evt || window.evt;
        let tgt = event.target || event.srcElement;
        files = tgt.files;

        let fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.onload = function () {
            myfile = fr.result;

            $('#ant-crop2').attr('src', myfile);
            let img = new Image();
            img.src = myfile;

            img.onload = function () {
                let modal = new Custombox.modal({
                    content: {
                        effect: 'fadein',
                        target: '#b4',
                        positionY: 'top',
                        //width: '50%',
                        close: false
                    }
                });

                let image = document.getElementById('ant-crop2');
                let str = '';
                let x;

                if(id == 'ava'){
                    if(img.width < 160) {
                        str = '160X160';
                    }
                    x= 160*500/img.width;
                }else if(id == 'header'){
                    if(img.width < 503){
                        str = '503X160';
                    }
                    x= 503*500/img.width;
                }else if(id == 'image'){
                    if(img.width < 400) {
                        str = '400X500';
                    }
                    x= 400*500/img.width;
                }

                if(str == '') {
                    modal.open();
                }else{
                    let mes = 'Минимальные размеры изображения:' + str;
                    ferrors.runEffect(mes, 'danger');
                    cropper.destroy();
                }

                cropper = new Cropper(image, {
                    aspectRatio: ratio,
                    minCropBoxWidth: x,
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
    }

    //aaa header
    let flagUpload = '';
    document.getElementById('header').onchange = function (evt) {
        flagUpload = 'header';
        $('.save-background').text('Сохранить');
        cropImage(evt, 'header', 503 / 160);
    }

    //aaa avatar
    document.getElementById('avatar').onchange = function (evt) {
        flagUpload = 'avatar';
        $('.save-background').text('Сохранить');
        cropImage(evt, 'ava', 1);
    }

    document.getElementById('slider').onchange = function (evt) {
        flagUpload = 'slider';
        $('.save-background').text('Выбрать');
        src = cropImage(evt, 'image', 4 / 5);
        changeInput();
    }

    $('.save-background').click(function () {
        if (flagUpload == 'header') {
            $('#formHeader').submit();
        } else if (flagUpload == 'avatar') {
            $('#formAvatar').submit();
        } else {
            Custombox.modal.close();
            addImageSlider();
        }
    });

    $('.toggle-switch-label').click(function () {
        checkSwitch();
    });

    function checkSwitch() {
        if ($customSwitchDefaultSize.prop('checked') == true) {
            $('.d-block').text('Страница не активна');
        } else {
            $('.d-block').text('Страница активна');
        }
    }

    if ($customSwitchDefaultSize.prop('checked') == true) {
        $('.d-block').text('Страница активна');
    } else {
        $('.d-block').text('Страница не активна');
    }

    $("#page-background").asColorPicker({
        mode: 'simple',
        color: {
            format: false,
            alphaConvert: { // or false will disable convert
                'RGB': 'RGBA',
                'HSL': 'HSLA',
                'HEX': 'RGBA',
                'NAMESPACE': 'RGBA',
            },
        },
    });

    $("#buttonBgColor").asColorPicker({});
    $("#buttonFontColor").asColorPicker({});

    $("body").on("click", ".asColorPicker-saturation, .asColorPicker-hue, .asColorPicker-alpha", function () {
        rgb = $('.asColorPicker-trigger span').css('backgroundColor');
        //rgb = $("#page-background").asColorPicker('get'); разница в пробелах после запятой
        hex = rgb2hex(rgb);

        $("#page-background").asColorPicker('set', rgb);
        //$("#page-background").val(hex);
        $('.full-page').css('backgroundColor', rgb);
        changeInput();
    });

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    };

// common ============================================================================
    // сохранение блока и страницы
    $('.ant-save-page').click(function () {
        if (block == undefined) {
            savePage();
            return false;
        }

        nameBlock = block.replace(/\-\d+/, '');

        if (nameBlock == 'slider' && cropper != undefined) {
            saveCrop();
            return;
        }

        savePage();
    });

    function savePage() {
        if (block != undefined) {
            nameBlock = block.replace(/\-\d+/, '');
            if (ferrors[nameBlock]() == false) {
                $('.indicator').hide();
                return false;
            }
        }

        $('.ant-wrap .move-block').remove();
        $('.ant-wrap .nosave').removeClass('nosave');

        opt = $('.switch-setting').attr('name');
        setting['viewBlock'] = opt;

        ht = $('.ant-wrap').html();
        $('input[name="page"]').val(ht);

        cpt = $pageCaption.val();
        $('input[name="caption"]').val(cpt);

        bg = $('.full-page').css('backgroundColor');
        $('input[name="bgcolor"]').val(bg);

        showPage = ($('.toggle-switch-input').prop('checked') == true) ? 1 : 0;
        $('input[name="show-page"]').val(showPage);

        set = JSON.stringify(setting);

        $('input[name="setting"]').val(set);
        $('#formPage').submit();
    }

    let ferrors = {
        message: '',
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
        messageOutput: function(){
            if(this.message != ''){
                this.runEffect(this.message, 'danger');
                this.message = '';
                return false;
            }else{
                return true;
            }
        },
        changeClass: function(el, error){
            if(error == false){
                el.removeClass('is-invalid');
                el.addClass('is-invalid');
            }else{
                el.removeClass('is-invalid');
                el.addClass('is-valid');
            }
        },
        button: function() {
            let label = $labelButton.val();
            let url = $urlButton.val();
            let valid = /^((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/.test(url);
            if(valid == false){
                this.message = '<p>Не правильный url</p>';
                this.changeClass($urlButton, false);
            }else{
                this.changeClass($urlButton, true);
            }
            if(label == ''){
                this.message += '<p>Поле "Текст в кнопке" не должно быть пустым</p> ';
                this.changeClass($labelButton, false);
            }else{
                this.changeClass($labelButton, true);
            }

            return this.messageOutput();
        },
        text: function() {
            return true;
        },
        video: function() {
            let url = $urlVideo.val();

            let res = url.match(/(https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtu.be\/)([A-Za-z0-9-]{11})/);
            if(res == null){
                this.message = 'Неправильный URL Видео';
                this.changeClass($urlVideo, false);
            }else{
                this.message = '';
                this.urlVideo = res[2];
                this.changeClass($urlVideo, true);
            }

            return this.messageOutput();
        },
        map: function() {
            return true;
        },
        slider: function() {
            return true;
        },
    };

    let addBlock = {
        getBlockId: function (classBlock) {
            let n = -1;

            $('.ant-wrap').find('.' + classBlock).each(function () {
                let n1 = $(this).attr('id').match(/\d+/) * 1;
                if (n1 > n) {
                    n = n1;
                }
            });
            n++;

            block = classBlock.replace('block-', '') + '-' + n;
            return block;
        },
        add: function (classBlock) {
            $('.ant-wrap .nosave').remove();
            $('.ant-wrap .block').removeClass('active');

            idBlock = this.getBlockId(classBlock);
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
            setting[block] = {urlButton: 'ff', labelButton: 'Текст в кнопке', buttonBgColor: '007bff', buttonFontColor:
                    'white', radio: '#radio2'};
            console.log(setting);

            $('#setting-button').show();
            $urlButton.val('');
            $labelButton.val('Текст в кнопке');
            $buttonBgColor.asColorPicker('set', '#007bff');
            $buttonFontColor.asColorPicker('set', '#ffffff');
            $('#radio2').prop('checked', true);

            console.log(setting);
        },
        $text: function () {
            addBlock.add('block-text');
            $('#setting-text').show();
            tinymce.get("mytextarea").setContent('Новый текстовый блок');
        },
        $video: function () {
            //this.settingBlock();
            addBlock.add('block-video');
            $('#url-video').val('');
            $('#setting-video').show();
        },
        $map: function () {
            addBlock.add('block-map');
            //$('#'+block).removeAttr('id').find('.inmap').attr('id', block);
            map.geo('55.75322', '37.622513', block);
            $('#setting-map').show();
        },
        $separator: function () {},
        $faq: function () {},
        $slider: function () {
            addBlock.add('block-slider');
            $('#setting-slider').show();
        },
        $timer: function () {},
        $network: function () {},
        $messenger: function () {},
    }

    //----------------------------
    $('#radio3').click();
    $('.pg-caption').click(function () {
        //$('#radio3').click();
        //setData['button'];
        //console.log(setData['button'])

        /*alert($('#radio2').is(':checked'));
        $('#radio3').prop('checked', true);
        alert($('#radio2').is(':checked'));*/
    });



    //$geoClose = $('.geo-close');
    //$geoClose.on( 'click', map.close );
    //$(this).on( 'click', addBlock[cl] );
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
        },
        geo: function (a, b, id) {
            //let region = $geoSearch.val()
            let region = ($geoSearch.val() == '') ? 'Москва' : $geoSearch.val();
            setting[block] = {a:a,b:b,region:region};
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
        }
    }

    $geoClose = $('.geo-close');
    $geoClose.on( 'click', map.close );

    $mapregion = $('.map-region');
    $mapregion.on( 'mouseover', 'div', map.over );
    $mapregion.on( 'mouseleave', 'div', map.leave );
    $mapregion.on( 'click', 'div', map.click );

    $geoSearch = $('.geo-search');
    $geoSearch.on( 'keyup', map.search );

    let select = {
        click: function () {
            //alert()
            $('.ant-wrap .nosave').remove();
            $('.ant-wrap .active').removeClass('active');
            $(this).addClass('active');
            block = $(this).attr('id');
            let nameBlock = block.replace(/\-\d+/, '');
            //$('.setting-block').hide();
            $('#setting'+nameBlock).show();
            select[nameBlock]();
            //console.log(this);
        },
        button: function () {
            //alert(setting[block].urlButton)
            $urlButton.val(setting[block].urlButton);
            $labelButton.val(setting[block].labelButton);
            $(setting[block].radio).click();
            $buttonBgColor.asColorPicker('set', setting[block].buttonBgColor);
            $buttonFontColor.asColorPicker('set', setting[block].buttonFontColor);
            //alert($('#urlButton').val())
            //$('#urlButton').hide();
            /*$urlButton.val(setting[block].url);
            $labelButton.val(setting[block].label);
            $buttonBgColor.asColorPicker('set', setting[block].bg);
            $buttonFontColor.asColorPicker('set', setting[block].color);
            $(setting[block].radio).prop('checked', true);*/
            //return;
        }
    }

    $('.block').on( 'click', select.click );

    //-------------------------------

    $('ul.sidebar').find('li').each(function () {
        let cl = '$' + $(this).attr('class').replace('nav-item simple sb-', '');
        $(this).on( 'click', addBlock[cl] );
    });


//-----------------
    let setData = {
        button: function () {
            $('#'+block+' button').text(setting[block].urlButton);
            $('#'+block+' button').text(setting[block].labelButton);
            $('#'+block+' button').css({'color':setting[block].buttonFontColor, 'backgroundColor':setting[block].buttonBgColor});

            $(setting[block].radio).click();
            $('#'+block+' button').addClass('btn-lg');
            (setting[block].radio == '#radio2') ? $('#'+block+' button').removeClass('btn-lg') : $('#'+block+' button').addClass('btn-lg');
        }
    }

    $(document).on('input', 'input', function(e){
        let id = $(this).attr('id');
        let v = $(this).val();
        let type = $(this).attr('type');
        //alert('change')

        if(block != undefined) {
            if(type == 'text') {
                setting[block][id] = v;
            }
            if(type == 'radio') {
                setting[block].radio = (v == 'standart') ? '#radio2' : '#radio3';
            }

            let nameBlock = block.replace(/\-\d+/, '');

            if(ferrors[nameBlock]() == false){
                $('.indicator').hide();
                return false;
            }

            $('.indicator').show();
            setData[nameBlock]();
        }

        //changeInput();
    });
    $('.asColorPicker-input').on('asColorPicker::change', function (e) {
        if(setting[block] == undefined) return;
        let id = $(this).attr('id');
        let v = $(this).asColorPicker('val');
        setting[block][id] = v;

        nameBlock = block.replace(/\-\d+/, '');
        setData[nameBlock]();

    });
    //----------------

    //setData['button'];


        let img = '<img class="screensaver" src="/web/img/youtube.png" width="100%">';
        let el = $('#'+block);
        url = $('#url-video').val();

        if(ferrors['video']() == false){
            el.empty();
            el.append(img);
            return false;
        }

        $('.ant-wrap .active').css('padding-bottom', '56.25%');
        let urlVideo = 'https://www.youtube.com/embed/' + ferrors.urlVideo;
        url = 'https://youtu.be/' + ferrors.urlVideo;

        setting[block]  = {url:url};
        let dv = '<iframe width="100%" src="'+ urlVideo +'" frameborder="0" allowfullscreen></iframe>';
        el.append(dv);
        let len = el.find('.move-block2').length;
        if(len == 0) {
            el.append($('.blocks .move-block2').clone());
        }
        el.find('.screensaver').remove();
    });

    function changeInput(elem = null) {
        // перемещение блоков
        if(elem != null) {
            if (elem.attr('id') == 'switch-move') {
                if ($('#switch-move').prop('checked') == true) {
                    $('.d-block2').text('включено');

                    $('.ant-wrap').find('.block').each(function () {
                        ht = $('.blocks .move-block').clone();
                        $(this).append(ht);
                    });

                    $("#sortable").sortable({
                        grid: [ 2000, 1 ],
                        cursor: "move",
                        opacity: 0.5,
                        change: function (event, ui) {
                            $('.indicator').show();
                        }
                    });
                    $("#sortable").disableSelection();

                } else {
                    $('.d-block2').text('выключено');
                    $('.ant-wrap .move-block').remove();
                    $("#sortable").sortable("destroy");
                    $('.block-video').css({'height':0, 'padding-bottom':'56.25%'});
                }
                return false;
            }
        }

        if(block == undefined){
            return false;
        }

        $('.pg-caption').text($pageCaption.val());
        id = $('.ant-wrap .active').attr('id');
        nameBlock = id.replace(/\-\d+/, '');

        if(ferrors[nameBlock]() == false){
            $('.indicator').hide();
            return false;
        }
        $('.indicator').show();

        if (nameBlock == 'button') {
            url = $urlButton.val();
            label = $labelButton.val();
            bg = $buttonBgColor.val();
            color = $buttonFontColor.val();

            if (elem != null) {
                if (elem.val() == 'big') {
                    radio = '#radio3'
                    $('#' + block + ' button').addClass('btn-lg');

                } else {
                    radio = '#radio2'
                    $('#' + block + ' button').removeClass('btn-lg');
                }
            } else {
                radio = ($('#' + block + ' button').hasClass('btn-lg')) ? '#radio3' : '#radio2';
            }

            setting[block] = {url: url, label: label, bg: bg, color: color, radio: radio};
            $('#' + block + ' button').css({'backgroundColor': bg, 'color': color});
            $('#' + block + ' button').attr('url', url);

            $('#' + block + ' button').text(label);
        } else if (nameBlock == 'text') {
            cont = tinymce.get("mytextarea").getContent();
            $('#' + id + ' .block-content').html(cont);
        } else if (nameBlock == 'video') {

        }
    }

    function settingPage() {
        $('.switch-setting').attr('name', 'page');
        $('.switch-setting span').text('Настройки страницы');
        $('.set-block').hide();
        $('.set-page').show();
    }

    $('.switch-setting').click(function () {
        if ($('.ant-wrap').find('.active').length == 0 && $(this).attr('name') == 'page') {
            ferrors.runEffect('Нет выбранного блока', 'info');
            return false;
        }

        $('.alert').addClass('show');
        if ($(this).attr('name') == 'page') {
            if ($('.ant-wrap').find('.block').length == 0) {
                return false;
            }

            block = $('.ant-wrap .active').attr('id');
            settingBlock();
            $('#' + block).click();

        } else {
            settingPage();
        }
    });

    $('.ant-delete-page').click(function () {
        sel = '.sb-' + block.replace(/\-\d+/, '') + ' .label';
        nm = $(sel).text();
        $('.ant-mod-label').text('Удаление модуля');
        $('.ant-mod-text').text('Вы действительно хотите удалить блок "' + nm + '"?');

        let modal = new Custombox.modal({
            content: {
                effect: 'fadein',
                target: '#b2'
            }
        });

        modal.open();
    });

    $('.bl-pg-remove').on('click', function () {
        el = $('#removePageBlock');
        action = $('.switch-setting').attr('name');
        pid = id = window.location.pathname.split('/')[2];

        page = (action == 'page') ? '' : $('.ant-wrap').html();
        if (action == 'page') {
            page = setting = '';
        } else {
            $('#' + block).remove();
            page = $('.ant-wrap').html();
            delete setting[block];
            console.log(setting);
        }

        el.find('input[name="action"]').val(action);
        el.find('input[name="page_id"]').val(pid);
        el.find('input[name="page"]').val(page);
        json = JSON.stringify(setting);
        el.find('input[name="setting"]').val(json);
        el.submit();
    });

    /*$('.block').click(function () {
        $('.ant-wrap .nosave').remove();
        $('.ant-wrap .active').removeClass('active');
        $(this).addClass('active');
    });*/
    // end common
    // button --------------------------
    // выбор определенного блока с кнопкой и его настройки
    /*$(".block-button").on("click", function () {
        //return;
        addBlock.settingBlock();
        block = $(this).attr('id');
        $('#setting-button').show();

        $urlButton.val(setting[block].url);
        $labelButton.val(setting[block].label);
        $buttonBgColor.asColorPicker('set', setting[block].bg);
        $buttonFontColor.asColorPicker('set', setting[block].color);
        $(setting[block].radio).prop('checked', true);
    });*/

    // end button -------------------------------
    // text ---------------------
    // выбор определенного блока "text" и его настройки
    $(".block-text").on("click", function () {
        addBlock.settingBlock();
        block = $(this).attr('id');
        $('#setting-text').show();

        id = $('.ant-wrap .active').attr('id')
        txt = $('#' + id).find('.block-content').html();
        tinymce.get("mytextarea").setContent(txt);
    });
    // end text
    // video ---------------------
    /*$('.sb-video').click(function () {
        settingBlock();
        addBlock('block-video');
        $('#url-video').val('');
        $('#setting-video').show();
    });*/

    $(".block-video").on("click", function () {
        addBlock.settingBlock();
        $('#setting-video').show();
        block = $('.ant-wrap .active').attr('id');
        $('#url-video').val( setting[block].url );
    });

    // изменяет padding и ставит высоту блока при перемещении блоков(иначе надо больше смещать блок)
    $(".ant-wrap").on("click", '.block-video .move-block', function () {
        let h = $(this).parent('.block-video').find('iframe').height();
        $(this).parent('.block-video').css({'height':h+'px', 'padding-bottom':0});
    });
    // end video
    // slider ------------------------------
    // добавляет пустой блок слайдера
    /*$('.sb-slider').click(function () {
        addBlock('block-slider');
        $('#setting-slider').show();
    });*/

    // выбор определенного слайдера и его настройки
    $(".block-slider").on("click", function () {
        selectSlider();
    });

    function selectSlider() {
        addBlock.settingBlock();

        $('#setting-slider').show();
        $('.wrap-input').empty();
        block = $('.active').attr('id');

        $('#' + block).find('.swiper-slide').each(function (i) {
            let el = $('.template .el-input').clone().appendTo('.wrap-input');
            nm = $(this).attr('src').split('/');
            el.find('input').val(nm[nm.length - 1]);
        });
    }

    // инициализация слайдера ро id
    function initSlider(n, id, centr) {
        let p = id.split('-')[1];
        let el = $('#pagin-' + p);
        l = el.find('span').length;
        (l > 1) ? el.show() : el.hide();
        (l > 1) ? el.css('margin', '20px 0') : el.css('margin', '0px');

        let swiper = new Swiper('#' + id, {
            slidesPerView: n,
            spaceBetween: 30,
            centeredSlides: centr,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: el,
                clickable: true,
            },
        });
    }

    // инициализация всех слайдеров на странице
    $('.ant-wrap').find('.block-slider').each(function (i) {
        center = ($(this).find('.swiper-slide').length == 1) ? true : false;
        initSlider(2, $(this).attr('id'), center);
    });

    // сохраняет обрезанное фото на сервер и если успешно сохраняет страницу
    function saveCrop() {
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
                    savePage();
                },
                error(data) {

                },
            });

        })
    }

    // добавление фото в определенный блок
    function addImageSlider() {
        bl = $('#' + block);
        bl.addClass('nosave');

        if (bl.find('.temp') != undefined) {
            bl.find('.temp').remove();
        }

        if (bl.hasClass('swiper-container')) {
            el = '<img class="swiper-slide temp" src="" />';
            bl.find('.swiper-wrapper').append(el);
        } else {
            $('.ant-imgstart').remove();
            bl.addClass('swiper-container');
            el = '<div class="swiper-wrapper"><img class="swiper-slide temp" src="" /></div>';
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

        centr = (bl.find('.swiper-slide').length == 1) ? true : false;

        initSlider(2, block, centr);
        Custombox.modal.close();
    }

    // удаляет фото из блока слайдера
    $("#setting-slider").on("click", ".img-close", function () {
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

        $('input[name="name"]').val(nm);
        $('input[name="page_id"]').val(id);
        $('input[name="page"]').val(page);
        $('#removeImg').submit();
    });

    // end slider ------------------------------
    // init-----------------------
    tinymce.init({
        selector: "#mytextarea",
        language: 'ru',
        mode: "specific_textareas",
        menubar: false,
        statusbar: false,
        height: 200,
        fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
        content_style: '#tinymce {width: 415px;}',
        setup: function (editor) {
            editor.on('keyup', function (e) {
                changeInput();
            });
            editor.on('paste', function (e) {
                changeInput();
            });
            editor.on('change', function (e) {
                changeInput();
            });
            editor.on('init', function (e) {
                block = $('.ant-wrap .active').attr('id');
                txt = $('#' + block).find('.block-content').html();
                if (txt != undefined) {
                    tinymce.get("mytextarea").setContent(txt);
                }
            });
        },
        plugins: "textcolor,colorpicker, paste",
        toolbar1: "bold italic underline alignleft aligncenter alignright | forecolor | fontselect | fontsizeselect",
    });

    if (setting['viewBlock'] != undefined) {
        if (setting['viewBlock'] == 'block') {
            addBlock.settingBlock();
            setting['viewBlock'] = 'block';
            //------------------ func
            block = $('.ant-wrap .active').attr('id');
            //$('#' + block).click();
            //----------------
        } else {
            settingPage();
            setting['viewBlock'] = 'block';
        }
    }

    let rgb = $('.full-page').css('backgroundColor');

    if (rgb != 'rgba(0, 0, 0, 0)') {
        $("#page-background").asColorPicker('set', rgb);
    } else {
        rgb = 'rgba(255, 255, 255, 1)';
        $("#page-background").asColorPicker('set', rgb);
    }

    $pageCaption.val($('.pg-caption').text());

    h = $('.block-menu-2').height();
    $('.full-page').css('height', h + 'px');

    if ($('.ant-wrap').find('.active').length == 0 && $('.switch-setting').attr('name') == 'block') {
        $('.switch-setting').click();
    }
    //----------------
    if(block != undefined) {
        //alert(block)
        let nameBlock = block.replace(/\-\d+/, '');
        $('.setting-block').hide();
        $('#setting-'+nameBlock).show();
        //select.click();
        //$labelButton.val('aaaaa');
    }

    // endinit-----------------------

});



