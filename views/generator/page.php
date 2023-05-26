<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

//$this->registerJsFile('https://api-maps.yandex.ru/2.1/?apikey=b18e1a55-f988-4079-b0b6-3ae62da2676b&lang=ru_RU');
?>

<div id="effect" class="toggler alert alert-info" data-dismiss="alert" role="alert"></div>
<div class="wrap-page">
    <div class="block-buttons">
        <button type="button" class="btn btn-primary 2btn-sm block-menu-1">Блоки</button>
        <button type="button" class="btn btn-outline-primary 2btn-sm block-content-1">Контент</button>
        <button type="button" class="btn btn-outline-primary 2btn-sm block-setting-1">Настройки</button>
    </div>

    <div class="row">
        <div class="col-lg-3 2col-md-4 block-menu-2 block-type">
            <button type="button" class="btn btn-secondary btn-sm block-switch">Простые блоки</button>

            <ul class="nav flex-column sidebar">
                <li class="nav-item simple sb-button">
                    <a class="ant-link">
                        <p class="label">Кнопка</p>
                        <p class="description">Добавьте кнопку со ссылкой</p>
                    </a>
                </li>
                <li class="nav-item simple sb-text">
                    <a class="ant-link">
                        <p class="label">Текстовый блок</p>
                        <p class="description">Опишите товар или услугу</p>
                    </a>
                </li>
                <li class="nav-item simple sb-video">
                    <a class="ant-link">
                        <p class="label">Видео с Youtube</p>
                        <p class="description">Добавьте видеоролик</p>
                    </a>
                </li>
                <li class="nav-item simple sb-map">
                    <a class="ant-link">
                        <p class="label">Карты Yandex</p>
                        <p class="description">Укажите адрес магазина</p>
                    </a>
                </li>
                <li class="nav-item simple sb-separator">
                    <a class="ant-link">
                        <p class="label">Разделитель</p>
                        <p class="description">Разделите блоки</p>
                    </a>
                </li>
                <li class="nav-item simple sb-faq">
                    <a class="ant-link">
                        <p class="label">Вопросы и ответы</p>
                        <p class="description">Создайте подробный F.A.Q.</p>
                    </a>
                </li>
                <li class="nav-item simple sb-slider">
                    <a class="ant-link">
                        <p class="label">Слайдер</p>
                        <p class="description">Загрузите изображения</p>
                    </a>
                </li>
                <li class="nav-item simple sb-timer">
                    <a class="ant-link">
                        <p class="label">Обратный отсчёт</p>
                        <p class="description">Создайте таймер</p>
                    </a>
                </li>
                <li class="nav-item simple sb-network">
                    <a class="ant-link">
                        <p class="label">Социальные сети</p>
                        <p class="description">Добавьте ссылки на соцсети</p>
                    </a>
                </li>
                <li class="nav-item simple sb-messenger">
                    <a class="ant-link">
                        <p class="label">Мессенджеры</p>
                        <p class="description">Добавьте мессенджеры</p>
                    </a>
                </li>
                <li class="nav-item adv sb-href">
                    <a class="ant-link">
                        <p class="label">Своя ссылка</p>
                        <p class="description">Обязательный просмотр ссылки</p>
                    </a>
                </li>
                <li class="nav-item adv sb-instagram">
                    <a class="ant-link">
                        <p class="label">Instagram</p>
                        <p class="description">Проверка подписчиков</p>
                    </a>
                </li>
                <li class="nav-item adv adv2 sb-video-adv">
                    <a class="ant-link">
                        <p class="label">Youtube</p>
                        <p class="description">Просмотр видео без перемотки</p>
                    </a>
                </li>
            </ul>
        </div>

        <div class="col-lg-6 2col-md-8 block-content-2 block-type">
            <div class="full-page" style="background: <?= $page->bgcolor ?>" data-bg ="<?= $page->bgcolor ?>">
                <div class="block-header">
                    <div class="wrap-header">
                        <img class="img-header" src="<?= $header ?>" alt="">

                        <?php $form = ActiveForm::begin([
                            'id' => 'formHeader',
                            'action' => '',
                            'options' => ['class' => 'form-vertical', 'enctype' => 'multipart/form-data'],
                        ]); ?>

                        <?= Html::hiddenInput('fheader') ?>
                        <?= Html::hiddenInput('x', '', ['id' => 'header-x']) ?>
                        <?= Html::hiddenInput('y', '', ['id' => 'header-y']) ?>
                        <?= Html::hiddenInput('w', '', ['id' => 'header-w']) ?>
                        <?= Html::hiddenInput('h', '', ['id' => 'header-h']) ?>
                        <?= Html::activeInput('file', $page, 'header', ['id' => 'header', 'class' => 'input-header']) ?>
                        <?php ActiveForm::end(); ?>

                        <label for="header" class="label-header">
                            <i class="fa fa-camera"></i><span>Изменить</span>
                        </label>
                    </div>

                    <?php $form = ActiveForm::begin([
                        'id' => 'formAvatar',
                        'action' => '',
                        'options' => ['class' => 'form-vertical', 'enctype' => 'multipart/form-data'],
                    ]); ?>

                    <label style="" class="label-avatar" for="avatar">
                        <img id="avatarImg" class="avatar-img" src="<?= $avatar ?>" alt="Image Description">
                        <span class="small-circle">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                    </label>

                    <?= Html::hiddenInput('favatar') ?>
                    <?= Html::hiddenInput('x', '', ['id' => 'ava-x']) ?>
                    <?= Html::hiddenInput('y', '', ['id' => 'ava-y']) ?>
                    <?= Html::hiddenInput('w', '', ['id' => 'ava-w']) ?>
                    <?= Html::hiddenInput('h', '', ['id' => 'ava-h']) ?>
                    <?= Html::activeInput('file', $page, 'avatar', ['id' => 'avatar', 'class' => 'input-avatar']) ?>

                    <?php ActiveForm::end(); ?>
                </div>
                <h3 class="pg-caption"><?= $page->caption ?></h3>

                <div id="sortable" class="ant-wrap" data-switch="page">
                    <?= $page->page ?>
                </div>
            </div>
        </div>
        <div class="col-lg-3 2col-md-8 block-setting-2 block-type" style="padding-top: 10px">
            <div>
                <?php if($page->block == ''): ?> <!--a1-->
                    <button type="button" class="btn btn-outline-primary switch-setting" name="page">
                        <i class="fa fa-cog"></i><span>Настройка страницы</span>
                    </button>
                <?php else: ?>
                    <button type="button" class="btn btn-outline-primary switch-setting" name="block">
                        <i class="fa fa-cog"></i><span>Настройка блока</span>
                    </button>
                <?php endif; ?>
            </div>
            <div class="set-page" style="<?=$arBlock['setPage']?>">
                <form action="" method="post">
                    <div class="form-group url">
                        <label for="url-page">URL ссылки</label>
                        <input type="text" class="form-control" id="url-page" value="<?= $url ?>" readonly>
                        <a href="<?= $url2 ?>" target="_blank">
                            <i class="fa fa-external-link"></i>
                        </a>
                    </div>

                    <div class="form-group page-caption">
                        <label for="pageCaption">Заголовок страницы</label>
                        <input type="text" class="form-control" id="pageCaption" placeholder="" data-etype="pageCaption" value="<?= $page->caption ?>">
                    </div>

                    <div class="form-group page-background">
                        <div class="form-control validate" style="position:absolute;width:32px;height:32px;right:1px;top:35px;border:none;"></div>
                        <label for="url-page">Цвет фона</label>
                        <input type="text" class="form-control" id="pageBackground" data-etype="pageBackground" value="<?= $page->bgcolor ?>">
                    </div>

                    <label class="toggle-switch d-flex align-items-center mb-3" for="customSwitchDefaultSize">
                        <input type="checkbox" class="toggle-switch-input change-input"
                               id="customSwitchDefaultSize" <?= $checked ?> data-etype="customSwitchDefaultSize">
                        <span class="toggle-switch-label">
                            <span class="toggle-switch-indicator"></span>
                        </span>
                        <span class="toggle-switch-content">
                            <span class="d-block">Страница активна</span>
                        </span>
                    </label>
                </form>
            </div>

            <!---->
            <!---->

            <div class="set-block" style="<?=$arBlock['setBlock']?>">
                <?php if($page->num_block > 1): ?>
                    <div class="wrap-move">
                        <label class="input-label">Перемещения блоков</label>
                        <div class="form-group">
                            <label class="toggle-switch d-flex align-items-center mb-3"
                                   for="switch-move" style="margin-top: 0">
                                <input type="checkbox" class="toggle-switch-input change-input"
                                       id="switch-move">
                                <span class="toggle-switch-label">
                        <span class="toggle-switch-indicator"></span>
                    </span>
                                <span class="toggle-switch-content2" style="margin-left: 10px;">
                        <span class="d-block2">выключено</span>
                    </span>
                            </label>
                        </div>
                    </div>
                <?php endif; ?>


                <div id="setting-button" class="setting-block" style="<?=$arBlock['button']?>"><!--a1-->
                    <div class="form-group">
                        <label for="urlButton">URL Ссылки:</label>
                        <input type="text" class="form-control validate" placeholder="https://" id="urlButton" data-etype="url">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control validate" id="labelButton" value="Текст в кнопке" data-etype="label">
                    </div>

                    <label for="" class="input-label">Размер кнопки</label>
                    <div class="form-group">
                        <div class="form-control" style="float: left;width: 50%">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input change-input" name="button-radio"
                                       id="radio2" value="radio2" data-etype="size" checked>
                                <label class="custom-control-label" for="radio2">Стандарт</label>
                            </div>
                        </div>

                        <div class="form-control" style="float: left;width: 50%;">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input change-input" name="button-radio"
                                       id="radio3" value="radio3" data-etype="size">
                                <label class="custom-control-label" for="radio3">Большая</label>
                            </div>
                        </div>
                        <div style="clear: left"></div>
                    </div>

                    <div class="form-group" style="position: relative">
                        <div class="form-control validate" style="position:absolute;width:32px;height:32px;right:1px;top:35px;border:none;"></div>
                        <label for="buttonBgColor">Цвет фона:</label>
                        <input type="text" class="form-control validate" id="buttonBgColor" data-etype="bg" value="ffffffff">
                    </div>
                    <div class="form-group" style="position: relative">
                        <div class="form-control validate" style="position:absolute;width:32px;height:32px;right:1px;top:35px;border:none;"></div>
                        <label for="buttonFontColor">Цвет шрифта:</label>
                        <input type="text" class="form-control validate" id="buttonFontColor" data-etype="color" value="ffffffff">
                    </div>



                    <!--<div class="form-group">
                        <label for="buttonBgColor">Цвет фона:</label>
                        <input type="text" class="form-control but" data-etype="bg" value="ffffffff">
                    </div>
