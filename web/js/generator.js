jQuery(document).ready(function ($) {
    var ratio = 4 / 5;

    $('.sidebar .nav-item').click(function () {
        $(this).css('background', '#007bff');
    });

    $('.sidebar .nav-item').mouseover(function () {
        $('.label').css('color', '#132144');
        $(this).find('.label').css('color', '#007bff');
    });

    var blContent = $('.block-content-2');
    var blMenu = $('.block-menu-2');
    var blSetting = $('.block-setting-2');

    $('.block-menu-1').click(function () {
        blContent.hide();
        blSetting.hide();
        blMenu.show();
    });
    $('.block-content-1').click(function () {
        blMenu.hide();
        blSetting.hide();
        blContent.show();
    });
    $('.block-setting-1').click(function () {
        blMenu.hide();
        blContent.hide();
        blSetting.show();

    });

    $(window).resize(function () {
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
            //cropper.destroy();
        }
        //return myfile;
    }

    //aaa header
    var flagUpload = '';
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
        //addImageSlider(src, block);
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
// common ============================================================================
    var block;

    function getBlockId(classBlock) {
        var n = -1;

        $('.ant-wrap').find('.' + classBlock).each(function () {
            var n1 = $(this).attr('id').match(/\d+/)*1;
            if(n1 > n){
                n = n1;
            }
        });
        n++;

        block = classBlock.replace('block-', '') + '-' + n;
        return block;
    }

    function addBlock(nameBlock, content) {
        $('.block').removeClass('active');
        classBlock = 'block-' + nameBlock;
        idBlock = getBlockId(classBlock);
        bl = '<div id="' + idBlock + '" class="' + classBlock + ' ui-sortable-handle block active nosave">' + content + '</div>';
        $('.ant-wrap').append(bl);

        $('.setting-block').hide();
    }

    $('.block').click(function () {
        block = $(this).attr('id');

        $('.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.ant-save-page').click(function () {
        nameBlock = block.replace(/\-\d+/, '');

        if (nameBlock == 'slider') {
            saveCrop();
        }
    });

    block = $('.block.active').attr('id');
    if( $('#'+block).hasClass('block-slider') ){
        selectSlider(block);
    }

    // перемещение блоков
    $( function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
    // end common
    // slider ------------------------------
    // добавляет пустой блок слайдера
    $('.sb-slider').click(function () {
        $('.nosave').remove();
        block = getBlockId('block-slider');

        content = '<img class="ant-imgstart" src="/web/img/add_image.png" width="100%">';

        addBlock('slider', content);
        $('.wrap-input').empty();
        $('#setting-slider').show();
    });

    // выбор определенного слайдера и его настройки
    $(".ant-wrap").on("click", ".block-slider", function () {
        block = $(this).attr('id');
        selectSlider(block);

        /*$('#setting-slider').show();
        $('.wrap-input').empty();

        $(this).find('.swiper-slide').each(function (i) {
            var el = $('.template .el-input').clone().appendTo('.wrap-input');
            nm = $(this).attr('src').split('/');
            el.find('input').val(nm[nm.length - 1]);
        });*/
    });
    function selectSlider(block){
        $('#setting-slider').show();
        $('.wrap-input').empty();

        $('#'+block).find('.swiper-slide').each(function (i) {
            var el = $('.template .el-input').clone().appendTo('.wrap-input');
            nm = $(this).attr('src').split('/');
            el.find('input').val(nm[nm.length - 1]);
        });
    }

    // инициализация слайдера ро id
    function initSlider(n, id, centr) {
        let p = id.split('-')[1];
        let el = $('#pagin-'+p);
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
                    ht = $('.ant-wrap').html();

                    $('input[name="page"]').val(ht);
                    $('#formPage').submit();
                },
            });
        })
    }

    // добавление фото в определенный блок
    function addImageSlider() {
        bl = $('#' + block);

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
        //cropper.destroy();
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
    //alert(block);
});

/*
 * cookie javascript library v 0.2
 * http://code.google.com/p/jscookie/
 *
 * Copyright (c) 2009 Evgeniy Tyurin
 * Licensed under the GPL licenses
 * http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * Date: 2009-11-03 15:48:12
 */

window.cookie =
    {
        set: function (key, value, expires, path, domain, secure) {
            var sCookie = key + '=' + escape(value) + '; ';

            if (expires !== undefined) {
                var date = new Date();
                date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
                sCookie += 'expires=' + date.toGMTString() + '; ';
            }

            sCookie += (path === undefined) ? 'path=/;' : 'path=' + path + '; ';
            sCookie += (domain === undefined) ? '' : 'domain=' + domain + '; '
            sCookie += (secure === true) ? 'secure; ' : '';

            document.cookie = sCookie;
        },

        get: function (sKey) {
            var sValue = '';
            var sKeyEq = sKey + '=';
            var aCookies = document.cookie.split(';');

            for (var iCounter = 0, iCookieLength = aCookies.length; iCounter < iCookieLength; iCounter++) {
                while (aCookies[iCounter].charAt(0) === ' ') {
                    aCookies[iCounter] = aCookies[iCounter].substring(1);
                }
                if (aCookies[iCounter].indexOf(sKeyEq) === 0) {
                    sValue = aCookies[iCounter].substring(sKeyEq.length);
                }
            }

            return unescape(sValue);
        },

        remove: function (key) {
            cookie.set(key, '', -1);
        },

        clear: function () {
            var aCookies = document.cookie.split(';');

            for (var iCounter = 0, iCookieLength = aCookies.length; iCounter < iCookieLength; iCounter++) {
                while (aCookies[iCounter].charAt(0) === ' ') {
                    aCookies[iCounter] = aCookies[iCounter].substring(1);
                }
                var iIndex = aCookies[iCounter].indexOf('=', 1);
                if (iIndex > 0) {
                    cookie.set(aCookies[iCounter].substring(0, iIndex), '', -1);
                }
            }
        },

        isEnabled: function () {
            cookie.set('test_cookie', 'test');

            var val = (cookie.get('test_cookie') === 'test') ? true : false;

            cookie.remove('test_cookie');

            return val;
        }
    };


