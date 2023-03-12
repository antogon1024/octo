jQuery(document).ready(function ($) {
    json = $('div[name="getsetting"]').text();
    var setting = (json == '') ? {} : JSON.parse(json);
    console.log(setting)
    $('body').css('background-color', $('#bgcolor').val());
    $('.move-block2').remove();
    $('.active').removeClass('active');
    $('.block').removeAttr('style');
    /*$('.ant-wrap').find('.block-video').each(function () {
        var id = $(this).attr('id');
        var el = '<iframe width="100%" src="'+ setting[id].url +'" frameborder="0" allowfullscreen></iframe>';
        $(this).append(el);
    });*/

//---------------------------------------------------------------------------------------
    var ratio = 4 / 5;
    var block;
    //json = $('div[name="getsetting"]').text();
    //var setting = (json == '') ? {} : JSON.parse(json);
    //console.log(setting)






    var myfile;
    var cropper;


    function cropImage(evt, id, ratio) {
        //aaa event.srcElement for IE
        var event = evt || window.evt;
        var tgt = event.target || event.srcElement;
        files = tgt.files;

        var fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.onload = function () {
            myfile = fr.result;

            $('#ant-crop2').attr('src', myfile);
            var modal = new Custombox.modal({
                content: {
                    effect: 'fadein',
                    target: '#b4',
                    close: false
                }
            });

            modal.open();
            var img = new Image();
            img.src = myfile;

            img.onload = function () {
                var image = document.getElementById('ant-crop2');

                cropper = new Cropper(image, {
                    aspectRatio: ratio,
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





















// common ============================================================================

    // end common

    // slider ------------------------------




    /*function selectSlider() {
        settingBlock();
        //$('.setting-block').hide();
        $('#setting-slider').show();
        $('.wrap-input').empty();
        block = $('.active').attr('id');

        $('#' + block).find('.swiper-slide').each(function (i) {
            var el = $('.template .el-input').clone().appendTo('.wrap-input');
            nm = $(this).attr('src').split('/');
            el.find('input').val(nm[nm.length - 1]);
        });
    }*/

    // инициализация слайдера ро id
    function initSlider(n, id, centr) {
        let p = id.split('-')[1];
        let el = $('#pagin-' + p);
        l = el.find('span').length;
        (l > 1) ? el.show() : el.hide();
        (l > 1) ? el.css('margin', '20px 0') : el.css('margin', '0px');

        var swiper = new Swiper('#' + id, {
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

    /*if (setting['viewBlock'] != undefined) {
        if (setting['viewBlock'] == 'block') {
            settingBlock();
            setting['viewBlock'] = 'block';
            //------------------ func
            block = $('.ant-wrap .active').attr('id');
            $('#' + block).click();
            //----------------
        } else {
            settingPage();
            setting['viewBlock'] = 'block';
        }
    }*/

    let rgb = $('.full-page').css('backgroundColor');

    if (rgb != 'rgba(0, 0, 0, 0)') {
        $("#page-background").asColorPicker('set', rgb);
    } else {
        rgb = 'rgba(255, 255, 255, 1)';
        $("#page-background").asColorPicker('set', rgb);
    }

    $('#page-caption').val($('.pg-caption').text());

    h = $('.block-menu-2').height();
    $('.full-page').css('height', h + 'px');

    if ($('.ant-wrap').find('.active').length == 0 && $('.switch-setting').attr('name') == 'block') {
        $('.switch-setting').click();
    }

    // endinit-----------------------

});