-->
                </div>
                <div id="setting-text" class="setting-block" style="<?=$arBlock['text']?>">
                    <textarea id="mytextarea" class="tinyMCE"></textarea>
                </div>
                <div id="setting-video" class="setting-block" style="<?=$arBlock['video']?>">
                    <div class="form-group">
                        <label for="url-button">URL Видео:</label>
                        <input type="text" class="form-control validate" placeholder="https://youtube.com" id="urlVideo">
                    </div>
                </div>
                <div id="setting-map" class="setting-block" style="<?=$arBlock['map']?>">
                    <div class="form-group">
                        <label for="url-button">Место на карте:</label>
                        <input id="geoSearch" type="text" class="form-control geo-search" data-etype="region">
                        <i class="geo-close fa fa-remove"></i>
                        <div class="map-region"></div>
                    </div>
                </div>
                <div id="setting-separator" class="setting-block">
                    <div class="form-group" style="position: relative">
                        <div class="form-control validate" style="position:absolute;width:32px;height:32px;right:1px;top:35px;border:none;"></div>
                        <label for="colorSeparator">Цвет разделителя:</label>
                        <input type="text" class="form-control validate" id="colorSeparator" data-etype="color" value="ccccccff">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" id="labelSeparator" value="Надпись в разделителе" data-etype="label">
                    </div>
                </div>
                <div id="setting-faq" class="setting-block">
                    <div class="form-group">
                        <label for="faqQuestion">Вопрос:</label>
                        <input type="text" class="form-control validate" id="faqQuestion" data-etype="question">
                    </div>

                    <div class="form-group">
                        <label for="faqAnswer">Ответ:</label>
                        <textarea type="text" class="form-control validate" id="faqAnswer" rows="10" data-etype="answer">
                        </textarea>

                    </div>
                    <button type="button" class="btn btn-outline-primary add-q">Добавить вопрос</button>
                    <button type="button" class="btn btn-outline-danger del-q">Удалить вопрос</button>

                </div>
                <div id="setting-slider" class="setting-block" style="<?=$arBlock['slider']?>">
                    <label type="button" class="btn btn-outline-primary 22ant-save-page custom-file-upload">
                        <?= Html::activeInput('file', $slider, 'image', ['id' => 'slider', 'class' => 'input-slider']) ?>
                        Выбрать изображение
                    </label>

                    <div class="wrap-input"></div>
                </div>
                <div id="setting-timer" class="setting-block">
                    <div class="form-group">
                        <label for="startTimer">Старт:</label>
                        <input type="text" class="form-control validate" id="startTimer" data-etype="timer">
                    </div>
                    <div class="form-group">
                        <label for="endTimer">Конец:</label>
                        <input type="text" class="form-control validate" id="endTimer" data-etype="timer">
                    </div>
                </div>
            </div>

            <div class="bl-save">
                <button type="button" class="btn btn-outline-primary ant-save-page">Сохранить</button>
                <button type="button" class="btn btn-outline-danger butdel ant-delete-page">Удалить</button>
            </div>
        </div>
    </div>

