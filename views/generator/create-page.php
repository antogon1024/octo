<?php
/*if(Yii::$app->user->isGuest){
    echo 'guest';
}else{
    echo 'no guest';
}

echo '<pre>';print_r(Yii::$app->user->identity->username);*/

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
            <form action="" id="form1" method="post" enctype="multipart/form-data">
                <input id="file1" name="file1" type="file" class="input-header">
                <input type="hidden" name="ddd" value="1">
                <input type="hidden" name="_csrf"
                       value="6zfsTQaJpCtH2RjrIgqXwDnba08o6JdUnkkSBV5lFEWuc6Z_T8ToYDGMd4gbR9SLfL40dnG85QTvfXF8Ll1YIw==">
            </form>

            <label for="file1" class="label-header">
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
</div>
