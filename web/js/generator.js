jQuery(document).ready(function ($) {
    let a = $('.ttt');
//---------------------------------------------
    let ratio = 4 / 5;
    let block = $('.ant-wrap').find('.active').attr('id');
    let options = {};
    let move = 0;

    $pageCaption = $('#page-caption');
    $pageBackground = $('#page-background');
    $customSwitchDefaultSize = $('#customSwitchDefaultSize'); //page is active
    $fullPage = $('.full-page'); // background

    let $urlButton = $('#urlButton');
    let $labelButton = $('#labelButton');
    let $radio2 = $('#radio2');
    let $radio3 = $('#radio3');
    let $buttonBgColor = $('#buttonBgColor');
    let $buttonFontColor = $('#buttonFontColor');
    let wrap = $('.ant-wrap');
    let isblock = $('#isBlock');

    setColor = {
        palette: [
            '#000000', '#ff0000', '#00ff00', '#ec1c23', '#ff7e26', '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
            '#ffffff', '#0000ff', '#b87957', '#feaec9', '#ffc80d', '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
        ],
        uppercase: false,
        required: true,
    }

    new JSColor('#buttonBgColor', setColor);
    new JSColor('#buttonFontColor', setColor);

    let select = {
        click: function () {
            if(move == 1) return;

            $('.ant-wrap .nosave').remove();
            $('.ant-wrap .active').removeClass('active');
            $(this).addClass('active');
            block = $(this).attr('id');
            let nameBlock = block.replace(/\-\d+/, '');
            $pageBackground.asColorPicker('set', $fullPage.css('backgroundColor'));
            $pageCaption.val( $('.pg-caption').text() );
            select[nameBlock]();
        },
        button: function () {
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
        }
    }

    $('.block').on( 'click', select.click );
    $('#'+block).click();

    let ferrors = {
        message: '',
        error: false,
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
        compare: function(v = null, etype = null){

            let i = 0;

            for(let k in options){
                if(k == 'move1' || k == 'move2') continue;
                for(let k1 in options[k]){
                    if( options[k][k1] != $('#'+k).attr('data-'+k1) ){
                        i++;
                    }else{
                        delete options[k][k1];
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
        setOptions: function (v, etype) {
            if(options[block] == undefined){
                options[block] = {};
            }

            if(options[block][etype] == undefined) {
                let v2 = $('#' + block).attr('data-' + etype);
                options[block][etype] = v2;
            }
        },
        urlButton: function (v, etype) {
            let url = $urlButton.val();
            this.message = '';
            let valid = /^((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/.test(url);
            if(valid == false){
                this.message = '<p>Не правильный url</p>';
                this.changeClass($urlButton, false);
            }else{
                this.changeClass($urlButton, true);
                $('#'+block).attr('data-url', v);
            }

            return this.messageOutput();
        },
        labelButton: function (v, etype) {
            let label = $labelButton.val();
            this.message = '';
            if(label == ''){
                this.message = '<p>Поле "Текст в кнопке" не должно быть пустым</p> ';
                this.changeClass($labelButton, false);
            }else{
                this.changeClass($labelButton, true);
                $('#'+block+' button').text(v);
                $('#'+block).attr('data-label', v);
            }

            return this.messageOutput();
        },
        radio2: function(v, etype) {
            ferrors.radio3(v, etype);
        },
        radio3: function(v, etype) {
            (v == 'radio2') ? $('#'+block+' button').removeClass('btn-lg') : $('#'+block+' button').addClass('btn-lg');
            $('#'+block).attr('data-size', v);
            return true;
        },
        color: function(v, etype, el) {
            let regexp = /^#[a-f0-9]{8}$/gi;

            if (!regexp.test(v)){
                this.message = '<p>Цвет должен быть в формате "#ffffffff" , два последних символа - прозрачность</p> ';
                this.changeClass(el, false);
                this.messageOutput();
                return true;

            }else{
                this.changeClass(el, true);
                return false;
            }
        },
        buttonBgColor: function(v, etype, el) {
            if(this.color(v, etype, el)){
                return true;
            }

            $('#'+block).attr('data-bg', v);
            $('#' + block + ' button').css('backgroundColor', v);
            return false;
        },
        buttonFontColor: function(v, etype, el) {
            if(this.color(v, etype, el)){
                return true;
            }

            $('#'+block).attr('data-color', v);
            $('#' + block + ' button').css('color', v);
            return false;
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
        /*text: function() {
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
        },*/
    };

    var change = {
        input: function () {
            if(block == undefined) return;

            let id = $(this).attr('id');
            if (id == 'switch-move') {
                change.move();
                return;
            }

            let el = $(this);
            let v = $(this).val();
            let etype = $(this).attr('data-etype');

            ferrors.setOptions(v, etype); // если значение не изменилось

            if(ferrors[id](v, etype, el) == false) { // если нет ошибок
                ferrors.compare(v, etype);
            }
        },
        move: function () {
            move = 1;
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

    $('.block-setting-2').on( 'input', 'input', change.input );

    var pageOrBlock = {
        init: function () {

        },
        block: function () {
            $('.switch-setting').attr('name', 'block');
            $('.switch-setting span').text('Настройка блока');
            $('.set-block').show();
            $('.set-page').hide();
            let nameBlock = block.replace(/\-\d+/, '');

            $('.setting-block').hide();
            $('#setting-'+nameBlock).show();
        },
        page: function () {
            $('.switch-setting').attr('name', 'page');
            $('.switch-setting span').text('Настройки страницы');
            $('.set-block').hide();
            $('.set-page').show();
        },
        click: function () {
            if (block == undefined) {
                ferrors.runEffect('Нет выбранного блока', 'info');
                return false;
            }

            if($(this).attr('name') == 'block'){
                isblock.val(0);
                pageOrBlock.page();
                $(this).attr('name', 'page');
            }else{
                isblock.val(1);
                pageOrBlock.block();
                $(this).attr('name', 'block');
            }
        }
    }

    $('.switch-setting').on( 'click', pageOrBlock.click );

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
            $('#setting-button').show();
            select.button();
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

    $('ul.sidebar').find('li').each(function () {
        let cl = '$' + $(this).attr('class').replace('nav-item simple sb-', '');
        $(this).on( 'click', addBlock[cl] );
    });

    $('.ant-save-page').on( 'click', savePage );

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


        ht = $('.ant-wrap').html();
        $('input[name="page"]').val(ht);

        cpt = $pageCaption.val();
        $('input[name="caption"]').val(cpt);

        bg = $fullPage.css('backgroundColor');
        $('input[name="bgcolor"]').val(bg);

        showPage = ($('.toggle-switch-input').prop('checked') == true) ? 1 : 0;
        $('input[name="show-page"]').val(showPage);

        if($('.switch-setting').attr('name') == 'block'){
            let nameBlock = block.replace(/\-\d+/, '');
            $('input[name="block"]').val(nameBlock);
        }

        $('#formPage').submit();
    }

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
        }

        el.find('input[name="action"]').val(action);
        el.find('input[name="page_id"]').val(pid);
        el.find('input[name="page"]').val(page);
        el.submit();
    });


    function init() {
        let h = $('.block-menu-2').height();
        $('.full-page').css('height', h + 'px');
        str = ferrors.getOrder();
        options['move1'] = options['move2'] = str;
    }
    init();

    $(document).on('click', '.wrap-header', function(e){
        $buttonBgColor.asColorPicker('set', '#ff0000');
        $buttonBgColor.asColorPicker('opacity', 0.4);

        asdf=$buttonBgColor.asColorPicker('opacity');
    });

});