</div>

<div style="display: none">
    <div id="b4" class="b4 ant-size" style="width:600px;padding: 0 50px;display: none;background: #000000;margin-top: 0px">
        <div class="top-ava">Выберите область фотографии<i class="fa fa-remove nav-icon combo-remove"></i></div>
        <div>
            <img id="ant-crop2" class="ant-size" src="" style="max-width: 100%;2height: 100%">
        </div>

        <div class="bottom-ava">
            <button type="button" class="save-background btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-primary close-custombox">Отмена</button>
        </div>
    </div>


    <div id="b2" class="b2 ant-div-3 card" style="display: none">
        <i class="fa fa-remove nav-icon combo-remove"></i>
        <div class="ant-bl-mes">
            <p class="ant-mod-label"></p>
            <p class="ant-mod-text"></p>
        </div>
        <hr style="margin: 0 -25px">
        <div class="ant-bl-but">
            <button type="button" class="btn btn-outline-primary ant-cancel">Отмена</button>
            <button type="button" class="btn btn-danger bl-pg-remove">Удалить</button>
        </div>
    </div>

    <form id="formPage" action="" enctype="multipart/form-data" method="post">
        <input type="hidden" name="page">
        <input type="hidden" name="bgcolor">
        <input type="hidden" name="show-page">
        <input type="hidden" name="caption">
        <input type="hidden" name="setting">
        <input type="hidden" name="block"> <!-- a1 -->
        <input type="hidden" name="num-block">
    </form>

    <form id="removeImg" action="/generator/remove-img" method="post">
        <input type="hidden" name="name">
        <input type="hidden" name="page_id">
        <input type="hidden" name="page">
        <input type="hidden" name="block">
        <input type="hidden" name="num-block">
    </form>

    <form id="removePageBlock" action="/generator/remove-page" method="post">
        <input type="hidden" name="action">
        <input type="hidden" name="page_id">
        <input type="hidden" name="page">
        <!--<input type="hidden" name="setting">-->
        <input type="hidden" name="block">
        <input type="hidden" name="num-block">
    </form>

    <div class="template">
        <div class="el-input" style="position: relative;">
            <input class="form-control 2text-button ant-img-name" type="text" name="image" value="" readonly
                   style="margin-top: 30px;">
            <i class="img-close fa fa-remove"></i>
        </div>
    </div>

    <div class="blocks">
        <div class="page-block" data-pageBackground="<?= $page->bgcolor ?>" data-pageCaption="<?= $page->caption ?>" data-customSwitchDefaultSize="<?= $page->show_page ?>"></div>
        <div class="mover">
            <i class="fa fa-arrows-v"></i>
        </div>
        <div class="active-block">
            <div style="padding: 10px; background: red; border-radius: 10px; z-index: 100000;">ddd</div>
        </div>

        <div class="block-button block active nosave" data-bg="#007bffff" data-color="#ffffffff" data-url="aa.aa" data-label="Текст в кнопке" data-size="radio2">
            <button type="button" class="btn" style="width:100%; background: #007bff; color: white">Текст в кнопке
            </button>
        </div>
        <div class="block-text block active nosave">
            <div class="block-content" style="padding: 20px"><p>Новый текстовый блок</p></div>
        </div>
        <div class="block-video active block nosave video" data-urlVideo="">
            <img class="screensaver" src="/web/img/youtube.png" width="100%">
            <!--<div class="move-block2"></div>-->
        </div>
        <div class="block-map active block nosave" style="overflow: hidden;width: 100%;height: 300px;" data-region="Россия, Москва"
             data-a="55.75322" data-b="37.622513">
            <div class="move-block2"></div>
        </div>

        <div class="block-separator block active nosave"
             style="display: flex; align-items: center; align-content: space-between; height: 44px" data-color="#ccccccff" data-label="Надпись в разделителе">
            <div class="bg-separator" style="background: #ccc; height: 1px; width: 100%"></div>
            <span style="padding: 0 15px;white-space: nowrap">Надпись в разделителе</span>
            <div class="bg-separator" style="background: #ccc; height: 1px; width: 100%"></div>
        </div>

        <div id="" class="accordion accord block block-faq active nosave">
            <p id="new-q" class="ant-q card-header active-question">Вопрос1</p>
            <div id="new-a" class="ant-a card-body active-answer">Ответ1</div>
        </div>

        <div class="block-slider block active nosave">
            <img class="ant-imgstart" src="/web/img/add_image.png" width="100%">
        </div>

        <div class="block-timer block active nosave">
            <div class="card-body ant-timer" id="countdown2">
                <table style="width: 100%">
                    <tr>
                        <td><span class="timer-size text-dark day">00</span> <span>d</span></td>
                        <td><span class="timer-size text-dark hour">00</span> <span>h</span></td>
                        <td><span class="timer-size text-dark minute">00</span> <span>m</span></td>
                        <td><span class="timer-size text-dark second">00</span> <span>s</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="move-block"
             style="position:absolute;width: 100%;height:100%;z-index: 1000;top: 0;left: 0;background: blue;opacity: 0.3"></div>

        <!--<div class="move-block2" style="position:absolute;width: 100%;height:100%;z-index: 1000;top: 0;left: 0;"></div>-->

    </div>

    <input type="hidden" name="getsetting2" value="<?= $page->setting ?>">
    <div name="getsetting"><?= $page->setting ?></div>

</div>
<div class="indicator"
     style="display: none; padding: 10px; background: red; border-radius: 10px; position: fixed; top: 20px; right: 20px; z-index: 10000"></div>

<script type="text/javascript">

</script>






