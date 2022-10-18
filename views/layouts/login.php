<?php
//exit;
/** @var yii\web\View $this */
/** @var string $content */


use app\widgets\Alert;
use yii\bootstrap4\Breadcrumbs;
use yii\bootstrap4\Html;
use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;

use app\assets\LoginAsset;
LoginAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php $this->registerCsrfMetaTags() ?>
    <title>aaaaaaaaaaaa</title>
    <?php $this->head() ?>
</head>
<body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>

<header>
    <?php
    NavBar::begin([
        'brandUrl' => Yii::$app->homeUrl,
        'brandImage' => '/web/img/logo.svg',
        'options' => [
            'class' => 'navbar navbar-expand-md navbar-dark bg-dark fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => [
            ['label' => 'Войти', 'url' => ['/login']],
            ['label' => 'Регистрация', 'url' => ['/register']],
            ['label' => 'Восстановить пароль', 'url' => ['/forgot']],
        ],
    ]);
    NavBar::end();
    ?>


</header>

<main>
<div class="container" style="padding-top: 80px">
    <div class="row">
        <div class="col col-lg-6 col-md-6 col-sm-6">
            <div style="max-width: 23rem;">

                <div class="text-center mb-5">
                    <img class="img-fluid" src="/web/img/chat.svg" alt="Image Description" style="width: 12rem;">
                </div>


                <div class="mb-5">
                    <h2 class="display-4">Создайте свой сайт:</h2>
                </div>

                <ul class="list-checked list-checked-lg list-checked-primary list-unstyled-py-4" style="padding: 0">
                    <li class="list-checked-item">
                        <span class="d-block font-weight-bold mb-1">Бесплатное создание страниц</span>
                        Кнопки, изображения, видео, социальные сети, мессенджеры, вопросы и ответы, текстовые блоки и многое другое
                    </li>

                    <li class="list-checked-item">
                        <span class="d-block font-weight-bold mb-1">Рекламная страница с проверкой подписчиков</span>
                    </li>
                </ul>

                <div class="row justify-content-between mt-5 gx-2">
                    <div class="col">
                        <img class="img-fluid" src="/web/img/instagram.svg" alt="Image Description">
                    </div>
                    <div class="col">
                        <img class="img-fluid" src="/web/img/flow-xo-gray.svg" alt="Image Description">
                    </div>
                    <div class="col">
                        <img class="img-fluid" src="/web/img/layar-gray.svg" alt="Image Description">
                    </div>
                </div>
            </div>
        </div>
        <?= $content; ?>
    </div>
</div>
</main>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
