<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

?>
<div class="wrap-page">
    <div class="block-buttons">
        <button type="button" class="btn btn-primary 2btn-sm block-menu-1">Блоки</button>
        <button type="button" class="btn btn-outline-primary 2btn-sm block-content-1">Контент</button>
        <button type="button" class="btn btn-outline-primary 2btn-sm block-setting-1">Настройки</button>
    </div>

    <div class="row">
        <div class="col-lg-3 2col-md-4 block-menu-2">
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

        <div class="col-lg-6 2col-md-8 block-content-2">
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
            <div id="sortable" class="ant-wrap"><?=$page->page?></div>
        </div>
        <div class="col-lg-3 2col-md-8 block-setting-2">
            <div id="setting-button" class="setting-block"></div>
            <div id="setting-text" class="setting-block"></div>
            <div id="setting-video" class="setting-block"></div>
            <div id="setting-map" class="setting-block"></div>
            <div id="setting-split" class="setting-block"></div>
            <div id="setting-faq" class="setting-block"></div>
            <div id="setting-button" class="setting-block"></div>

            <div id="setting-slider" class="setting-block">
                <label type="button" class="btn btn-outline-primary 22ant-save-page custom-file-upload">
                    <?= Html::activeInput('file', $slider, 'image', ['id' => 'slider', 'class' => 'input-slider']) ?>
                    Выбрать изображение
                </label>

                <div class="wrap-input"></div>
            </div>

            <div class="bl-save">
            <button type="button" class="btn btn-outline-primary ant-save-page">Сохранить</button>
            <button type="button" class="btn btn-outline-danger butdel ant-delete-page#">Удалить</button>
            </div>
        </div>
    </div>

</div>

<div>
    <div id="b4" class="b4 ant-size" style="max-width: 1000px;padding: 0 50px;display: none;background: #000000">
        <div class="top-ava">Выберите область фотографии<i class="tio-clear nav-icon"
                                                           onclick="Custombox.modal.close();"></i></div>
        <div>
            <!--<img id="ant-crop2" class="ant-size" src="" style="max-width: 1000px;">-->
            <img id="ant-crop2" class="ant-size" src="" style="max-width: 100%;">
        </div>

        <div class="bottom-ava">
            <button type="button" class="save-background btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-primary" onclick="Custombox.modal.close();">Отмена</button>
        </div>
    </div>

    <form id="formPage" action="" enctype="multipart/form-data" method="post">
        <input type="hidden" name="page">
    </form>

    <form id="removeImg" action="/generator/remove-img" method="post">
        <input type="hidden" name="name">
        <input type="hidden" name="page_id">
        <input type="hidden" name="page">
    </form>

    <!--<div class="templ-slider">
        <div class="templ-page">
            <div class="block-slider ui-sortable-handle block active swiper-container">
                <img class="ant-imgstart" src="/web/img/add_image.png" width="100%">
            </div>
        </div>
        <div class="templ-setting">
            <div class="setting-block"></div>
        </div>
    </div>-->
    <div class="template">
        <div class="el-input" style="position: relative;">
            <input class="form-control 2text-button ant-img-name" type="text" name="image" value="" readonly style="margin-top: 30px;">
            <i class="img-close fa fa-remove"></i>
        </div>
    </div>

</div>
