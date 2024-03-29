<?php
/*if(Yii::$app->user->isGuest){
    echo 'guest';
}else{
    echo 'no guest';
}

echo '<pre>';print_r(Yii::$app->user->identity->username);*/
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>
<div class="block-buttons">
    <button type="button" class="btn btn-primary 2btn-sm block-menu-1">Блоки</button>
    <button type="button" class="btn btn-outline-primary 2btn-sm block-content-1">Контент</button>
    <button type="button" class="btn btn-outline-primary 2btn-sm block-setting-1">Настройки</button>
</div>

<div class="row">
    <div class="col-lg-3 block-menu-2">
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

    <div class="col-lg-6 block-content-2">
        <div class="block-header">
        <div class="wrap-header">
            <img class="img-header" src="/web/img/header.jpg" alt="">

            <?php $form = ActiveForm::begin([
                'id' => 'formHeader',
                'action' => '',
                'options' => ['class' => 'form-vertical', 'enctype' => 'multipart/form-data'],
            ]); ?>
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

        <form id="form-ava" action="" enctype="multipart/form-data" method="post" style="margin-top: -100px;">
            <input type="hidden" name="avatar" value="1">

            <label style="" class="label-avatar2" for="avatarUploader">
                <img id="avatarImg" class="avatar-img2" src="/web/img/user.jpg" alt="Image Description">

                <input name="img" value="2" type="file" class="input-avatar2" id="avatarUploader">

                <span class="small-circle2">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
            </label>
            <input id="ava-x" type="hidden" name="x">
            <input id="ava-y" type="hidden" name="y">
            <input id="ava-w" type="hidden" name="w">
            <input id="ava-h" type="hidden" name="h">
        </form>
        </div>


    </div>
    <div class="col-lg-3 block-setting-2">
        <button type="button" class="btn btn-outline-primary ant-save-page">Сохранить</button>
        <button type="button" class="btn btn-outline-danger butdel ant-delete-page#">Удалить</button>
    </div>
</div>

<div id="b3" class="b3 ant-size" style="max-width: 600px;padding: 0 50px;display: none;background: #000000;">
    <div class="top-ava">Выберите область фотографии<i class="tio-clear nav-icon" onclick="Custombox.modal.close();"></i></div>
    <div>
        <!--<img id="ant-crop" class="ant-size" src="" style="22max-width: 600px;">-->
        <img id="ant-crop" class="ant-size" src="" style="max-width: 100%;">
    </div>

    <div class="bottom-ava">
        <button type="button" class="save-ava btn btn-primary">Сохранить</button>
        <button type="button" class="btn btn-primary" onclick="Custombox.modal.close();">Отмена</button>
    </div>
</div>
<div id="b4" class="b4 ant-size" style="max-width: 1000px;padding: 0 50px;display: none;background: #000000">
    <div class="top-ava">Выберите область фотографии<i class="tio-clear nav-icon" onclick="Custombox.modal.close();"></i></div>
    <div>
        <!--<img id="ant-crop2" class="ant-size" src="" style="max-width: 1000px;">-->
        <img id="ant-crop2" class="ant-size" src="" style="max-width: 100%;">
    </div>

    <div class="bottom-ava">
        <button type="button" class="save-background btn btn-primary">Сохранить</button>
        <button type="button" class="btn btn-primary" onclick="Custombox.modal.close();">Отмена</button>
    </div>
</div>
